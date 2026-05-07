
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, Globe, LayoutTemplate, Video, Megaphone, AlertCircle, Share2 } from 'lucide-react';

interface PreviewProps {
  url: string;
  title: string;
  category: 'Ekosistem Web' | 'Agensi Kreatif' | 'Pemasaran Digital' | string;
  onClose: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ url, title, category, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Helper to determine icon based on category
  const getIcon = () => {
    switch(category) {
        case 'Ekosistem Web': return <LayoutTemplate className="w-5 h-5 text-sky-500" />;
        case 'Agensi Kreatif': return <Video className="w-5 h-5 text-amber-500" />;
        case 'Pemasaran Digital': return <Megaphone className="w-5 h-5 text-purple-500" />;
        default: return <Globe className="w-5 h-5 text-slate-500" />;
    }
  };

  // Helper to transform URL for embedding (specifically for YouTube)
  const getEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return '';
    
    // Regex for YouTube Video ID (supports youtu.be, youtube.com/watch, embed, etc.)
    const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = rawUrl.match(youtubeRegex);

    if (match && match[2].length === 11) {
        const videoId = match[2];
        let siParam = '';

        try {
            // Attempt to extract 'si' parameter if present (as requested in the prompt)
            const urlObj = new URL(rawUrl);
            const si = urlObj.searchParams.get('si');
            if (si) {
                siParam = `&si=${si}`;
            }
        } catch (e) {
            // Ignore URL parsing errors
        }

        // Using youtube-nocookie for privacy and standardized embedding
        return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1${siParam}`;
    }
    
    return rawUrl;
  };

  const embedSrc = getEmbedUrl(url);
  const isYouTube = embedSrc.includes('youtube') || embedSrc.includes('youtu.be');

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal / Bottom Sheet */}
      <motion.div 
        initial={{ y: '100%', scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: '100%', scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full md:w-[90vw] md:max-w-7xl h-[90vh] md:h-[90vh] bg-slate-900 md:rounded-2xl rounded-t-3xl overflow-hidden flex flex-col shadow-2xl z-10"
      >
        {/* Mobile drag indicator */}
        <div className="absolute top-0 inset-x-0 w-full flex justify-center z-[9999] md:hidden pt-3 pb-3" onClick={onClose}>
            <div className="w-12 h-1.5 bg-slate-400 rounded-full shadow-sm"></div>
        </div>

        {/* Floating Top Right Controls */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 z-[9999] flex items-center gap-2 pointer-events-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(url);
              alert('Link berhasil disalin: ' + url);
            }}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white hover:bg-slate-900/60 transition-colors shadow-2xl"
            title="Salin Link Website"
          >
            <Share2 className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white hover:bg-slate-900/60 transition-colors shadow-2xl"
            title="Tutup Preview"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-slate-100 overflow-hidden rounded-t-3xl md:rounded-2xl">
         {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-0">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-medium animate-pulse">Memuat Preview...</p>
            </div>
         )}
         
         <iframe loading="lazy" 
            src={embedSrc} 
            className={`w-full h-full border-0 relative z-10 ${isYouTube ? 'bg-black' : 'bg-white'}`}
            onLoad={() => setIsLoading(false)}
            title={isYouTube ? "YouTube video player" : `Preview of ${title}`}
            frameBorder="0"
            allow={isYouTube 
                ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            }
            referrerPolicy={isYouTube ? "strict-origin-when-cross-origin" : "no-referrer"}
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
         />
      </div>
      </motion.div>
    </div>
  );
};
