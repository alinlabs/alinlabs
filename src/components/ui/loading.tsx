import React from 'react';
import { ViewState } from '../../types';

interface LoadingProps {
  fullScreen?: boolean;
  logoUrl?: string;
  view?: ViewState;
}

export const Loading: React.FC<LoadingProps> = ({ view = ViewState.HOME }) => {
  const isHome = view === ViewState.HOME;

  if (isHome) {
    return (
      <div
        id="page-loading-skeleton"
        aria-busy="true"
        aria-label="Memuat halaman"
        className="w-full min-h-[calc(100dvh-128px)] md:min-h-[calc(100dvh-65px)] bg-slate-50 overflow-x-clip"
      >
        {/* Hero Banner Placeholder - exact same aspect ratio as Hero */}
        <section className="relative w-full aspect-[4/3] md:aspect-[21/9] flex flex-col items-center justify-center bg-slate-200/80 border-b-4 border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200/70 via-slate-100/80 to-slate-200/70 animate-pulse" />

          {/* Slider Dots Placeholder */}
          <div className="absolute bottom-12 md:bottom-16 left-0 right-0 z-10 flex justify-center gap-2">
            <span className="w-2.5 sm:w-8 h-2.5 rounded-full bg-blue-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
          </div>

          {/* Overlapping Bottom Search Bar Placeholder */}
          <div className="absolute bottom-0 translate-y-1/2 left-0 w-full px-4 sm:px-6 lg:px-8 z-20 flex justify-center">
            <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 flex items-center gap-3">
              <div className="pl-3 sm:pl-5 flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-200 animate-pulse" />
              </div>
              <div className="flex-1 py-2.5 sm:py-3">
                <div className="h-4 sm:h-5 w-44 sm:w-72 rounded-full bg-slate-200/80 animate-pulse" />
              </div>
              <div className="hidden sm:block sm:w-28 sm:h-11 rounded-full bg-blue-600/20 animate-pulse shrink-0" />
            </div>
          </div>
        </section>

        {/* QuickAccess Placeholder - exact same grid & spacing as QuickAccess */}
        <section className="pb-8 pt-12 sm:pb-10 sm:pt-16 bg-slate-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-8 md:gap-10">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center w-full sm:w-[120px]"
                >
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-2xl sm:rounded-[20px] flex items-center justify-center mb-2 sm:mb-4">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 bg-blue-100/70 rounded-xl animate-pulse" />
                  </div>
                  <div className="h-2.5 sm:h-3 w-12 sm:w-16 rounded-full bg-slate-200 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promo & Featured Services Placeholder */}
        <section className="pb-10 md:pb-14 bg-slate-50">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-4 mb-8 md:mb-10 h-56 md:h-48 rounded-2xl md:rounded-[2rem] bg-blue-600/15 border border-blue-200/60 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-56 rounded-[2rem] border border-slate-100 animate-pulse ${
                    idx === 1 ? 'hidden md:block bg-blue-600/15' : 'bg-white shadow-sm'
                  } ${idx === 2 ? 'hidden md:block' : ''}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      id="page-loading-skeleton"
      aria-busy="true"
      aria-label="Memuat halaman"
      className="w-full min-h-[calc(100dvh-128px)] md:min-h-[calc(100dvh-65px)] bg-slate-50"
    >
      {/* Page Header Skeleton */}
      <div className="w-full bg-white border-b border-slate-100 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-3">
          <div className="h-6 w-28 rounded-full bg-blue-100/80 animate-pulse" />
          <div className="h-8 md:h-10 w-64 md:w-96 rounded-xl bg-slate-200 animate-pulse" />
          <div className="h-4 w-72 md:w-[32rem] rounded-full bg-slate-100 animate-pulse" />
        </div>
      </div>

      {/* Content Cards Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className={`h-56 rounded-2xl bg-white border border-slate-100 p-6 flex flex-col justify-between animate-pulse ${
                idx >= 3 ? 'hidden md:flex' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-100" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-4/5 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

