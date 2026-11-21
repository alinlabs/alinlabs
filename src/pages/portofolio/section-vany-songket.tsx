import React, { useState } from 'react';
import { Instagram, Play, Share2, Check } from 'lucide-react';
import { VideoPopup } from '../../components/ui/video-popup';
import { InViewVideo } from '../../components/ui/in-view-video';
import { ExpandableText } from '../../components/ui/expandable-text';
import { useShareableMedia } from '../../hooks/use-shareable-media';
import { SafeImage } from '../../components/ui/safe-image';

export const SectionVanySongket: React.FC = () => {
  const videos = [1, 2, 3, 4, 5, 6];
  const videoUrls = videos.map(i => `https://github.com/alinlabs/alinlabs-data/raw/main/video/vany-group/${i}.mp4`);
  const [copied, setCopied] = useState(false);

  const { popupOpen, initialMediaIndex: initialVideoIndex, handleOpenPopup, handleClosePopup, handleMediaChange } = useShareableMedia('vanysongket', videos.length);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=vanysongket#vanysongket`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="vanysongket" className="w-full min-w-full snap-start bg-slate-50 pt-6 pb-8 md:py-12 border-t border-slate-100 flex items-start md:items-center relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-6 lg:gap-8 items-center">
          
          {/* Top: Text & Info */}
          <div className="w-full flex flex-col items-start w-full">
            <div className="flex flex-row items-center justify-between gap-3 mb-4 md:mb-6 w-full">
              <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-slate-200 bg-white p-1.5 md:p-2 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <SafeImage src="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/vanysongket.png" alt="Vany Songket" fallbackText="VS" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex flex-col items-start gap-0.5 sm:gap-1 justify-center">
                  <div className="bg-stone-200 text-stone-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest max-w-fit flex items-center gap-1">
                    <Instagram className="w-3 h-3" /> <span className="hidden sm:inline">Personal Branding</span><span className="sm:hidden">Branding</span>
                  </div>
                  <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight">
                    Vany Songket Galeri
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Bagikan Link Vany Songket"
                className="p-1.5 sm:p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-stone-600 transition-colors shrink-0"
                title={copied ? "Link Disalin" : "Bagikan Link"}
              >
                {copied ? <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" /> : <Share2 className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
            <ExpandableText bgClass="bg-slate-50" text="Sinergi antara personal branding kuat dari owner serta desain visual promosi yang memikat untuk mengangkat nilai estetika warisan budaya songket." className="mb-4 sm:mb-6 max-w-2xl mx-0" />
          </div>

          {/* Bottom: Video Showcase */}
          <div className="w-full flex flex-col items-center mt-2 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 w-full justify-start pb-4 pt-0">
               {videos.map((i, index) => {
                  return (
                  <button
                    type="button"
                    key={i} 
                    aria-label={`Putar video Vany Songket ${index + 1}`}
                    className="w-full aspect-[3/4] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-slate-200 relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 block text-left"
                    onClick={() => handleOpenPopup(index)}
                  >
                     <InViewVideo 
                       src={`https://github.com/alinlabs/alinlabs-data/raw/main/video/vany-group/${i}.mp4`}
                       alt={`Thumbnail video Vany Songket ${index + 1}`}
                       className="w-full h-full object-cover bg-slate-200"
                     />
                     <div className="absolute inset-0 z-10 bg-black/15 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
                     <div className="absolute inset-0 z-20 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 pointer-events-none">
                       <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30 text-white">
                         <Play className="w-4 h-4 ml-0.5 fill-current" />
                       </div>
                     </div>
                  </button>
               )})}
            </div>
            
          </div>

        </div>
      </div>

      <VideoPopup 
        videos={videoUrls}
        initialIndex={initialVideoIndex}
        isOpen={popupOpen}
        onClose={handleClosePopup}
        onMediaChange={handleMediaChange}
        clientLogo="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/vanysongket.png"
        clientName="Vany Songket"
      />
    </div>
  );
};
