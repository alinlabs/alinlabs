
import React from 'react';
import { ViewState } from '../../../types';
import { Smartphone, Check, TrendingUp } from 'lucide-react';

interface PackageProps {
  onNavigate: (view: ViewState, payload?: any) => void;
  onDetail?: () => void;
  data: any;
}

export const IklanIn: React.FC<PackageProps> = ({ onNavigate, onDetail, data }) => {
  if (!data) return null;

  return (
     <div 
         onClick={onDetail}
         className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col h-full group relative overflow-hidden cursor-pointer"
     >
         {/* Banner Image */}
         <div className="w-full aspect-[4/3] relative overflow-hidden">
             <img loading="lazy" 
                 src="/gambar/pilihan-layanan1.webp" 
                 alt={data.nama}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
             />
         </div>
         
         <div className="p-8 relative z-10 flex flex-col flex-grow">
            <div className="mb-4">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight line-clamp-2">
                    {data.nama}
                </h4>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {data.deskripsi}
            </p>
            
            <ul className="space-y-3 mb-8 flex-grow">
                {data.manfaat && data.manfaat.slice(0, 4).map((feat: string, f: number) => (
                    <li key={f} className="text-sm font-medium text-slate-700 flex items-start">
                        <Check className="w-4 h-4 text-[#2563EB] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{feat}</span>
                    </li>
                ))}
            </ul>
            
            {/* Tech Stack Mini */}
            <div className="mb-6 flex items-center gap-2 border-t border-slate-100 pt-4">
                 <span className="text-[10px] text-slate-400 font-bold uppercase">Tools:</span>
                 <div className="flex gap-1.5">
                     {data.teknologi && data.teknologi.slice(0, 4).map((tech: any, i: number) => {
                         const name = typeof tech === 'string' ? tech : tech.nama;
                         const logo = typeof tech === 'string' ? `https://placehold.co/40x40?text=${name}` : tech.logo;
                         return (
                             <img loading="lazy" key={i} src={logo} alt={name} title={name} className="w-6 h-6 rounded-md object-contain opacity-70 hover:opacity-100 transition-opacity" />
                         );
                     })}
                 </div>
            </div>

            <button 
                className="w-full py-3 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition-all text-sm shadow-md"
            >
                Detail Paket
            </button>
         </div>
     </div>
  );
};
