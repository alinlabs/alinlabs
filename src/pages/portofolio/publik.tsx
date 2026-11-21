
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Layout, Paintbrush, TrendingUp, Layers, ArrowRight, Briefcase, ChevronRight, ChevronLeft, Play, Maximize } from 'lucide-react';
import { ViewState } from '../../types';
import { SectionAmbefit } from './section-ambefit';
import { SectionMinnatulHuda } from './section-minnatul-huda';
import { SectionMelinPerfume } from './section-melin-perfume';
import { SectionWikara } from './section-wikara';
import { SectionWorldStreet } from './section-world-street';
import { SectionVanySongket } from './section-vany-songket';
import { InViewVideo } from '../../components/ui/in-view-video';
import { VideoPopup } from '../../components/ui/video-popup';
import { WebsiteThumbnail } from '../../components/ui/website-thumbnail';
import { SafeImage } from '../../components/ui/safe-image';
import { useShareableMedia } from '../../hooks/use-shareable-media';

export const webPortfolios = [
  { url: "https://www.kampusdigital.my.id/", title: "Sistem Manajemen Kampus", category: "E-Learning", isWide: true },
  { url: "https://www.sekolahkudigital.my.id/", title: "Portal Akademik Sekolah", category: "Sistem Edukasi", isWide: false },
  { url: "https://vynance.vercel.app/", title: "Dashboard Keuangan Pintar", category: "Financial App", isWide: false },
  { url: "https://wikaraplanner.vercel.app/", title: "Aplikasi Penjadwalan Harian", category: "Produktivitas", isWide: true },
  { url: "https://databank-serverless.vercel.app/", title: "Cloud Storage Pribadi", category: "Pusat Data Lokal", isWide: false },
  { url: "https://alinlabs.github.io/polbap/", title: "Profil Institusi Kampus", category: "Portal Sekolah", isWide: false },
  { url: "https://alinlabs.github.io/komunitas/", title: "Web Forum Diskusi Online", category: "Aplikasi Komunitas", isWide: false },
  { url: "https://alinlabs.github.io/komunitasamal/", title: "Platform Donasi Terbuka", category: "Crowdfunding Sosial", isWide: true },
  { url: "https://alinlabs.github.io/kampusqu/", title: "Portal Penerimaan Pendaftaran", category: "Aplikasi Layanan", isWide: false },
  { url: "https://www.bem-wikara.my.id/", title: "Portal Publikasi Organisasi", category: "Media Institusi Publik", isWide: true },
  { url: "https://www.wedding-organizer.my.id/", title: "Sistem Reservasi Event", category: "Katalog Jasa Acara", isWide: false },
  { url: "https://pratamamc.my.id/", title: "Katalog Personal Branding", category: "Jasa Pembawa Acara", isWide: false },
  { url: "https://karirkita.my.id/", title: "Portal Info Lowongan Kerja", category: "Manajemen SDM", isWide: true },
  { url: "https://alinlabs.github.io/santri-smartdigital/", title: "Sistem Informasi Terpadu", category: "Aplikasi Administratif", isWide: false },
  { url: "https://alinlabs.github.io/prototype-landingpage-industri/", title: "Katalog Produk Pemasaran", category: "Company Profiling", isWide: true },
  { url: "https://alinlabs.github.io/prototype-landingpage-ponpes/", title: "Portal Profil Publik", category: "Lembaga Keagamaan", isWide: false },
  { url: "https://alinlabs.github.io/prototype-toko-gadget/", title: "E-Commerce Produk Digital", category: "Checkout Langsung", isWide: false },
  { url: "https://alinlabs.github.io/prototype-trackerme/", title: "Manajemen Kinerja Target", category: "Sistem Monitoring", isWide: false },
  { url: "https://alinlabs.github.io/jnjstudio/", title: "Marketplace Aset Desain", category: "Katalog Font Publik", isWide: true },
  { url: "https://amanahkita.vercel.app/", title: "Sistem Presensi Real-Time", category: "Aplikasi Kehadiran", isWide: false },
  { url: "https://jualinaja.github.io/center/", title: "Direktori Jualan Multi-Vendor", category: "Toko Terpusat", isWide: true },
  { url: "https://purwakita.my.id/", title: "Eksplorasi Katalog Wisata", category: "Eksplorasi Daerah", isWide: false }
];

