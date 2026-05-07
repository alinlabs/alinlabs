import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../../types';
import { Search, ChevronRight } from 'lucide-react';
import { webPortfolios } from '../portofolio/Publik';

interface HeroSlide {
    id: number;
    slogan: string;
    judul: string;
    deskripsi: string;
    gambar: string;
    alt: string;
}

interface Stat {
    label: string;
    nilai: string;
    ikon: string;
}

interface HeroProps {
  onNavigate: (view: ViewState) => void;
  data: {
      backgroundVideo?: string;
      slides: HeroSlide[];
      stats: Stat[];
  };
}

const SEARCH_OPTIONS = [
  { label: 'Layanan Ekosistem Website', target: ViewState.SERVICE_ECOSYSTEM, type: 'Layanan' },
  { label: 'Layanan Iklan Digital', target: ViewState.SERVICE_ADS, type: 'Layanan' },
  { label: 'Layanan Konten & Live', target: ViewState.SERVICE_CINEMA, type: 'Layanan' },
  { label: 'Portofolio', target: ViewState.PORTFOLIO, type: 'Halaman' },
  { label: 'Tentang Kami', target: ViewState.ABOUT, type: 'Halaman' },
  { label: 'Kontak', target: ViewState.CONTACT, type: 'Halaman' }
];

export const Hero: React.FC<HeroProps> = ({ onNavigate, data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const desktopBanners = [
    '/gambar/banner-desktop1.webp',
    '/gambar/banner-desktop2.webp',
    '/gambar/banner-desktop3.webp',
  ];

  const mobileBanners = [
    '/gambar/banner-mobile1.webp',
    '/gambar/banner-mobile2.webp',
    '/gambar/banner-mobile3.webp',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % desktopBanners.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allSearchOptions = [
    ...SEARCH_OPTIONS,
    ...webPortfolios.map(port => ({
       label: port.title,
       target: ViewState.PORTFOLIO,
       type: `Website Portofolio (${port.category})`,
       url: port.url
    }))
  ];

  const filteredOptions = allSearchOptions.filter(opt => 
    opt.label.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if ((searchQuery || '').trim()) {
      if (filteredOptions.length > 0) {
        handleSelectOption(filteredOptions[0]);
      } else {
        onNavigate(ViewState.PRODUCTS);
      }
    }
  };

  const handleSelectOption = (opt: any) => {
    if (opt.url) {
      // It's a website portfolio, redirect via pushState to include query param
      window.history.pushState(null, '', `/portofolio/website?site=${encodeURIComponent(opt.url)}`);
      window.dispatchEvent(new Event('popstate'));
    } else {
      onNavigate(opt.target);
    }
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <section className="relative w-full aspect-[4/3] md:aspect-[21/9] flex flex-col items-center justify-center bg-slate-100 border-b-4 border-slate-200">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
        >
          {desktopBanners.map((_, index) => (
            <div 
              key={`slide-${index}`}
              className="w-full h-full flex-shrink-0 relative"
            >
              {/* Desktop Image */}
              <img 
                src={desktopBanners[index]} 
                alt={`Banner ${index + 1}`}
                className="hidden md:block w-full h-full object-cover object-[center_30%]"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Mobile Image */}
              <img 
                src={mobileBanners[index]} 
                alt={`Banner ${index + 1}`}
                className="block md:hidden w-full h-full object-cover object-[center_30%]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content (Centered Text) - Removed to show only image */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pb-16 pt-8 pointer-events-none">
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-12 md:bottom-16 left-0 right-0 z-30 flex justify-center gap-2 pointer-events-auto">
        {desktopBanners.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm border border-black/10 ${
              index === currentSlideIndex ? 'bg-blue-600 sm:w-8' : 'bg-white/80 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Overlapping Bottom Search Bar */}
      <div className="absolute bottom-0 translate-y-1/2 left-0 w-full px-4 sm:px-6 lg:px-8 z-40 flex justify-center">
        <div ref={searchRef} className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 transition-transform hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] flex flex-col items-center gap-2 relative">
          
          <form onSubmit={handleSearch} className="w-full flex-1 flex items-center">
            <div className="pl-4 sm:pl-6 text-slate-400">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Cari informasi layanan, portofolio, atau kontak..."
              className="flex-1 bg-transparent border-none outline-none px-4 sm:px-5 py-2.5 sm:py-3 text-slate-700 text-sm sm:text-base placeholder:text-slate-400 min-w-0"
            />
            
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:py-3 sm:px-10 rounded-full transition-colors flex-shrink-0 text-sm sm:text-base ml-2 shadow-sm"
            >
              <span className="hidden sm:inline">Cari</span>
              <Search className="w-5 h-5 sm:hidden" />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
               {filteredOptions.length > 0 ? (
                 <ul className="py-2">
                   {filteredOptions.map((opt, i) => (
                     <li key={i}>
                        <button
                          type="button"
                          onClick={() => handleSelectOption(opt)}
                          className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                        >
                            <div className="flex flex-col">
                                <span className="text-slate-800 font-medium">{opt.label}</span>
                                <span className="text-xs text-slate-400 mt-0.5">{opt.type}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                        </button>
                     </li>
                   ))}
                 </ul>
               ) : (
                 <div className="px-6 py-4 text-sm text-slate-500 text-center">
                    Tidak ditemukan hasil untuk "{searchQuery}"
                 </div>
               )}
            </div>
          )}
        </div>
      </div>

    </section>
  );
};
