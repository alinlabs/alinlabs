
import React, { useState, useEffect } from 'react';

interface Testimonial {
    nama: string;
    peran: string;
    teks: string;
}

interface TestimonialsProps {
    data: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide logic for mobile (5 seconds)
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % data.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [data]);

  if (!data) return null;

  // Shared Card Component
  const TestimonialCard = ({ testi }: { testi: Testimonial }) => (
    <div className="bg-slate-50 p-6 md:p-8 rounded-3xl relative h-full flex flex-col justify-between border border-slate-100 shadow-sm">
        <div className="text-blue-100 absolute top-4 right-6 transform text-6xl font-serif leading-none select-none pointer-events-none">"</div>
        <p className="text-slate-600 text-base md:text-lg italic mb-6 relative z-10 leading-relaxed">"{testi.teks}"</p>
        <div className="flex items-center gap-4 mt-auto">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg md:text-xl shadow-inner">
                {testi.nama.charAt(0)}
            </div>
            <div>
                <h4 className="font-bold text-slate-900 leading-tight text-sm md:text-base">{testi.nama}</h4>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide font-medium">{testi.peran}</p>
            </div>
        </div>
    </div>
  );

  return (
    <section className="py-10 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-10">
                <h2 className="text-[#4a8cdf] font-bold tracking-widest uppercase text-xs mb-3">
                    Testimoni Klien
                </h2>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                    Apa Kata Mereka?
                </h2>
            </div>

            {/* DESKTOP VIEW: Grid (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.map((testi, idx) => (
                    <div key={idx} className="h-full">
                        <TestimonialCard testi={testi} />
                    </div>
                ))}
            </div>

            {/* MOBILE VIEW: Auto Slider (Visible on Mobile Only) */}
            <div className="md:hidden relative">
                <div className="overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    >
                        {data.map((testi, idx) => (
                            <div key={idx} className="w-full flex-shrink-0 px-1">
                                <TestimonialCard testi={testi} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {data.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeIndex === idx 
                                    ? 'w-6 bg-[#4a8cdf]' 
                                    : 'w-1.5 bg-slate-200'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

        </div>
    </section>
  );
};
