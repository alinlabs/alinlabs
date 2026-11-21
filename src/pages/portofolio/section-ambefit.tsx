import React, { useState } from 'react';
import { Play, Share2, Check } from 'lucide-react';
import { VideoPopup } from '../../components/ui/video-popup';
import { InViewVideo } from '../../components/ui/in-view-video';
import { ExpandableText } from '../../components/ui/expandable-text';
import { useShareableMedia } from '../../hooks/use-shareable-media';
import { SafeImage } from '../../components/ui/safe-image';

const GitHubVideoCard = ({ videoId, index, onClick }: { videoId: number, index: number, onClick: () => void }) => {
  return (
    <button
      type="button"
      aria-label={`Putar video Ambefit ${index + 1}`}
      className="w-full aspect-[3/4] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-slate-200 relative group cursor-pointer block text-left"
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        <InViewVideo 
          src={`https://github.com/alinlabs/alinlabs-data/raw/main/video/ambefit/${videoId}.mp4`}
          alt={`Thumbnail video Ambefit ${index + 1}`}
          className="w-full h-full object-cover"
        />
        {/* Transparent overlay for interactions */}
        <div className="absolute inset-0 z-10 bg-black/15 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 pointer-events-none">
          <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30 text-white">
            <Play className="w-5 h-5 ml-0.5 fill-current" />
          </div>
        </div>
      </div>
    </button>
  );
};

export const SectionAmbefit: React.FC = () => {
  const videos = [1, 2, 3, 4];
  const videoUrls = videos.map(id => `https://github.com/alinlabs/alinlabs-data/raw/main/video/ambefit/${id}.mp4`);
  const [copied, setCopied] = useState(false);
  
  const { popupOpen, initialMediaIndex: initialVideoIndex, handleOpenPopup, handleClosePopup, handleMediaChange } = useShareableMedia('ambefit', videos.length);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?project=ambefit#ambefit`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="ambefit" className="w-full min-w-full snap-start bg-slate-50 pt-6 pb-8 md:py-12 border-t border-slate-100 flex items-start md:items-center justify-center relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-6 lg:gap-8 items-center">
          
          {/* Top: Logo & Description */}
          <div className="w-full flex flex-col items-start w-full">
            <div className="flex flex-row items-center justify-between gap-3 mb-4 md:mb-6 w-full">
              <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6">
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-md sm:shadow-lg border border-slate-200 bg-white p-1.5 md:p-2 shrink-0 flex items-center justify-center">
                  <SafeImage
                    src="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-tiensherba.png"
                    alt="Ambefit"
                    fallbackText="AB"
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                </div>
                <div className="flex flex-col items-start gap-0.5 sm:gap-1 justify-center">
                  <div className="bg-orange-100 text-orange-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest max-w-fit flex items-center">
                    Konten & Iklan
                  </div>
                  <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                    Ambefit
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Bagikan Link Ambefit"
                className="p-1.5 sm:p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
                title={copied ? "Link Disalin" : "Bagikan Link"}
              >
                {copied ? <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" /> : <Share2 className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
            <ExpandableText bgClass="bg-slate-50" text="Meningkatkan *brand awareness* melalui kampanye media sosial yang strategis dengan konten video potrait yang mengundang interaksi tinggi, menjangkau audiens secara luas di berbagai platform." className="max-w-2xl mx-0 mb-4 sm:mb-6" />
          </div>

          {/* Bottom: 4 Portrait Video Cards */}
          <div className="w-full relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10 w-full">
              {videos.map((videoId, index) => (
                <GitHubVideoCard key={videoId} videoId={videoId} index={index} onClick={() => handleOpenPopup(index)} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <VideoPopup 
        videos={videoUrls}
        initialIndex={initialVideoIndex}
        isOpen={popupOpen}
        onClose={handleClosePopup}
        onMediaChange={handleMediaChange}
        clientLogo="https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-tiensherba.png"
        clientName="Ambefit"
      />
    </div>
  );
};
