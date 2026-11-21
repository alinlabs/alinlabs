
import React from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { ViewState } from '../../types';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onNavigate?: (view: ViewState) => void; // Optional: untuk tombol Home
  fullScreen?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = "Terjadi Kesalahan", 
  message = "Kami mengalami kendala saat memuat data. Silakan coba lagi atau periksa koneksi internet Anda.", 
  onRetry,
  onNavigate,
  fullScreen = true
}) => {
  const containerClass = fullScreen 
    ? "min-h-screen w-full bg-slate-50" 
    : "w-full h-full min-h-[400px] bg-slate-50 rounded-3xl border border-slate-200 border-dashed";

  return (
    <div className={`${containerClass} flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300`}>
      
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
        <AlertTriangle className="w-10 h-10 text-red-500" />
      </div>

      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
        {title}
      </h2>
      
      <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {onRetry && (
            <button 
                onClick={onRetry}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center shadow-lg hover:shadow-blue-500/20 active:scale-95"
            >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Coba Lagi
            </button>
        )}

        {onNavigate && (
            <button 
                onClick={() => onNavigate(ViewState.HOME)}
                className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
            >
                <Home className="w-4 h-4 mr-2" />
                Kembali ke Beranda
            </button>
        )}
      </div>
    </div>
  );
};
