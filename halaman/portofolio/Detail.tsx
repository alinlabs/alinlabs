
import React, { useEffect, useState } from 'react';
import { ViewState } from '../../types';
import { Calendar, User, Tag, Layers, CheckCircle2, ExternalLink, Share2, TrendingUp, Zap, LayoutTemplate, Video, Megaphone, Briefcase } from 'lucide-react';
import { CircularGrowth } from '../../components/ui/MetricCharts';

interface DetailProps {
  itemId: string;
  onBack: () => void;
  onPreview: (url: string, title: string, category: any) => void;
}

export const Detail: React.FC<DetailProps> = ({ itemId, onBack, onPreview }) => {
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
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [itemId]);

  // Set default image when item loads or changes
  useEffect(() => {
    if (data?.item) {
        const found = data.item.find((p: any) => p.id === itemId);
        if (found) {
            setActiveImage(found.gambar);
        }
    }
  }, [data, itemId]);

  
  
  const items = data?.item || [];
  const item = items.find((p: any) => p.id === itemId);



  const results = item.hasil || [];
  const stats = item.statistik || [];
  const gallery = item.galeri || [item.gambar, item.gambar, item.gambar, item.gambar, item.gambar, item.gambar]; // Fallback if gallery missing
  
  const displayImage = activeImage || item.gambar;

  // Determine Icon based on category - Updated colors for Light Background
  const renderIcon = () => {
    if (item.kategori === 'Ekosistem Web') return <LayoutTemplate className="w-8 h-8 text-sky-600" />;
    if (item.kategori === 'Agensi Kreatif') return <Video className="w-8 h-8 text-amber-600" />;
    if (item.kategori === 'Pemasaran Digital') return <Megaphone className="w-8 h-8 text-purple-600" />;
    return <Briefcase className="w-8 h-8 text-slate-600" />;
  };

  // Dynamic Button Label
  const getButtonLabel = () => {
      switch (item.kategori) {
          case 'Ekosistem Web': return 'Kunjungi Situs';
          case 'Agensi Kreatif': return 'Lihat Hasil';
          case 'Pemasaran Digital': return 'Lihat Portofolio';
          default: return 'Lihat Project';
      }
  };

  const handlePreviewClick = () => {
      setPreviewError(null);
      if (item.url) {
          onPreview(item.url, item.judul, item.kategori);
      } else {
          // Fallback if no URL
          setPreviewError("Link preview belum tersedia untuk proyek ini.");
          setTimeout(() => setPreviewError(null), 3000);
      }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900">
      
      {/* Immersive Hero Section */}
      <section className="relative w-full min-h-[50vh] md:min-h-[70vh] flex items-end pb-8 md:pb-12 overflow-hidden bg-slate-900">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <img loading="lazy" 
              src={displayImage}
              alt={item.judul}
              className="w-full h-full object-cover object-center filter blur-xl scale-110 opacity-40 transition-all duration-1000"
              key={displayImage}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/60 to-transparent"></div>
           <div className="absolute inset-0 bg-slate-900/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-16 md:mt-24">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12">
                 <div className="flex-1">
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-sm hover:bg-white/20 transition-all">
                         {item.kategori}
                     </div>
                     <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tight drop-shadow-md">
                         {item.judul}
                     </h1>
                     <div className="flex flex-wrap items-center gap-2 md:gap-4 text-slate-200 font-medium">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                             <User className="w-3 h-3 md:w-4 md:h-4 text-blue-300" />
                             <span className="text-xs sm:text-sm md:text-base">{item.klien}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                             <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-300" />
                             <span className="text-xs sm:text-sm md:text-base">{item.tahun}</span>
                          </div>
                     </div>
                 </div>
                 
                 <div className="w-full md:w-auto">
                    {previewError && (
                        <div className="bg-amber-500/20 text-yellow-200 backdrop-blur-md text-xs font-bold px-4 py-2 rounded-lg border border-amber-500/30 text-center mb-4">
                            {previewError}
                        </div>
                    )}
                    <button 
                        onClick={handlePreviewClick}
                        className="w-full md:w-auto group relative px-6 py-3 md:px-8 md:py-4 bg-white text-blue-700 rounded-full font-extrabold overflow-hidden shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
                            {getButtonLabel()}
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                        </span>
                        <div className="absolute inset-0 h-full w-0 bg-blue-50 transition-all duration-300 ease-in-out group-hover:w-full z-0"></div>
                    </button>
                 </div>
             </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-16 pb-12 md:pb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            
            {/* LEFT COLUMN: Main Content */}
            <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
                
                {/* Hero Showcase (Interactive) */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[2rem] md:rounded-[2.5rem] opacity-50 blur-lg group-hover:opacity-70 transition-opacity duration-500 z-0 hidden sm:block"></div>
                  <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl mb-4 border-2 md:border-4 border-white bg-slate-100 z-10">
                      <img loading="lazy" 
                          src={displayImage} 
                          alt={item.judul} 
                          className="w-full h-full object-contain md:object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          key={displayImage}
                      />
                  </div>
                </div>

                {/* Creative Gallery Grid */}
                <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-600" /> Frame Galeri
                   </h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                       {gallery.slice(0, 6).map((img: string, idx: number) => {
                           const isActive = displayImage === img;
                           // Make first item take up more space in grid for bento effect if we want, but keeping simple for now
                           return (
                               <div 
                                   key={idx} 
                                   onClick={() => setActiveImage(img)}
                                   className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer group/thumb transition-all duration-300 bg-white shadow-sm ${isActive ? 'ring-4 ring-blue-500 ring-offset-2 scale-95' : 'hover:shadow-lg hover:-translate-y-1 hover:ring-2 hover:ring-blue-200'}`}
                               >
                                   <img loading="lazy" 
                                       src={img} 
                                       alt={`Gallery ${idx + 1}`} 
                                       className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover/thumb:opacity-100'}`}
                                   />
                                   {!isActive && (
                                     <div className="absolute inset-0 bg-slate-900/10 group-hover/thumb:bg-transparent transition-colors"></div>
                                   )}
                               </div>
                           );
                       })}
                   </div>
                </div>

                {/* Description & Story */}
                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100">
                    <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <LayoutTemplate className="w-4 h-4" />
                        </span>
                        Cerita Proyek
                    </h3>
                    <div className="prose prose-base md:prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600">
                        <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6">
                            {item.deskripsi}
                        </p>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            Tantangan utama dalam proyek ini adalah menyeimbangkan estetika dengan fungsionalitas teknis yang tinggi. Tim kreatif dan developer kami berkolaborasi intensif melakukan riset mendalam untuk memastikan solusi yang diberikan tepat sasaran, inovatif, dan memberikan dampak jangka panjang.
                        </p>
                    </div>
                </div>

                {/* Qualitative Results */}
                {results.length > 0 && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-slate-700 text-white relative overflow-hidden shadow-2xl">
                        {/* decorative shapes */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
                        
                        <h3 className="text-2xl font-extrabold text-white mb-8 flex items-center gap-3 relative z-10">
                            <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" />
                            </span>
                            Hasil & Pencapaian
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                            {results.map((res: string, i: number) => (
                                <div key={i} className="flex items-start group p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span className="text-slate-200 font-medium text-sm leading-relaxed">{res}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: Sidebar */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* Stats Widget */}
                {stats.length > 0 && (
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100/50 flex flex-col gap-2">
                             <div className="inline-block max-w-fit text-[10px] font-bold bg-indigo-600 text-white px-2.5 py-1 rounded-md uppercase tracking-wider">Terukur</div>
                             <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-indigo-600" /> Dampak Numerik
                            </h3>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex flex-col gap-8">
                                {stats.map((stat: any, idx: number) => {
                                    const themes: any = ['blue', 'purple', 'amber'];
                                    return (
                                        <div key={idx} className="flex flex-col items-center">
                                            <CircularGrowth 
                                                value={stat.sesudah || stat.nilai}
                                                label={stat.label}
                                                suffix={stat.label.toLowerCase().includes('roas') ? 'x' : '%'}
                                                colorTheme={themes[idx % 3]}
                                                delay={idx * 200}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tech Stack / Optimization Widget */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-8">
                     <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
                        <span className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-500" /> Stack Teknologi
                        </span>
                    </h3>
                    
                    <div className="flex flex-col space-y-6">
                        {item.teknologi.map((tech: any, idx: number) => {
                            const name = typeof tech === 'string' ? tech : tech.nama;
                            const previousState = typeof tech === 'string' ? 40 : (tech.efisiensi || 40); 
                            const logo = typeof tech === 'string' ? null : tech.logo;
                            const logoText = name.substring(0, 2).toUpperCase();

                            return (
                                <div key={idx} className="flex flex-col gap-3 group/item">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-sm group-hover/item:scale-110 group-hover/item:shadow-md transition-all">
                                            {logo ? (
                                                <img loading="lazy" src={logo} alt={name} className="w-full h-full object-contain filter group-hover/item:grayscale-0 grayscale transition-all duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center font-black text-slate-400">
                                                    {logoText}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="font-bold text-slate-800 text-sm md:text-base">{name}</div>
                                            <div className="text-xs text-slate-500 font-medium">{typeof tech !== 'string' && tech.deskripsi ? tech.deskripsi : 'Integrasi'}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-indigo-500 w-full z-10 rounded-full"></div>
                                        <div 
                                            className="absolute top-0 left-0 h-full bg-slate-300 z-20 border-r-2 border-white" 
                                            style={{ width: `${previousState}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Share Widget */}
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center flex flex-col items-center">
                    <p className="text-sm text-slate-500 font-medium mb-4">Temukan karya kreatif lainnya</p>
                    <button onClick={onBack} className="text-blue-600 font-bold hover:text-blue-800 underline underline-offset-4 decoration-blue-200 hover:decoration-blue-400 transition-all">
                        Kembali ke Portofolio
                    </button>
                    <div className="mt-6 flex justify-center gap-3">
                       <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-all">
                           <Share2 className="w-4 h-4" />
                       </button>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};
