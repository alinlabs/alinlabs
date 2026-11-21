import React, { useState, useEffect } from 'react';

export const ExpandableText = ({ text, className, bgClass = 'bg-slate-50' }: { text: string, className?: string, bgClass?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldTruncate = isMobile && text.length > 80;

  return (
    <div className={`text-left w-full ${className || ''}`}>
      <div 
        className={`relative ${!isExpanded && shouldTruncate ? 'overflow-hidden' : ''}`}
        style={(!isExpanded && shouldTruncate) ? { display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' } : undefined}
      >
        <p className="text-slate-600 text-sm sm:text-sm md:text-base leading-snug sm:leading-normal inline">
          {text}
        </p>
        
        {(!isExpanded && shouldTruncate) && (
          <div className={`absolute bottom-0 right-0 pl-1 py-0 ${bgClass} flex items-center`}>
            <span 
              onClick={() => setIsExpanded(true)}
              className="text-slate-500 font-medium cursor-pointer hover:text-slate-700 transition-colors text-sm"
            >
              ... selengkapnya
            </span>
          </div>
        )}
      </div>

      {(isExpanded && shouldTruncate) && (
        <span 
          onClick={() => setIsExpanded(false)}
          className="text-slate-500 font-semibold cursor-pointer hover:text-slate-700 transition-colors text-[13px] sm:text-sm mt-2 inline-block sm:hidden"
        >
          tampilkan lebih sedikit
        </span>
      )}
    </div>
  );
};


