import React, { useRef, useState, useEffect } from 'react';

interface ScaledIframeProps {
  src: string;
  title: string;
  originalWidth: number;
  originalHeight: number;
}

export const ScaledIframe: React.FC<ScaledIframeProps> = ({ src, title, originalWidth, originalHeight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setScale(width / originalWidth);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [originalWidth]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <iframe loading="lazy"
        src={src}
        title={title}
        className="absolute top-0 left-0 border-0 origin-top-left"
        style={{
          width: `${originalWidth}px`,
          height: `${originalHeight}px`,
          transform: `scale(${scale})`
        }}
        sandbox="allow-scripts allow-same-origin"
      />
      <div className="absolute inset-0 z-10 pointer-events-none" />
    </div>
  );
};
