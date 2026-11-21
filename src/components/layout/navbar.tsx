
import React, { useState } from 'react';
import { ViewState } from '../../types';
import { Menu, Globe, Box, Layers, Info, Mail, ArrowLeft } from 'lucide-react';
import { Sidebar } from './sidebar';
import { prefetchRoute } from '../../utils/route-prefetch';

interface NavbarProps {
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
    isHeroHeader: boolean;
    isDetailView?: boolean;
    detailTitle?: string;
    onBack?: () => void;
    isScrolled?: boolean;
    cartCount?: number;
    onCartClick?: () => void;
    companyName: string;
    subLabel: string;
    logoUrl?: string;
}

const NavbarComponent: React.FC<NavbarProps> = ({ 
    currentView, 
    onNavigate, 
    isHeroHeader, 
    isDetailView = false, 
    detailTitle,
    onBack,
    isScrolled = false,
    companyName,
    subLabel,
    logoUrl = "/lottie/logo.lottie"
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { label: 'Beranda', view: ViewState.HOME, icon: Globe },
        { label: 'Layanan', view: ViewState.PRODUCTS, icon: Box },
        { label: 'Portofolio', view: ViewState.PORTFOLIO, icon: Layers },
        { label: 'Tentang', view: ViewState.ABOUT, icon: Info },
        { label: 'Kontak', view: ViewState.CONTACT, icon: Mail },
    ];

    const handleNavClick = (view: ViewState) => {
        onNavigate(view);
        setIsSidebarOpen(false);
    };

    const isActive = (view: ViewState) => {
        if (currentView === view) return true;
        if (view === ViewState.PRODUCTS) {
            return [
                ViewState.SERVICE_ECOSYSTEM, 
                ViewState.SERVICE_ADS, 
                ViewState.SERVICE_CINEMA
            ].includes(currentView);
        }
        return false;
    };

    // Header occupies its own top slot outside the scroll container, so keep solid surface and dark text for consistent legibility
    const showSolidNav = true;
    const useDarkText = true || showSolidNav || !isHeroHeader;

    // Mobile Header Title Logic
    const getMobilePageTitle = () => {
        if (isDetailView && detailTitle) return detailTitle;
        switch(currentView) {
            case ViewState.PRODUCTS: return 'Layanan Kami';
            case ViewState.PORTFOLIO: return 'Galeri Karya';
            case ViewState.ABOUT: return 'Tentang AlinLabs';
            case ViewState.CONTACT: return 'Hubungi Kami';
            case ViewState.SERVICE_ECOSYSTEM: return 'Ekosistem Digital';
            case ViewState.SERVICE_ADS: return 'Digital Marketing';
            case ViewState.SERVICE_CINEMA: return 'Creative Studio';
            default: return companyName;
        }
    };

    // Explicitly enforce full brand name for Mobile Display
    const FULL_BRAND_NAME = "AlinLabs Indonesia";

    return (
        <>
            {/* ================= DESKTOP NAVBAR (md:block hidden on mobile) ================= */}
            <nav 
                className={`hidden md:block relative shrink-0 w-full z-[60] bg-white border-b border-slate-100 py-3 transition-[border-radius,box-shadow] duration-300 ${
                    isScrolled ? 'rounded-b-[1.5rem] shadow-md' : 'rounded-b-none shadow-none'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {isDetailView && onBack && (
                                <button 
                                    type="button"
                                    aria-label="Kembali"
                                    onClick={onBack}
                                    className={`p-2 rounded-full transition-all duration-300 group hover:bg-slate-100 ${useDarkText ? 'text-slate-900' : 'text-white'}`}
                                >
                                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                                </button>
                            )}

                            <div 
                                className="flex items-center gap-3 cursor-pointer group"
                                onClick={() => !isDetailView && handleNavClick(ViewState.HOME)}
                            >
                                <img loading="eager" 
                                    src={useDarkText ? "/gambar/logo-icon-color.png" : "/gambar/logo-icon-white.png"} 
                                    alt="Logo" 
                                    className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                                
                                <div className="flex flex-col justify-center">
                                    <h1 className={`font-bold text-xl tracking-tight leading-none truncate mb-0.5 ${useDarkText ? 'text-slate-900' : 'text-white'}`}>
                                        {isDetailView && detailTitle ? detailTitle : companyName}
                                    </h1>
                                    <p className={`text-[10px] uppercase tracking-widest font-bold leading-none truncate ${useDarkText ? 'text-slate-500' : 'text-white'}`}>
                                        {isDetailView && detailTitle ? companyName : subLabel}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-1">
                            {navItems.map((item) => {
                                const active = isActive(item.view);
                                let textColorClass = useDarkText 
                                    ? (active ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600')
                                    : (active ? 'text-white' : 'text-slate-300 hover:text-white');
                                const underlineColor = useDarkText ? 'bg-blue-600' : 'bg-white';

                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        onMouseEnter={() => prefetchRoute(item.view)}
                                        onFocus={() => prefetchRoute(item.view)}
                                        onClick={() => handleNavClick(item.view)}
                                        className={`relative px-3 py-2 text-sm font-bold whitespace-nowrap transition-colors duration-300 group ${textColorClass}`}
                                    >
                                        {item.label}
                                        <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full transition-transform duration-300 origin-center ${underlineColor} ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
                                    </button>
                                );
                            })}
                            
                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200/20">
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ================= MOBILE HEADER (md:hidden relative top) ================= */}
            <header 
                className={`md:hidden relative shrink-0 w-full z-[60] h-14 flex items-center bg-white border-b border-slate-100 transition-[border-radius,box-shadow] duration-300 ${
                    isScrolled ? 'rounded-b-[1.5rem] shadow-md' : 'rounded-b-none shadow-none'
                }`}
            >
                <div className="flex items-center justify-between w-full h-full px-5">
                    
                    {/* AREA KIRI: Gabungan Logo/Back + Judul */}
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {isDetailView && onBack && (
                            <button 
                                onClick={onBack}
                                className={`flex items-center justify-center p-1.5 -ml-1.5 rounded-full transition-colors shrink-0 ${
                                    useDarkText 
                                    ? 'hover:bg-slate-100 text-slate-700' 
                                    : 'hover:bg-white/10 text-white'
                                }`}
                            >
                                <ArrowLeft className="w-5 h-5 block" />
                            </button>
                        )}
                        <img loading="eager" 
                            src={useDarkText ? "/gambar/logo-icon-color.png" : "/gambar/logo-icon-white.png"} 
                            alt="Logo" 
                            className="w-7 h-7 sm:w-8 sm:h-8 object-contain cursor-pointer shrink-0 block"
                            onClick={() => handleNavClick(ViewState.HOME)}
                        />

                        {/* Title Text - Vertically Centered & Left Aligned next to Logo */}
                        <div className="flex flex-col justify-center min-w-0">
                            {/* Baris 1: Judul Utama */}
                            <span className={`font-bold text-[15px] sm:text-base leading-none truncate ${
                                useDarkText ? 'text-slate-900' : 'text-white'
                            }`}>
                                {currentView === ViewState.HOME ? FULL_BRAND_NAME : getMobilePageTitle()}
                            </span>

                            {/* Baris 2: Sub Judul */}
                            <span className={`text-[8.5px] font-bold tracking-widest uppercase leading-none truncate mt-0.5 ${
                                useDarkText ? 'text-blue-600' : 'text-white'
                            }`}>
                                {currentView === ViewState.HOME ? subLabel : FULL_BRAND_NAME}
                            </span>
                        </div>
                    </div>

                    {/* AREA KANAN: Menu Hamburger */}
                    <div className="flex items-center justify-end shrink-0">
                        <button 
                            type="button"
                            aria-label="Buka Menu"
                            onClick={() => setIsSidebarOpen(true)}
                            className={`flex items-center justify-center p-2 -mr-2 rounded-full transition-colors ${
                                useDarkText 
                                ? 'text-slate-600 hover:bg-slate-100' 
                                : 'text-white hover:bg-white/10'
                            }`}
                        >
                            <Menu className="w-6 h-6 block" />
                        </button>
                    </div>

                </div>
            </header>

            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)}
                currentView={currentView}
                onNavigate={onNavigate}
                companyName={companyName}
                logoUrl={logoUrl}
            />
        </>
    );
};

export const Navbar = React.memo(NavbarComponent);
