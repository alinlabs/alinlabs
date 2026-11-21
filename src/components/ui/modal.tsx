import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export type ModalVariant = 'center' | 'bottom-sheet' | 'responsive';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: ModalVariant;
  portal?: boolean;
  lockScroll?: boolean;
  hideBottomNav?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  zIndexClass?: string;
  wrapperClassName?: string;
  backdropClassName?: string;
  panelClassName?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  showCloseButton?: boolean;
  headerClassName?: string;
  ariaLabel?: string;
  overlayContent?: React.ReactNode;
  beforePanel?: React.ReactNode;
  afterPanel?: React.ReactNode;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
}

const VARIANT_WRAPPER_CLASSES: Record<ModalVariant, string> = {
  center: 'items-center justify-center p-4',
  'bottom-sheet': 'items-end justify-center p-0',
  responsive: 'items-end md:items-center justify-center p-0 md:p-6',
};

const VARIANT_DEFAULT_PANEL_CLASSES: Record<ModalVariant, string> = {
  center: 'bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden',
  'bottom-sheet': 'bg-white w-full rounded-t-[1.75rem] shadow-2xl overflow-hidden',
  responsive: 'bg-white w-full md:max-w-2xl rounded-t-[1.75rem] md:rounded-2xl shadow-2xl overflow-hidden',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  variant = 'responsive',
  portal = true,
  lockScroll = true,
  hideBottomNav = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  zIndexClass = 'z-[100]',
  wrapperClassName = '',
  backdropClassName = 'bg-slate-900/60 backdrop-blur-sm',
  panelClassName,
  title,
  subtitle,
  showCloseButton = false,
  headerClassName = '',
  ariaLabel,
  overlayContent,
  beforePanel,
  afterPanel,
  onMouseMove,
  onTouchStart,
  onTouchMove,
}) => {
  useEffect(() => {
    if (!isOpen || !lockScroll) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, lockScroll]);

  useEffect(() => {
    if (!isOpen || !hideBottomNav) return;
    window.dispatchEvent(new Event('hide-bottom-nav'));
    return () => {
      window.dispatchEvent(new Event('show-bottom-nav'));
    };
  }, [isOpen, hideBottomNav]);

  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  const isSheetMotion = variant === 'bottom-sheet' || variant === 'responsive';
  const motionInitial = isSheetMotion
    ? { y: '100%', opacity: 0.5, scale: 0.96 }
    : { opacity: 0, scale: 0.92, y: 16 };
  const motionAnimate = isSheetMotion
    ? { y: 0, opacity: 1, scale: 1 }
    : { opacity: 1, scale: 1, y: 0 };
  const motionExit = isSheetMotion
    ? { y: '100%', opacity: 0, scale: 0.96 }
    : { opacity: 0, scale: 0.92, y: 16 };

  const resolvedPanelClass = panelClassName ?? VARIANT_DEFAULT_PANEL_CLASSES[variant];

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          className={`fixed inset-0 ${zIndexClass} flex ${VARIANT_WRAPPER_CLASSES[variant]} ${wrapperClassName}`}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeOnBackdropClick ? onClose : undefined}
            className={`absolute inset-0 ${backdropClassName}`}
          />

          {overlayContent}

          {beforePanel}

          {/* Standardized Modal / Bottom Sheet Panel (intentionally without top drag indicator) */}
          <motion.div
            initial={motionInitial}
            animate={motionAnimate}
            exit={motionExit}
            transition={{ type: 'spring', damping: 26, stiffness: 320, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 ${resolvedPanelClass}`}
          >
            {(title !== undefined || showCloseButton) && (
              <div className={`flex items-center justify-between gap-3 ${headerClassName}`}>
                <div className="min-w-0 flex-1">
                  {title && (
                    <div className="font-bold text-slate-900 text-base md:text-lg leading-tight truncate">
                      {title}
                    </div>
                  )}
                  {subtitle && (
                    <div className="text-xs text-slate-500 mt-0.5 truncate">
                      {subtitle}
                    </div>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    aria-label="Tutup modal"
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {children}
          </motion.div>

          {afterPanel}
        </div>
      )}
    </AnimatePresence>
  );

  if (portal && typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
};
