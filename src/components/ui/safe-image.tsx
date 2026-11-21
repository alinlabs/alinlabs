import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
  fallbackClassName?: string;
  fadeIn?: boolean;
}

/**
 * Resilient image component with:
 * - Zero broken image placeholders (switches to fallbackSrc or styled fallback box)
 * - async decoding & configurable lazy/eager loading
 * - no-referrer policy for cross-origin reliability
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = '',
  className = '',
  fallbackSrc,
  fallbackText,
  fallbackIcon,
  fallbackClassName = '',
  fadeIn = false,
  loading = 'lazy',
  decoding = 'async',
  referrerPolicy = 'no-referrer',
  onLoad,
  onError,
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [triedFallback, setTriedFallback] = useState(false);
  const [failed, setFailed] = useState(!src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setTriedFallback(false);
    setFailed(!src);
    setLoaded(false);
  }, [src]);

  if (failed || !currentSrc) {
    const initials = (fallbackText || alt || 'AL')
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join('');

    const hasCustomFallback = Boolean(fallbackClassName);

    return (
      <div
        role="img"
        aria-label={alt || fallbackText || 'Gambar tidak tersedia'}
        className={`flex items-center justify-center select-none ${
          hasCustomFallback ? fallbackClassName : `bg-slate-100 text-slate-500 font-bold ${className}`
        }`}
      >
        {fallbackIcon ?? (initials ? <span className={hasCustomFallback ? 'tracking-wide' : 'text-xs tracking-wide'}>{initials}</span> : <ImageOff className="w-4 h-4 opacity-50" />)}
      </div>
    );
  }

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding={decoding}
      referrerPolicy={referrerPolicy}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      onError={(e) => {
        if (!triedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
          setTriedFallback(true);
          setCurrentSrc(fallbackSrc);
          return;
        }
        setFailed(true);
        onError?.(e);
      }}
      className={`${className}${fadeIn ? ` transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}` : ''}`}
    />
  );
};
