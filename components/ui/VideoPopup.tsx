import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPopupProps {
  videos: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onMediaChange?: (index: number) => void;
  clientLogo?: string;
  clientName?: string;
}

export const VideoPopup: React.FC<VideoPopupProps> = ({ videos, initialIndex, isOpen, onClose, onMediaChange, clientLogo, clientName }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isIdle, setIsIdle] = useState(false);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => setIsIdle(true), 2500); // 2.5 seconds
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsPlaying(true);
      setProgress(0);
      resetIdleTimer();
      // Ensure popup mutes background videos since it will be unmated or active
      if (!isMuted && videoRef.current) {
        window.dispatchEvent(new CustomEvent('alinlabs-video-unmute', {
          detail: { source: videoRef.current }
        }));
      }
    }
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    }
  }, [isOpen, initialIndex, resetIdleTimer, isMuted]);

  useEffect(() => {
    const handleGlobalMute = (e: CustomEvent<{ source: HTMLVideoElement }>) => {
      // If another video triggered unmute, we should mute this popup 
      // (though unlikely to background play while popup is open, it's good safety)
      if (videoRef.current && e.detail.source !== videoRef.current) {
        setIsMuted(true);
      }
    };
    
    window.addEventListener('alinlabs-video-unmute', handleGlobalMute as EventListener);
    return () => {
      window.removeEventListener('alinlabs-video-unmute', handleGlobalMute as EventListener);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex, isOpen]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setVideoDuration(videoRef.current.duration);
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const p = Math.max(0, Math.min(1, x / rect.width));
      videoRef.current.currentTime = p * videoRef.current.duration;
      setProgress(p * 100);
    }
  };

  const currentVideo = videos[currentIndex];
  const isImage = currentVideo?.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < videos.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      onMediaChange?.(nextIndex);
      setIsPlaying(true);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      onMediaChange?.(prevIndex);
      setIsPlaying(true);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (!newMuted && videoRef.current) {
      window.dispatchEvent(new CustomEvent('alinlabs-video-unmute', {
        detail: { source: videoRef.current }
      }));
    }
  };

  const handleVideoEnded = () => {
    if (currentIndex < videos.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      onMediaChange?.(nextIndex);
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6" 
          onMouseMove={resetIdleTimer}
          onTouchStart={resetIdleTimer}
          onTouchMove={resetIdleTimer}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Main Content Wrapper for floating items */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Desktop Top Right Controls */}
            <div className={`absolute top-4 right-4 z-[110] hidden md:flex items-center gap-3 transition-opacity duration-300 pointer-events-auto ${isIdle && isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link berhasil disalin: ' + window.location.href);
                  }}
                  className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  title="Salin Link"
              >
                  <Share2 className="w-6 h-6" />
              </button>
              <button 
                onClick={onClose}
                className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Desktop Floating Logos */}
            <div className={`absolute top-4 left-4 z-[110] hidden md:flex items-center gap-3 transition-opacity duration-300 pointer-events-auto ${isIdle && isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              {clientLogo && (
                <>
                   <div className="flex -space-x-2">
                     <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-blue-600 flex items-center justify-center p-1.5 shadow-lg overflow-hidden shrink-0 z-10">
                        <img loading="lazy" src="/gambar/logo-icon-white.png" alt="AlinLabs" className="w-full h-full object-contain" />
                     </div>
                     <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white flex items-center justify-center p-1.5 shadow-lg overflow-hidden shrink-0">
                        <img loading="lazy" src={clientLogo} alt={clientName || 'Client'} className="w-full h-full object-contain" />
                     </div>
                   </div>
                   {clientName && (
                     <span className="text-white text-sm font-bold tracking-wide drop-shadow-md">
                       {clientName}
                     </span>
                   )}
                </>
              )}
            </div>
          </div>

          {/* Main Modal Container */}
          <motion.div 
            initial={{ y: '100%', opacity: 0.5, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }}
            className={`w-full relative overflow-hidden flex flex-col shadow-2xl group/modal z-50 pointer-events-auto ${
              !isImage 
                ? 'h-[85vh] md:h-[85vh] aspect-[9/16] bg-black rounded-t-3xl md:rounded-3xl md:w-auto mx-auto' 
                : 'h-auto max-h-[85vh] md:w-auto md:h-auto aspect-auto md:bg-transparent bg-black rounded-t-3xl md:rounded-none md:shadow-none md:max-w-[90vw] md:max-h-[90vh] mx-auto'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Swipe handle */}
            <div className={`absolute top-2 inset-x-0 z-50 flex items-center justify-center md:hidden transition-opacity duration-300 ${isIdle && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="w-12 h-1.5 bg-white/40 rounded-full" />
            </div>

        {/* Top Header Overlay (Gradient) - Logos, Volume, and Mobile Close */}
        <div className={`absolute top-0 inset-x-0 z-40 ${!isImage ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent' : 'md:hidden bg-gradient-to-b from-black/80 via-black/40 to-transparent'} pt-8 pb-12 px-4 md:pt-6 md:px-6 flex items-start justify-between md:justify-end transition-opacity duration-300 ${isIdle && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Left: Logos (Mobile Only) */}
          <div className="flex md:hidden items-center gap-3">
            {clientLogo && (
              <>
                 <div className="flex -space-x-2">
                   <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-blue-600 flex items-center justify-center p-1.5 shadow-lg overflow-hidden shrink-0 z-10">
                      <img loading="lazy" src="/gambar/logo-icon-white.png" alt="AlinLabs" className="w-full h-full object-contain" />
                   </div>
                   <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-white flex items-center justify-center p-1.5 shadow-lg overflow-hidden shrink-0">
                      <img loading="lazy" src={clientLogo} alt={clientName || 'Client'} className="w-full h-full object-contain" />
                   </div>
                 </div>
                 {clientName && (
                   <span className="text-white text-xs font-bold tracking-wide drop-shadow-md">
                     {clientName}
                   </span>
                 )}
              </>
            )}
          </div>

          {/* Right: Volume & Share & Mobile Close */}
          <div className="flex items-center gap-2 relative">
            <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link berhasil disalin: ' + window.location.href);
                }}
                className="w-8 h-8 flex md:hidden items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-white/20 transition-colors"
                title="Salin Link"
            >
                <Share2 className="w-4 h-4" />
            </button>
            <div className="group relative flex flex-col items-center">
              {!isImage && (
                <div className="absolute top-10 pt-2 hidden group-hover:flex flex-col items-center justify-center z-50">
                  <div className="bg-black/60 rounded-full w-9 h-32 border border-white/10 flex flex-col items-center justify-center">
                    <input 
                      type="range" 
                      min="0" max="1" step="0.01" 
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const newVol = parseFloat(e.target.value);
                        setVolume(newVol);
                        if (newVol > 0) {
                          setIsMuted(false);
                          if (videoRef.current) {
                             window.dispatchEvent(new CustomEvent('alinlabs-video-unmute', {
                               detail: { source: videoRef.current }
                             }));
                          }
                        }
                      }}
                      className="w-24 h-1 accent-white cursor-pointer -rotate-90 origin-center"
                    />
                  </div>
                </div>
              )}
              {!isImage && (
                <button 
                  onClick={toggleMute}
                  className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-black/40 md:bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}
            </div>
            
            <button onClick={onClose} className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-white md:hidden bg-black/40 rounded-full border border-white/10">
                <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video or Image Element */}
        {isImage ? (
          <div className="w-full h-auto flex items-center justify-center bg-black md:bg-transparent">
            <img loading="lazy" src={currentVideo} alt="Media" className="w-full h-auto max-h-[85vh] md:w-auto md:h-auto md:max-h-[90vh] object-contain" />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={currentVideo}
            preload="auto"
            className="w-full h-full object-cover"
            playsInline
            muted={isMuted}
            onClick={togglePlay}
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
          />
        )}

        {/* Center Play/Pause Button */}
        {!isImage && (
          <div className={`absolute inset-0 z-30 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isIdle && isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <button 
                onClick={(e) => { e.stopPropagation(); togglePlay(e); }}
                className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 md:bg-white/20 md:hover:bg-white/30 transition-transform pointer-events-auto shadow-2xl hover:scale-110 active:scale-95 border border-white/10"
            >
                {isPlaying ? <Pause className="w-8 h-8 md:w-10 md:h-10" /> : <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" />}
            </button>
          </div>
        )}

        {/* Side Navigation Overlays */}

        {currentIndex > 0 && (
          <div className={`absolute inset-y-0 left-4 z-40 flex items-center justify-start pointer-events-none transition-opacity duration-300 ${isIdle && isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(e); }}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 md:bg-white/20 md:hover:bg-white/30 transition-all pointer-events-auto shadow-lg hover:scale-110 active:scale-95 border border-white/10"
            >
              <SkipBack className="w-5 h-5 md:w-6 md:h-6 -ml-1" />
            </button>
          </div>
        )}

        {currentIndex < videos.length - 1 && (
          <div className={`absolute inset-y-0 right-4 z-40 flex items-center justify-end pointer-events-none transition-opacity duration-300 ${isIdle && isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(e); }}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 md:bg-white/20 md:hover:bg-white/30 transition-all pointer-events-auto shadow-lg hover:scale-110 active:scale-95 border border-white/10"
            >
              <SkipForward className="w-5 h-5 md:w-6 md:h-6 ml-1" />
            </button>
          </div>
        )}

        {/* Bottom Video Controls Overlay (Gradient) */}
        {!isImage && (
          <div className={`absolute bottom-0 inset-x-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-4 transition-opacity duration-300 ${isIdle && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex items-center gap-3 w-full">
              <span className="text-white text-xs font-medium w-9 text-right drop-shadow-md">{formatTime(currentTime)}</span>
              <div className="flex-1 relative flex items-center group/progress h-4">
                <input 
                  type="range" 
                  min="0" max="100" step="0.1"
                  value={progress}
                  onChange={(e) => {
                    const newProgress = parseFloat(e.target.value);
                    setProgress(newProgress);
                    if (videoRef.current && videoRef.current.duration) {
                      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className="w-full h-1 md:h-1.5 bg-white/30 rounded-full overflow-hidden pointer-events-none z-0">
                  <div 
                    className="h-full bg-white group-hover/progress:bg-white relative rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div 
                   className="absolute h-3 w-3 bg-white rounded-full z-10 pointer-events-none shadow-md group-hover/progress:scale-110 transition-transform"
                   style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
              <span className="text-white text-xs font-medium w-9 text-left drop-shadow-md">{formatTime(videoDuration)}</span>
            </div>
          </div>
        )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
