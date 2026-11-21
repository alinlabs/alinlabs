
import React from 'react';
import { ViewState } from '../../types';
import { Box, Layers, Info, Phone } from 'lucide-react';
import { prefetchRoute } from '../../utils/route-prefetch';

interface QuickAccessProps {
  onNavigate: (view: ViewState) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigate }) => {
  const quickLinks = [
    {
      title: "Layanan",
      icon: <Box className="w-7 h-7 sm:w-9 sm:h-9 text-blue-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.9} />,
      view: ViewState.PRODUCTS,
    },
    {
      title: "Portofolio",
      icon: <Layers className="w-7 h-7 sm:w-9 sm:h-9 text-blue-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.9} />,
      view: ViewState.PORTFOLIO,
    },
    {
      title: "Tentang",
      icon: <Info className="w-7 h-7 sm:w-9 sm:h-9 text-blue-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.9} />,
      view: ViewState.ABOUT,
    },
    {
      title: "Kontak",
      icon: <Phone className="w-7 h-7 sm:w-9 sm:h-9 text-blue-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.9} />,
      view: ViewState.CONTACT,
    }
  ];

  return (
    <section className="pb-8 pt-12 sm:pb-10 sm:pt-16 bg-slate-50 relative z-20 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-8 md:gap-10">
                {quickLinks.map((link, index) => (
                    <button 
                        key={index}
                        type="button"
                        onMouseEnter={() => prefetchRoute(link.view)}
                        onTouchStart={() => prefetchRoute(link.view)}
                        onFocus={() => prefetchRoute(link.view)}
                        onClick={() => onNavigate(link.view)}
                        className="flex flex-col items-center text-center group cursor-pointer w-full sm:w-[120px]"
                    >
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl sm:rounded-[20px] flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-1 group-hover:border-blue-100 group-hover:shadow-[0_8px_20px_-4px_rgba(37,99,235,0.12)] mb-2 sm:mb-4">
                            {link.icon}
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-600 group-hover:text-blue-600 transition-colors uppercase tracking-widest">{link.title}</span>
                    </button>
                ))}
            </div>
        </div>
    </section>
  );
};
