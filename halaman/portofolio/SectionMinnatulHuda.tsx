import React from 'react';
import { ArrowRight, MonitorSmartphone, Video, Share2 } from 'lucide-react';
import { ExpandableText } from '../../components/ui/ExpandableText';

export const SectionMinnatulHuda: React.FC = () => {

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=minnatulhuda#minnatulhuda`;
    navigator.clipboard.writeText(url);
    alert('Link disalin: ' + url);
  };

  return (
    <div id="minnatulhuda" className="w-full min-w-full snap-start bg-slate-50 pt-6 pb-8 md:py-12 border-t border-slate-100 flex items-start md:items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center lg:items-start">
          
          {/* Left: Text & Video */}
          <div className="w-full flex-1 flex flex-col items-start z-40">
            <div className="flex flex-row items-center justify-between gap-3 mb-4 md:mb-6 w-full">
              <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-slate-200 bg-white p-2 shrink-0 flex items-center justify-center">
                  <img loading="lazy" 
                    src="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/minnatulhuda.png" 
                    alt="Minnatul Huda" 
                    className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col items-start gap-0.5 sm:gap-1 justify-center">
                  <div className="bg-emerald-100 text-emerald-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest max-w-fit flex items-center gap-1">
                    <Video className="w-3 h-3" /> <span className="hidden sm:inline">Video Profil</span><span className="sm:hidden">Video</span>
                  </div>
                  <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                    Minnatul Huda
                  </h2>
                </div>
              </div>
              <button onClick={handleShare} className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0" title="Bagikan Link">
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
            
            <ExpandableText 
              bgClass="bg-slate-50"
              text="Transformasi digital menyeluruh melalui pembuatan video profil yang sinematik, serta pengembangan website dan aplikasi mobile custom untuk mempermudah sistem administrasi dan informasi pesantren agar lebih modern dan terstruktur." 
              className="mb-4 sm:mb-6 max-w-3xl mx-0"
            />

            {/* Video Profil (Below Description) */}
            <div className="w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-lg border border-slate-200 group relative">
               <iframe 
                 src="https://drive.google.com/file/d/1OwUpgBu95Pt0bRPlmlLEUnBV21uHKDyg/preview" 
                 title="Video Profil Minnatul Huda"
                 className="w-full h-full" 
                 frameBorder="0"
                 allow="autoplay"
                 allowFullScreen
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-transparent pointer-events-none border border-black/5 rounded-2xl"></div>
            </div>

          </div>

          {/* Right: Mockups */}
          <div className="flex-1 w-full flex flex-col items-center justify-center mt-10 lg:mt-0 gap-4 sm:gap-6">
            
            {/* Laptop Mockup (Desktop Web) */}
            <a href="https://minnatulhuda.com" target="_blank" rel="noopener noreferrer" className="w-[95%] sm:w-[90%] max-w-[480px] aspect-[16/9] bg-slate-800 rounded-t-xl rounded-b-md shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-10 p-1.5 sm:p-2 relative shrink-0 block group cursor-pointer">
               <div className="absolute inset-x-1.5 bottom-1.5 top-1.5 sm:inset-x-2 sm:bottom-2 sm:top-2 bg-slate-100 overflow-hidden rounded-sm border border-slate-700">
                  <iframe 
                    src="https://minnatulhuda.com" 
                    title="Minnatul Huda Desktop"
                    className="w-[400%] h-[400%] absolute top-0 left-0 origin-top-left pointer-events-none border-none bg-[#FAFAFA]"
                    style={{ transform: 'scale(0.25)' }}
                    loading="lazy"
                    scrolling="no"
                  />
                  <div className="absolute inset-0 z-10 bg-transparent"></div>
               </div>
               {/* Laptop Base Stand */}
               <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[115%] h-3 bg-slate-300 rounded-b-xl shadow-md border-t border-slate-400 flex justify-center">
                  <div className="w-1/4 h-1 bg-slate-400 rounded-b-md mt-0.5"></div>
               </div>
            </a>

            {/* Tablet & Mobile */}
            <div className="flex flex-row items-center justify-between mt-2 sm:mt-4 w-[90%] sm:w-[85%] max-w-[400px]">
               {/* Tablet Mockup (Tablet Web) */}
               <a href="https://minnatulhuda.com" target="_blank" rel="noopener noreferrer" className="w-[59%] aspect-[3/4] bg-slate-800 rounded-lg sm:rounded-xl p-1.5 sm:p-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-20 border-[2px] sm:border-[3px] border-slate-700 relative shrink-0 block group cursor-pointer">
                  <div className="w-full h-full bg-white rounded-sm sm:rounded-md overflow-hidden relative">
                     <iframe 
                       src="https://minnatulhuda.com" 
                       title="Minnatul Huda Tablet"
                       className="w-[400%] h-[400%] absolute top-0 left-0 origin-top-left pointer-events-none border-none bg-[#F8FAFC]"
                       style={{ transform: 'scale(0.25)' }}
                       loading="lazy"
                       scrolling="no"
                     />
                     <div className="absolute inset-0 z-10 bg-transparent"></div>
                  </div>
               </a>

               {/* Smartphone Mockup (Mobile App/Web) */}
               <a href="https://minnatulhuda.com" target="_blank" rel="noopener noreferrer" className="w-[37.5%] aspect-[9/19] bg-slate-900 rounded-[1.25rem] sm:rounded-[1.75rem] p-1.5 sm:p-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)] z-30 border-[2px] sm:border-[3px] border-slate-700 relative shrink-0 block group cursor-pointer">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 sm:h-1.5 bg-slate-800 rounded-full z-20"></div>
                  <div className="w-full h-full bg-white rounded-[1rem] sm:rounded-[1.35rem] overflow-hidden relative pb-1">
                     <iframe 
                       src="https://minnatulhuda.com" 
                       title="Minnatul Huda Mobile"
                       className="w-[300%] h-[300%] absolute top-0 left-0 origin-top-left pointer-events-none border-none bg-[#FFFFFF]"
                       style={{ transform: 'scale(0.333333)' }}
                       loading="lazy"
                       scrolling="no"
                     />
                     <div className="absolute inset-0 z-10 bg-transparent"></div>
                  </div>
                  <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-0.5 sm:h-1 bg-slate-800 rounded-full z-20"></div>
               </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

