
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, X } from 'lucide-react';
import { DynamicIcon } from '../../utils/DynamicIcon';
import { UniversalLottie } from '../../components/ui/UniversalLottie';

interface Reason {
    ikon: string;
    judul: string;
    deskripsi: string;
}

interface NationalReachProps {
  data: {
      slogan: string;
      judul: string;
      deskripsi: string;
      urlLottie: string;
      stats: { label: string; nilai: string; ikon: string }[];
  },
  whyUsData?: Reason[];
}

export const NationalReach: React.FC<NationalReachProps> = ({ data, whyUsData }) => {
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);

  useEffect(() => {
    if (selectedReason) {
      window.dispatchEvent(new Event('hide-bottom-nav'));
      // Adding a class to body to prevent scrolling could also be good
      document.body.style.overflow = 'hidden';
    } else {
      window.dispatchEvent(new Event('show-bottom-nav'));
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    }
  }, [selectedReason]);

  const mitraList = [
    "Pertamina",
    "AWS Partner",
    "Telkom Indonesia",
    "Midtrans",
    "Bank Mandiri",
    "Google Cloud",
    "Gojek"
  ];

  if (!data) return null;

  return (
    <section className="py-10 md:py-16 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-8 md:mb-10">
                <div className="inline-flex items-center space-x-2 py-1 px-3 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 mb-3 md:mb-4">
                    <Globe className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-[#2563EB] text-xs font-bold tracking-widest uppercase">{data.slogan}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4">
                    {data.judul}
                </h2>
                <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">
                    {data.deskripsi}
                </p>
            </div>

            <div className="relative w-full mx-auto aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] flex items-center justify-center bg-slate-50 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-inner overflow-hidden min-h-[200px] md:min-h-[300px]">
                {/* Lottie Container */}
                <div className="w-full h-full">
                     <UniversalLottie src={data.urlLottie} className="w-full h-full" />
                </div>
                

            </div>

            {/* Why Us Cards (Merged) */}
            {whyUsData && whyUsData.length > 0 && (
                <div className="-mt-12 md:-mt-24 relative z-20 grid grid-cols-4 gap-2 md:gap-6 lg:gap-8 max-w-7xl mx-auto px-2 md:px-8">
                    {whyUsData.map((reason, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setSelectedReason(reason)}
                            className="group p-2 sm:p-4 md:p-6 rounded-xl md:rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center md:items-start text-center md:text-left cursor-pointer md:cursor-default"
                        >
                            <div className="flex flex-col md:flex-row items-center md:items-start md:gap-4 mb-0 md:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 bg-[#2563EB] rounded-[10px] md:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 text-white shadow-inner">
                                    <DynamicIcon name={reason.ikon} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900 leading-tight md:flex items-center h-full mt-0 hidden md:block">
                                    {reason.judul}
                               </h3>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed hidden md:block">
                                {reason.deskripsi}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Sheet for Mobile */}
            {createPortal(
                <AnimatePresence>
                {selectedReason && (
                <div className="fixed inset-0 z-[9999] flex items-end justify-center md:hidden">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedReason(null)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div 
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-white w-full rounded-t-3xl p-6 relative z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                        <button 
                            onClick={() => setSelectedReason(null)}
                            className="absolute top-5 right-5 p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#2563EB] rounded-2xl flex items-center justify-center text-white mb-4 shadow-inner">
                                <DynamicIcon name={selectedReason.ikon} className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {selectedReason.judul}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {selectedReason.deskripsi}
                            </p>
                        </div>
                    </motion.div>
                </div>
                )}
                </AnimatePresence>,
                document.body
            )}

            {/* Marquee Mitra Section */}
            {mitraList.length > 0 && (
                <div className="mt-12 md:mt-16 w-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="flex w-max animate-scroll items-center gap-12 sm:gap-16">
                        {/* Duplicate the array to create continuous scrolling effect */}
                        {[...mitraList, ...mitraList, ...mitraList, ...mitraList].map((nama, idx) => (
                            <div key={idx} className="flex items-center text-slate-400 hover:text-[#2563EB] transition-colors duration-300">
                                <span className="text-xl md:text-3xl font-extrabold whitespace-nowrap uppercase tracking-wider">{nama}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
         </div>
    </section>
  );
};
