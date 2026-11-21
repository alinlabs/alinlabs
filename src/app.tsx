
import React, { useState, useEffect, Suspense, startTransition } from 'react';
import { Layout } from './components/layout/layout';
import { ViewState, IdentityData } from './types';
import { MetaTagManager } from './components/seo/meta-tag-manager';
import { WelcomePopup } from './components/common/welcome-popup';
import { ChatAssistant } from './features/chat/chat-assistant';
import { Loading } from './components/ui/loading';
import { RouteErrorBoundary } from './components/ui/route-error-boundary';
import { NetworkStatusBanner } from './components/ui/network-status-banner';
import { resolveServiceRoute } from './utils/network-cache';
import { routeLoaders, prefetchRoute } from './utils/route-prefetch';

// Lazy loading major views
const Beranda = React.lazy(routeLoaders[ViewState.HOME]);
const Tentang = React.lazy(routeLoaders[ViewState.ABOUT]);
const Kontak = React.lazy(routeLoaders[ViewState.CONTACT]);
const Layanan = React.lazy(routeLoaders[ViewState.PRODUCTS]);
const Portofolio = React.lazy(routeLoaders[ViewState.PORTFOLIO]);
const LegalPage = React.lazy(routeLoaders[ViewState.PRIVACY_POLICY]);
const Checkout = React.lazy(routeLoaders[ViewState.CHECKOUT_PAYMENT]);