interface PublikProps {
    onItemClick: (id: string) => void;
    onNavigate: (view: ViewState) => void;
    onPreview?: (url: string, title: string, category: any) => void;
    activeTabParam?: string;
}

export const Publik: React.FC<PublikProps> = ({ onItemClick, onNavigate, onPreview, activeTabParam }) => {
  const hero = {
    slogan: "Karya Kami",
    judulAwalan: "Galeri",
    judulHighlight: "Inovasi Digital",
    deskripsi: "Jelajahi koleksi proyek terbaik kami, mulai dari ekosistem web yang kompleks hingga produksi visual yang memukau."
  };
  const cta = {
    judul: "Punya Ide Proyek?",
    deskripsi: "Diskusikan visi Anda bersama kami. Kami siap mengubah ide menjadi realitas digital yang berdampak.",
    teksTombol: "Mulai Konsultasi Gratis"
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(16);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const activeTab = activeTabParam || 'klien';
  const setActiveTab = (tab: 'klien' | 'galeri' | 'website') => {
    onItemClick(tab);
  };

  const galleryItems = useMemo(() => {
    const items: { type: 'video' | 'image', url: string }[] = [
      ...Array.from({length: 4}, (_, i) => ({ type: 'video' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/video/ambefit/${i + 1}.mp4` })),
      ...Array.from({length: 6}, (_, i) => ({ type: 'video' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/video/vany-group/${i + 1}.mp4` })),
      ...Array.from({length: 18}, (_, i) => ({ type: 'image' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/melin-parfum/${i + 1}.webp` })),
      ...Array.from({length: 10}, (_, i) => ({ type: 'image' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/worldstreet/${i + 1}.webp` })),
      ...[1, 2, 3, 4, 5].map(i => ({ type: 'video' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${i}.mp4` })),
      ...[1, 2, 3, 4].map(i => ({ type: 'image' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${i}.png` })),
      ...['5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg'].map(f => ({ type: 'image' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${f}` }))
    ];

    // Shuffle slightly to mix images and videos for better masonry look using a pseudo-random seed to keep it stable
    let seed = 1234;
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
    
    return items.map(value => ({ value, sort: random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }, []);

  const shuffledWebPortfolios = useMemo(() => webPortfolios, []);

  const { popupOpen, initialMediaIndex, handleOpenPopup, handleClosePopup, handleMediaChange } = useShareableMedia('semua-galeri', galleryItems.length);

  const sectionsCount = 6; // Updated number of sections
  const PORTFOLIO_SECTIONS = useMemo(() => [
      { label: 'Ambefit Tiens', index: 0, kategori: 'Kesehatan' },
      { label: 'Minnatul Huda', index: 1, kategori: 'Pendidikan' },
      { label: 'Melin Perfume', index: 2, kategori: 'E-commerce' },
      { label: 'STIE Wikara', index: 3, kategori: 'Pendidikan' },
      { label: 'World Street', index: 4, kategori: 'Fashion' },
      { label: 'Vany Songket', index: 5, kategori: 'Fashion' }
  ], []);

  const filteredOptions = [
    ...PORTFOLIO_SECTIONS.map(opt => ({ ...opt, type: 'klien' })),
    ...webPortfolios.map(opt => ({ label: opt.title, index: -1, kategori: opt.category, type: 'website', url: opt.url }))
  ].filter(opt => 
    opt.label.toLowerCase().includes((searchQuery || '').toLowerCase()) || 
    opt.kategori.toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const sectionWidth = container.offsetWidth;
      if (sectionWidth > 0) {
        const newIndex = Math.round(scrollPosition / sectionWidth);
        if (!isNaN(newIndex) && newIndex >= 0 && newIndex < sectionsCount) {
          setActiveSectionIndex(newIndex);
        }
      }
    }
  };

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (window.innerWidth >= 768) {
        // Desktop: Vertical scroll
        const sectionNodes = container.children;
        if (sectionNodes && sectionNodes.length > index && sectionNodes[index]) {
          (sectionNodes[index] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Mobile: Horizontal scroll
        const sectionWidth = container.offsetWidth;
        if (sectionWidth > 0) {
          container.scrollTo({
            left: index * sectionWidth,
            behavior: 'smooth'
          });
        }
      }
      setActiveSectionIndex(index);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if ((searchQuery || '').trim() && filteredOptions.length > 0) {
      handleSelectOption(filteredOptions[0]);
    }
  };

  const handleSelectOption = (opt: any) => {
    setSearchQuery('');
    setShowSuggestions(false);
    if (opt.type === 'klien') {
      setActiveTab('klien');
      // Adding a small timeout to ensure the tab has rendered the scroll view
      setTimeout(() => scrollToSection(opt.index), 100);
    } else if (opt.type === 'website') {
      setActiveTab('website');
      if (onPreview) {
        onPreview(opt.url, opt.label, opt.kategori);
      }
    }
  };


  const partners = [
    { name: 'JayaBaru', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/jayabaru.png' },
    { name: 'Hokage Selular', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/hokage.png' },
    { name: 'Vany Songket', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/vanysongket.png' },
    { name: 'Vany Villa Balige', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/vanyvillabalige.png' },
    { name: 'Jagoan Kayu', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/jagoankayu.png' },
    { name: 'Golden Mind Group', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-gmg.png' },
    { name: 'STIE Wikara', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/stiewikara.png' },
    { name: 'PT. Anugerah Dwi Tunggal', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-adt.png' },
    { name: 'Miftahul Huda', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/miftahulhuda.png' },
    { name: 'Shansusdzar Indonesia', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-shansusdzar-indonesia.png' },
    { name: 'Minnatul Huda', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/minnatulhuda.png' },
    { name: 'Humairah Tour', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-humaira-group.png' },
    { name: 'WorldStreet', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/worldstreet.png' },
    { name: 'Melin Parfum', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/melin-parfum.png' },
    { name: 'Konika Minolta', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/konika-minolta.png' },
    { name: 'PT. Katisolusindo', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-katisolusindo.png' },
    { name: 'PT. Sentral Informatika', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-sentral-informatika.png' },
    { name: 'Ambefit Tiens', logo: 'https://raw.githubusercontent.com/alinlabs/alinlabs-data/main/gambar/logo-klien/pt-tiensherba.png' }
  ];

  return (
    <div className="bg-slate-50 w-full min-h-full">
      {/* Visual Hero */}
      <section className="relative w-full aspect-[4/3] md:aspect-[21/9] flex flex-col items-center justify-center bg-slate-100 border-b-4 border-slate-200">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full relative">
            {/* Desktop Image */}
            <img 
              src="/gambar/banner-desktop4.webp" 
              alt="Portofolio Banner"
              className="hidden md:block w-full h-full object-cover object-center"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
            {/* Mobile Image */}
            <img 
              src="/gambar/banner-mobile4.webp" 
              alt="Portofolio Banner"
              className="block md:hidden w-full h-full object-cover object-center"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Overlapping Bottom Search Bar & Tabs */}
        <div className="absolute bottom-0 translate-y-1/2 left-0 w-full px-4 sm:px-6 lg:px-8 z-40 flex justify-center">
          <div ref={searchRef} className="w-full max-w-5xl bg-white rounded-3xl p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 transition-transform hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] flex flex-col md:flex-row items-center relative gap-3">
            
            <form onSubmit={handleSearch} className="w-full md:flex-1 flex items-center bg-slate-50 rounded-2xl p-1 sm:p-1.5 border border-slate-100">
              <div className="pl-3 sm:pl-5 text-slate-400">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              
              <input 
                type="text" 
                enterKeyHint="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Cari portofolio, klien, atau kategori..."
                className="flex-1 bg-transparent border-none outline-none px-3 sm:px-4 py-2 sm:py-3 text-slate-700 text-sm sm:text-base placeholder:text-slate-400 min-w-0"
              />
              
              <button 
                type="submit"
                className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white font-semibold items-center justify-center py-3 px-6 rounded-xl transition-colors flex-shrink-0 text-base ml-2 shadow-sm"
              >
                Cari
              </button>
            </form>

            {/* Tabs inside searchbar scope */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 w-full md:w-auto px-1">
              <button
                onClick={() => setActiveTab('klien')}
                className={`flex-1 sm:flex-none px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'klien' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                Klien
              </button>
              <button
                onClick={() => setActiveTab('galeri')}
                className={`flex-1 sm:flex-none px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'galeri' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                Galeri
              </button>
              <button
                onClick={() => setActiveTab('website')}
                className={`flex-1 sm:flex-none px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeTab === 'website' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                Web & App
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                 {filteredOptions.length > 0 ? (
                   <ul className="py-2">
                     {filteredOptions.map((opt, i) => (
                       <li key={i}>
                          <button
                            type="button"
                            onClick={() => handleSelectOption(opt)}
                            className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                          >
                              <div className="flex flex-col">
                                  <span className="text-slate-800 font-medium">{opt.label}</span>
                                  <span className="text-xs text-slate-400 mt-0.5">{opt.kategori} {opt.type === 'website' && ' (Website)'}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-300" />
                          </button>
                       </li>
                     ))}
                   </ul>
                 ) : (
                   <div className="px-6 py-4 text-sm text-slate-500 text-center">
                      Tidak ditemukan hasil untuk "{searchQuery}"
                   </div>
                 )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area based on Tab (only mount active tab so hidden tabs use zero memory/network) */}
      <div className="pt-28 sm:pt-20 md:pt-20 pb-2 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Klien */}
        {activeTab === 'klien' && (
        <div className="block">
            {/* Mitra Kami Section */}
            <div className="mb-2 md:mb-12 text-center overflow-hidden">
                <h3 className="text-[9px] sm:text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-[0.1em] md:tracking-[0.3em] mb-1 md:mb-6">Telah Di Percaya Oleh</h3>
                <div className="relative w-full max-w-full mx-auto px-0 md:px-0">
                    <div className="flex overflow-hidden items-start pb-1 md:pb-6 pt-2">
                        <div className="flex items-start gap-x-2 sm:gap-x-4 md:gap-x-10 w-max animate-scroll pr-2 sm:pr-4 md:pr-10">
                            {[...partners, ...partners, ...partners].map((partner, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-start group cursor-default w-16 sm:w-20 md:w-24 shrink-0 h-full">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 border border-slate-200 bg-white rounded-full shadow-sm flex items-center justify-center overflow-hidden mb-2 md:mb-3 group-hover:border-blue-400 group-hover:shadow-[0_4px_20px_rgb(37,99,235,0.2)] transition-all duration-300 transform group-hover:-translate-y-1 mx-auto">
                                <SafeImage
                                    src={partner.logo?.includes('fbcdn.net') ? `https://wsrv.nl/?url=${encodeURIComponent(partner.logo)}` : partner.logo}
                                    alt={partner.name}
                                    fallbackText={partner.name}
                                    fallbackClassName="w-full h-full bg-white text-xl md:text-3xl font-extrabold text-slate-400 group-hover:text-blue-600 transition-colors"
                                    className="w-full h-full object-contain p-2.5 md:p-3 transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                            </div>
                            <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wide md:tracking-widest text-center leading-tight group-hover:text-slate-800 transition-colors px-1">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                        </div>
                    </div>
                    {/* Blur edges */}
                    <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
                </div>
            </div>

            {/* Portfolio Sections */}
            <div className="relative bg-slate-50 flex flex-col md:flex-col -mx-4 sm:mx-0">
              {/* Mobile Slide Indicator */}
              <div className="md:hidden flex justify-center items-center gap-2 py-4 bg-slate-50 border-t border-slate-100">
                {Array.from({ length: sectionsCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSectionIndex === index ? 'w-6 bg-blue-600' : 'bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <section 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex flex-row md:flex-col items-start w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-slate-50"
              >
                <SectionAmbefit />
                <SectionMinnatulHuda />
                <SectionMelinPerfume />
                <SectionWikara />
                <SectionWorldStreet />
                <SectionVanySongket />
              </section>
            </div>
        </div>
        )}

        {/* Tab Galeri */}
        {activeTab === 'galeri' && (
        <div className="block w-full">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center">Kolase Karya Terbaik</h3>
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {/* Compiled Gallery Items */}
              {galleryItems.slice(0, visibleGalleryCount).map((item, idx) => (
                  <div key={item.url} className="break-inside-avoid overflow-hidden rounded-xl shadow-sm border border-slate-200 group relative">
                    {item.type === 'video' ? (
                      <button
                        type="button"
                        aria-label={`Putar video galeri ${idx + 1}`}
                        className="relative w-full block group cursor-pointer text-left aspect-[3/4] bg-slate-200"
                        onClick={() => handleOpenPopup(idx)}
                      >
                        <InViewVideo 
                          src={item.url} 
                          alt={`Thumbnail video galeri ${idx + 1}`}
                          className="w-full h-full rounded-xl object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors flex items-center justify-center pointer-events-none">
                            <div className="w-11 h-11 bg-black/45 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Play className="w-5 h-5 ml-0.5 fill-current" />
                            </div>
                        </div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-label={`Lihat gambar galeri ${idx + 1}`}
                        className="relative w-full block group cursor-pointer text-left"
                        onClick={() => handleOpenPopup(idx)}
                      >
                        <SafeImage
                          src={item.url}
                          alt={`Gallery item ${idx + 1}`}
                          fallbackText={`Karya ${idx + 1}`}
                          className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500"
                          fallbackClassName="w-full aspect-square bg-slate-100 text-slate-400"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 flex-col gap-2 pointer-events-none">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <Maximize className="w-6 h-6" />
                            </div>
                        </div>
                      </button>
                    )}
                  </div>
                ))}
            </div>

            {visibleGalleryCount < galleryItems.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleGalleryCount((c) => Math.min(galleryItems.length, c + 16))}
                  className="px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 font-semibold text-sm shadow-sm transition-colors"
                >
                  Muat Lebih Banyak ({galleryItems.length - visibleGalleryCount} tersisa)
                </button>
              </div>
            )}

            <VideoPopup
              videos={galleryItems.map(item => item.url)}
              initialIndex={initialMediaIndex}
              isOpen={popupOpen}
              onClose={handleClosePopup}
              onMediaChange={handleMediaChange}
              clientName="AlinLabs Galeri"
            />
        </div>
        )}

        {/* Tab Web & App */}
        {activeTab === 'website' && (
        <div className="block w-full">
            <div className="text-center mb-8 sm:mb-10 text-slate-600 max-w-2xl mx-auto">
               <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-1 sm:mb-1.5 leading-tight">Web & Aplikasi</h3>
               <p className="text-sm md:text-base">Portofolio digital yang dibangun dengan teknologi terbaru. Buatan AlinLabs.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 grid-flow-row-dense">
              {shuffledWebPortfolios.map((port, index) => (
                <button
                  type="button"
                  key={port.url} 
                  aria-label={`Preview ${port.title}`}
                  className={`group flex flex-col relative cursor-pointer text-left ${port.isWide ? 'col-span-2' : 'col-span-1'}`}
                  onClick={() => {
                    if (onPreview) {
                      onPreview(port.url, port.title, port.category);
                    }
                  }}
                >
                   <div className={`w-full relative overflow-hidden bg-slate-100 rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-sm group-hover:shadow-2xl transition-all duration-500 ${port.isWide ? 'h-[160px] sm:h-[300px] md:h-[420px]' : 'h-[200px] sm:h-[350px] md:h-[420px]'}`}>
                       <WebsiteThumbnail
                         url={port.url}
                         title={port.title}
                         category={port.category}
                         screenshotWidth={port.isWide ? 1000 : 720}
                         className="w-full h-full"
                       />
                       <div className="absolute inset-0 bg-transparent group-hover:bg-slate-900/10 transition-colors duration-500 z-20 pointer-events-none"></div>
                   </div>
                   <div className="pt-3 sm:pt-4 px-1 sm:px-2 flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-sm sm:text-xl md:text-2xl text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{port.title}</h4>
                      </div>
                      <span className="text-[10px] sm:text-sm font-semibold text-slate-500 uppercase tracking-wider line-clamp-1">{port.category}</span>
                   </div>
                </button>
              ))}
            </div>
        </div>
        )}
      </div>
    </div>
  );
};
