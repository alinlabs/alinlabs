export interface TaskQueue {
  enqueue: <T>(task: () => Promise<T>) => Promise<T>;
  getActiveCount: () => number;
  getPendingCount: () => number;
}

/**
 * Creates a bounded-concurrency FIFO task queue so heavy media operations
 * (like video frame extraction) never execute simultaneously in bulk.
 */
export function createTaskQueue(maxConcurrency = 2): TaskQueue {
  const limit = Math.max(1, Math.floor(maxConcurrency));
  let active = 0;
  const pending: Array<() => void> = [];

  const next = () => {
    while (active < limit && pending.length > 0) {
      const run = pending.shift();
      if (run) run();
    }
  };

  const enqueue = <T,>(task: () => Promise<T>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const execute = () => {
        active++;
        Promise.resolve()
          .then(task)
          .then(resolve, reject)
          .finally(() => {
            active--;
            next();
          });
      };

      if (active < limit) {
        execute();
      } else {
        pending.push(execute);
      }
    });
  };

  return {
    enqueue,
    getActiveCount: () => active,
    getPendingCount: () => pending.length,
  };
}

export function isVideoSourceUrl(url: string): boolean {
  if (!url) return false;
  return /\.(mp4|webm|mov|m4v|ogg)(?:[?#].*)?$/i.test(url.trim());
}

export function extractGoogleDriveFileId(url: string): string | null {
  if (!url) return null;
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  const openMatch = url.match(/drive\.google\.com\/(?:open|uc)\?[^#]*\bid=([a-zA-Z0-9_-]+)/);
  if (openMatch?.[1]) return openMatch[1];

  return null;
}

export function getGoogleDriveThumbnailUrl(url: string, width = 1280): string | null {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) return null;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`;
}

export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? null;
}

export function getYouTubeThumbnailUrl(url: string): string | null {
  const id = getYouTubeVideoId(url);
  if (!id) return null;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function toRawGitHubUrl(url: string): string {
  if (!url) return url;
  const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/(.+)$/i);
  if (!match) return url;
  const [, owner, repo, rest] = match;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${rest}`;
}

export function toVideoStreamUrl(url: string): string {
  if (!url) return url;
  const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/raw\/(.+)$/i);
  if (!match) return url;
  const [, owner, repo, rest] = match;
  return `https://media.githubusercontent.com/media/${owner}/${repo}/${rest}`;
}

export function getWebsiteScreenshotUrl(url: string, width = 800): string {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${width}`;
}

export function getDomainLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

const thumbnailCache = new Map<string, string>();
const failedThumbnailCache = new Set<string>();
const inFlightThumbnails = new Map<string, Promise<string | null>>();

// Limit to 2 concurrent thumbnail extractions so scrolling through grids never stalls UI/network
const thumbnailExtractionQueue = createTaskQueue(2);

export function getCachedVideoThumbnail(src: string): string | undefined {
  return thumbnailCache.get(src) || thumbnailCache.get(toVideoStreamUrl(src));
}

export function hasThumbnailExtractionFailed(src: string): boolean {
  return failedThumbnailCache.has(src);
}

/**
 * Lazily extracts a static thumbnail image (WebP data URL) from a video source
 * using a sequential queue, metadata-only preloading, and an in-memory session cache.
 * Supports GitHub LFS video streams via media.githubusercontent.com and falls back to raw.
 */
export function requestVideoThumbnail(
  src: string,
  options?: { seekTime?: number; maxWidth?: number; timeoutMs?: number }
): Promise<string | null> {
  if (!src || typeof document === 'undefined') {
    return Promise.resolve(null);
  }

  const mediaUrl = toVideoStreamUrl(src);
  const rawUrl = toRawGitHubUrl(src);
  const candidateUrls = mediaUrl === rawUrl ? [mediaUrl] : [mediaUrl, rawUrl];

  const cached = thumbnailCache.get(src) || thumbnailCache.get(mediaUrl);
  if (cached) return Promise.resolve(cached);

  if (failedThumbnailCache.has(src)) {
    return Promise.resolve(null);
  }

  const existing = inFlightThumbnails.get(src);
  if (existing) return existing;

  const seekTime = options?.seekTime ?? 0.5;
  const maxWidth = options?.maxWidth ?? 480;
  const timeoutMs = options?.timeoutMs ?? 10000;

  const promise = thumbnailExtractionQueue
    .enqueue(
      () =>
        new Promise<string | null>((resolve) => {
          const video = document.createElement('video');
          let settled = false;
          let candidateIndex = 0;
          let timeoutId: ReturnType<typeof setTimeout> | null = null;

          const cleanup = () => {
            if (timeoutId) clearTimeout(timeoutId);
            video.onloadedmetadata = null;
            video.onseeked = null;
            video.onerror = null;
            video.pause();
            video.removeAttribute('src');
            video.load();
          };

          const finish = (result: string | null) => {
            if (settled) return;
            settled = true;
            cleanup();
            if (result) {
              thumbnailCache.set(src, result);
              thumbnailCache.set(mediaUrl, result);
            } else {
              failedThumbnailCache.add(src);
            }
            resolve(result);
          };

          timeoutId = setTimeout(() => finish(null), timeoutMs);

          video.crossOrigin = 'anonymous';
          video.preload = 'metadata';
          video.muted = true;
          video.playsInline = true;

          video.onloadedmetadata = () => {
            const safeDuration = Number.isFinite(video.duration) ? video.duration : 1;
            const targetTime = safeDuration > seekTime ? seekTime : Math.max(0.05, safeDuration * 0.2);
            try {
              video.currentTime = targetTime;
            } catch {
              finish(null);
            }
          };

          video.onseeked = () => {
            try {
              const vw = video.videoWidth || 480;
              const vh = video.videoHeight || 640;
              const scale = Math.min(1, maxWidth / vw);
              const canvas = document.createElement('canvas');
              canvas.width = Math.max(1, Math.round(vw * scale));
              canvas.height = Math.max(1, Math.round(vh * scale));
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                finish(null);
                return;
              }
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/webp', 0.72);
              finish(dataUrl && dataUrl.startsWith('data:image/') ? dataUrl : null);
            } catch {
              finish(null);
            }
          };

          video.onerror = () => {
            candidateIndex++;
            if (candidateIndex < candidateUrls.length) {
              video.src = candidateUrls[candidateIndex];
              return;
            }
            finish(null);
          };

          video.src = candidateUrls[0];
        })
    )
    .finally(() => {
      inFlightThumbnails.delete(src);
    });

  inFlightThumbnails.set(src, promise);
  return promise;
}
