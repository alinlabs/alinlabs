import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { ViewState } from "../../../types";
import {
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Zap,
  Crown,
  Smartphone,
  LayoutTemplate,
  Clapperboard,
  Layers,
  Code,
  Check,
  X,
  Info,
  ShieldCheck,
  ArrowUpRight,
  Table2,
  LayoutGrid,
  Monitor,
  Tablet,
  Globe,
  AppWindow,
  FileText,
  ListChecks,
  Blocks,
  Key,
  Database,
  MonitorSmartphone,
  Headset,
  Server,
  FileQuestion,
  Shield,
  Link2,
  Mail,
  MapPin,
  FileSpreadsheet,
  ClipboardList,
  MessageCircle,
  CreditCard,
  Languages,
  Coins,
  Share2,
  Bot,
  Puzzle,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Apple,
  Laptop,
  Terminal,
  Github,
  Cloud
} from "lucide-react";
import { CustomDigitalMarketingBuilder } from "../../../components/ui/CustomDigitalMarketingBuilder";

// Static JSON imports to ensure Vercel loads them reliably
import dmData from "../../../public/data/opsiHarga-digital-marketing.json";
import waData from "../../../public/data/opsiHarga-website-aplikasi.json";
import klData from "../../../public/data/opsiHarga-konten-live.json";

export interface TechItem {
  nama: string;
  logo: string;
}

export interface PackageData {
  id: string;
  nama: string;
  slogan: string;
  deskripsi: string;
  deskripsiPanjang: string;
  fitur: string[];
  manfaat: string[];
  metrik?: { label: string; nilai: number; akhiran?: string }[];
  teknologi?: (string | TechItem)[];
  opsiHarga?: {
    nama: string;
    deskripsi?: string;
    hargaNormal: number;
    hargaPromo: number;
    hargaNormalLisensi?: number;
    hargaPromoLisensi?: number;
    proyek: string;
    layanan: string[];
    rekomendasi?: boolean;
    minimumTransaksi?: number;
    gratisDomain?: boolean;
    durasiGratisDomain?: string;
    ekstraDomain?: string[];
    aksesKontrol?: { brand: string; fitur: {role: string; deskripsi: string}[] };
    database?: (string | { platform: string; sistem: string[] })[];
    hosting?: string;
    durasiGratisHosting?: string;
    osSupport?: string[];
    layananDanJaminan?: string[];
    softwareAdaptiveSystem?: string[];
    integrasi?: string[];
  }[];
  gambar: string;
  warnaAksen: string; // e.g., 'bg-amber-500'
  gelap?: boolean;
}

interface PackageDetailProps {
  data: PackageData;
  onBack: () => void;
  onNavigate: (view: ViewState, payload?: any) => void;
}

