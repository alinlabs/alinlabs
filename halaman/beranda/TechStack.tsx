
import React from 'react';
import { Star } from 'lucide-react';

interface TechItem {
    nama: string;
    peran: string;
    logo: string;
    bg: string;
}

interface TechGroup {
    judul: string;
    items: TechItem[];
}

interface TechStackProps {
    data: {
        slogan: string;
        judul: string;
        deskripsi: string;
        groups: TechGroup[];
    }
}

export const TechStack: React.FC<TechStackProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-10 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-[#4a8cdf] font-bold tracking-widest uppercase text-xs mb-2">
                {data.slogan}
            </h2>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 md:mb-4">
                {data.judul}
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
                {data.deskripsi}
            </p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {data.groups.map((group, groupIdx) => (
              <div key={groupIdx}>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4 md:mb-6 pl-4 border-l-4 border-[#4a8cdf]">
                  <h3 className="text-slate-900 font-bold text-xs md:text-sm uppercase tracking-wider">
                    {group.judul}
                  </h3>
                  
                  {/* Mini Logos on Right (Hidden on mobile to save space) */}
                  <div className="hidden sm:flex items-center gap-[-8px]">
                      {group.items.map((item, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-white border border-slate-200 p-1 -ml-3 first:ml-0 shadow-sm z-0 hover:z-10 hover:scale-110 transition-transform cursor-pointer" title={item.nama}>
                              <img loading="lazy" src={item.logo} alt={item.nama} className="w-full h-full object-contain rounded-full" />
                          </div>
                      ))}
                  </div>
                </div>

                <div className="flex md:grid overflow-x-auto md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 py-12 -my-12 md:py-0 md:-my-0 -mx-4 md:mx-0 px-4 sm:px-6 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {group.items.map((tech, idx) => (
                      <div key={idx} className="w-[42vw] sm:w-[32vw] md:w-auto flex-shrink-0 md:flex-shrink group relative bg-white rounded-xl border border-slate-100 hover:border-slate-100 hover:shadow-xl transition-all duration-300 h-20 md:h-28 cursor-default">
                          
                          {/* Main Content */}
                          <div className="h-full flex flex-col justify-center px-3 md:px-5 transition-transform duration-300 group-hover:-translate-y-2 relative">
                              <div className="flex items-center gap-2 md:gap-4">
                                  {/* Icon */}
                                  <div className={`w-8 h-8 md:w-12 md:h-12 ${tech.bg} rounded-lg md:rounded-xl flex items-center justify-center p-1.5 md:p-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                                      <img loading="lazy" src={tech.logo} alt={tech.nama} className="w-full h-full object-contain" />
                                  </div>
                                  
                                  {/* Text Container */}
                                  <div className="relative min-w-0 flex-1">
                                      <h4 className="font-bold text-slate-800 text-xs md:text-base leading-tight break-words line-clamp-2">{tech.nama}</h4>
                                      <p className="text-[9px] md:text-xs font-bold text-[#4a8cdf] uppercase tracking-wide mt-0.5">{tech.peran}</p>

                                      {/* Stars */}
                                      <div className="absolute top-full left-0 mt-1 md:mt-2 flex gap-0.5 md:gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                              key={star}
                                              className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-slate-200 group-hover:text-yellow-400 fill-current transition-colors duration-300"
                                              style={{ transitionDelay: `${star * 50}ms` }}
                                            />
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};
