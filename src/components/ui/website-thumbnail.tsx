import React, { useEffect, useRef, useState } from 'react';
import { Globe, Play } from 'lucide-react';
import {
  getDomainLabel,
  getWebsiteScreenshotUrl,
} from '../../utils/video-thumbnail';

interface WebsiteThumbnailProps {
  url: string;
  title: string;
  category?: string;
  screenshotWidth?: number;
  compact?: boolean;
  className?: string;
}

/**
 * Lightweight thumbnail preview for external websites.
 * Prevents booting dozens of live remote SPAs inside iframes on the portfolio grid.
 */
export const WebsiteThumbnail: React.FC<WebsiteThumbnailProps> = ({
  url,
  title,
  category,
  screenshotWidth = 800,
  compact = false,
  className = 'w-full h-full',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearView, setIsNearView] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const domain = getDomainLabel(url);
  const screenshotUrl = getWebsiteScreenshotUrl(url, screenshotWidth);

  useEffect(() => {
    setImgLoaded(false);
    setImgFailed(false);
  }, [url]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
      { rootMargin: '250px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [url]);

  useEffect(() => {
    if (!isNearView || imgLoaded || imgFailed) return;
    const timer = setTimeout(() => {
      setImgFailed(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [isNearView, imgLoaded, imgFailed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50/70 select-none ${className}`}
    >
      {/* Top Browser Chrome Strip */}
      {!compact && (
        <div className="relative z-20 flex items-center justify-between gap-2 px-3 py-2 bg-white/95 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-rose-400/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex-1 min-w-0 bg-slate-100 rounded-md px-2 py-0.5 text-[10px] sm:text-xs text-slate-500 font-medium truncate text-center">
            {domain}
          </div>
          <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </div>
      )}

      {/* Visual Thumbnail / Instant Stylized Fallback */}
      <div className={`relative w-full ${compact ? 'h-full' : 'h-[calc(100%-32px)]'}`}>
        {/* Crisp stylized fallback always beneath image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-blue-100/40">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-2.5 border border-blue-200/60">
            <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <p className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1 max-w-full">
            {title}
          </p>
          {category && (
            <span className="text-[10px] sm:text-xs font-semibold text-blue-600/80 mt-0.5 line-clamp-1">
              {category}
            </span>
          )}
          <span className="mt-2 text-[10px] text-slate-400 font-medium">
            {domain}
          </span>
        </div>

        {/* Lazy external website screenshot thumbnail */}
        {isNearView && !imgFailed && (
          <img
            src={screenshotUrl}
            alt={`Thumbnail ${title}`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
    </div>
  );
};

interface DriveVideoFacadeProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Click-to-play thumbnail facade for Google Drive preview embeds.
 * Defers iframe creation and media streaming until the user clicks Play.
 */
export const DriveVideoFacade: React.FC<DriveVideoFacadeProps> = ({
  src,
  title,
  className = 'w-full h-full',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={src}
        title={title}
        className={className}
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`Putar ${title}`}
      className={`relative group/play overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex items-center justify-center text-left cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.28),transparent_55%)]" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-blue-600 shadow-2xl flex items-center justify-center group-hover/play:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xs sm:text-sm font-bold text-white drop-shadow">
            {title}
          </span>
          <span className="text-[11px] font-medium text-blue-200/80">
            Klik untuk memutar video
          </span>
        </div>
      </div>
    </button>
  );
};