const MobileCardSlider = ({ section, cards }: { section: any, cards: React.ReactNode[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (cards.length === 0 || container.scrollWidth === 0) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    
    const proportion = container.scrollLeft / maxScroll;
    const newIndex = Math.round(proportion * (cards.length - 1));
    
    if (newIndex >= 0 && newIndex < cards.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="flex flex-col relative pb-4 w-full">
      <div className="text-center px-4 mb-4">
        <h3 className="text-xl font-bold tracking-tight text-slate-800">{section.title}</h3>
        <p className="text-[13px] text-slate-500 mt-1 max-w-[280px] mx-auto leading-relaxed">{section.desc}</p>
      </div>
      <div className="relative w-full">
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 pt-2 scrollbar-hide"
          onScroll={handleScroll}
        >
          {cards.map((card, cIdx) => (
            <div key={cIdx} className="snap-center shrink-0 w-[85vw] max-w-[400px]">
              {card}
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center items-center gap-2 absolute bottom-2 left-0 right-0 pointer-events-none">
          {cards.map((_, i) => (
             <div 
               key={i} 
               className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-blue-600' : 'w-2 bg-slate-300'}`}
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Main: React.FC<PackageDetailProps> = ({
  data,
  onBack,
  onNavigate,
}) => {
  const [opsiHargaList, setOpsiHargaList] = useState(data.opsiHarga || []);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'paket' | 'info'>('paket');
  const [showTable, setShowTable] = useState<boolean>(false);
  const [tableZoom, setTableZoom] = useState<number>(1);
  const [billingPeriod, setBillingPeriod] = useState<"bulanan" | "tahunan" | "lisensi">("bulanan");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDetail) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDetail]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const getBillingPrices = (opsi: any) => {
    let basePromo = opsi.hargaPromo;
    let baseNormal = opsi.hargaNormal;
    let descProject = opsi.proyek || "Bulan";
    
    if (billingPeriod === "tahunan") {
      basePromo = opsi.hargaPromoTahunan;
      baseNormal = opsi.hargaNormalTahunan;
      descProject = "Tahun";
    } else if (billingPeriod === "lisensi") {
      basePromo = opsi.hargaPromoLisensi;
      baseNormal = opsi.hargaNormalLisensi;
      descProject = "Selamanya";
    }
    
    return {
      promo: basePromo,
      normal: baseNormal,
      proyek: descProject
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(() => {
    if (data.id === "digital-marketing") {
      setOpsiHargaList(dmData);
    } else if (data.id === "website-aplikasi") {
      setOpsiHargaList(waData);
    } else if (data.id === "konten-live") {
      setOpsiHargaList(klData);
    } else {
      setOpsiHargaList(data.opsiHarga || []);
    }
  }, [data.id, data.opsiHarga]);

  const getOsIcon = (osName: string, className: string = "w-4 h-4") => {
    const osLower = osName.toLowerCase();
    let src = "";
    if (osLower.includes('windows')) src = "/icon/windows.png";
    else if (osLower.includes('ios')) src = "/icon/ios.png";
    else if (osLower.includes('android')) src = "/icon/android.png";
    else if (osLower.includes('pwa')) src = "/icon/pwa.png";
    else if (osLower.includes('play store')) src = "/icon/playstore.png";
    else if (osLower.includes('app store')) src = "/icon/appstroe.png";
    
    if (src) {
        return <img loading="lazy" src={src} className={`${className.replace(/text-[a-z]+-[0-9]+/g, '').trim()} object-contain`} alt={osName} />;
    }
    return <AppWindow className={className} />;
  }

  // Determine Icon based on ID
  const renderIcon = () => {
    switch (data.id) {
      case "digital-marketing":
        return <Smartphone className="w-8 h-8 text-purple-300" />;
      case "website-aplikasi":
        return <LayoutTemplate className="w-8 h-8 text-sky-300" />;
      case "konten-live":
        return <Clapperboard className="w-8 h-8 text-orange-300" />;
      default:
        return <Zap className="w-8 h-8 text-white" />;
    }
  };

  // Robust color extraction
  // Assumes format: bg-{color}-{weight}
  const colorParts = data.warnaAksen.split("-");
  const colorName = colorParts[1] || "slate";

  const textThemeClass = `text-${colorName}-600`;
  const bgThemeSoftClass = `bg-${colorName}-100`;
  const bgThemeLighterClass = `bg-${colorName}-50`;
  const borderThemeClass = `border-${colorName}-200`;

  const formatHargaBesar = (harga: number) => {
    if (harga >= 999500) {
      return `${(harga / 1000000).toLocaleString("id-ID", { maximumFractionDigits: 2 })} Jt`;
    } else if (harga >= 1000) {
      return `${(harga / 1000).toLocaleString("id-ID", { maximumFractionDigits: 0 })} Rb`;
    }
    return harga.toLocaleString("id-ID");
  };

  const getBanners = () => {
    switch (data.id) {
      case "digital-marketing":
        return { desktop: "/gambar/banner-desktop2.webp", mobile: "/gambar/banner-mobile2.webp" };
      case "website-aplikasi":
        return { desktop: "/gambar/banner-desktop1.webp", mobile: "/gambar/banner-mobile1.webp" };
      case "konten-live":
        return { desktop: "/gambar/banner-desktop3.webp", mobile: "/gambar/banner-mobile3.webp" };
      default:
        return { desktop: "/gambar/banner-desktop1.webp", mobile: "/gambar/banner-mobile1.webp" };
    }
  };

  const banners = getBanners();

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right-10 duration-500">
      {/* Hero Header */}
      <div className="w-full relative bg-slate-100 md:aspect-[21/9]">
        <img loading="lazy" 
            src={banners.desktop} 
            alt={data.nama} 
            className="hidden md:block w-full h-full object-cover"
        />
        <img loading="lazy" 
            src={banners.mobile} 
            alt={data.nama} 
            className="block md:hidden w-full h-auto object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-10 relative z-20 pb-10 md:pb-20">
        {/* Metrics Row */}
        {data.metrik && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-10 w-full">
            {data.metrik.map((metric, idx) => (
              <div
                key={idx}
                className="bg-white p-2 sm:p-3 md:p-4 rounded-xl md:rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`text-sm sm:text-lg md:text-xl font-extrabold mb-0.5 ${textThemeClass}`}
                >
                  {metric.nilai}
                  {metric.akhiran}
                </div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest break-words w-full">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Tabs */}
        <div className="flex md:hidden border-b border-slate-200 mb-6 bg-slate-50 sticky z-30" style={{ top: '60px' }}>
          <button 
             onClick={() => setActiveTab('paket')}
             className={`flex-1 py-3.5 text-sm font-bold text-center relative transition-colors ${activeTab === 'paket' ? 'text-slate-900' : 'text-slate-500'}`}
          >
             Pilihan Layanan
             {activeTab === 'paket' && <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${data.warnaAksen}`}></div>}
          </button>
          <button 
             onClick={() => setActiveTab('info')}
             className={`flex-1 py-3.5 text-sm font-bold text-center relative transition-colors ${activeTab === 'info' ? 'text-slate-900' : 'text-slate-500'}`}
          >
             Informasi Umum
             {activeTab === 'info' && <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${data.warnaAksen}`}></div>}
          </button>
        </div>

        <div className={`${activeTab === 'info' ? 'flex' : 'hidden'} md:flex flex-col space-y-6 md:space-y-8 w-full`}>
          {/* Main Column */}
          <div className="w-full space-y-6 md:space-y-8">
            {/* Long Description & Benefits */}
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <h4 className="font-bold text-slate-900 mb-4 md:mb-6 uppercase text-xs md:text-sm tracking-wider flex items-center">
                <span
                  className={`w-1.5 h-5 rounded-full mr-3 ${data.warnaAksen}`}
                ></span>
                Seputar Layanan
              </h4>
              <p className="text-slate-600 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                {data.deskripsiPanjang}
              </p>

              <h4 className="font-bold text-slate-900 mb-4 md:mb-6 uppercase text-xs md:text-sm tracking-wider flex items-center">
                <span
                  className={`w-1.5 h-5 rounded-full mr-3 ${data.warnaAksen}`}
                ></span>
                Manfaat Utama
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
                {data.manfaat &&
                  data.manfaat.map((benefit, idx) => (
                    <div key={idx} className="flex items-start group">
                      <div
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 transition-colors ${bgThemeSoftClass} ${textThemeClass} group-hover:bg-slate-900 group-hover:text-white`}
                      >
                        <Check
                          className="w-3 h-3 md:w-3.5 md:h-3.5"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-sm md:text-base text-slate-700 font-medium leading-snug group-hover:text-slate-900 transition-colors">
                        {benefit}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Tech Stack Visualization (MOVED INSIDE) */}
              {data.teknologi && (
                <div className="mt-auto pt-6 md:pt-8 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 md:mb-6 uppercase text-xs md:text-sm tracking-wider flex items-center">
                    <span
                      className={`w-1.5 h-5 rounded-full mr-3 ${data.warnaAksen}`}
                    ></span>
                    Teknologi & Tools
                  </h4>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {data.teknologi.map((tech, idx) => {
                      const isObject = typeof tech === "object";
                      const techName = isObject
                        ? (tech as TechItem).nama
                        : (tech as string);
                      const techLogo = isObject
                        ? (tech as TechItem).logo
                        : `https://placehold.co/40x40?text=${techName.substring(0, 2)}`;

                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow"
                        >
                          <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                            <img loading="lazy"
                              src={techLogo}
                              alt={techName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="font-bold text-slate-700 text-xs md:text-sm">
                            {techName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Options */}
        {data.id === 'digital-marketing' ? (
          <div className={`${activeTab === 'paket' ? 'block' : 'hidden'} md:block mt-2 md:mt-16`}>
            <h3 className="hidden md:flex text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center justify-center items-center">
              <span className={`w-8 h-2 rounded-full mr-4 ${data.warnaAksen}`}></span>
              Pilihan Layanan
              <span className={`w-8 h-2 rounded-full ml-4 ${data.warnaAksen}`}></span>
            </h3>
            <CustomDigitalMarketingBuilder onNavigate={onNavigate} dataNama={data.nama} />
          </div>
        ) : (
          opsiHargaList && opsiHargaList.length > 0 && (
            <div className={`${activeTab === 'paket' ? 'block' : 'hidden'} md:block mt-2 md:mt-16`}>
              <div className="flex flex-col xl:flex-row justify-between items-center mb-8 gap-4 w-full max-w-7xl mx-auto">
                <h3 className="hidden xl:flex text-2xl md:text-3xl font-extrabold text-slate-900 text-center justify-center items-center">
                  <span
                    className={`w-8 h-2 rounded-full mr-4 ${data.warnaAksen}`}
                  ></span>
                  Pilihan Paket Harga
                  <span
                    className={`w-8 h-2 rounded-full ml-4 ${data.warnaAksen}`}
                  ></span>
                </h3>
                
                <div className="flex flex-row items-center justify-start md:justify-end gap-2 w-full xl:w-auto flex-nowrap overflow-visible">
                  <div className="relative flex-shrink-0 z-50 flex-1 md:flex-none" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center justify-between bg-white border border-slate-200 text-slate-700 font-bold text-xs md:text-sm py-2 pl-3 pr-2 md:py-2.5 md:pl-6 md:pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors gap-2 w-full"
                    >
                      <div className="flex items-center gap-1.5">
                         <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                           <Zap className="w-3 h-3 md:w-3.5 md:h-3.5" />
                         </div>
                         <span className="hidden md:inline">
                           {billingPeriod === "bulanan" && "Sewa Per Bulan"}
                           {billingPeriod === "tahunan" && "Sewa Per Tahun"}
                           {billingPeriod === "lisensi" && "Beli Lisence Penuh"}
                         </span>
                         <span className="inline md:hidden">
                           {billingPeriod === "bulanan" && "Bulanan"}
                           {billingPeriod === "tahunan" && "Tahunan"}
                           {billingPeriod === "lisensi" && "Beli Lisensi"}
                         </span>
                      </div>
                      <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-[180px] md:w-[220px] bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-[60] animate-in fade-in slide-in-from-top-2">
                        <button
                          onClick={() => { setBillingPeriod("bulanan"); setIsDropdownOpen(false); }}
                          className={`flex items-center w-full px-4 md:px-5 py-3 text-left transition-colors ${billingPeriod === "bulanan" ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-600 hover:bg-slate-50 font-medium"} text-xs md:text-sm`}
                        >
                          <span className="hidden md:inline">Sewa Per Bulan</span>
                          <span className="inline md:hidden">Bulanan</span>
                        </button>
                        <button
                          onClick={() => { setBillingPeriod("tahunan"); setIsDropdownOpen(false); }}
                          className={`flex items-center w-full px-4 md:px-5 py-3 text-left transition-colors ${billingPeriod === "tahunan" ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-600 hover:bg-slate-50 font-medium"} text-xs md:text-sm`}
                        >
                          <span className="hidden md:inline">Sewa Per Tahun</span>
                          <span className="inline md:hidden">Tahunan</span>
                        </button>
                        <button
                          onClick={() => { setBillingPeriod("lisensi"); setIsDropdownOpen(false); }}
                          className={`flex items-center w-full px-4 md:px-5 py-3 text-left transition-colors ${billingPeriod === "lisensi" ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-600 hover:bg-slate-50 font-medium"} text-xs md:text-sm`}
                        >
                          <span className="hidden md:inline">Beli Lisence Penuh</span>
                          <span className="inline md:hidden">Beli Lisensi</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 gap-2 items-center flex-1 md:flex-none justify-start md:justify-end">
                    {showTable && (
                      <div className="flex bg-white border-2 border-blue-600/30 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                         <button 
                            onClick={() => setTableZoom(Math.max(0.5, tableZoom - 0.1))} 
                            className="p-1.5 md:p-2 hover:bg-slate-100 text-blue-700 transition-colors border-r border-blue-600/30 focus:outline-none"
                            title="Zoom Out"
                         >
                           <ZoomOut className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                         </button>
                         <button 
                            onClick={() => setTableZoom(Math.min(1.5, tableZoom + 0.1))} 
                            className="p-1.5 md:p-2 hover:bg-slate-100 text-blue-700 transition-colors focus:outline-none"
                            title="Zoom In"
                         >
                           <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                         </button>
                      </div>
                    )}
                    <button
                      onClick={() => setShowTable(!showTable)}
                      className="flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-2.5 bg-white border-2 border-blue-600 text-blue-700 rounded-full font-bold shadow-sm hover:bg-blue-50 transition-colors text-xs md:text-sm flex-1 md:flex-none"
                    >
                      {showTable ? (
                         <>
                            <LayoutGrid className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden md:inline">Tampilan Card</span>
                            <span className="inline md:hidden">Cards</span>
                         </>
                      ) : (
                         <>
                            <Table2 className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="hidden md:inline">Tabel Perbandingan</span>
                            <span className="inline md:hidden">Bandingkan</span>
                         </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {showTable ? (
                <div className="max-w-7xl mx-auto overflow-x-auto custom-scrollbar relative rounded-2xl shadow-sm border border-slate-200 bg-white">
                  <table className="w-full border-separate border-spacing-0 text-sm" style={{ zoom: tableZoom }}>
                    <thead>
                      <tr>
                        <th className="p-4 md:p-6 text-center md:text-left border-b border-r border-slate-200 bg-slate-50 font-bold text-slate-900 min-w-[70px] md:min-w-[200px] sticky left-0 z-20">
                           <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2">
                             <Puzzle className="w-5 h-5 md:w-5 text-blue-600 flex-shrink-0" />
                             <span className="hidden md:inline">Fitur / Spesifikasi</span>
                           </div>
                         </th>
                         {opsiHargaList.map((opsi, idx) => {
                           const priceInfo = getBillingPrices(opsi);
                           return (
                            <th key={idx} className="p-4 md:p-6 border-b border-slate-200 bg-slate-50 min-w-[250px] align-top text-center w-[250px]">
                               <div className="inline-flex items-center px-3 py-1 bg-[#2563EB] text-white rounded-full font-bold text-xs md:text-sm mb-3">
                                  {opsi.nama}
                               </div>
                               <div className="text-sm line-through decoration-red-400 text-slate-500 mb-1">
                                  Rp {priceInfo.normal.toLocaleString("id-ID")}
                               </div>
                               <div className="text-xl md:text-2xl font-extrabold text-[#2563EB]">
                                  Rp {formatHargaBesar(priceInfo.promo)}
                               </div>
                               {opsi.proyek && (
                                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">/ {priceInfo.proyek}</div>
                               )}
                               <button
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   onNavigate(ViewState.CHECKOUT_PAYMENT, {
                                     packageName: data.nama,
                                     opsiName: opsi.nama,
                                     price: priceInfo.promo,
                                     minimumTransaksi: opsi.minimumTransaksi,
                                     opsiData: opsi
                                   });
                                 }}
                                 className={`mt-4 w-full py-2 rounded-lg font-bold text-xs shadow-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors`}
                               >
                                 Pilih Paket
                               </button>
                            </th>
                         );
                         })}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Layanan */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <ListChecks className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left">Fitur</span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => (
                           <td key={idx} className="p-4 border-b border-slate-200 align-top">
                              <ul className="space-y-1">
                                {opsi.layanan?.map((item: string, i: number) => (
                                  <li key={i} className="text-xs text-slate-600 flex items-start">
                                    <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0 mt-1.5"></div>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                           </td>
                        ))}
                      </tr>
                      {/* Integrasi */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <Blocks className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left">Integrasi</span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => (
                           <td key={idx} className="p-4 border-b border-slate-200 align-top">
                              {opsi.integrasi && opsi.integrasi.length > 0 ? (
                                <ul className="space-y-2">
                                  {opsi.integrasi.map((item: string, i: number) => {
                                    const lowerItem = item.toLowerCase();
                                    const isGoogleForm = lowerItem.includes("google form");
                                    const isCustomForm = lowerItem.includes("custom form");
                                    const isWhatsApp = lowerItem.includes("whatsapp") || /\bwa\b/.test(lowerItem);
                                    const isGoogleMaps = lowerItem.includes("google maps") || lowerItem.includes("peta") || lowerItem.includes("tracking");
                                    const isEmailJs = lowerItem.includes("email js") || lowerItem.includes("email");
                                    const isCustomChat = lowerItem.includes("custom chat") || lowerItem.includes("chat kustom");
                                    const isPayment = lowerItem.includes("payment");
                                    const isMultiBahasa = lowerItem.includes("multibahasa") || lowerItem.includes("multi bahasa") || lowerItem.includes("bahasa");
                                    const isMultiKurs = lowerItem.includes("multikurs") || lowerItem.includes("multi kurs") || lowerItem.includes("kurs");
                                    const isSosialMedia = lowerItem.includes("sosial media");
                                    const isAsistenAi = lowerItem.includes("asistenai") || lowerItem.includes("chat kompleks");
                                    const isDatabaseManager = lowerItem.includes("database manager");
                                    const isRequestApi = lowerItem.includes("request api");

                                    if (isGoogleForm || isCustomForm || isWhatsApp || isGoogleMaps || isEmailJs || isCustomChat || isPayment || isMultiBahasa || isMultiKurs || isSosialMedia || isAsistenAi || isDatabaseManager || isRequestApi) {
                                      return (
                                        <li key={i} className="flex items-center text-xs text-slate-700 py-1">
                                          {isGoogleForm && <img loading="lazy" src="/icon/form.png" alt="Form" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isCustomForm && <img loading="lazy" src="/icon/form.png" alt="Form" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isWhatsApp && <img loading="lazy" src="/icon/whatsapp.png" alt="WhatsApp" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isGoogleMaps && <img loading="lazy" src="/icon/maps.png" alt="Maps" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isEmailJs && <img loading="lazy" src="/icon/gmail.png" alt="Email" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isCustomChat && <img loading="lazy" src="/icon/chat-custom.png" alt="Custom Chat" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isPayment && <img loading="lazy" src="/icon/payment-card.png" alt="Payment" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isMultiBahasa && <img loading="lazy" src="/icon/translate.png" alt="Translate" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isMultiKurs && <img loading="lazy" src="/icon/kurs.png" alt="Kurs" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isSosialMedia && <img loading="lazy" src="/icon/social-media.png" alt="Social Media" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isAsistenAi && <img loading="lazy" src="/icon/chat-asisten.png" alt="AI Chat" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isDatabaseManager && <img loading="lazy" src="/icon/database-link.png" alt="Database" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          {isRequestApi && <img loading="lazy" src="/icon/api.png" alt="API" className="w-4 h-4 mr-2 object-contain flex-shrink-0" />}
                                          <span>{item}</span>
                                        </li>
                                      );
                                    }
                                    return (
                                      <li key={i} className="flex items-center text-xs text-slate-600 py-1">
                                        <div className="w-4 h-4 mr-2 flex items-center justify-center flex-shrink-0">
                                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                                        </div>
                                        <span>{item}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : (
                                <span className="text-slate-400 italic text-xs">-</span>
                              )}
                           </td>
                        ))}
                      </tr>
                      {/* Gratis Domain */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <Globe className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left">Domain</span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => (
                           <td key={idx} className="p-4 border-b border-slate-200 align-top">
                             {opsi.gratisDomain ? (
                               <div className="flex flex-col gap-0.5">
                                 {(() => {
                                   const match = opsi.durasiGratisDomain?.match(/(.*?)\s*\((.*?)\)/);
                                   if (match) {
                                      const [, duration, ext] = match;
                                      const extList = ext.split('/').map(e => e.trim());
                                      let mainExts = extList;
                                      let prevExtsList: string[] = [];
                                      if (idx > 0) {
                                        let j = idx - 1;
                                        let prevExts = [];
                                        while (j >= 0) {
                                          const matchJ = opsiHargaList[j].durasiGratisDomain?.match(/\((.*?)\)/);
                                          if (matchJ && matchJ[1] !== ext) {
                                            prevExts = matchJ[1].split('/').map(e => e.trim());
                                            break;
                                          }
                                          j--;
                                        }
                                        if (prevExts.length > 0) {
                                          mainExts = extList.filter(e => !prevExts.includes(e));
                                          if (mainExts.length === 0) {
                                            mainExts = extList;
                                          } else {
                                            prevExtsList = extList.filter(e => prevExts.includes(e));
                                          }
                                        }
                                      }
                                      return (
                                        <>
                                          <div className="flex flex-wrap items-center gap-2">
                                            <div className="text-slate-800 text-sm font-bold">
                                              {mainExts.join(' / ')}
                                            </div>
                                            <span className="inline-flex overflow-hidden rounded text-[10px] font-bold tracking-wide h-4 items-stretch">
                                              <span className="bg-[#FFD616] text-black px-1.5 flex items-center justify-center">Gratis</span>
                                              <span className="bg-red-600 text-white px-1.5 flex items-center justify-center">{duration.replace('1 Tahun', '1 Thn')}</span>
                                            </span>
                                          </div>
                                         <ul className="space-y-1 mt-1 pl-1">
                                           <li className="text-xs text-slate-600 flex items-center">
                                             <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0"></div>
                                             {opsi.ekstraDomain ? `${1 + opsi.ekstraDomain.length} Domain Gratis` : `1 Domain Gratis`}
                                           </li>
                                           {opsi.ekstraDomain && opsi.ekstraDomain.length > 0 && (
                                             <li className="text-xs text-slate-600 font-medium flex items-center">
                                                <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0 mt-0.5"></div>
                                                <div className="flex-1 flex items-start flex-wrap gap-x-1">
                                                <span className="shrink-0 text-slate-400 font-normal">Gratis Tambahan</span> <span className="font-bold text-slate-800">{opsi.ekstraDomain.join(' + ')}</span> 
                                                </div>
                                             </li>
                                           )}
                                           {prevExtsList.length > 0 && (
                                             <li className="text-xs text-slate-600 flex items-start">
                                               <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0 mt-1.5"></div>
                                               <span className="text-slate-500 leading-tight">Atau bebas pilih domain {prevExtsList.join(', ')}</span>
                                             </li>
                                           )}
                                           <li className="text-xs text-slate-600 flex items-start mt-1.5">
                                               <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0 mt-1.5"></div>
                                               <span className="leading-tight">Include Setup, Konfigurasi, CNAME www & SSL</span>
                                             </li>
                                           
                                         </ul>
                                       </>
                                     );
                                   }
                                   return (
                                     <>
                                       <ul className="space-y-1 mt-1 pl-1">
                                         <li className="text-xs text-slate-600 flex items-center">
                                           <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0"></div>
                                           {opsi.durasiGratisDomain || 'Ya'}
                                         </li>
                                         <li className="text-xs text-slate-600 flex items-start mt-1.5">
                                               <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0 mt-1.5"></div>
                                               <span className="leading-tight">Include Setup, Konfigurasi, CNAME www & SSL</span>
                                             </li>
                                         
                                       </ul>
                                     </>
                                   );
                                 })()}
                               </div>
                             ) : (
                               <div className="text-slate-800 text-xs font-medium">
                                 Tidak Termasuk
                               </div>
                             )}
                           </td>
                        ))}
                      </tr>
                      {/* Akses Kontrol */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <Key className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left"><span className="hidden md:inline">Akses Kontrol</span><span className="md:hidden">Akses</span></span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => (
                           <td key={idx} className="p-4 border-b border-slate-200 align-top">
                              {opsi.aksesKontrol ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 mb-2">
                                    <img loading="lazy" 
                                      src={opsi.aksesKontrol.brand.toLowerCase().includes('ailab') ? '/icon/ailab-akses.png' : '/icon/custom-akses.png'} 
                                      alt={opsi.aksesKontrol.brand} 
                                      className="w-5 h-5 object-contain" 
                                    />
                                    <span className="text-slate-800 text-xs md:text-sm font-bold">{opsi.aksesKontrol.brand}</span>
                                  </div>
                                  <ul className="space-y-2">
                                    {opsi.aksesKontrol.fitur.map((item: any, i: number) => (
                                      <li key={i} className="flex flex-col text-blue-700 bg-blue-50/50 px-2 py-1.5 rounded-md">
                                        <div className="flex items-center text-xs font-bold text-blue-800 mb-0.5">
                                          <Check className="w-3.5 h-3.5 mr-1.5 text-blue-500 flex-shrink-0" />
                                          {item.role}
                                        </div>
                                        <span className="text-[10px] text-blue-600 pl-5">{item.deskripsi}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <span className="text-slate-400 italic text-xs">*Tidak ada akses kontrol</span>
                              )}
                           </td>
                        ))}
                      </tr>
                      {/* Database */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <Database className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left">Database</span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => (
                           <td key={idx} className="p-4 border-b border-slate-200 align-top">
                              {opsi.database && opsi.database.length > 0 ? (
                                <div className="space-y-3">
                                  {opsi.database.map((dbInfo: any, i: number) => (
                                    typeof dbInfo === 'string' ? (
                                      <div key={i} className="text-xs text-slate-700">{dbInfo}</div>
                                    ) : (
                                      <div key={i} className="flex flex-col mb-2">
                                        <div className="flex items-center gap-2 mb-1">
                                          <img loading="lazy" 
                                            src={
                                              dbInfo.platform.toLowerCase().includes('github') ? '/icon/github.png' :
                                              dbInfo.platform.toLowerCase().includes('serverless') ? '/icon/static.png' : 
                                              '/icon/cloudflare.png'
                                            } 
                                            alt={dbInfo.platform} 
                                            className="w-5 h-5 object-contain" 
                                          />
                                          <span className="text-xs font-bold text-slate-800">{dbInfo.platform}</span>
                                        </div>
                                        <ul className="space-y-1 mt-1 pl-2">
                                          {dbInfo.sistem?.map((item: string, j: number) => (
                                            <li key={j} className="text-xs text-slate-600 flex items-center">
                                              <div className="w-1 h-1 rounded-full bg-slate-400 mr-2 flex-shrink-0"></div>
                                              {item}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )
                                  ))}
                                </div>
                              ) : (
                                <span className="text-slate-400 italic text-xs">*Tidak ada database</span>
                              )}
                           </td>
                        ))}
                      </tr>
                      {/* OS Support */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <MonitorSmartphone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left">OS Support</span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => {
                           if (!opsi.osSupport) {
                             return (
                               <td key={idx} className="p-4 border-b border-slate-200 align-top">
                                 <span className="text-slate-400 italic text-xs">-</span>
                               </td>
                             );
                           }

                           const supportedOS = opsi.osSupport.map((item: string) => item.toLowerCase());
                           const hasWindows = supportedOS.some((os: string) => os.includes('windows'));
                           const hasIOS = supportedOS.some((os: string) => os.includes('ios'));
                           const hasAndroid = supportedOS.some((os: string) => os.includes('android'));
                           const hasPWA = supportedOS.some((os: string) => os.includes('pwa'));
                           const hasAppStore = supportedOS.some((os: string) => os.includes('app store') || os.includes('appstore'));
                           const hasPlayStore = supportedOS.some((os: string) => os.includes('play store') || os.includes('playstore'));

                           return (
                             <td key={idx} className="p-4 border-b border-slate-200 align-top">
                               <div className="grid grid-cols-[auto_auto_1fr] gap-x-2 gap-y-2 items-center text-xs text-slate-600 whitespace-nowrap">
                                 {(hasWindows || hasIOS || hasAndroid) && (
                                   <>
                                     <span>UI/UX System</span>
                                     <span>:</span>
                                     <div className="flex items-center gap-2">
                                       {hasWindows && <img loading="lazy" src="/icon/windows.png" alt="Windows" title="Windows" className="w-5 h-5 object-contain" />}
                                       {hasIOS && <img loading="lazy" src="/icon/ios.png" alt="iOS" title="iOS" className="w-5 h-5 object-contain" />}
                                       {hasAndroid && <img loading="lazy" src="/icon/android.png" alt="Android" title="Android" className="w-5 h-5 object-contain" />}
                                     </div>
                                   </>
                                 )}
                                 {hasPWA && (
                                   <>
                                     <span>App Installer</span>
                                     <span>:</span>
                                     <div className="flex items-center gap-2">
                                       <img loading="lazy" src="/icon/pwa.png" alt="PWA" title="PWA" className="w-5 h-5 object-contain" />
                                     </div>
                                   </>
                                 )}
                                 {(hasAppStore || hasPlayStore) && (
                                   <>
                                     <span>Siap Publikasi</span>
                                     <span>:</span>
                                     <div className="flex items-center gap-2">
                                       {hasPlayStore && <img loading="lazy" src="/icon/playstore.png" alt="Play Store" title="Play Store" className="w-5 h-5 object-contain" />}
                                       {hasAppStore && <img loading="lazy" src="/icon/appstroe.png" alt="App Store" title="App Store" className="w-5 h-5 object-contain" />}
                                     </div>
                                   </>
                                 )}
                               </div>
                             </td>
                           );
                        })}
                      </tr>
                      {/* Hosting */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <Server className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left">Hosting</span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => (
                           <td key={idx} className="p-4 border-b border-slate-200 align-top">
                             {opsi.hosting ? (
                               <div className="flex flex-col gap-1 px-1">
                                 <div className="flex items-center gap-2 flex-wrap">
                                   <img loading="lazy" src="/icon/vercel.png" alt="Vercel" className="w-5 h-5 object-contain" />
                                   <div className="text-xs font-bold text-slate-800">{opsi.hosting}</div>
                                   {opsi.durasiGratisHosting && opsi.durasiGratisHosting !== "-" && (
                                     <span className="inline-flex overflow-hidden rounded text-[10px] font-bold tracking-wide h-4 items-stretch">
                                       <span className="bg-[#FFD616] text-black px-1.5 flex items-center justify-center">Gratis</span>
                                       <span className="bg-red-600 text-white px-1.5 flex items-center justify-center">{opsi.durasiGratisHosting.replace('1 Tahun', '1 Thn').replace('Selamanya (Free Tier)', 'Selamanya')}</span>
                                     </span>
                                   )}
                                 </div>
                               </div>
                             ) : (
                               <span className="text-slate-400 italic text-xs">-</span>
                             )}
                           </td>
                        ))}
                      </tr>
                      {/* Layanan & Jaminan */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-2 md:p-4 border-b border-r border-slate-200 font-semibold text-slate-700 bg-white sticky left-0 z-10 shadow-[1px_0_0_0_#e2e8f0] align-top md:align-middle pt-4 md:pt-4">
                          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
                            <Headset className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="text-[10px] md:text-base leading-tight md:leading-normal text-center md:text-left"><span className="hidden md:inline">Layanan & Jaminan</span><span className="md:hidden">Layanan</span></span>
                          </div>
                        </td>
                        {opsiHargaList.map((opsi, idx) => (
                           <td key={idx} className="p-4 border-b border-slate-200 align-top">
                              {opsi.layananDanJaminan && opsi.layananDanJaminan.length > 0 ? (
                                <ul className="space-y-2">
                                  {opsi.layananDanJaminan.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start text-slate-700 text-xs font-medium">
                                      <ShieldCheck className="w-3.5 h-3.5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-slate-400 italic text-xs">-</span>
                              )}
                           </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (() => {
                const isWebOrApp = data.nama.toLowerCase().includes("website") || data.nama.toLowerCase().includes("aplikasi");
                const showSectionsMobile = opsiHargaList.length === 9 && isWebOrApp;
                
                const renderedCards = opsiHargaList.map((opsi, idx) => {
                const priceInfo = getBillingPrices(opsi);
                return (
                <div
                  key={idx}
                  onClick={() => setSelectedDetail(opsi)}
                  className={`group relative cursor-pointer bg-white border border-slate-200/80 hover:border-blue-400 rounded-[2rem] p-5 sm:p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] transition-all duration-500 xl:duration-300 flex flex-col overflow-visible mt-1 md:mt-4 z-10 hover:z-20`}
                >
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-50/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                  {(() => {
                    const iconElement = (() => {
                      switch (opsi.nama) {
                        case 'LaunchPad': return <AppWindow className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'BrandSite': return <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'EngageSite': return <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'SystemCore': return <Server className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'ManageCore': return <LayoutGrid className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'AccessPro': return <Key className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'PortalPro': return <Laptop className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'GovernancePro': return <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'Enterprise Suite': return <Crown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'Paket Starter': return <Blocks className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'Paket Professional': return <Layers className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        case 'Paket Enterprise': return <Crown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                        default: return <Blocks className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1.5} />;
                      }
                    })();

                    return (
                      <>
                        <div className="hidden md:flex absolute md:-top-5 md:-left-5 lg:-top-6 lg:-left-6 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[1.15rem] shadow-[0_8px_16px_rgba(37,99,235,0.25)] items-center justify-center transform -rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110 z-10 border-[3px] border-white">
                          {iconElement}
                        </div>

                        {/* Arrow for mobile / hover */}
                        <div className="absolute top-5 md:top-7 right-5 md:right-7 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 pointer-events-none text-slate-300 z-10 bg-white/50 rounded-full p-1.5 backdrop-blur-sm group-hover:text-blue-600 group-hover:bg-blue-50/80">
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </div>

                        <div className="mb-3 md:mb-5 pr-10 md:pr-0 flex flex-row items-center gap-3 md:block md:pt-2 relative z-10">
                          <div className="flex md:hidden w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[14px] shadow-md items-center justify-center border-2 border-white flex-shrink-0">
                            {iconElement}
                          </div>
                          
                          <h4 className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-50 to-indigo-50/50 text-blue-700 border border-blue-100/60 rounded-full font-bold text-sm sm:text-[15px] md:text-lg shadow-[0_2px_10px_rgb(37,99,235,0.06)]">
                            {opsi.nama}
                          </h4>
                        </div>
                      </>
                    );
                  })()}

                  {opsi.deskripsi && (
                    <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-4 relative z-10 font-medium">
                      {opsi.deskripsi}
                    </p>
                  )}

                  <div className="mt-1 flex flex-col gap-3 md:gap-4 mb-2 mt-auto relative z-10">
                      {opsi.integrasi && opsi.integrasi.length > 0 && (
                        <div className="flex flex-col gap-1.5 w-full">
                           <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">Integrasi</span>
                           <div className="flex justify-start gap-1.5 sm:gap-2 items-center w-full flex-nowrap overflow-hidden">
                             {opsi.integrasi.slice(0, opsi.integrasi.length > 9 ? 8 : 9).map((item: string, idx: number) => {
                               const lowerItem = item.toLowerCase();
                               let src = "";
                               if (lowerItem.includes("google form") || lowerItem.includes("custom form")) src = "/icon/form.png";
                               else if (lowerItem.includes("whatsapp") || /\bwa\b/.test(lowerItem)) src = "/icon/whatsapp.png";
                               else if (lowerItem.includes("google maps") || lowerItem.includes("peta") || lowerItem.includes("tracking")) src = "/icon/maps.png";
                               else if (lowerItem.includes("email js") || lowerItem.includes("email")) src = "/icon/gmail.png";
                               else if (lowerItem.includes("custom chat") || lowerItem.includes("chat kustom") || lowerItem.includes("chat whatsapp")) src = "/icon/chat-custom.png";
                               else if (lowerItem.includes("payment")) src = "/icon/payment-card.png";
                               else if (lowerItem.includes("sosial media")) src = "/icon/social-media.png";
                               else if (lowerItem.includes("asistenai") || lowerItem.includes("chat kompleks")) src = "/icon/chat-asisten.png";
                               else if (lowerItem.includes("translate") || lowerItem.includes("bahasa")) src = "/icon/translate.png";
                               else if (lowerItem.includes("kurs")) src = "/icon/kurs.png";
                               else if (lowerItem.includes("api")) src = "/icon/api.png";
                               else if (lowerItem.includes("database")) src = "/icon/database-link.png";
                               
                               if (src) {
                                 return (
                                   <div key={idx} className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title={item}>
                                     <img loading="lazy" src={src} alt="icon" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain flex-shrink-0 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" />
                                   </div>
                                 );
                               }
                               return (
                                 <div key={idx} className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-full border border-slate-200 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title={item}>
                                   <span className="text-[10px] md:text-[11px] font-bold text-slate-400 group-hover/icon:text-blue-600 transition-colors duration-300">
                                     {item.charAt(0).toUpperCase()}
                                   </span>
                                 </div>
                               );
                             })}
                             {opsi.integrasi.length > 9 && <span className="text-[10px] md:text-xs text-slate-500 font-bold px-1 text-center flex-shrink-0">+{opsi.integrasi.length - 8}</span>}
                           </div>
                        </div>
                      )}
                      
                      {opsi.osSupport && opsi.osSupport.length > 0 && (() => {
                           const supportedOS = opsi.osSupport.map((item: string) => item.toLowerCase());
                           const hasWindows = supportedOS.some((os: string) => os.includes('windows'));
                           const hasIOS = supportedOS.some((os: string) => os.includes('ios'));
                           const hasAndroid = supportedOS.some((os: string) => os.includes('android'));
                           const hasPWA = supportedOS.some((os: string) => os.includes('pwa'));
                           const hasAppStore = supportedOS.some((os: string) => os.includes('app store') || os.includes('appstore'));
                           const hasPlayStore = supportedOS.some((os: string) => os.includes('play store') || os.includes('playstore'));
                           
                           return (
                             <div className="flex flex-col gap-1.5 w-full">
                               <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">OS Support</span>
                               <div className="flex justify-start gap-1 sm:gap-1.5 items-center w-full flex-nowrap overflow-hidden">
                                 {hasWindows && (
                                   <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title="Windows">
                                     <img loading="lazy" src="/icon/windows.png" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain flex-shrink-0 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" />
                                   </div>
                                 )}
                                 {hasIOS && (
                                   <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title="iOS">
                                     <img loading="lazy" src="/icon/ios.png" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain flex-shrink-0 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" />
                                   </div>
                                 )}
                                 {hasAndroid && (
                                   <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title="Android">
                                     <img loading="lazy" src="/icon/android.png" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain flex-shrink-0 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" />
                                   </div>
                                 )}
                                 {hasPWA && (
                                   <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title="PWA">
                                     <img loading="lazy" src="/icon/pwa.png" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain flex-shrink-0 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" />
                                   </div>
                                 )}
                                 {hasAppStore && (
                                   <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title="App Store">
                                     <img loading="lazy" src="/icon/appstroe.png" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain flex-shrink-0 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" />
                                   </div>
                                 )}
                                 {hasPlayStore && (
                                   <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group/icon hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5" title="Play Store">
                                     <img loading="lazy" src="/icon/playstore.png" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] object-contain flex-shrink-0 grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" />
                                   </div>
                                 )}
                               </div>
                             </div>
                           )
                      })()}

                      {(opsi.gratisDomain || opsi.hosting) && (() => {
                        let domainTitle = opsi.durasiGratisDomain || "1 Tahun";
                        let domainExts = "";
                        const match = opsi.durasiGratisDomain?.match(/(.*?)\s*\((.*?)\)/);
                        if (match) {
                           domainTitle = match[1];
                           domainExts = match[2];
                        }

                        let mainExtsStr = domainExts;
                        if (match && domainExts) {
                            const extList = domainExts.split('/').map(e => e.trim());
                            let mainExts = extList;
                            if (idx > 0) {
                              let j = idx - 1;
                              let prevExts: string[] = [];
                              while (j >= 0) {
                                const matchJ = opsiHargaList[j].durasiGratisDomain?.match(/\((.*?)\)/);
                                if (matchJ && matchJ[1] !== domainExts) {
                                  prevExts = matchJ[1].split('/').map(e => e.trim());
                                  break;
                                }
                                j--;
                              }
                              mainExts = extList.filter(e => !prevExts.includes(e));
                            }
                            if (mainExts.length > 0) {
                              mainExtsStr = mainExts.join(' / ');
                            }
                        }
                        
                        return (
                           <div className="flex flex-col gap-3">
                             <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-2">DOMAIN & HOSTING</span>
                             <div className="flex flex-col gap-3">
                               {opsi.gratisDomain && (
                                 <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                      <Globe strokeWidth={1.5} className="w-[18px] h-[18px] md:w-5 md:h-5 text-slate-700" />
                                   </div>
                                   <div className="leading-snug pr-2 flex flex-col">
                                     <span className="text-[10px] sm:text-[11px] font-medium text-slate-800 mb-0.5">
                                       Gratis {domainTitle.replace('1 Tahun', '1 Tahun')}
                                     </span>
                                     <div className="text-[11px] sm:text-xs text-slate-700">
                                       <span className="font-bold whitespace-nowrap">{opsi.ekstraDomain ? 1 + opsi.ekstraDomain.length : 1} Domain:</span>
                                       {domainExts && (
                                         <span className="font-medium text-slate-500 ml-1 break-words">
                                           {mainExtsStr}{opsi.ekstraDomain ? ' + ' + opsi.ekstraDomain.join(' + ') : ''}
                                         </span>
                                       )}
                                     </div>
                                   </div>
                                 </div>
                               )}
                               {opsi.hosting && (
                                 <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                                      <img loading="lazy" src="/icon/vercel.png" className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] object-contain opacity-80" title="Hosting" />
                                   </div>
                                   <div className="leading-snug pr-2 flex flex-col">
                                     <span className="text-[10px] sm:text-[11px] font-medium text-slate-800 mb-0.5">
                                       Gratis {domainTitle.replace('1 Tahun', '1 Tahun')}
                                     </span>
                                     <div className="text-[11px] sm:text-xs text-slate-700">
                                       <span className="font-bold">Hosting:</span> <span className="font-medium text-slate-500">{opsi.hosting}</span>
                                     </div>
                                   </div>
                                 </div>
                               )}
                             </div>
                           </div>
                        );
                      })()}
                    </div>
                    
                    <div className="pt-4 md:pt-6 mb-2 border-t border-slate-100 mt-4 md:mt-2 relative z-10">
                    <div className="flex flex-row items-end justify-between md:flex-col md:items-start md:justify-start">
                      <div className="flex flex-col md:flex-row md:items-baseline md:mb-1.5">
                        <span className="text-slate-500 font-medium text-[10px] md:text-sm mb-0.5 md:mb-0 md:mr-2">
                          {data.nama.toLowerCase().includes("website") || data.nama.toLowerCase().includes("aplikasi") ? "Estimasi Biaya" : "Harga Mulai Dari"}
                        </span>
                        <span className="text-slate-400/80 text-xs md:text-[15px] font-bold relative inline-block">
                          Rp {priceInfo.normal.toLocaleString("id-ID")}
                          <span className="absolute left-[-2%] top-1/2 w-[104%] h-[2px] bg-red-500/80 -rotate-[6deg] -translate-y-1/2 rounded-full"></span>
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap text-right md:text-left">
                        <span
                          className={`text-[22px] sm:text-3xl md:text-[2.5rem] leading-[1.1] font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 tracking-tight`}
                        >
                          Rp {formatHargaBesar(priceInfo.promo)}
                        </span>
                        <span className="text-slate-400 font-bold text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest bg-slate-100/80 px-2 py-0.5 rounded-md">
                          / {priceInfo.proyek}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(ViewState.CHECKOUT_PAYMENT, {
                        packageName: data.nama,
                        opsiName: opsi.nama,
                        price: priceInfo.promo,
                        minimumTransaksi: opsi.minimumTransaksi,
                        opsiData: opsi
                      });
                    }}
                    className={`hidden md:flex relative z-10 w-full py-3.5 rounded-[14px] font-bold transition-all duration-300 text-sm md:text-[15px] shadow-[0_4px_12px_rgba(37,99,235,0.2)] items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_8px_20px_rgba(37,99,235,0.35)] hover:-translate-y-[2px] group/btn overflow-hidden`}
                  >
                    <span className="relative z-10 tracking-wide">Konsultasi Paket Ini</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                  </button>
                </div>
              );
              });

              return (
                <>
                  <div className={`${showSectionsMobile ? "hidden md:grid" : "grid"} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto items-stretch`}>
                    {renderedCards}
                  </div>
                  {showSectionsMobile && (
                    <div className="md:hidden flex flex-col gap-10 mt-2">
                      {[
                        { title: "Starter Launch", desc: "Website simpel untuk mulai tampil online secara profesional.", start: 0, end: 3 },
                        { title: "Growth Boost", desc: "Website dengan fitur lebih lengkap untuk bantu perkembangan bisnis.", start: 3, end: 6 },
                        { title: "Scale Engine", desc: "Website & sistem canggih untuk bisnis yang siap berkembang besar.", start: 6, end: 9 }
                      ].map((section, sIdx) => (
                        <MobileCardSlider key={sIdx} section={section} cards={renderedCards.slice(section.start, section.end)} />
                      ))}
                    </div>
                  )}
                </>
              );
              })()
            }
          </div>
        ))}
      </div>

      {/* Detail Modal / Bottom Sheet */}
      <AnimatePresence>
      {selectedDetail && (function() {
          const detailPriceInfo = getBillingPrices(selectedDetail);
          return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center px-0 md:px-4 pb-0 md:pb-4 transition-all duration-300">
          {/* Backdrop */}
          <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.3 }}
           className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
           onClick={() => setSelectedDetail(null)}
          />
          <motion.div 
            initial={{ y: '100%', opacity: 0.5, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }}
            className="bg-white w-full md:max-w-2xl md:rounded-2xl rounded-t-[2rem] shadow-2xl flex flex-col max-h-[85vh] md:max-h-[80vh] min-h-[50vh] border-t border-slate-100 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 rounded-t-[2rem] md:rounded-t-2xl">
              <div className="flex-grow flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 sm:mb-0 hidden sm:block">{data.nama}</div>
                <h3 className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 text-blue-700 rounded-full font-extrabold text-sm md:text-base shadow-sm w-max">
                  {selectedDetail.nama}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors ml-4 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 md:p-5 overflow-y-auto space-y-5 md:space-y-6 flex-grow scrollbar-thin">
              {selectedDetail.layanan && selectedDetail.layanan.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm md:text-base font-bold text-slate-800 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm border border-blue-100/50">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    Detail Layanan
                  </h4>
                  <ul className="space-y-2">
                    {selectedDetail.layanan.map((item: string, i: number) => (
                      <li key={i} className="flex items-start group">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-2.5 flex-shrink-0 mt-[3px] text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="text-slate-600 text-xs md:text-sm leading-relaxed group-hover:text-slate-800 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Integrasi */}
              {selectedDetail.integrasi && selectedDetail.integrasi.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm md:text-base font-bold text-slate-800 mb-3">
                     <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm border border-blue-100/50">
                       <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                     </div>
                     Integrasi
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedDetail.integrasi.map((item: string, i: number) => {
                      const lowerItem = item.toLowerCase();
                      const isGoogleForm = lowerItem.includes("google form");
                      const isCustomForm = lowerItem.includes("custom form");
                      const isWhatsApp = lowerItem.includes("whatsapp") || /\bwa\b/.test(lowerItem);
                      const isGoogleMaps = lowerItem.includes("google maps") || lowerItem.includes("peta") || lowerItem.includes("tracking");
                      const isEmailJs = lowerItem.includes("email js") || lowerItem.includes("email");
                      const isCustomChat = lowerItem.includes("custom chat") || lowerItem.includes("chat kustom");
                      const isPayment = lowerItem.includes("payment");
                      const isMultiBahasa = lowerItem.includes("multibahasa") || lowerItem.includes("multi bahasa") || lowerItem.includes("bahasa");
                      const isMultiKurs = lowerItem.includes("multikurs") || lowerItem.includes("multi kurs") || lowerItem.includes("kurs");
                      const isSosialMedia = lowerItem.includes("sosial media");
                      const isAsistenAi = lowerItem.includes("asistenai") || lowerItem.includes("chat kompleks");
                      const isDatabaseManager = lowerItem.includes("database manager");
                      const isRequestApi = lowerItem.includes("request api");

                      if (isGoogleForm || isCustomForm || isWhatsApp || isGoogleMaps || isEmailJs || isCustomChat || isPayment || isMultiBahasa || isMultiKurs || isSosialMedia || isAsistenAi || isDatabaseManager || isRequestApi) {
                        return (
                          <li key={i} className="flex items-center py-1.5 group cursor-pointer">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow hover:-translate-y-0.5 mr-2.5">
                              {isGoogleForm && <img loading="lazy" src="/icon/form.png" alt="Form" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isCustomForm && <img loading="lazy" src="/icon/form.png" alt="Form" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isWhatsApp && <img loading="lazy" src="/icon/whatsapp.png" alt="WhatsApp" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isGoogleMaps && <img loading="lazy" src="/icon/maps.png" alt="Maps" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isEmailJs && <img loading="lazy" src="/icon/gmail.png" alt="Email" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isCustomChat && <img loading="lazy" src="/icon/chat-custom.png" alt="Custom Chat" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isPayment && <img loading="lazy" src="/icon/payment-card.png" alt="Payment" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isMultiBahasa && <img loading="lazy" src="/icon/translate.png" alt="Translate" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isMultiKurs && <img loading="lazy" src="/icon/kurs.png" alt="Kurs" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isSosialMedia && <img loading="lazy" src="/icon/social-media.png" alt="Social Media" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isAsistenAi && <img loading="lazy" src="/icon/chat-asisten.png" alt="AI Chat" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isDatabaseManager && <img loading="lazy" src="/icon/database-link.png" alt="Database" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                              {isRequestApi && <img loading="lazy" src="/icon/api.png" alt="API" className="w-3.5 h-3.5 md:w-4 md:h-4 object-contain flex-shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" />}
                            </div>
                            <span className="text-slate-700 text-xs md:text-sm font-medium group-hover:text-blue-700 group-hover:font-semibold transition-all duration-300">{item}</span>
                          </li>
                        );
                      }
                      
                      return (
                        <li key={i} className="flex items-center py-1.5 group cursor-pointer w-full text-left">
                          <div className="w-7 h-7 md:w-8 md:h-8 mr-2.5 flex items-center justify-center flex-shrink-0 bg-slate-50 rounded-full border border-slate-200 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow hover:-translate-y-0.5">
                            <div className="w-1 h-1 rounded-full border border-slate-400 group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors duration-300 opacity-60 group-hover:opacity-100"></div>
                          </div>
                          <span className="text-slate-700 text-xs md:text-sm font-medium group-hover:text-blue-700 group-hover:font-semibold transition-all duration-300">{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {selectedDetail.aksesKontrol && selectedDetail.aksesKontrol.fitur.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm md:text-base font-bold text-slate-800 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm border border-blue-100/50">
                      <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    Akses Kontrol
                  </h4>
                  <div className="pl-8 mb-3">
                     <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider border border-slate-200/50">{selectedDetail.aksesKontrol.brand}</span>
                  </div>
                  <ul className="space-y-2 pl-8">
                    {selectedDetail.aksesKontrol.fitur.map((item: any, i: number) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-3.5 h-3.5 mr-2 flex-shrink-0 mt-[2px] text-blue-500" />
                        <div className="flex flex-col">
                          <span className="text-slate-700 font-semibold text-xs md:text-sm">{item.role}</span>
                          <span className="text-slate-500 text-[11px] md:text-xs mt-0.5">{item.deskripsi}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDetail.database && selectedDetail.database.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm md:text-base font-bold text-slate-800 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm border border-blue-100/50">
                      <Table2 className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    Database & Penyimpanan
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedDetail.database.map((dbInfo: any, i: number) => {
                      if (typeof dbInfo === 'string') {
                        return (
                          <div key={i} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-2.5 shadow-sm group hover:border-blue-200 transition-all duration-300 cursor-pointer">
                             <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow hover:-translate-y-0.5">
                                <Database className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" strokeWidth={1.5} />
                             </div>
                             <div className="flex flex-col justify-center">
                               <span className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors duration-300 text-xs leading-tight">{dbInfo}</span>
                             </div>
                          </div>
                        );
                      }
                      
                      const platform = dbInfo.platform || "";
                      const platformLower = platform.toLowerCase();
                      
                      return (
                        <div key={i} className="bg-white rounded-xl p-3 border border-slate-100 flex items-center gap-2.5 shadow-sm group hover:border-blue-200 transition-all duration-300 cursor-pointer">
                          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow hover:-translate-y-0.5">
                              {platformLower.includes('github') ? (
                                <img loading="lazy" src="/icon/github.png" className="w-[14px] h-[14px] md:w-4 md:h-4 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" alt="Github" />
                              ) : platformLower.includes('cloudflare') ? (
                                <img loading="lazy" src="/icon/cloudflare.png" className="w-[14px] h-[14px] md:w-4 md:h-4 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" alt="Cloudflare" />
                              ) : platformLower.includes('serverless') ? (
                                <img loading="lazy" src="/icon/api.png" className="w-[14px] h-[14px] md:w-4 md:h-4 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110" alt="Serverless" />
                              ) : (
                                <Database className="w-[14px] h-[14px] md:w-4 md:h-4 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" strokeWidth={1.5} />
                              )}
                          </div>
                          
                          <div className="flex flex-col flex-grow">
                            <span className="text-slate-700 text-xs font-bold leading-tight group-hover:text-blue-700 transition-colors duration-300">{platform}</span>
                            <div className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">
                              {dbInfo.sistem && dbInfo.sistem.join(', ')}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {(selectedDetail.hosting || selectedDetail.gratisDomain) && (
                <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                  <h4 className="flex items-center text-sm md:text-base font-bold text-slate-800 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm border border-blue-100/50">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    Infrastruktur & Domain
                  </h4>
                  <div className="space-y-3">
                    {selectedDetail.gratisDomain && (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-blue-500 text-[10px] uppercase font-bold tracking-wider mb-1">Domain Gratis</span>
                        {(() => {
                          const match = selectedDetail.durasiGratisDomain?.match(/(.*?)\s*\((.*?)\)/);
                          if (match) {
                            const [, duration, ext] = match;
                            const idx = opsiHargaList.indexOf(selectedDetail);
                            const extList = ext.split('/').map(e => e.trim());
                            let mainExts = extList;
                            let prevExtsList: string[] = [];
                            if (idx > 0) {
                              let j = idx - 1;
                              let prevExts = [];
                              while (j >= 0) {
                                const matchJ = opsiHargaList[j].durasiGratisDomain?.match(/\((.*?)\)/);
                                if (matchJ && matchJ[1] !== ext) {
                                  prevExts = matchJ[1].split('/').map(e => e.trim());
                                  break;
                                }
                                j--;
                              }
                              if (prevExts.length > 0) {
                                mainExts = extList.filter(e => !prevExts.includes(e));
                                if (mainExts.length === 0) {
                                  mainExts = extList;
                                } else {
                                  prevExtsList = extList.filter(e => prevExts.includes(e));
                                }
                              }
                            }

                            return (
                              <>
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center bg-white p-2 border border-slate-100 rounded-xl shadow-sm cursor-pointer group hover:border-blue-200 transition-all duration-300 w-full sm:w-max">
                                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 hover:-translate-y-0.5 mr-2 mb-auto">
                                       <Globe className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors duration-300" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 w-full">
                                      <div className="flex items-center flex-wrap gap-1.5 text-slate-700 text-xs md:text-sm font-bold group-hover:text-blue-700 transition-colors leading-none">
                                        {mainExts.join(' / ')}
                                      </div>
                                      <span className="inline-flex overflow-hidden rounded border border-red-500/30 text-[9px] font-bold tracking-wide h-4 items-stretch w-max mt-0.5">
                                        <span className="bg-[#FFD616] text-black px-1.5 flex items-center justify-center">Gratis</span>
                                        <span className="bg-red-600 text-white px-1.5 flex items-center justify-center">{duration.replace('1 Tahun', '1 Thn')}</span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {prevExtsList.length > 0 && (
                                  <span className="text-slate-400 text-[10px] pl-11 mt-0.5 block">
                                    <span className="italic">atau</span> {prevExtsList.join(' / ')}
                                  </span>
                                )}
                                <span className="text-blue-600 text-[10px] pl-11 font-medium mt-0.5 block">
                                  {selectedDetail.ekstraDomain ? `${1 + selectedDetail.ekstraDomain.length} Domain Gratis` : `1 Domain Gratis`}
                                </span>
                                {selectedDetail.ekstraDomain && selectedDetail.ekstraDomain.length > 0 && (
                                  <span className="text-green-500 text-[10px] pl-11 font-medium mt-0 flex items-start gap-x-1 leading-tight">
                                    <span className="opacity-80 mt-[1px]">Gratis Tambahan</span> <span className="font-bold text-green-600">{selectedDetail.ekstraDomain.join(' + ')}</span>
                                  </span>
                                )}
                                {prevExtsList.length > 0 && (
                                  <span className="text-slate-400 text-[9px] pl-11 font-medium mt-0 flex items-start gap-x-1 leading-tight">
                                    Atau bebas pilih domain {prevExtsList.join(', ')}
                                  </span>
                                )}
                                <span className="text-blue-500 text-[10px] pl-11 font-medium mt-1 flex items-start gap-x-1 leading-tight">
                                    <span className="opacity-80">Include Setup, Konfigurasi, CNAME www & SSL</span>
                                  </span>
                                
                              </>
                            );
                          }
                          return (
                            <div className="flex items-center bg-white p-2 rounded-xl border border-slate-100 shadow-sm cursor-pointer group hover:border-blue-200 transition-all duration-300 w-full sm:w-max">
                              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 hover:-translate-y-0.5 mr-2 mb-auto">
                                 <Globe className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors duration-300" />
                              </div>
                              <span className="text-slate-700 text-xs md:text-sm font-bold group-hover:text-blue-700 transition-colors">
                                {selectedDetail.durasiGratisDomain || 'Ya'}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                    {selectedDetail.hosting && (
                      <div className="flex flex-col mt-3">
                        <span className="text-blue-500 text-[10px] uppercase font-bold tracking-wider mb-1.5">Hosting</span>
                        <div className="flex items-center bg-white p-2 rounded-xl border border-slate-100 shadow-sm cursor-pointer group hover:border-blue-200 transition-all duration-300 w-full sm:w-max">
                          {selectedDetail.hosting === "Vercel" ? (
                            <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 hover:-translate-y-0.5 mr-2 mb-auto">
                              <img loading="lazy" src="/icon/vercel.png" alt="Vercel" className="w-[14px] h-[14px] md:w-4 md:h-4 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 flex-shrink-0" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 hover:-translate-y-0.5 mr-2 mb-auto">
                              <Server className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors duration-300 flex-shrink-0" />
                            </div>
                          )}
                          <div className="flex flex-col gap-0.5 w-full">
                            <span className="text-slate-700 text-xs md:text-sm font-bold group-hover:text-blue-700 transition-colors leading-none">{selectedDetail.hosting}</span>
                            {selectedDetail.durasiGratisHosting && selectedDetail.durasiGratisHosting !== "-" && (
                               <span className="inline-flex overflow-hidden rounded border border-red-500/30 text-[9px] font-bold tracking-wide h-4 items-stretch w-max mt-0.5">
                                 <span className="bg-[#FFD616] text-black px-1.5 flex items-center justify-center">Gratis</span>
                                 <span className="bg-red-600 text-white px-1.5 flex items-center justify-center">{selectedDetail.durasiGratisHosting.replace('1 Tahun', '1 Thn').replace('Selamanya (Free Tier)', 'Selamanya')}</span>
                               </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedDetail.osSupport && selectedDetail.osSupport.length > 0 && (
                <div>
                  <h4 className="flex items-center text-sm md:text-base font-bold text-slate-800 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm border border-blue-100/50">
                      <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    OS Support
                  </h4>
                  {(() => {
                           const supportedOS = selectedDetail.osSupport.map((item: string) => item.toLowerCase());
                           const hasWindows = supportedOS.some((os: string) => os.includes('windows'));
                           const hasIOS = supportedOS.some((os: string) => os.includes('ios'));
                           const hasAndroid = supportedOS.some((os: string) => os.includes('android'));
                           const hasPWA = supportedOS.some((os: string) => os.includes('pwa'));
                           const hasAppStore = supportedOS.some((os: string) => os.includes('app store') || os.includes('appstore'));
                           const hasPlayStore = supportedOS.some((os: string) => os.includes('play store') || os.includes('playstore'));
                           
                           return (
                             <ul className="space-y-2">
                               {(hasWindows || hasIOS || hasAndroid) && (
                                  <li className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 bg-slate-50/50 p-2.5 md:p-3 rounded-xl border border-slate-100 group">
                                    <span className="text-[10px] font-bold text-slate-400 w-[90px] uppercase tracking-wider">UI/UX Design</span>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      {hasWindows && <div className="flex items-center justify-center p-1 md:p-1.5 rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-200 transition-all cursor-pointer group/icon mr-1 hover:-translate-y-0.5"><div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-50 flex items-center justify-center"><img loading="lazy" src="/icon/windows.png" className="w-3.5 h-3.5 object-contain grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" title="Windows" /></div><span className="text-xs md:text-sm font-semibold text-slate-600 ml-1.5 mr-2 group-hover/icon:text-blue-700 transition-colors">Windows</span></div>}
                                      {hasIOS && <div className="flex items-center justify-center p-1 md:p-1.5 rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-200 transition-all cursor-pointer group/icon mr-1 hover:-translate-y-0.5"><div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-50 flex items-center justify-center"><img loading="lazy" src="/icon/ios.png" className="w-3.5 h-3.5 object-contain grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" title="iOS" /></div><span className="text-xs md:text-sm font-semibold text-slate-600 ml-1.5 mr-2 group-hover/icon:text-blue-700 transition-colors">iOS</span></div>}
                                      {hasAndroid && <div className="flex items-center justify-center p-1 md:p-1.5 rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-200 transition-all cursor-pointer group/icon hover:-translate-y-0.5"><div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-50 flex items-center justify-center"><img loading="lazy" src="/icon/android.png" className="w-3.5 h-3.5 object-contain grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" title="Android" /></div><span className="text-xs md:text-sm font-semibold text-slate-600 ml-1.5 mr-2 group-hover/icon:text-blue-700 transition-colors">Android</span></div>}
                                    </div>
                                  </li>
                               )}
                               {hasPWA && (
                                  <li className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 bg-slate-50/50 p-2.5 md:p-3 rounded-xl border border-slate-100 group">
                                    <span className="text-[10px] font-bold text-slate-400 w-[90px] uppercase tracking-wider">Installer</span>
                                    <div className="flex items-center justify-center p-1 md:p-1.5 rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-200 transition-all cursor-pointer group/icon hover:-translate-y-0.5">
                                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-50 flex items-center justify-center"><img loading="lazy" src="/icon/pwa.png" className="w-3.5 h-3.5 object-contain grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" title="PWA" /></div>
                                      <span className="text-xs md:text-sm font-semibold text-slate-600 ml-1.5 mr-2 group-hover/icon:text-blue-700 transition-colors">PWA (Progressive Web App)</span>
                                    </div>
                                  </li>
                               )}
                               {(hasPlayStore || hasAppStore) && (
                                  <li className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 bg-slate-50/50 p-2.5 md:p-3 rounded-xl border border-slate-100 group">
                                    <span className="text-[10px] font-bold text-slate-400 w-[90px] uppercase tracking-wider">Publikasi</span>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      {hasPlayStore && <div className="flex items-center justify-center p-1 md:p-1.5 rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-200 transition-all cursor-pointer group/icon mr-1 hover:-translate-y-0.5"><div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-50 flex items-center justify-center"><img loading="lazy" src="/icon/playstore.png" className="w-3.5 h-3.5 object-contain grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" title="Play Store" /></div><span className="text-xs md:text-sm font-semibold text-slate-600 ml-1.5 mr-2 group-hover/icon:text-blue-700 transition-colors">Play Store</span></div>}
                                      {hasAppStore && <div className="flex items-center justify-center p-1 md:p-1.5 rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-blue-200 transition-all cursor-pointer group/icon hover:-translate-y-0.5"><div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-50 flex items-center justify-center"><img loading="lazy" src="/icon/appstroe.png" className="w-3.5 h-3.5 object-contain grayscale opacity-60 group-hover/icon:grayscale-0 group-hover/icon:opacity-100 transition-all duration-300 transform group-hover/icon:scale-110" title="App Store" /></div><span className="text-xs md:text-sm font-semibold text-slate-600 ml-1.5 mr-2 group-hover/icon:text-blue-700 transition-colors">App Store</span></div>}
                                    </div>
                                  </li>
                               )}
                             </ul>
                           )
                  })()}
                </div>
              )}

              {selectedDetail.layananDanJaminan && selectedDetail.layananDanJaminan.length > 0 && (
                <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                  <h4 className="flex items-center text-sm md:text-base font-bold text-slate-800 mb-3">
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mr-2.5 flex-shrink-0 shadow-sm border border-blue-100/50">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    Layanan & Jaminan
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedDetail.layananDanJaminan.map((item: string, i: number) => (
                      <li key={i} className="flex items-start group">
                        <Check className="w-3.5 h-3.5 mr-2.5 flex-shrink-0 mt-[2px] text-blue-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="text-slate-600 text-xs md:text-sm leading-relaxed group-hover:text-slate-800 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 md:p-5 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md rounded-b-[2rem] md:rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_-4px_10px_rgb(0,0,0,0.02)]">
              <div>
                <div className="text-[10px] md:text-xs font-semibold text-slate-500 mb-0.5 flex items-center gap-1.5">
                  Total Biaya
                  <span className="text-slate-400 text-[10px] md:text-xs font-medium relative inline-block ml-0.5">
                    Rp {detailPriceInfo.normal.toLocaleString("id-ID")}
                    <span className="absolute left-[-5%] top-1/2 w-[110%] h-[1.5px] bg-red-400/80 -rotate-3 -translate-y-1/2 rounded-full"></span>
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
                  Rp {formatHargaBesar(detailPriceInfo.promo)}
                  <span className="text-[11px] md:text-xs text-slate-500 font-medium ml-1.5 font-sans tracking-normal">/ {detailPriceInfo.proyek}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  onNavigate(ViewState.CHECKOUT_PAYMENT, {
                    packageName: data.nama,
                    opsiName: selectedDetail.nama,
                    price: detailPriceInfo.promo,
                    minimumTransaksi: selectedDetail.minimumTransaksi,
                    opsiData: selectedDetail
                  });
                  setSelectedDetail(null);
                }}
                className="py-2.5 px-6 md:py-3 md:px-7 rounded-[14px] text-sm md:text-base font-bold flex items-center justify-center transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-[0_4px_12px_rgb(37,99,235,0.2)] hover:shadow-[0_6px_16px_rgb(37,99,235,0.3)] active:scale-[0.98] mt-1 sm:mt-0"
              >
                Konsultasi Paket Ini
              </button>
            </div>
          </motion.div>
        </div>
      ); })()}
      </AnimatePresence>
    </div>
  );
};
