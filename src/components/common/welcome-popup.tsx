import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Download } from 'lucide-react';
import { Modal } from '../ui/modal';
import { SafeImage } from '../ui/safe-image';

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
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, []);

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
    <Modal
      isOpen={isOpen}
      onClose={closePopup}
      variant="center"
      zIndexClass="z-[9999]"
      wrapperClassName="flex-col"
      backdropClassName="bg-slate-900/80 backdrop-blur-sm"
      panelClassName="relative w-full max-w-[400px] aspect-[4/5] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      ariaLabel={greeting || 'Selamat Datang'}
      beforePanel={
        <motion.h2
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.1 }}
          className="relative z-10 text-white text-3xl font-extrabold mb-6 text-center tracking-wide drop-shadow-md"
        >
          {greeting}
        </motion.h2>
      }
      afterPanel={
        isInstallable ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 mt-6"
          >
            <button
              onClick={handleInstallClick}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Install AlinLabs App
            </button>
          </motion.div>
        ) : null
      }
    >
      {/* Close Button */}
      <button
        onClick={closePopup}
        aria-label="Tutup"
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
          <SafeImage
            loading={index === 0 ? "eager" : "lazy"}
            key={index}
            src={src}
            alt={`Promo AlinLabs ${index + 1}`}
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
    </Modal>
  );
}

