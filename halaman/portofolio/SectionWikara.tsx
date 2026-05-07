import React, { useState, useEffect } from 'react';
import { Layout, Play, Share2 } from 'lucide-react';
import { VideoPopup } from '../../components/ui/VideoPopup';
import { InViewVideo } from '../../components/ui/InViewVideo';
import { ExpandableText } from '../../components/ui/ExpandableText';
import { useShareableMedia } from '../../utils/useShareableMedia';

export const SectionWikara: React.FC = () => {
  const mediaVideos = [1, 2, 3, 4, 5].map(i => `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${i}.mp4`);
  const mediaImages = ['5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpeg'].map(f => `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${f}`);
  const allMedia = [...mediaVideos, ...mediaImages];

  const { popupOpen, initialMediaIndex: initialVideoIndex, handleOpenPopup, handleClosePopup, handleMediaChange } = useShareableMedia('stie-wikara', allMedia.length);
  const [wikaraGroup1Index, setWikaraGroup1Index] = useState(0);
  const [wikaraGroup2Index, setWikaraGroup2Index] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWikaraGroup1Index((prev) => (prev + 1) % 2);
      setWikaraGroup2Index((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleShareWikara = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=stie-wikara#stie-wikara`;
    navigator.clipboard.writeText(url);
    alert('Link disalin: ' + url);
  };

  return (
    <>
      <div id="stie-wikara" className="w-full min-w-full snap-start bg-slate-50 pt-6 pb-8 md:py-12 border-t border-slate-100 flex items-start md:items-center justify-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
          <div className="w-full flex flex-col items-start w-full">
            <div className="flex flex-row items-center justify-between gap-3 mb-4 md:mb-6 w-full">
              <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-slate-200 bg-white p-1.5 md:p-2 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                    <img loading="lazy" src="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/stiewikara.png" alt="STIE Wikara" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex flex-col items-start gap-0.5 sm:gap-1 justify-center">
                  <div className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest max-w-fit flex items-center gap-1">
                    <Layout className="w-3 h-3" /> <span className="hidden sm:inline">Website & Aplikasi</span><span className="sm:hidden">Web & App</span>
                  </div>
                  <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                    STIE Wikara
                  </h2>
                </div>
              </div>
              <button onClick={handleShareWikara} className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0" title="Bagikan Link">
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
            <ExpandableText bgClass="bg-slate-50" text="Pengembangan sistem informasi akademik dan website profil kampus modern yang responsif, memudahkan layanan akademik terpadu." className="mb-6 max-w-2xl mx-0" />
          </div>

          {/* 4 Cards Grid - Desktop */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full mb-6">
            {[1, 2, 3, 4].map((i, index) => {
              const tilts = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3'];
              const translates = ['translate-y-0', 'translate-y-4', '-translate-y-4', 'translate-y-0'];
              return (
                <div key={`desktop-card-${i}`} className={`bg-slate-100 rounded-xl overflow-hidden group aspect-[3/4] shadow-md border-4 border-white transform ${tilts[index]} ${translates[index]} transition-all duration-300 hover:rotate-0 hover:z-10 hover:scale-105 hover:shadow-xl`}>
                  <img loading="lazy" src={`https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${i}.png`} alt={`Design ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              );
            })}
          </div>

          {/* 4 Cards Grid - Mobile */}
          <div className="grid md:hidden grid-cols-2 gap-4 w-full mt-4 mb-8">
            {Array.from({length: 2}).map((_, offset) => {
              const startIdx = wikaraGroup1Index * 2;
              const globalIndex = startIdx + offset;
              const i = [1, 2, 3, 4][globalIndex];
              const tilts = ['-rotate-3', 'rotate-2', '-rotate-2', 'rotate-3'];
              const translates = ['-translate-y-2', 'translate-y-2', '-translate-y-2', 'translate-y-2'];
              return (
                <div key={`mobile-card-${wikaraGroup1Index}-${offset}`} className={`bg-slate-100 rounded-xl overflow-hidden group aspect-[3/4] shadow-md border-4 border-white transform ${tilts[globalIndex]} ${translates[globalIndex]} transition-all duration-300 animate-in fade-in zoom-in-95 duration-500`}>
                  <img loading="lazy" src={`https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${i}.png`} alt={`Design ${i}`} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>

          {/* 5 Video Cards - Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 w-full pb-4 pt-2">
             {[1, 2, 3, 4, 5].map((i, index) => {
                const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];
                const translates = ['translate-y-1', '-translate-y-1', 'translate-y-2', '-translate-y-2', 'translate-y-1'];
                return (
                <div 
                  key={`vid-${i}`} 
                  className={`w-full aspect-[3/4] bg-slate-200 rounded-xl sm:rounded-2xl overflow-hidden group shadow-md border-2 sm:border-4 border-white relative cursor-pointer transform transition-all duration-300 hover:rotate-0 hover:scale-105 hover:z-10 hover:shadow-xl ${tilts[index]} ${translates[index]} ${index === 4 ? 'hidden lg:block' : ''}`}
                  onClick={() => handleOpenPopup(index)}
                >
                   <InViewVideo 
                     src={`https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${i}.mp4`}
                     className="w-full h-full object-cover cursor-pointer bg-slate-200"
                     muted
                     playsInline
                     loop
                   />
                   <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
                   <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 pointer-events-none">
                     <div className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 text-white">
                       <Play className="w-5 h-5 ml-1" />
                     </div>
                   </div>
                </div>
             )})}
          </div>

          {/* 7 Image Cards - Desktop */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-3 w-full pb-4 pt-2">
             {mediaImages.map((src, j) => {
                return (
                <div 
                  key={`desktop-img-${j}`} 
                  className="w-full aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden group shadow-md border-2 border-white relative cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl"
                  onClick={() => handleOpenPopup(mediaVideos.length + j)}
                >
                   <img loading="lazy" src={src} alt={`Design ${j}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
             )})}
          </div>

          {/* 7 Image Cards - Mobile */}
          <div className="grid md:hidden grid-cols-3 gap-2 w-full pb-4 pt-2">
             {Array.from({length: 3}).map((_, offset) => {
                 const startIdx = wikaraGroup2Index * 3;
                 const fileIndex = (startIdx + offset) % mediaImages.length;
                 const src = mediaImages[fileIndex];
                 return (
                    <div 
                      key={`mobile-img-${wikaraGroup2Index}-${offset}`} 
                      className="w-full aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden group shadow-md border-2 border-white relative cursor-pointer transition-all duration-300 animate-in fade-in zoom-in-95 duration-500"
                      onClick={() => handleOpenPopup(mediaVideos.length + fileIndex)}
                    >
                       <img loading="lazy" src={src} alt={`Design ${fileIndex}`} className="w-full h-full object-cover" />
                    </div>
                 );
             })}
          </div>

        </div>
      </div>

      <VideoPopup 
        videos={allMedia}
        initialIndex={initialVideoIndex}
        isOpen={popupOpen}
        onClose={handleClosePopup}
        onMediaChange={handleMediaChange}
        clientLogo="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/stiewikara.png"
        clientName="STIE Wikara"
      />
    </>
  );
};
