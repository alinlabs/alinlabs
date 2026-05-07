
import React from 'react';
import { DynamicIcon } from '../../utils/DynamicIcon';

interface Step {
    judul: string;
    deskripsi: string;
    ikon: string;
}

interface WorkflowProps {
    data: {
        slogan: string;
        judul: string;
        deskripsi: string;
        steps: Step[];
        gambarAmbassador: string;
    }
}

export const Workflow: React.FC<WorkflowProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="pt-10 md:pt-16 bg-gradient-to-br from-cyan-500 to-blue-700 relative overflow-hidden text-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300 opacity-20 rounded-full blur-[100px]"></div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 gap-8 lg:gap-16">
                
                {/* Left Column: Workflow Steps */}
                {/* Mobile padding reduced from pb-24 to pb-8 to close gap with image */}
                <div className="pb-10 lg:pb-16">
                    <div className="mb-8 md:mb-12 flex flex-col items-center text-center">
                        <h2 className="text-cyan-200 font-bold tracking-widest uppercase text-xs mb-3 flex items-center justify-center">
                            <span className="w-8 h-0.5 bg-cyan-200 mr-3"></span>
                            {data.slogan}
                            <span className="w-8 h-0.5 bg-cyan-200 ml-3 hidden sm:block"></span>
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight w-full" dangerouslySetInnerHTML={{ __html: data.judul }} />
                        <p className="text-blue-100 mt-4 md:mt-6 text-sm md:text-lg max-w-2xl mx-auto">
                            {data.deskripsi}
                        </p>
                    </div>

                    {/* Grid updated to slider on mobile */}
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pt-4 pb-12 -mt-4 -mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 md:pt-0 md:pb-0 md:mt-0 md:mb-0">
                        {data.steps.map((flow, index) => (
                            <div key={index} className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center p-5 md:p-6 transition-all duration-300">
                                
                                {/* Card Background Overlay (Invisible initially, appears on hover) */}
                                <div className="absolute inset-0 bg-blue-950/20 border border-blue-900/20 rounded-2xl group-hover:bg-white group-hover:border-slate-200 group-hover:shadow-2xl transition-all duration-300 z-0 pointer-events-none"></div>

                                {/* Connecting Line (draws from this card to the next, visible only on desktop) */}
                                {index < data.steps.length - 1 && (
                                    <div className="hidden lg:block absolute left-[72px] top-[48px] w-[calc(100%-24px)] border-t-[2px] border-dashed border-white/30 z-10 pointer-events-none -mt-[1px]"></div>
                                )}

                                {/* Card Content Container */}
                                <div className="relative z-20">
                                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-white/10 backdrop-blur-sm shadow-inner rounded-xl flex items-center justify-center text-white group-hover:bg-blue-600 transition-all duration-300 relative z-30">
                                            <DynamicIcon name={flow.ikon} className="w-5 h-5 md:w-6 md:h-6" />
                                            {/* Decorative point dot */}
                                            <div className="absolute -inset-1.5 rounded-[14px] border border-white/20 group-hover:border-blue-600/30 scale-95 group-hover:scale-100 transition-all duration-300 opacity-0 lg:group-hover:opacity-100"></div>
                                        </div>
                                        {/* Title */}
                                        <h3 className="text-sm md:text-base font-bold text-white group-hover:text-slate-900 leading-snug line-clamp-2 transition-colors duration-300">
                                            {flow.judul}
                                        </h3>
                                    </div>
                                    
                                    {/* Description visible on all sizes now to support mobile slider experience */}
                                    <p className="block text-blue-100 group-hover:text-slate-600 text-sm leading-relaxed mt-2 transition-colors duration-300 opacity-90 group-hover:opacity-100">
                                        {flow.deskripsi}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};
