import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createTaskQueue,
  extractGoogleDriveFileId,
  getDomainLabel,
  getGoogleDriveThumbnailUrl,
  getWebsiteScreenshotUrl,
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
  isVideoSourceUrl,
  toRawGitHubUrl,
  toVideoStreamUrl,
} from './video-thumbnail';

test('toRawGitHubUrl converts github.com /raw/ links to raw.githubusercontent.com', () => {
  assert.equal(
    toRawGitHubUrl('https://github.com/alinlabs/alinlabs-data/raw/main/video/ambefit/1.mp4'),
    'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/video/ambefit/1.mp4'
  );
  assert.equal(
    toRawGitHubUrl('https://cdn.example.com/clip.mp4'),
    'https://cdn.example.com/clip.mp4'
  );
});

test('toVideoStreamUrl converts GitHub LFS /raw/ video URLs to media.githubusercontent.com', () => {
  assert.equal(
    toVideoStreamUrl('https://github.com/alinlabs/alinlabs-data/raw/main/video/ambefit/1.mp4'),
    'https://media.githubusercontent.com/media/alinlabs/alinlabs-data/main/video/ambefit/1.mp4'
  );
  assert.equal(
    toVideoStreamUrl('https://cdn.example.com/clip.mp4'),
    'https://cdn.example.com/clip.mp4'
  );
});

test('createTaskQueue enforces strict concurrency cap and preserves FIFO order', async () => {
  const queue = createTaskQueue(1);
  let active = 0;
  let peakActive = 0;
  const order: number[] = [];

  const tasks = [1, 2, 3, 4].map((id) =>
    queue.enqueue(async () => {
      active++;
      peakActive = Math.max(peakActive, active);
      await new Promise((r) => setTimeout(r, 10));
      order.push(id);
      active--;
      return id * 10;
    })
  );

  const results = await Promise.all(tasks);
  assert.equal(peakActive, 1);
  assert.deepEqual(order, [1, 2, 3, 4]);
  assert.deepEqual(results, [10, 20, 30, 40]);
  assert.equal(queue.getActiveCount(), 0);
  assert.equal(queue.getPendingCount(), 0);
});

test('createTaskQueue continues processing after a failing task', async () => {
  const queue = createTaskQueue(1);
  const first = queue.enqueue(async () => {
    throw new Error('boom');
  });
  const second = queue.enqueue(async () => 'ok');

  await assert.rejects(first, /boom/);
  assert.equal(await second, 'ok');
});

test('extractGoogleDriveFileId and getGoogleDriveThumbnailUrl parse preview and open links', () => {
  assert.equal(
    extractGoogleDriveFileId('https://drive.google.com/file/d/1OwUpgBu95Pt0bRPlmlLEUnBV21uHKDyg/preview'),
    '1OwUpgBu95Pt0bRPlmlLEUnBV21uHKDyg'
  );
  assert.equal(
    getGoogleDriveThumbnailUrl('https://drive.google.com/file/d/1OwUpgBu95Pt0bRPlmlLEUnBV21uHKDyg/preview', 800),
    'https://drive.google.com/thumbnail?id=1OwUpgBu95Pt0bRPlmlLEUnBV21uHKDyg&sz=w800'
  );
  assert.equal(extractGoogleDriveFileId('https://example.com/video.mp4'), null);
});

test('getYouTubeVideoId and getYouTubeThumbnailUrl parse watch, short, and embed URLs', () => {
  assert.equal(getYouTubeVideoId('https://youtu.be/_awkGyizTb4?si=abc'), '_awkGyizTb4');
  assert.equal(getYouTubeVideoId('https://www.youtube.com/embed/LXb3EKWsInQ'), 'LXb3EKWsInQ');
  assert.equal(
    getYouTubeThumbnailUrl('https://www.youtube.com/watch?v=LXb3EKWsInQ'),
    'https://i.ytimg.com/vi/LXb3EKWsInQ/hqdefault.jpg'
  );
});

test('isVideoSourceUrl distinguishes video extensions from images', () => {
  assert.equal(isVideoSourceUrl('https://github.com/alinlabs/alinlabs-data/raw/main/video/ambefit/1.mp4'), true);
  assert.equal(isVideoSourceUrl('https://cdn.site/clip.webm?v=2'), true);
  assert.equal(isVideoSourceUrl('https://github.com/alinlabs/alinlabs-data/raw/main/1.webp'), false);
});

test('getDomainLabel and getWebsiteScreenshotUrl normalize website metadata', () => {
  assert.equal(getDomainLabel('https://www.kampusdigital.my.id/path'), 'kampusdigital.my.id');
  assert.equal(
    getWebsiteScreenshotUrl('https://vynance.vercel.app/', 600),
    'https://s0.wp.com/mshots/v1/https%3A%2F%2Fvynance.vercel.app%2F?w=600'
  );
});
