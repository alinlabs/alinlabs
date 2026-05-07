import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';

const images = [
  '/gambar/welcome-popup1.webp',
  '/gambar/welcome-popup2.webp',
  '/gambar/welcome-popup3.webp',
];

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [greeting, setGreeting] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    // Check if popup has already been shown recently
    const lastShown = localStorage.getItem('popupLastShown');
    const hasVisited = localStorage.getItem('hasVisitedEver');
  
    setGreeting(hasVisited ? "Selamat Datang Kembali" : "Selamat Datang");

    // Only show if it hasn't been shown in the last 12 hours
    const TIME_LIMIT = 12 * 60 * 60 * 1000; 
    const now = new Date().getTime();
    
    if (!lastShown || now - parseInt(lastShown, 10) > TIME_LIMIT) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('popupLastShown', now.toString());
        localStorage.setItem('hasVisitedEver', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
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

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.clientWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePopup}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
          />
          
          {/* Greeting Text */}
          <motion.h2 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.1 }}
            className="relative z-10 text-white text-3xl font-extrabold mb-6 text-center tracking-wide drop-shadow-md"
          >
            {greeting}
          </motion.h2>

          {/* Popup Container (4:5 Aspect Ratio) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.8 }}
            className="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Slider */}
            <div 
              ref={scrollContainerRef}
              className="relative flex-grow w-full h-full flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onScroll={(e) => {
                const index = Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth);
                setCurrentIndex(index);
              }}
            >
              {images.map((src, index) => (
                <img loading="lazy"
                  key={index}
                  src={src}
                  alt={`Popup ${index + 1}`}
                  className="flex-none w-full h-full object-cover snap-center"
                />
              ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Install App Button */}
          {isInstallable && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 mt-6"
            >
              <button
                onClick={handleInstallClick}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Install AlinLabs App
              </button>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

