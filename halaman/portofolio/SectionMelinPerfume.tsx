import React, { useState, useEffect } from 'react';
import { ArrowRight, Image as ImageIcon, Share2 } from 'lucide-react';
import { ExpandableText } from '../../components/ui/ExpandableText';
import { useShareableMedia } from '../../utils/useShareableMedia';
import { VideoPopup } from '../../components/ui/VideoPopup';

export const SectionMelinPerfume: React.FC = () => {
  const [showSecondSet, setShowSecondSet] = useState(false);
  const allMedia = Array.from({length: 18}, (_, i) => `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/melin-parfum/${i + 1}.webp`);
  const { popupOpen, initialMediaIndex, handleOpenPopup, handleClosePopup, handleMediaChange } = useShareableMedia('melin', allMedia.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSecondSet(prev => !prev);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const getImageId = (baseId: number) => showSecondSet ? baseId + 9 : baseId;

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=melin#melin`;
    navigator.clipboard.writeText(url);
    alert('Link disalin: ' + url);
  };

  return (
    <div id="melin" className="w-full min-w-full snap-start bg-slate-50 pt-6 pb-8 md:py-12 border-t border-slate-100 flex items-start md:items-center justify-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="w-full flex flex-col items-start w-full">
          <div className="flex flex-row items-center justify-between gap-3 mb-4 md:mb-6 w-full">
            <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-slate-200 bg-white p-1.5 md:p-2 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                  <img loading="lazy" src="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/melin-parfum.png" alt="Melin Perfume" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex flex-col items-start gap-0.5 sm:gap-1 justify-center">
                <div className="bg-pink-100 text-pink-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest max-w-fit flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> <span className="hidden sm:inline">Promosi Design</span><span className="sm:hidden">Promosi</span>
                </div>
                <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  Melin Perfume
                </h2>
              </div>
            </div>
            <button onClick={handleShare} className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0" title="Bagikan Link">
              <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          <ExpandableText bgClass="bg-slate-50" text="Koleksi desain promosi kreatif yang dirancang untuk menarik audiens, meningkatkan engagement, dan membangun identitas visual yang elegan dan memikat." className="mb-4 sm:mb-6 max-w-2xl mx-0" />
        </div>
        
        {/* 9 Images Grid - Three Columns on Desktop - Flips every 7s */}
        <div className="w-full mb-6 relative">
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {/* Column 1 */}
            <div className="grid grid-cols-2 gap-3 content-start">
              {[1, 5, 6].map((baseId, index) => (
                <div 
                  key={baseId} 
                  className={`bg-pink-100 rounded-xl overflow-hidden group cursor-pointer ${index % 3 === 0 ? 'col-span-2 aspect-square' : 'col-span-1 aspect-square'}`}
                  onClick={() => handleOpenPopup(getImageId(baseId) - 1)}
                >
                  <img 
                    key={getImageId(baseId)}
                    src={`https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/melin-parfum/${getImageId(baseId)}.webp`} 
                    alt={`Design ${getImageId(baseId)}`} 
                    loading="lazy"
                    className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000 group-hover:scale-110 transition-transform" 
                  />
                </div>
              ))}
            </div>
            {/* Column 2 */}
            <div className="grid grid-cols-2 gap-3 content-start">
              {[2, 3, 7].map((baseId, index) => (
                <div 
                  key={baseId} 
                  className={`bg-pink-100 rounded-xl overflow-hidden group cursor-pointer ${index % 3 === 2 ? 'col-span-2 aspect-square' : 'col-span-1 aspect-square'}`}
                  onClick={() => handleOpenPopup(getImageId(baseId) - 1)}
                >
                  <img 
                    key={getImageId(baseId)}
                    src={`https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/melin-parfum/${getImageId(baseId)}.webp`} 
                    alt={`Design ${getImageId(baseId)}`} 
                    loading="lazy"
                    className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000 group-hover:scale-110 transition-transform" 
                  />
                </div>
              ))}
            </div>
            {/* Column 3 */}
            <div className="grid grid-cols-2 gap-3 content-start">
              {[4, 8, 9].map((baseId, index) => (
                <div 
                  key={baseId} 
                  className={`bg-pink-100 rounded-xl overflow-hidden group cursor-pointer ${index % 3 === 0 ? 'col-span-2 aspect-square' : 'col-span-1 aspect-square'}`}
                  onClick={() => handleOpenPopup(getImageId(baseId) - 1)}
                >
                  <img 
                    key={getImageId(baseId)}
                    src={`https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/melin-parfum/${getImageId(baseId)}.webp`} 
                    alt={`Design ${getImageId(baseId)}`} 
                    loading="lazy"
                    className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000 group-hover:scale-110 transition-transform" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid md:hidden grid-cols-3 gap-2 w-full">
            {Array.from({length: 18}, (_, i) => i + 1).map((id) => (
              <div 
                key={id} 
                className="bg-pink-100 rounded-lg sm:rounded-xl overflow-hidden group aspect-square cursor-pointer"
                onClick={() => handleOpenPopup(id - 1)}
              >
                <img 
                  src={`https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/melin-parfum/${id}.webp`}
                  alt={`Design ${id}`} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <VideoPopup 
        videos={allMedia}
        initialIndex={initialMediaIndex}
        isOpen={popupOpen}
        onClose={handleClosePopup}
        onMediaChange={handleMediaChange}
        clientLogo="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/melin-parfum.png"
        clientName="Melin Perfume"
      />
    </div>
  );
};
