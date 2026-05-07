
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Publik, webPortfolios } from './Publik';
import { Detail } from './Detail';
import { Preview } from './Preview';
import { ViewState } from '../../types';

interface MainProps {
    onNavigate: (view: ViewState) => void;
    selectedItemId?: string | null;
    onItemSelect?: (id: string | null) => void;
}

interface PreviewState {
    url: string;
    title: string;
    category: 'Ekosistem Web' | 'Agensi Kreatif' | 'Pemasaran Digital' | string;
}

export const Main: React.FC<MainProps> = ({ onNavigate, selectedItemId, onItemSelect }) => {
  const [previewData, setPreviewData] = useState<PreviewState | null>(null);
  
  const isDetail = selectedItemId && !['klien', 'galeri', 'website'].includes(selectedItemId);
  const activeTabParam = ['klien', 'galeri', 'website'].includes(selectedItemId || '') ? selectedItemId : undefined;

  useEffect(() => {
     const checkUrl = () => {
       const params = new URLSearchParams(window.location.search);
       const siteUrl = params.get('site');
       if (siteUrl && (!previewData || previewData.url !== siteUrl)) {
          // Try finding matching details in webPortfolios
          const match = webPortfolios.find(p => p.url === siteUrl);
          if (match) {
             setPreviewData({ url: match.url, title: match.title, category: match.category });
          } else {
             setPreviewData({ url: siteUrl, title: 'Preview Website', category: 'Web & App' });
          }
       } else if (!siteUrl && previewData) {
          setPreviewData(null);
       }
     };

     // Check on mount
     checkUrl();

     // Listen for popstate (and custom event if we want)
     window.addEventListener('popstate', checkUrl);
     return () => window.removeEventListener('popstate', checkUrl);
  }, [previewData]);

  const handleItemClick = (id: string) => {
    if (onItemSelect) onItemSelect(id);
    // Ensure preview is closed when selecting new item
    setPreviewData(null);
  };

  const handleBack = () => {
    if (onItemSelect) onItemSelect(null);
    setPreviewData(null);
  };

  const handlePreviewOpen = (url: string, title: string, category: any) => {
      setPreviewData({ url, title, category });
      const searchParams = new URL(window.location.href);
      searchParams.searchParams.set('site', url);
      window.history.replaceState(null, '', searchParams.pathname + searchParams.search);
  };

  const handlePreviewClose = () => {
      setPreviewData(null);
      const searchParams = new URL(window.location.href);
      searchParams.searchParams.delete('site');
      window.history.replaceState(null, '', searchParams.pathname + searchParams.search);
  };

  return (
    <>
      <div className={isDetail ? 'block' : 'hidden'}>
        {isDetail && (
          <Detail 
              itemId={selectedItemId} 
              onBack={handleBack} 
              onPreview={handlePreviewOpen}
          />
        )}
      </div>
      <div className={!isDetail ? 'block' : 'hidden'}>
        <Publik 
            onItemClick={handleItemClick} 
            onNavigate={onNavigate} 
            onPreview={handlePreviewOpen}
            activeTabParam={activeTabParam}
        />
      </div>

      <AnimatePresence>
        {previewData && (
          <Preview 
             url={previewData.url} 
             title={previewData.title} 
             category={previewData.category} 
             onClose={handlePreviewClose} 
          />
        )}
      </AnimatePresence>
    </>
  );
};
