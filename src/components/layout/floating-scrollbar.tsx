import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FloatingScrollbarProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  resetKey?: string;
}

export const FloatingScrollbar: React.FC<FloatingScrollbarProps> = ({
  scrollContainerRef,
  resetKey,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);
  const ignoreNextScrollRef = useRef(false);

  const [hasOverflow, setHasOverflow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      if (!isHoveringRef.current && !isDraggingRef.current) {
        setIsVisible(false);
      }
    }, 1100);
  }, [clearHideTimer]);

  const reveal = useCallback(() => {
    setIsVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  const updateMetrics = useCallback(() => {
    const container = scrollContainerRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!container) return;

    const { scrollHeight, clientHeight, scrollTop } = container;
    const overflow = scrollHeight > clientHeight + 1;
    setHasOverflow(overflow);

    if (!overflow) {
      setIsVisible(false);
      return;
    }

    if (!track || !thumb) return;
    const trackHeight = track.clientHeight;
    if (trackHeight <= 0) return;

    const thumbHeight = Math.min(
      trackHeight,
      Math.max(36, (clientHeight / scrollHeight) * trackHeight)
    );
    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = Math.max(0, trackHeight - thumbHeight);
    const thumbTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
  }, [scrollContainerRef]);

  // Suppress indicator flash when route/view programmatically resets scroll to top
  useEffect(() => {
    ignoreNextScrollRef.current = true;
    setIsVisible(false);
    clearHideTimer();
    const frame = window.requestAnimationFrame(() => {
      updateMetrics();
      window.setTimeout(() => {
        ignoreNextScrollRef.current = false;
      }, 80);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [resetKey, updateMetrics, clearHideTimer]);

  useEffect(() => {
    const handleResetEvent = () => {
      ignoreNextScrollRef.current = true;
      setIsVisible(false);
      clearHideTimer();
      window.setTimeout(() => {
        ignoreNextScrollRef.current = false;
        updateMetrics();
      }, 80);
    };

    window.addEventListener('layout-scroll-top', handleResetEvent);
    return () => window.removeEventListener('layout-scroll-top', handleResetEvent);
  }, [clearHideTimer, updateMetrics]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      updateMetrics();
      if (!ignoreNextScrollRef.current) {
        reveal();
      }
    };

    const onUserInteract = () => {
      updateMetrics();
      if (container.scrollHeight > container.clientHeight + 1) {
        reveal();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) return;
      const rect = container.getBoundingClientRect();
      // Reveal when pointer moves near the right edge of the scroll layout
      if (rect.right - e.clientX <= 28 && container.scrollHeight > container.clientHeight + 1) {
        updateMetrics();
        reveal();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        onUserInteract();
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    container.addEventListener('wheel', onUserInteract, { passive: true });
    container.addEventListener('touchstart', onUserInteract, { passive: true });
    container.addEventListener('touchmove', onUserInteract, { passive: true });
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('keydown', onKeyDown, { passive: true });
    window.addEventListener('resize', updateMetrics);

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });
    resizeObserver.observe(container);
    Array.from(container.children).forEach((child) => {
      resizeObserver.observe(child);
    });

    const mutationObserver = new MutationObserver(() => {
      updateMetrics();
    });
    mutationObserver.observe(container, { childList: true, subtree: false });

    updateMetrics();

    return () => {
      clearHideTimer();
      container.removeEventListener('scroll', onScroll);
      container.removeEventListener('wheel', onUserInteract);
      container.removeEventListener('touchstart', onUserInteract);
      container.removeEventListener('touchmove', onUserInteract);
      container.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', updateMetrics);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [scrollContainerRef, updateMetrics, reveal, clearHideTimer]);

  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    e.preventDefault();
    e.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    dragStartScrollTopRef.current = container.scrollTop;
    clearHideTimer();
    setIsVisible(true);

    const handleWindowPointerMove = (moveEvent: PointerEvent) => {
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!container || !track || !thumb) return;

      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const maxThumbTravel = trackHeight - thumbHeight;
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxThumbTravel <= 0 || maxScroll <= 0) return;

      const deltaY = moveEvent.clientY - dragStartYRef.current;
      const scrollDelta = (deltaY / maxThumbTravel) * maxScroll;
      container.scrollTop = Math.max(0, Math.min(maxScroll, dragStartScrollTopRef.current + scrollDelta));
    };

    const handleWindowPointerUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      scheduleHide();
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
  };

  return (
    <div
      ref={trackRef}
      id="floating-scroll-track"
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 bottom-0 right-0 z-30 w-2.5 bg-transparent transition-opacity duration-300 ${
        hasOverflow && (isVisible || isDragging) ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={thumbRef}
        id="floating-scroll-indicator"
        onPointerEnter={() => {
          isHoveringRef.current = true;
          clearHideTimer();
          if (hasOverflow) setIsVisible(true);
        }}
        onPointerLeave={() => {
          isHoveringRef.current = false;
          if (!isDraggingRef.current) scheduleHide();
        }}
        onPointerDown={handleThumbPointerDown}
        className={`pointer-events-auto ml-auto rounded-l-full cursor-pointer transition-[width,background-color] duration-200 ${
          isDragging
            ? 'w-[6px] bg-blue-600/90'
            : 'w-[5px] hover:w-[6px] bg-slate-400/75 hover:bg-blue-600/85'
        }`}
      />
    </div>
  );
};
