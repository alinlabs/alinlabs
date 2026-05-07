
import React from 'react';
import { ViewState, IdentityData } from '../../types';
import { Navbar } from './Navbar';
import { MobileNavigasi } from './MobileNavigasi'; 
import { Footer } from './Footer';

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  children: React.ReactNode;
  isHeroHeader?: boolean;
  isDetailView?: boolean;
  detailTitle?: string;
  onBack?: () => void;
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
  cartCount,
  onCartClick,
  identity
}) => {
  
  // Default fallbacks are only used while identity.json is loading
  // Using Indonesian Keys from JSON
  const appName = identity?.nama || 'AlinLabs Indonesia';
  const appTagline = identity?.slogan || 'Digital Ecosystem';
  const appSubLabel = identity?.subLabel || 'Digital Agency';
  // Note: We use optional chaining. If identity is null, it falls back to default in child components or here.
  const appLogoUrl = identity?.urlLottieLogo; 

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 w-full overflow-x-hidden">
      
      {/* Navigation */}
      <Navbar 
        currentView={currentView} 
        onNavigate={onNavigate}
        isHeroHeader={isHeroHeader}
        isDetailView={isDetailView}
        detailTitle={detailTitle}
        onBack={onBack}
        cartCount={cartCount}
        onCartClick={onCartClick}
        companyName={appName}
        subLabel={appSubLabel}
        logoUrl={appLogoUrl}
      />

      {/* Main Content */}
      {/* Added pb-24 on mobile to clear the fixed Bottom Navigation */}
      <main className="flex-grow w-full relative pb-24 md:pb-0">
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

      {currentView !== ViewState.CHECKOUT_PAYMENT && (
        <MobileNavigasi currentView={currentView} onNavigate={onNavigate} />
      )}
      
    </div>
  );
};
