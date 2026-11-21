
import React, { useRef, useState, useEffect } from 'react';
import { ViewState, IdentityData } from '../../types';
import { Navbar } from './navbar';
import { MobileNavigasi } from './mobile-navigasi'; 
import { Footer } from './footer';
import { FloatingScrollbar } from './floating-scrollbar';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  children: React.ReactNode;
  isHeroHeader?: boolean;
  isDetailView?: boolean;
  detailTitle?: string;
  onBack?: () => void;
  scrollKey?: string;
  // Cart Props
  cartCount?: number;
  onCartClick?: () => void;
  // Identity Props
  identity: IdentityData | null;
}

export const Layout: React.FC<LayoutProps> = ({ 
  currentView, 
  onNavigate, 
  children, 
  isHeroHeader = false, 
  isDetailView = false, 
  detailTitle,
  onBack,
  scrollKey,
  cartCount,
  onCartClick,
  identity
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const resetScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 });
    }
    setIsScrolled(false);
  };

  useEffect(() => {
    resetScroll();
  }, [currentView, scrollKey]);

  useEffect(() => {
    window.addEventListener('layout-scroll-top', resetScroll);
    return () => window.removeEventListener('layout-scroll-top', resetScroll);
  }, []);

  const handleContainerScroll = () => {
    if (scrollContainerRef.current) {
      const scrolled = scrollContainerRef.current.scrollTop > 4;
      setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
    }
  };
  
  // Default fallbacks are only used while identity.json is loading
  // Using Indonesian Keys from JSON
  const appName = identity?.nama || 'AlinLabs Indonesia';
  const appTagline = identity?.slogan || 'Digital Ecosystem';
  const appSubLabel = identity?.subLabel || 'Digital Agency';
  // Note: We use optional chaining. If identity is null, it falls back to default in child components or here.
  const appLogoUrl = identity?.urlLottieLogo; 

  return (
    <div className="h-screen h-dvh overflow-hidden bg-slate-50 flex flex-col font-sans text-slate-900 w-full">
      
      {/* Top Navigation (outside scroll container) */}
      <Navbar 
        currentView={currentView} 
        onNavigate={onNavigate}
        isHeroHeader={isHeroHeader}
        isDetailView={isDetailView}
        detailTitle={detailTitle}
        onBack={onBack}
        isScrolled={isScrolled}
        cartCount={cartCount}
        onCartClick={onCartClick}
        companyName={appName}
        subLabel={appSubLabel}
        logoUrl={appLogoUrl}
      />

      {/* Scrollable Middle Layout Container (strictly between Header and Bottom Navigation) */}
      <div className="relative flex-1 min-h-0 w-full">
        <div
          id="layout-scroll-container"
          ref={scrollContainerRef}
          onScroll={handleContainerScroll}
          className="w-full h-full overflow-y-auto overflow-x-hidden relative scrollbar-hide"
        >
          <main className={`w-full relative min-h-full ${currentView !== ViewState.CHECKOUT_PAYMENT ? 'pb-8 md:pb-0' : ''}`}>
            {children}
          </main>

          {/* Footer - Hidden on Mobile (hidden), Visible on Desktop (md:block) */}
          <div className="hidden md:block">
            <Footer 
                onNavigate={onNavigate} 
                companyName={appName}
                tagline={appTagline}
                logoUrl={appLogoUrl}
            />
          </div>
        </div>

        {/* Floating Overlay Scroll Indicator (no background track, zero layout width impact) */}
        <FloatingScrollbar
          scrollContainerRef={scrollContainerRef}
          resetKey={`${currentView}:${scrollKey ?? ''}`}
        />
      </div>

      {/* Bottom Mobile Navigation (outside scroll container) */}
      {currentView !== ViewState.CHECKOUT_PAYMENT && (
        <MobileNavigasi currentView={currentView} onNavigate={onNavigate} />
      )}
      
    </div>
  );
};
