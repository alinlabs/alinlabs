import React from 'react';
import { Image as ImageIcon, Share2 } from 'lucide-react';
import { ExpandableText } from '../../components/ui/ExpandableText';
import { useShareableMedia } from '../../utils/useShareableMedia';
import { VideoPopup } from '../../components/ui/VideoPopup';

export const SectionWorldStreet: React.FC = () => {
  const images = Array.from({length: 10}, (_, i) => `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/worldstreet/${i + 1}.webp`);
  const { popupOpen, initialMediaIndex, handleOpenPopup, handleClosePopup, handleMediaChange } = useShareableMedia('worldstreet', images.length);

  const handleShareWorldStreet = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=worldstreet#worldstreet`;
    navigator.clipboard.writeText(url);
    alert('Link disalin: ' + url);
  };

  return (
    <div id="worldstreet" className="w-full min-w-full snap-start bg-slate-50 pt-6 pb-8 md:py-12 border-t border-slate-100 flex items-start md:items-center justify-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="w-full flex flex-col items-start w-full">
          <div className="flex flex-row items-center justify-between gap-3 mb-4 md:mb-6 w-full">
            <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-slate-200 bg-white p-1.5 md:p-2 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img loading="lazy" src="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/worldstreet.png" alt="World Street" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex flex-col items-start gap-0.5 sm:gap-1 justify-center">
                <div className="bg-amber-100 text-amber-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest max-w-fit flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> <span className="hidden sm:inline">Promosi Design</span><span className="sm:hidden">Promosi</span>
                </div>
                <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  World Street
                </h2>
              </div>
            </div>
            <button onClick={handleShareWorldStreet} className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0" title="Bagikan Link">
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <ExpandableText bgClass="bg-slate-50" text="Eksplorasi gaya jalanan dalam setiap inci kreasi visual, mendukung kampanye agresif dengan desain berani dan menonjol untuk mendominasi pasar streetwear." className="mb-4 sm:mb-6 max-w-2xl mx-0" />
        </div>
        
        {/* 10 Images - Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 w-full mb-4">
          {images.map((src, index) => (
            <div 
              key={index} 
              className={`bg-amber-100 rounded-lg sm:rounded-xl overflow-hidden group aspect-square shadow-sm cursor-pointer ${index === 9 ? 'hidden lg:block' : ''}`}
              onClick={() => handleOpenPopup(index)}
            >
              <img loading="lazy" src={src} alt={`Design ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>

      </div>

      <VideoPopup 
        videos={images}
        initialIndex={initialMediaIndex}
        isOpen={popupOpen}
        onClose={handleClosePopup}
        onMediaChange={handleMediaChange}
        clientLogo="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/worldstreet.png"
        clientName="World Street"
      />
    </div>
  );
};