// Global Identity Data
const identityData: IdentityData = {
  "nama": "AlinLabs",
  "slogan": "Ekosistem Digital Terintegrasi & Pusat Kreativitas",
  "subLabel": "Digital Agency",
  "urlLogo": "/gambar/logo-icon-color.png",
  "urlLottieLogo": "/lottie/logo.lottie",
  "instruksiSistem": "Anda adalah asisten Customer Care (Aira) untuk AlinLabs Indonesia. Jawablah pertanyaan seputar layanan pembuatan website, produksi video, dan pemasaran digital. PENTING: Gunakan format teks biasa (Plain Text) saja. JANGAN gunakan format Markdown seperti bold (**), italic (*), bullet points (-), atau heading (#). Tulis jawaban dalam paragraf yang rapi dan bahasa Indonesia yang profesional namun ramah, layaknya percakapan WhatsApp atau Live Chat personal."
};

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  // Scroll layout container to top whenever currentView changes
  useEffect(() => {
    window.dispatchEvent(new Event('layout-scroll-top'));
  }, [currentView]);

  // Idle prefetch of primary routes for near-instant navigation
  useEffect(() => {
    const runPrefetch = () => {
      prefetchRoute(ViewState.PRODUCTS);
      prefetchRoute(ViewState.PORTFOLIO);
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(runPrefetch, { timeout: 2200 });
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
        }
      };
    }

    const timer = setTimeout(runPrefetch, 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- Routing Logic ---
  const getViewFromPath = (path: string): { view: ViewState, packageId: string | null, portfolioId: string | null } => {
    const p = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    
    if (p.startsWith('/layanan/') && p !== '/layanan') {
        const packageId = p.replace('/layanan/', '');
        return { view: ViewState.PRODUCTS, packageId, portfolioId: null };
    }

    if (p.startsWith('/portofolio/')) {
        const portfolioId = p.replace('/portofolio/', '');
        return { view: ViewState.PORTFOLIO, packageId: null, portfolioId };
    }

    let view = ViewState.HOME;
    switch (p) {
      case '/': view = ViewState.HOME; break;
      case '/layanan': view = ViewState.PRODUCTS; break;
      case '/portofolio': view = ViewState.PORTFOLIO; break;
      case '/tentang': view = ViewState.ABOUT; break;
      case '/kontak': view = ViewState.CONTACT; break;
      case '/legal/privacy': view = ViewState.PRIVACY_POLICY; break;
      case '/legal/terms': view = ViewState.TERMS_OF_SERVICE; break;
      case '/legal/license': view = ViewState.LICENSE; break;
      case '/checkout': view = ViewState.CHECKOUT_PAYMENT; break;
      case '/partnership/corporate': view = ViewState.PARTNERSHIP_CORPORATE; break;
      case '/partnership/community': view = ViewState.PARTNERSHIP_COMMUNITY; break;
      case '/partnership/individual': view = ViewState.PARTNERSHIP_INDIVIDUAL; break;
      case '/partnership/government': view = ViewState.PARTNERSHIP_GOVERNMENT; break;
      default: view = ViewState.HOME; break;
    }
    return { view, packageId: null, portfolioId: null };
  };

  const getPathFromState = (view: ViewState, packageId: string | null, portfolioId: string | null): string => {
    const resolved = resolveServiceRoute(view);
    const effectiveView = resolved.view;
    const effectivePackageId = packageId ?? resolved.packageId;

    if (effectiveView === ViewState.PRODUCTS && effectivePackageId) {
        return `/layanan/${effectivePackageId}`;
    }
    if (effectiveView === ViewState.PORTFOLIO && portfolioId) {
        return `/portofolio/${portfolioId}`;
    }

    switch (effectiveView) {
      case ViewState.HOME: return '/';
      case ViewState.PRODUCTS: return '/layanan';
      case ViewState.PORTFOLIO: return '/portofolio';
      case ViewState.ABOUT: return '/tentang';
      case ViewState.CONTACT: return '/kontak';
      case ViewState.CHECKOUT_PAYMENT: return '/checkout';
      case ViewState.PRIVACY_POLICY: return '/legal/privacy';
      case ViewState.TERMS_OF_SERVICE: return '/legal/terms';
      case ViewState.LICENSE: return '/legal/license';
      case ViewState.PARTNERSHIP_CORPORATE: return '/partnership/corporate';
      case ViewState.PARTNERSHIP_COMMUNITY: return '/partnership/community';
      case ViewState.PARTNERSHIP_INDIVIDUAL: return '/partnership/individual';
      case ViewState.PARTNERSHIP_GOVERNMENT: return '/partnership/government';
      default: return '/';
    }
  };

  const [checkoutData, setCheckoutData] = useState<any>(null);

  const handleNavigate = (view: ViewState, payload?: any) => {
    const resolved = resolveServiceRoute(view);
    const path = getPathFromState(resolved.view, resolved.packageId, null);

    startTransition(() => {
      setSelectedPackageId(resolved.packageId);
      setSelectedPortfolioId(null);
      setCurrentView(resolved.view);
      if (payload) {
        setCheckoutData(payload);
      }
    });

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }

    window.dispatchEvent(new Event('layout-scroll-top'));
  };

  const handlePackageSelect = (id: string | null) => {
      startTransition(() => {
        setSelectedPackageId(id);
        setCurrentView(ViewState.PRODUCTS);
      });
      const path = getPathFromState(ViewState.PRODUCTS, id, null);
      if (window.location.pathname !== path) {
          window.history.pushState(null, '', path);
      }
      window.dispatchEvent(new Event('layout-scroll-top'));
  };

  const handlePortfolioSelect = (id: string | null) => {
      startTransition(() => {
        setSelectedPortfolioId(id);
        setCurrentView(ViewState.PORTFOLIO);
      });
      const path = getPathFromState(ViewState.PORTFOLIO, null, id);
      if (window.location.pathname !== path) {
          window.history.pushState(null, '', path);
      }
      window.dispatchEvent(new Event('layout-scroll-top'));
  };

  useEffect(() => {
    const { view, packageId, portfolioId } = getViewFromPath(window.location.pathname);
    setCurrentView(view);
    setSelectedPackageId(packageId);
    setSelectedPortfolioId(portfolioId);

    const onPopState = () => {
      const { view, packageId, portfolioId } = getViewFromPath(window.location.pathname);
      startTransition(() => {
        setCurrentView(view);
        setSelectedPackageId(packageId);
        setSelectedPortfolioId(portfolioId);
      });
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // --- Cart State ---

  const isDetailView = selectedPackageId !== null || 
    (selectedPortfolioId !== null && !['klien', 'galeri', 'website'].includes(selectedPortfolioId)) || 
    currentView === ViewState.CHECKOUT_PAYMENT;

  const handleHeaderBack = () => {
    if (selectedPackageId) {
        handlePackageSelect(null);
    } else if (selectedPortfolioId) {
        handlePortfolioSelect(null);
    } else {
        handleNavigate(ViewState.HOME);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Beranda onNavigate={handleNavigate} onPackageSelect={handlePackageSelect} />;
      case ViewState.PRODUCTS:
      case ViewState.SERVICE_ECOSYSTEM:
      case ViewState.SERVICE_ADS:
      case ViewState.SERVICE_CINEMA:
        return <Layanan 
            onNavigate={handleNavigate} 
            selectedPackageId={selectedPackageId ?? resolveServiceRoute(currentView).packageId}
            onPackageSelect={handlePackageSelect}
        />;
      case ViewState.PORTFOLIO:
        return <Portofolio 
            onNavigate={handleNavigate} 
            selectedItemId={selectedPortfolioId}
            onItemSelect={handlePortfolioSelect}
        />;
      case ViewState.ABOUT:
        return <Tentang />;
      case ViewState.CONTACT:
        return <Kontak />;
      case ViewState.PRIVACY_POLICY:
        return <LegalPage view={ViewState.PRIVACY_POLICY} onNavigate={handleNavigate} />;
      case ViewState.TERMS_OF_SERVICE:
        return <LegalPage view={ViewState.TERMS_OF_SERVICE} onNavigate={handleNavigate} />;
      case ViewState.LICENSE:
        return <LegalPage view={ViewState.LICENSE} onNavigate={handleNavigate} />;
      case ViewState.PARTNERSHIP_CORPORATE:
        return <LegalPage view={ViewState.PARTNERSHIP_CORPORATE} onNavigate={handleNavigate} />;
      case ViewState.PARTNERSHIP_COMMUNITY:
        return <LegalPage view={ViewState.PARTNERSHIP_COMMUNITY} onNavigate={handleNavigate} />;
      case ViewState.PARTNERSHIP_INDIVIDUAL:
        return <LegalPage view={ViewState.PARTNERSHIP_INDIVIDUAL} onNavigate={handleNavigate} />;
      case ViewState.PARTNERSHIP_GOVERNMENT:
        return <LegalPage view={ViewState.PARTNERSHIP_GOVERNMENT} onNavigate={handleNavigate} />;
      case ViewState.CHECKOUT_PAYMENT:
        return <Checkout onNavigate={handleNavigate} data={checkoutData} />;
      default:
        return <Beranda onNavigate={handleNavigate} onPackageSelect={handlePackageSelect} />;
    }
  };

  // Determine Detail Title
  let detailTitle: string | undefined = undefined;
  if (currentView === ViewState.PRODUCTS && selectedPackageId) {
    if (selectedPackageId === 'website-aplikasi') detailTitle = 'Pembuatan Website & Aplikasi Custom';
    else if (selectedPackageId === 'digital-marketing') detailTitle = 'Manajemen Konten & Iklan Sosial Media';
    else if (selectedPackageId === 'konten-live') detailTitle = 'Konten Instan & Live Service';
    else detailTitle = 'Detail Layanan';
  } else if (currentView === ViewState.PORTFOLIO && selectedPortfolioId && !['klien', 'galeri', 'website'].includes(selectedPortfolioId)) {
    detailTitle = 'Detail Portofolio';
  }

  const routeResetKey = `${currentView}:${selectedPackageId ?? ''}:${selectedPortfolioId ?? ''}`;

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate}
      isHeroHeader={
        currentView === ViewState.HOME || 
        currentView === ViewState.ABOUT || 
        currentView === ViewState.CONTACT || 
        currentView === ViewState.PRIVACY_POLICY ||
        currentView === ViewState.TERMS_OF_SERVICE ||
        currentView === ViewState.LICENSE ||
        currentView === ViewState.PARTNERSHIP_CORPORATE ||
        currentView === ViewState.PARTNERSHIP_COMMUNITY ||
        currentView === ViewState.PARTNERSHIP_INDIVIDUAL ||
        currentView === ViewState.PARTNERSHIP_GOVERNMENT ||
        currentView === ViewState.PRODUCTS || // Both Main and Detail have hero images now
        (currentView === ViewState.PORTFOLIO && !isDetailView) // Portfolio main has hero, detail is white
      }
      isDetailView={isDetailView}
      detailTitle={detailTitle}
      onBack={handleHeaderBack}
      scrollKey={routeResetKey}
      identity={identityData}
    >
      <MetaTagManager currentView={currentView} identity={identityData} />
      <NetworkStatusBanner />
      <WelcomePopup />
      <RouteErrorBoundary resetKey={routeResetKey} onNavigate={handleNavigate}>
        <Suspense fallback={<Loading view={currentView} />}>
          {renderView()}
        </Suspense>
      </RouteErrorBoundary>
      <ChatAssistant logoUrl={identityData?.urlLogo} />
    </Layout>
  );
}

export default App;
