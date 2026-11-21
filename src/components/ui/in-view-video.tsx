import React, { useRef, useEffect, useState } from 'react';
import { Film } from 'lucide-react';
import {
  getCachedVideoThumbnail,
  hasThumbnailExtractionFailed,
  requestVideoThumbnail,
  toVideoStreamUrl,
} from '../../utils/video-thumbnail';

interface InViewVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  alt?: string;
  /** Keep cards strictly thumbnail-only (no simultaneous video playback). */
  thumbnailOnly?: boolean;
}

export const InViewVideo: React.FC<InViewVideoProps> = ({
  src,
  alt = 'Thumbnail video portofolio',
  poster,
  className = 'w-full h-full',
  thumbnailOnly = true,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearView, setIsNearView] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(() => {
    if (poster) return poster;
    return getCachedVideoThumbnail(src) ?? null;
  });
  const [useMetadataFallback, setUseMetadataFallback] = useState(() =>
    Boolean(!poster && !getCachedVideoThumbnail(src) && hasThumbnailExtractionFailed(src))
  );

  useEffect(() => {
    if (poster) {
      setThumbnailUrl(poster);
      setUseMetadataFallback(false);
      return;
    }

    const cached = getCachedVideoThumbnail(src);
    if (cached) {
      setThumbnailUrl(cached);
      setUseMetadataFallback(false);
      return;
    }

    setThumbnailUrl(null);
    setUseMetadataFallback(hasThumbnailExtractionFailed(src));
  }, [src, poster]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || thumbnailUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsNearView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: '220px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [thumbnailUrl, src]);

  useEffect(() => {
    if (!isNearView || thumbnailUrl || useMetadataFallback || !src) return;

    let cancelled = false;
    requestVideoThumbnail(src).then((captured) => {
      if (cancelled) return;
      if (captured) {
        setThumbnailUrl(captured);
      } else {
        setUseMetadataFallback(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [isNearView, thumbnailUrl, useMetadataFallback, src]);

  // Never render auto-playing videos in thumbnail-only portfolio mode
  const normalizedSrc = toVideoStreamUrl(src);
  const metadataFrameSrc = normalizedSrc.includes('#') ? normalizedSrc : `${normalizedSrc}#t=0.5`;

  return (
    <div
      ref={containerRef}
      data-video-thumbnail="true"
      data-thumbnail-only={thumbnailOnly ? 'true' : 'false'}
      className={`relative overflow-hidden bg-slate-200 ${className}`}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      ) : useMetadataFallback && isNearView ? (
        <video
          src={metadataFrameSrc}
          preload="metadata"
          muted
          playsInline
          aria-label={alt}
          className="w-full h-full object-cover pointer-events-none"
          {...(restProps as React.VideoHTMLAttributes<HTMLVideoElement>)}
          autoPlay={false}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
          <Film className="w-7 h-7 text-slate-400/70" />
        </div>
      )}
    </div>
  );
};
