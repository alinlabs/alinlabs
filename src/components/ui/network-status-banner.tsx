import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/use-online-status';

export const NetworkStatusBanner: React.FC = () => {
  const { isOnline, justReconnected } = useOnlineStatus();

  if (isOnline && !justReconnected) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[120] pointer-events-none px-4 w-full max-w-sm flex justify-center"
    >
      {!isOnline ? (
        <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/95 text-white text-xs font-semibold shadow-lg border border-slate-700 backdrop-blur-md">
          <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Mode Offline — Menampilkan data tersimpan</span>
        </div>
      ) : (
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-lg border border-blue-500 backdrop-blur-md">
          <Wifi className="w-3.5 h-3.5 text-white shrink-0" />
          <span>Koneksi internet kembali terhubung</span>
        </div>
      )}
    </div>
  );
};
