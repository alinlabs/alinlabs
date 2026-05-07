
import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../../types';
import { ArrowRight, Star, Clock, Globe, Smartphone, Share2, Megaphone } from 'lucide-react';
import { DynamicIcon } from '../../utils/DynamicIcon';
import { UniversalLottie } from '../../components/ui/UniversalLottie';

interface ServiceItem {
    id: string;
    nama: string;
    kategori: string;
    deskripsi: string;
    ikon: string;
    targetView: string;
    isCenter?: boolean;
    techLogos: string[];
}

interface Platform {
    nama: string;
    logo: string;
}

interface FeaturedServicesProps {
  onNavigate: (view: ViewState) => void;
  onPackageSelect?: (id: string) => void;
  data: {
      gambarDesktop: string;
      urlLottie?: string;
      items: ServiceItem[];
      platforms: Platform[];
  }
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({ onNavigate, onPackageSelect, data }) => {
  // --- STATE FOR SLIDER ---
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = useState(false);

  // --- STATE FOR COUNTDOWN ---
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now.getTime();
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      setTimeLeft(midnight.getTime() - now.getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Map string targetView to ViewState enum
  const getViewState = (viewStr: string): ViewState => {
      // @ts-ignore
      return ViewState[viewStr] || ViewState.PRODUCTS;
  };

  // --- AUTO PLAY LOGIC ---
  useEffect(() => {
      if (!data) return;
      // Don't auto scroll if user is touching/interacting
      if (isTouched) return;

      const interval = setInterval(() => {
          if (scrollContainerRef.current) {
              // Calculate roughly one card width (80vw + gap) or just use clientWidth for full page
              const nextIndex = activeIndex + 1;
              
              if (nextIndex >= data.items.length) {
                  // Loop back to start
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  setActiveIndex(0);
              } else {
                  // Scroll to next card
                  const card = scrollContainerRef.current.children[0] as HTMLElement;
                  if (card) {
                      const cardWidth = card.offsetWidth;
                      // Add a bit for gap (approx 16px/1rem)
                      const scrollPos = nextIndex * (cardWidth + 16); 
                      scrollContainerRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
                      setActiveIndex(nextIndex);
                  }
              }
          }
      }, 4000); // 4 Seconds per slide

      return () => clearInterval(interval);
  }, [activeIndex, isTouched, data?.items?.length]);

  if (!data) return null;

  // --- HANDLE MANUAL SCROLL UPDATE ---
  const handleScroll = () => {
      if (scrollContainerRef.current) {
          const { scrollLeft, clientWidth } = scrollContainerRef.current;
          const center = scrollLeft + (clientWidth / 2);
          const children = Array.from(scrollContainerRef.current.children) as HTMLElement[];
          let closestIndex = 0;
          let minDistance = Number.MAX_VALUE;

          children.forEach((child, index) => {
              const childCenter = child.offsetLeft + (child.offsetWidth / 2);
              const distance = Math.abs(center - childCenter);
              if (distance < minDistance) {
                  minDistance = distance;
                  closestIndex = index;
              }
          });

          if (closestIndex !== activeIndex) {
              setActiveIndex(closestIndex);
          }
      }
  };

  // --- SHARED CARD COMPONENT (RENDERER) ---
  const renderCard = (service: ServiceItem, isMobile: boolean, index: number) => {
      // FIX: Strictly use service.isCenter for styling logic on BOTH mobile and desktop.
      const isHighlighted = service.isCenter;
      
      const iconBgColor = isHighlighted ? 'bg-white/10' : 'bg-blue-50';
      const iconColor = isHighlighted ? 'text-white' : 'text-[#2563EB]';

      const cardBaseClass = isHighlighted 
          ? 'bg-[#1056D3] text-white shadow-xl shadow-[#1056D3]/30' 
          : 'bg-white text-slate-800 shadow-sm border border-slate-100';
      
      const mobileScaleClass = isMobile 
        ? 'opacity-100 transition-all duration-300' 
        : (isHighlighted ? 'scale-105 z-10 -my-4' : 'hover:-translate-y-1 hover:shadow-md');

      const textMutedClass = isHighlighted ? 'text-blue-50/90' : 'text-slate-500 hover:text-slate-600';
      const buttonTextClass = isHighlighted ? 'text-white font-bold' : 'text-slate-800 font-bold';
      const iconBtnClass = isHighlighted ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563EB]';
      const categoryColor = isHighlighted ? 'text-white bg-white/20 border border-white/20' : 'text-[#2563EB] bg-blue-50';

      return (
          <div 
              key={`${service.id}-${index}`}
              className={`group relative rounded-[2rem] p-6 transition-all duration-300 flex flex-col snap-center cursor-pointer
                  ${cardBaseClass} ${mobileScaleClass}
                  ${isMobile ? 'w-[85vw] flex-shrink-0' : ''} h-auto
              `}
              onClick={() => {
                  if (onPackageSelect) {
                      onPackageSelect(service.id);
                  } else {
                      onNavigate(getViewState(service.targetView));
                  }
              }}
          >
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 -translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0">
                  <ArrowRight className={`w-5 h-5 -rotate-45 ${isHighlighted ? 'text-white/70' : 'text-slate-400'}`} />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                        <div className={`flex-shrink-0 w-12 h-12 ${iconBgColor} ${iconColor} rounded-[1rem] flex items-center justify-center`}>
                            <DynamicIcon name={service.ikon} className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col items-start justify-center pt-0.5 gap-1.5">
                            <span className={`px-2 py-0.5 ${categoryColor} text-[10px] sm:text-xs font-black uppercase rounded-full tracking-wider`}>
                                {service.kategori}
                            </span>
                            <h4 className={`text-lg md:text-xl font-extrabold tracking-tight ${isHighlighted ? 'text-white' : 'text-slate-900'} leading-tight`}>
                                {(isMobile && service.nama === 'Manage Konten & Iklan') ? 'Konten & Iklan' : service.nama}
                            </h4>
                        </div>
                    </div>
                    
                    <p className={`mb-6 text-sm leading-relaxed ${textMutedClass} line-clamp-2`}>
                        {service.deskripsi}
                    </p>
                  </div>

                  <div>
                    {/* Tech Logos Row */}
                    <div className="flex gap-2 items-center">
                        {service.techLogos.map((logo, idx) => (
                            <div key={idx} className={`w-10 h-10 rounded-full flex items-center justify-center ${isHighlighted ? 'bg-white/5' : ''}`}>
                                <img loading="lazy" src={logo} alt="Tech" className="w-6 h-6 object-contain" />
                            </div>
                        ))}
                    </div>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <section className="pb-8 md:pb-12 bg-[#f8f9fa] relative overflow-hidden z-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Promo Banner */}
            <div className="mt-4 mb-8 md:mb-10 bg-[#1056D3] rounded-2xl md:rounded-[2rem] p-[2px] shadow-xl shadow-blue-900/10 animate-in fade-in slide-in-from-bottom-8 duration-700 relative group cursor-pointer" onClick={() => window.open('https://api.whatsapp.com/send?phone=6281807000054&text=Halo%20Alinlabs%20Indonesia,%20saya%20tertarik%20dengan%20Promo%20Paket%20Lengkap%20Siap%20Jalur%20Cepat.%20Bisa%20minta%20info%20lebih%20lanjut?', '_blank')}>
                
                {/* Mobile Floating Badge & Countdown */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 md:hidden z-30 flex items-stretch w-max rounded-full overflow-hidden shadow-lg border border-red-500/30">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD412] text-[10px] font-extrabold uppercase tracking-widest text-slate-900 whitespace-nowrap">
                        <Star className="w-3 h-3 fill-slate-900" />
                        <span>Terbatas</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#e11d48] px-3 py-1.5 text-[14px] font-black text-white tracking-widest">
                        <span>{String(hours).padStart(2, '0')}</span>
                        <span className="animate-pulse text-white/70 leading-[1] pb-0.5">:</span>
                        <span>{String(minutes).padStart(2, '0')}</span>
                        <span className="animate-pulse text-white/70 leading-[1] pb-0.5">:</span>
                        <span>{String(seconds).padStart(2, '0')}</span>
                    </div>
                </div>

                <div className="relative bg-transparent rounded-[1.4rem] md:rounded-[1.9rem] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 h-full overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#FFD412] rounded-full filter blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400 rounded-full filter blur-[100px] opacity-20" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
                    
                    {/* Shine effect */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-[shine_1.5s] pointer-events-none" />

                    <div className="relative z-10 w-full lg:w-auto text-center lg:text-left flex-1 mt-4 md:mt-0">
                        {/* Desktop Badge */}
                        <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFD412] rounded-full mb-4 text-xs font-bold uppercase tracking-widest text-slate-900 shadow-md whitespace-nowrap">
                            <Star className="w-4 h-4 fill-slate-900" />
                            <span>Penawaran Terbatas</span>
                        </div>
                        <h3 className="text-3xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 leading-tight text-white drop-shadow-md">
                            Paket Lengkap Siap Jalur Cepat!
                        </h3>
                        <div className="text-blue-100 font-medium text-sm md:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 md:gap-x-2 gap-y-2 md:gap-y-1">
                            <div className="flex items-center gap-1.5" title="Website"><Globe className="w-7 h-7 md:w-5 md:h-5 text-[#FFD412]" /> <span className="hidden md:inline">Website</span></div>
                            <span className="text-white font-bold text-xl md:text-base">+</span>
                            <div className="flex items-center gap-1.5" title="Aplikasi"><Smartphone className="w-7 h-7 md:w-5 md:h-5 text-[#FFD412]" /> <span className="hidden md:inline">Aplikasi</span></div>
                            <span className="text-white font-bold text-xl md:text-base">+</span>
                            <div className="flex items-center gap-1.5" title="Manajemen Sosial Media"><Share2 className="w-7 h-7 md:w-5 md:h-5 text-[#FFD412]" /> <span className="hidden md:inline">Manajemen Sosial Media</span></div>
                            <span className="text-white font-bold text-xl md:text-base">+</span>
                            <div className="flex items-center gap-1.5" title="Iklan"><Megaphone className="w-7 h-7 md:w-5 md:h-5 text-[#FFD412]" /> <span className="hidden md:inline">Iklan</span></div>
                            <span className="w-full mt-1 md:mt-1">Promo kilat untuk brand yang ingin langsung melejit.</span>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 md:gap-4 items-center md:items-end flex-shrink-0 mt-1 md:mt-0 w-full md:w-auto">
                        <div className="hidden md:flex gap-2 sm:gap-3 text-center text-3xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter shrink-0 w-full sm:w-auto justify-center items-center">
                            <div className="flex flex-col items-center justify-center bg-[#FFD412] text-blue-950 rounded-xl px-2 py-2 sm:py-2.5 min-w-[3.5rem] sm:min-w-[4.5rem] shadow-lg">
                               <span className="leading-none mb-0.5">{String(hours).padStart(2, '0')}</span>
                               <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-blue-900/70">Jam</span>
                            </div>
                            <span className="text-white/50 animate-pulse -translate-y-2 -mx-1">:</span>
                            <div className="flex flex-col items-center justify-center bg-[#FFD412] text-blue-950 rounded-xl px-2 py-2 sm:py-2.5 min-w-[3.5rem] sm:min-w-[4.5rem] shadow-lg">
                               <span className="leading-none mb-0.5">{String(minutes).padStart(2, '0')}</span>
                               <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-blue-900/70">Menit</span>
                            </div>
                            <span className="text-white/50 animate-pulse -translate-y-2 -mx-1">:</span>
                            <div className="flex flex-col items-center justify-center bg-[#FFD412] text-blue-950 rounded-xl px-2 py-2 sm:py-2.5 min-w-[3.5rem] sm:min-w-[4.5rem] shadow-lg">
                               <span className="leading-none mb-0.5">{String(seconds).padStart(2, '0')}</span>
                               <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-blue-900/70">Detik</span>
                            </div>
                        </div>

                        <div className="text-center md:text-right bg-[#FFD412] md:bg-transparent rounded-2xl md:rounded-none px-5 py-3 md:p-0 w-full md:w-auto shadow-lg md:shadow-none border border-[#FFD412]/50 md:border-none">
                            <div className="text-slate-800 md:text-white/70 text-sm md:text-base font-bold md:font-medium mb-0 md:mb-1">Biaya Hanya <span className="line-through opacity-70 md:opacity-100">Rp 3.500.000</span></div>
                            <div className="text-3xl md:text-4xl font-black text-slate-900 md:text-[#FFD412] drop-shadow-sm md:drop-shadow-md">Rp 1.499.000</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DESKTOP GRID VIEW (Hidden on Mobile) --- */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 px-4 md:px-0 items-start">
                {data.items.map((service, index) => renderCard(service, false, index))}
            </div>

            {/* --- MOBILE NATIVE SLIDER (Visible on Mobile Only) --- */}
            <div 
                ref={scrollContainerRef}
                className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-10 scrollbar-hide items-start" 
                style={{ scrollBehavior: 'smooth' }}
                onScroll={handleScroll}
                onTouchStart={() => setIsTouched(true)}
                onTouchEnd={() => setIsTouched(false)}
            >
                {data.items.map((service, index) => renderCard(service, true, index))}
                
                {/* Spacer at the end */}
                <div className="min-w-[4vw] snap-align-none"></div>
            </div>

            {/* Mobile Indicators */}
            <div className="flex justify-center gap-2 mt-0 md:hidden">
                {data.items.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            activeIndex === idx 
                                ? 'w-6 bg-[#2563EB]' 
                                : 'w-1.5 bg-slate-300'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    </section>
  );
};
