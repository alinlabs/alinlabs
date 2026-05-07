
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Layout, Paintbrush, TrendingUp, Layers, ArrowRight, Briefcase, ChevronRight, ChevronLeft, Play, Maximize } from 'lucide-react';
import { ViewState } from '../../types';
import { SectionAmbefit } from './SectionAmbefit';
import { SectionMinnatulHuda } from './SectionMinnatulHuda';
import { SectionMelinPerfume } from './SectionMelinPerfume';
import { SectionWikara } from './SectionWikara';
import { SectionWorldStreet } from './SectionWorldStreet';
import { SectionVanySongket } from './SectionVanySongket';
import { InViewVideo } from '../../components/ui/InViewVideo';
import { VideoPopup } from '../../components/ui/VideoPopup';
import { useShareableMedia } from '../../utils/useShareableMedia';

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
  const data: any = {
  "hero": {
      "slogan": "Karya Kami",
      "judulAwalan": "Galeri",
      "judulHighlight": "Inovasi Digital",
      "deskripsi": "Jelajahi koleksi proyek terbaik kami, mulai dari ekosistem web yang kompleks hingga produksi visual yang memukau."
  },
  "cta": {
      "judul": "Punya Ide Proyek?",
      "deskripsi": "Diskusikan visi Anda bersama kami. Kami siap mengubah ide menjadi realitas digital yang berdampak.",
      "teksTombol": "Mulai Konsultasi Gratis"
  },
  "item": [
    {
      "id": "port-1",
      "judul": "Portal Terintegrasi E-Gov",
      "kategori": "Ekosistem Web",
      "klien": "Kementerian Digital",
      "logoKlien": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Coat_of_arms_of_the_Ministry_of_Communication_and_Information_Technology_of_the_Republic_of_Indonesia.jpg/600px-Coat_of_arms_of_the_Ministry_of_Communication_and_Information_Technology_of_the_Republic_of_Indonesia.jpg",
      "tahun": "2024",
      "gambar": "https://placehold.co/1200x800/1e293b/ffffff?text=E-Gov+Portal",
      "url": "https://www.kominfo.go.id/",
      "galeri": [
        "https://placehold.co/800x600/334155/ffffff?text=Dashboard+View",
        "https://placehold.co/800x600/334155/ffffff?text=Mobile+App",
        "https://placehold.co/800x600/334155/ffffff?text=Analytics",
        "https://placehold.co/800x600/334155/ffffff?text=User+Profile",
        "https://placehold.co/800x600/334155/ffffff?text=Map+Integration",
        "https://placehold.co/800x600/334155/ffffff?text=Settings"
      ],
      "deskripsi": "Pengembangan ekosistem website pemerintahan terintegrasi yang menghubungkan database pusat dengan layanan publik di daerah. Tantangan utama adalah menyatukan data yang terfragmentasi menjadi satu dashboard yang responsif dan aman.",
      "teknologi": [
        { "nama": "Next.js", "deskripsi": "Frontend Core", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", "penggunaan": 100, "efisiensi": 40 },
        { "nama": "React Admin", "deskripsi": "Dashboard UI", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "penggunaan": 100, "efisiensi": 55 },
        { "nama": "Node.js", "deskripsi": "Backend Runtime", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", "penggunaan": 100, "efisiensi": 30 },
        { "nama": "PostgreSQL", "deskripsi": "Database", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", "penggunaan": 100, "efisiensi": 45 },
        { "nama": "Redis", "deskripsi": "Caching", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", "penggunaan": 100, "efisiensi": 20 }
      ],
      "statistik": [
        { "label": "Efisiensi Data", "sebelum": 45, "sesudah": 92 },
        { "label": "Kecepatan Load", "sebelum": 30, "sesudah": 98 },
        { "label": "Kepuasan User", "sebelum": 60, "sesudah": 88 }
      ],
      "hasil": [
        "Efisiensi pemrosesan data meningkat 300%",
        "Waktu loading halaman rata-rata < 1 detik",
        "Keamanan data level Enterprise (ISO 27001 compliant)",
        "Diadopsi oleh 15 provinsi dalam 3 bulan"
      ]
    },
    {
      "id": "port-2",
      "judul": "Dokumenter Bisikan Alam",
      "kategori": "Agensi Kreatif",
      "klien": "National Geo Indo",
      "logoKlien": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/National_Geographic_Logo.svg/1200px-National_Geographic_Logo.svg.png",
      "tahun": "2023",
      "gambar": "https://placehold.co/1200x800/064e3b/ffffff?text=Nature+Documentary",
      "url": "https://youtu.be/_awkGyizTb4?si=kOhBz9D0sWj5Ztug",
      "galeri": [
        "https://placehold.co/800x600/065f46/ffffff?text=Forest+Drone+Shot",
        "https://placehold.co/800x600/065f46/ffffff?text=Wildlife+Close+Up",
        "https://placehold.co/800x600/065f46/ffffff?text=River+Scene",
        "https://placehold.co/800x600/065f46/ffffff?text=Interview+Setup",
        "https://placehold.co/800x600/065f46/ffffff?text=Behind+The+Scenes",
        "https://placehold.co/800x600/065f46/ffffff?text=Premiere+Event"
      ],
      "deskripsi": "Produksi film dokumenter berdurasi 45 menit tentang upaya konservasi hutan hujan tropis di Kalimantan. Proyek ini melibatkan pengambilan gambar di medan sulit selama 30 hari menggunakan peralatan sinema standar internasional.",
      "teknologi": [
        { "nama": "RED Komodo", "deskripsi": "Cinema Camera", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Red_Digital_Cinema_Camera_Company_logo.svg/2560px-Red_Digital_Cinema_Camera_Company_logo.svg.png", "penggunaan": 100, "efisiensi": 50 },
        { "nama": "DJI Mavic", "deskripsi": "Aerial Shot", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/DJI_logo.svg/2560px-DJI_logo.svg.png", "penggunaan": 100, "efisiensi": 60 },
        { "nama": "Davinci", "deskripsi": "Color Grading", "logo": "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png", "penggunaan": 100, "efisiensi": 40 },
        { "nama": "Dolby", "deskripsi": "Audio Mix", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Dolby_Atmos_logo.svg/2560px-Dolby_Atmos_logo.svg.png", "penggunaan": 100, "efisiensi": 30 }
      ],
      "statistik": [
        { "label": "Visual Quality", "sebelum": 60, "sesudah": 100 },
        { "label": "Engagement", "sebelum": 40, "sesudah": 95 },
        { "label": "Retensi", "sebelum": 30, "sesudah": 85 }
      ],
      "hasil": [
        "Pemenang Sinematografi Terbaik FFI 2023",
        "Ditonton lebih dari 2 juta kali di platform streaming",
        "Meningkatkan donasi konservasi sebesar 150%",
        "Diliput oleh 20+ media internasional"
      ]
    },
    {
      "id": "port-3",
      "judul": "Video Identitas Korporat",
      "kategori": "Agensi Kreatif",
      "klien": "Bank Mega Asia",
      "logoKlien": "https://placehold.co/100x100/1e3a8a/ffffff?text=BMA",
      "tahun": "2024",
      "gambar": "https://placehold.co/1200x800/1e40af/ffffff?text=Corporate+Video",
      "url": "https://www.youtube.com/embed/LXb3EKWsInQ",
      "galeri": [
        "https://placehold.co/800x600/1e3a8a/ffffff?text=Office+Tour",
        "https://placehold.co/800x600/1e3a8a/ffffff?text=Meeting+Room",
        "https://placehold.co/800x600/1e3a8a/ffffff?text=CEO+Interview",
        "https://placehold.co/800x600/1e3a8a/ffffff?text=Customer+Service",
        "https://placehold.co/800x600/1e3a8a/ffffff?text=Motion+Graphics",
        "https://placehold.co/800x600/1e3a8a/ffffff?text=Team+Event"
      ],
      "deskripsi": "Video profil perusahaan (Company Profile) yang menampilkan visi futuristik bank dan budaya kerja profesional untuk keperluan rebranding dan rekrutmen talenta muda.",
      "teknologi": [
        { "nama": "Sony FX3", "deskripsi": "Main Cam", "logo": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg", "penggunaan": 100, "efisiensi": 50 },
        { "nama": "After Effects", "deskripsi": "VFX", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg", "penggunaan": 100, "efisiensi": 40 },
        { "nama": "Blender", "deskripsi": "3D Assets", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", "penggunaan": 100, "efisiensi": 20 },
        { "nama": "Premier Pro", "deskripsi": "Editing", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg", "penggunaan": 100, "efisiensi": 60 }
      ],
      "statistik": [
        { "label": "Brand Image", "sebelum": 50, "sesudah": 94 },
        { "label": "Pelamar Kerja", "sebelum": 30, "sesudah": 80 },
        { "label": "Social Reach", "sebelum": 20, "sesudah": 90 }
      ],
      "hasil": [
        "Meningkatkan engagement LinkedIn perusahaan sebesar 400%",
        "Digunakan sebagai materi utama IPO Roadshow",
        "Citra brand meningkat di kalangan Gen-Z",
        "Peningkatan aplikasi pelamar kerja sebesar 80%"
      ]
    },
    {
      "id": "port-4",
      "judul": "Kampanye Peluncuran Brand",
      "kategori": "Pemasaran Digital",
      "klien": "Velvet Mode",
      "logoKlien": "https://placehold.co/100x100/be185d/ffffff?text=VM",
      "tahun": "2023",
      "gambar": "https://placehold.co/1200x800/be185d/ffffff?text=Fashion+Campaign",
      "url": "https://www.instagram.com/instagram/",
      "galeri": [
        "https://placehold.co/800x600/9d174d/ffffff?text=Lookbook",
        "https://placehold.co/800x600/9d174d/ffffff?text=Social+Media+Post",
        "https://placehold.co/800x600/9d174d/ffffff?text=Ad+Creative",
        "https://placehold.co/800x600/9d174d/ffffff?text=Influencer+Collab",
        "https://placehold.co/800x600/9d174d/ffffff?text=Website+Banner",
        "https://placehold.co/800x600/9d174d/ffffff?text=Event+Launch"
      ],
      "deskripsi": "Manajemen kampanye media sosial dan iklan tertarget (Paid Ads) untuk peluncuran brand fashion baru. Strategi mencakup kolaborasi KOL, konten viral TikTok, dan retargeting ads.",
      "teknologi": [
        { "nama": "Meta Ads", "deskripsi": "Targeting", "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", "penggunaan": 100, "efisiensi": 30 },
        { "nama": "TikTok", "deskripsi": "Viral Reach", "logo": "https://cdn.icon-icons.com/icons2/2972/PNG/512/tiktok_logo_icon_186896.png", "penggunaan": 100, "efisiensi": 20 },
        { "nama": "Google Analytics", "deskripsi": "Tracking", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", "penggunaan": 100, "efisiensi": 40 },
        { "nama": "Canva", "deskripsi": "Content", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg", "penggunaan": 100, "efisiensi": 50 }
      ],
      "statistik": [
        { "label": "ROAS", "sebelum": 100, "sesudah": 550 },
        { "label": "Conversion", "sebelum": 1.5, "sesudah": 8.5 },
        { "label": "CTR", "sebelum": 0.8, "sesudah": 4.2 }
      ],
      "hasil": [
        "ROAS (Return on Ad Spend) mencapai 5.5x",
        "Terjual habis 1000 SKU dalam 24 jam peluncuran",
        "Mendapatkan 50k followers organik dalam 1 bulan",
        "Cost per Purchase terendah di kategori fashion"
      ]
    },
    {
      "id": "port-5",
      "judul": "Ekosistem Dashboard SaaS",
      "kategori": "Ekosistem Web",
      "klien": "TechFlow Inc",
      "logoKlien": "https://placehold.co/100x100/4338ca/ffffff?text=TF",
      "tahun": "2024",
      "gambar": "https://placehold.co/1200x800/4338ca/ffffff?text=SaaS+Dashboard",
      "url": "https://vercel.com/templates",
      "galeri": [
        "https://placehold.co/800x600/3730a3/ffffff?text=Analytics+View",
        "https://placehold.co/800x600/3730a3/ffffff?text=Project+Kanban",
        "https://placehold.co/800x600/3730a3/ffffff?text=Team+Settings",
        "https://placehold.co/800x600/3730a3/ffffff?text=Billing+Page",
        "https://placehold.co/800x600/3730a3/ffffff?text=Mobile+Responsive",
        "https://placehold.co/800x600/3730a3/ffffff?text=Dark+Mode"
      ],
      "deskripsi": "Membangun ekosistem SaaS (Software as a Service) lengkap dari landing page konversi tinggi hingga user dashboard yang kompleks dan interaktif untuk manajemen proyek.",
      "teknologi": [
        { "nama": "React", "deskripsi": "Frontend", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "penggunaan": 100, "efisiensi": 45 },
        { "nama": "TypeScript", "deskripsi": "Type Safe", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", "penggunaan": 100, "efisiensi": 35 },
        { "nama": "Tailwind", "deskripsi": "Styling", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", "penggunaan": 100, "efisiensi": 60 },
        { "nama": "AWS Lambda", "deskripsi": "Serverless", "logo": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "penggunaan": 100, "efisiensi": 25 },
        { "nama": "Stripe", "deskripsi": "Payment", "logo": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg", "penggunaan": 100, "efisiensi": 50 }
      ],
      "statistik": [
        { "label": "Uptime", "sebelum": 95, "sesudah": 99.9 },
        { "label": "User Growth", "sebelum": 10, "sesudah": 120 },
        { "label": "Perfomance", "sebelum": 60, "sesudah": 96 }
      ],
      "hasil": [
        "Churn rate menurun 20% berkat UX yang lebih baik",
        "Skalabilitas otomatis menangani 100k user",
        "Loading time dashboard < 500ms",
        "Integrasi pembayaran global mulus"
      ]
    },
    {
      "id": "port-6",
      "judul": "Seri Media Berita Teknologi",
      "kategori": "Agensi Kreatif",
      "klien": "TechDaily",
      "logoKlien": "https://placehold.co/100x100/0f172a/ffffff?text=TD",
      "tahun": "2022",
      "gambar": "https://placehold.co/1200x800/0f172a/ffffff?text=Tech+News+Set",
      "url": "https://www.youtube.com/embed/SqoRAhO8i_U",
      "galeri": [
        "https://placehold.co/800x600/1e293b/ffffff?text=Studio+Setup",
        "https://placehold.co/800x600/1e293b/ffffff?text=Green+Screen",
        "https://placehold.co/800x600/1e293b/ffffff?text=Live+Broadcast",
        "https://placehold.co/800x600/1e293b/ffffff?text=Motion+Graphic+Overlay",
        "https://placehold.co/800x600/1e293b/ffffff?text=Interview",
        "https://placehold.co/800x600/1e293b/ffffff?text=YouTube+Thumbnails"
      ],
      "deskripsi": "Produksi seri berita teknologi mingguan dengan kualitas broadcast untuk platform YouTube dan Instagram Reels. Mencakup set design, syuting, dan motion graphics.",
      "teknologi": [
        { "nama": "Lighting", "deskripsi": "Set Setup", "logo": "https://cdn.iconspng.com/images/bulb/bulb.jpg", "penggunaan": 100, "efisiensi": 60 },
        { "nama": "Green Screen", "deskripsi": "Chroma", "logo": "https://upload.wikimedia.org/wikipedia/commons/3/30/Green_screen_icon.svg", "penggunaan": 100, "efisiensi": 40 },
        { "nama": "vMix Live", "deskripsi": "Broadcast", "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e4/VMix_Logo.png", "penggunaan": 100, "efisiensi": 30 },
        { "nama": "Audition", "deskripsi": "Audio", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobeaudition/adobeaudition-original.svg", "penggunaan": 100, "efisiensi": 50 }
      ],
      "statistik": [
        { "label": "Retention", "sebelum": 30, "sesudah": 65 },
        { "label": "Subscribers", "sebelum": 10, "sesudah": 100 },
        { "label": "Views", "sebelum": 50, "sesudah": 250 }
      ],
      "hasil": [
        "Meraih Silver Play Button (100k Subs) dalam 6 bulan",
        "Rata-rata retensi penonton 65%",
        "Kerjasama sponsorship dengan brand teknologi global",
        "Produksi efisien 3 episode per minggu"
      ]
    }
  ]
}
;

  


  const { hero, cta } = data;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
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
      ...['5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpeg'].map(f => ({ type: 'image' as const, url: `https://github.com/alinlabs/alinlabs-data/raw/main/gambar/portofolio-klien/stie-wikara/${f}` }))
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

  const shuffledWebPortfolios = useMemo(() => {
    let seed = Math.random();
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
    return [...webPortfolios].map(value => ({ value, sort: random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }, []);

  const { popupOpen, initialMediaIndex, handleOpenPopup, handleClosePopup, handleMediaChange } = useShareableMedia('semua-galeri', galleryItems.length);

  const sectionsCount = 6; // Updated number of sections
  const PORTFOLIO_SECTIONS = useMemo(() => {
    let seed = Math.random();
    function random() {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }
    const arr = [
      { label: 'Ambefit Tiens', index: 0, kategori: 'Kesehatan' },
      { label: 'Minnatul Huda', index: 1, kategori: 'Pendidikan' },
      { label: 'Melin Perfume', index: 2, kategori: 'E-commerce' },
      { label: 'STIE Wikara', index: 3, kategori: 'Pendidikan' },
      { label: 'World Street', index: 4, kategori: 'Fashion' },
      { label: 'Vany Songket', index: 5, kategori: 'Fashion' }
    ];
    // Return them with original indices so scrolling targets correctly, just not shuffled? Wait, if we shuffle them, the ordering in the DOM must match the indices. Let's just create an array of indices and shuffle them, then use that to order the sections in render?
    // Actually, wait. It says "susunan yang random tapi link tetap sama". Let's simply randomize the array order. The index must be dynamically assigned based on the random order so scrolling works correctly.
    // Wait, the actual sections are hardcoded:
    // <SectionAmbefit />
    // <SectionMinnatulHuda /> ...
    // If we want random order of section rendering, we should map over them.
    return arr;
  }, []);

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
    <div className="bg-slate-50 w-full min-h-screen">
      {/* Visual Hero */}
      <section className="relative w-full aspect-[4/3] md:aspect-[21/9] flex flex-col items-center justify-center bg-slate-100 border-b-4 border-slate-200">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full relative">
            {/* Desktop Image */}
            <img 
              src="/gambar/banner-desktop4.webp" 
              alt="Portofolio Banner"
              className="hidden md:block w-full h-full object-cover object-[center_30%]"
              loading="eager"
            />
            {/* Mobile Image */}
            <img 
              src="/gambar/banner-mobile4.webp" 
              alt="Portofolio Banner"
              className="block md:hidden w-full h-full object-cover object-[center_30%]"
              loading="eager"
            />
          </div>
        </div>

        {/* Overlapping Bottom Search Bar & Tabs */}
        <div className="absolute bottom-0 translate-y-[60%] sm:translate-y-[25%] left-0 w-full px-4 sm:px-6 lg:px-8 z-40 flex justify-center">
          <div ref={searchRef} className="w-full max-w-5xl bg-white rounded-3xl p-3 sm:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 transition-transform hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] flex flex-col md:flex-row items-center relative gap-3">
            
            <form onSubmit={handleSearch} className="w-full md:flex-1 flex items-center bg-slate-50 rounded-2xl p-1 sm:p-1.5 border border-slate-100">
              <div className="pl-3 sm:pl-5 text-slate-400">
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              
              <input 
                type="text" 
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
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:py-3 sm:px-6 rounded-xl transition-colors flex-shrink-0 text-sm sm:text-base ml-1 sm:ml-2 shadow-sm"
              >
                <span className="hidden sm:inline">Cari</span>
                <Search className="w-5 h-5 sm:hidden" />
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

      {/* Main Content Area based on Tab */}
      <div className="pt-24 sm:pt-28 md:pt-32 pb-2 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Klien */}
        <div className={activeTab === 'klien' ? "block" : "hidden"}>
            {/* Mitra Kami Section */}
            <div className="mb-2 md:mb-12 text-center overflow-hidden">
                <h3 className="text-[9px] sm:text-[10px] md:text-sm font-bold text-slate-400 uppercase tracking-[0.1em] md:tracking-[0.3em] mb-1 md:mb-6">Telah Di Percaya Oleh</h3>
                <div className="relative w-full max-w-full mx-auto px-0 md:px-0">
                    <div className="flex overflow-hidden items-start pb-1 md:pb-6 pt-2">
                        <div className="flex items-start gap-x-2 sm:gap-x-4 md:gap-x-10 w-max animate-scroll pr-2 sm:pr-4 md:pr-10">
                            {[...partners, ...partners, ...partners].map((partner, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-start group cursor-default w-16 sm:w-20 md:w-24 shrink-0 h-full">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0 border border-slate-200 bg-white rounded-full shadow-sm flex items-center justify-center overflow-hidden mb-2 md:mb-3 group-hover:border-blue-400 group-hover:shadow-[0_4px_20px_rgb(59,130,246,0.2)] transition-all duration-300 transform group-hover:-translate-y-1 mx-auto">
                                {partner.logo ? (
                                    <>
                                        <img 
                                            src={partner.logo?.includes('fbcdn.net') ? `https://wsrv.nl/?url=${encodeURIComponent(partner.logo)}` : partner.logo} 
                                            alt={partner.name}  
                                            referrerPolicy="no-referrer" 
                                            loading="lazy"
                                            className="w-full h-full object-contain p-2.5 md:p-3 transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                if (e.currentTarget.nextElementSibling) {
                                                    e.currentTarget.nextElementSibling.classList.remove('hidden');
                                                }
                                            }}
                                        />
                                        <span className="hidden text-xl md:text-3xl font-extrabold text-slate-300 group-hover:text-blue-600 transition-colors">
                                            {partner.name.charAt(0)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-xl md:text-3xl font-extrabold text-slate-300 group-hover:text-blue-600 transition-colors">
                                        {partner.name.charAt(0)}
                                    </span>
                                )}
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

        {/* Tab Galeri */}
        <div className={activeTab === 'galeri' ? "block w-full" : "hidden"}>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center">Kolase Karya Terbaik</h3>
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {/* Compiled Gallery Items */}
              {galleryItems.map((item, idx) => (
                  <div key={idx} className="break-inside-avoid overflow-hidden rounded-xl shadow-sm border border-slate-200 group relative">
                    {item.type === 'video' ? (
                      <div className="relative group cursor-pointer" onClick={() => handleOpenPopup(idx)}>
                        <InViewVideo 
                          src={item.url} 
                          className="w-full h-auto rounded-xl object-cover" 
                          autoPlay={false} 
                          muted 
                          loop 
                          playsInline
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 flex-col gap-2">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <Play className="w-6 h-6 ml-1" />
                            </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group cursor-pointer" onClick={() => handleOpenPopup(idx)}>
                        <img 
                          src={item.url} 
                          alt={`Gallery item ${idx+1}`} 
                          className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 flex-col gap-2">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <Maximize className="w-6 h-6" />
                            </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <VideoPopup
              videos={galleryItems.map(item => item.url)}
              initialIndex={initialMediaIndex}
              isOpen={popupOpen}
              onClose={handleClosePopup}
              onMediaChange={handleMediaChange}
              clientName="AlinLabs Galeri"
            />
        </div>

        {/* Tab Web & App */}
        <div className={activeTab === 'website' ? "block w-full" : "hidden"}>
            <div className="text-center mb-8 sm:mb-10 text-slate-600 max-w-2xl mx-auto">
               <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2 sm:mb-4">Web & Aplikasi</h3>
               <p className="text-sm md:text-base">Portofolio digital yang dibangun dengan teknologi terbaru. Buatan AlinLabs.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8 grid-flow-row-dense">
              {shuffledWebPortfolios.map((port, index) => (
                <div 
                  key={index} 
                  className={`group flex flex-col relative cursor-pointer ${port.isWide ? 'col-span-2' : 'col-span-1'}`}
                  onClick={() => {
                    if (onPreview) {
                      onPreview(port.url, port.title, port.category);
                    } else {
                      window.open(port.url, '_blank');
                    }
                  }}
                >
                   <div className={`w-full relative overflow-hidden pointer-events-none bg-slate-100 rounded-2xl md:rounded-3xl shadow-sm group-hover:shadow-2xl transition-all duration-500 ${port.isWide ? 'h-[160px] sm:h-[300px] md:h-[450px]' : 'h-[200px] sm:h-[350px] md:h-[450px]'}`}>
                       <iframe 
                         src={port.url}
                         className={`absolute top-0 left-0 border-none transform origin-top-left ${port.isWide ? 'w-[200%] h-[200%] md:w-[150%] md:h-[150%] scale-[0.5] md:scale-[0.666]' : 'w-[400%] h-[400%] scale-[0.25]'}`}
                         scrolling="no"
                         loading="lazy"
                       />
                       <div className="absolute inset-0 bg-transparent group-hover:bg-slate-900/10 transition-colors duration-500 z-20"></div>
                   </div>
                   <div className="pt-3 sm:pt-4 px-1 sm:px-2 flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-sm sm:text-xl md:text-2xl text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">{port.title}</h4>
                      </div>
                      <span className="text-[10px] sm:text-sm font-semibold text-slate-500 uppercase tracking-wider line-clamp-1">{port.category}</span>
                   </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};
