import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const InViewVideo: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [isMuted, setIsMuted] = useState(props.muted ?? true);

  useEffect(() => {
    let observer: IntersectionObserver;
    const currentContainer = containerRef.current;

    if (currentContainer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!hasEnteredView) {
                setHasEnteredView(true);
              }
              // Wait for React to apply the src if it hasn't 
              setTimeout(() => {
                if (videoRef.current && videoRef.current.src) {
                  const playPromise = videoRef.current.play();
                  if (playPromise !== undefined) {
                    playPromise.catch(error => {
                      if (error.name !== 'AbortError' && error.name !== 'NotSupportedError') {
                        console.warn("Video play failed:", error.message);
                      }
                    });
                  }
                }
              }, 100);
            } else {
              if (videoRef.current) {
                videoRef.current.pause();
              }
            }
          });
        },
        { threshold: 0.5 } // Play when 50% visible (or center of slider)
      );
      observer.observe(currentContainer);
    }

    return () => {
      if (observer && currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [hasEnteredView]);

  useEffect(() => {
    const handleGlobalMute = (e: CustomEvent<{ source: HTMLVideoElement }>) => {
      if (videoRef.current && e.detail.source !== videoRef.current) {
        setIsMuted(true);
        videoRef.current.muted = true;
      }
    };
    
    window.addEventListener('alinlabs-video-unmute', handleGlobalMute as EventListener);
    return () => {
      window.removeEventListener('alinlabs-video-unmute', handleGlobalMute as EventListener);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (videoRef.current) {
      videoRef.current.muted = newMutedState;
      if (!newMutedState) {
        // Dispatch global event that this video was unmuted
        window.dispatchEvent(new CustomEvent('alinlabs-video-unmute', {
          detail: { source: videoRef.current }
        }));
      }
    }
  };

  // Remove autoPlay from props so we control playback fully
  const { autoPlay, src, className, ...restProps } = props;

  return (
    <div ref={containerRef} className={`relative group/video ${className || 'w-full h-full'}`}>
      <video 
        ref={videoRef} 
        // Menggunakan native browser caching dengan memastikan src konsisten 
        // dan menghindari query params yang acak, serta lazy loading
        src={hasEnteredView ? src : undefined} 
        preload={hasEnteredView ? "auto" : "none"}
        className="w-full h-full object-cover"
        muted={isMuted}
        playsInline
        {...restProps} 
      />
      <button 
        onClick={toggleMute}
        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 z-30 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 rounded-full text-white cursor-pointer transition-all duration-300 border border-white/20 opacity-0 group-hover/video:opacity-100"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" /> : <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />}
      </button>
    </div>
  );
};


