import { useState, useEffect } from 'react';

export const useShareableMedia = (projectId: string, totalMediaCount: number) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [initialMediaIndex, setInitialMediaIndex] = useState(0);

  useEffect(() => {
    // We listen to URLSearchParams instead of hash
    const params = new URLSearchParams(window.location.search);
    const project = params.get('project');
    const media = params.get('media');

    if (project === projectId && media) {
      const isNum = /^\d+$/.test(media);

      if (isNum) {
        const numIdx = parseInt(media, 10) - 1;
        if (numIdx >= 0 && numIdx < totalMediaCount) {
           setInitialMediaIndex(numIdx);
           setPopupOpen(true);
        }
      }
    }
  }, [projectId, totalMediaCount]);

  const handleOpenPopup = (index: number) => {
    setInitialMediaIndex(index);
    setPopupOpen(true);
    
    // Update URL Search Params
    const url = new URL(window.location.href);
    url.searchParams.set('project', projectId);
    url.searchParams.set('media', String(index + 1));
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    
    // Remove query params
    const url = new URL(window.location.href);
    url.searchParams.delete('project');
    url.searchParams.delete('media');
    
    // Clear the hash to ensure the link returns to exactly the base pathname (e.g. /portofolio)
    url.hash = '';
    
    const finalUrl = url.pathname + (url.search || '');
    window.history.replaceState(null, '', finalUrl);
  };

  const handleMediaChange = (index: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('project', projectId);
    url.searchParams.set('media', String(index + 1));
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  };

  return { popupOpen, initialMediaIndex, handleOpenPopup, handleClosePopup, handleMediaChange };
};
