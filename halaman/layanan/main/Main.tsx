
import React from 'react';
import { ViewState } from '../../../types';
import { Box } from 'lucide-react';
import { DynamicIcon } from '../../../utils/DynamicIcon';

// Import New Package Components
import { IklanIn } from '../paket/IklanIn';
import { WebsiteIn } from '../paket/WebsiteIn';
import { KreatifIn } from '../paket/KreatifIn';
// Updated import from PackageDetail.tsx to Main.tsx
import { Main as PackageDetail } from '../paket/Main';

interface LayananProps {
  onNavigate: (view: ViewState, payload?: any) => void;
  selectedPackageId?: string | null;
  onPackageSelect?: (id: string | null) => void;
}

export const Main: React.FC<LayananProps> = ({ onNavigate, selectedPackageId, onPackageSelect }) => {
  const data: any = {
  "hero": {
      "slogan": "Solusi Kami",
      "judul": "Rangkaian Layanan Terintegrasi",
      "deskripsi": "Pilih paket yang sesuai dengan tahapan bisnis Anda. Dari inisiasi digital hingga dominasi pasar menyeluruh."
  },
  "paket": {
    "digital-marketing": {
        "id": "digital-marketing",
        "nama": "Manajemen Konten & Iklan Sosial Media",
        "slogan": "ROI Tinggi",
        "deskripsi": "Layanan bulanan dan paketan pengelolaan sosial media secara rutine dan berkala.",
        "deskripsiPanjang": "Layanan bulanan dan paketan pengelolaan sosial media secara rutine dan berkala untuk dominasi pasar digital Anda.",
        "gambar": "/lottie/SosialMedia.lottie",
        "warnaAksen": "bg-blue-600",
        "fitur": [
            "Manajemen Iklan Meta (FB/IG)",
            "Strategi Iklan TikTok",
            "12 Feed + 8 Desain Story/Bulan",
            "Laporan Analitik Bulanan",
            "Copywriting Persuasif",
            "A/B Testing Kampanye"
        ],
        "manfaat": [
            "Peningkatan trafik website/toko",
            "Lead generation berkualitas",
            "Optimasi budget iklan (ROAS tinggi)",
            "Brand awareness yang masif"
        ],
        "metrik": [
            { "label": "Rata-rata ROAS", "nilai": 5.5, "akhiran": "x" },
            { "label": "Kenaikan CTR", "nilai": 2.5, "akhiran": "%" },
            { "label": "Jangkauan", "nilai": 500, "akhiran": "K+" }
        ],
        "teknologi": [
            { "nama": "Meta Ads", "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
            { "nama": "TikTok", "logo": "https://cdn.icon-icons.com/icons2/2972/PNG/512/tiktok_logo_icon_186896.png" },
            { "nama": "Google Ads", "logo": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg" },
            { "nama": "Canva", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
            { "nama": "Semrush", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Semrush_logo.svg/2560px-Semrush_logo.svg.png" }
        ]
    },
    "website-aplikasi": {
        "id": "website-aplikasi",
        "nama": "Pembuatan Website & Aplikasi Custom",
        "slogan": "Paling Laris",
        "deskripsi": "Jasa pembuatan website sekaligus aplikasi custom namun ada beberapa layanan pilihannya juga.",
        "deskripsiPanjang": "Jasa pembuatan website sekaligus aplikasi custom namun ada beberapa layanan pilihannya juga untuk mendukung infrastruktur IT Anda.",
        "gambar": "/lottie/Website.lottie",
        "warnaAksen": "bg-blue-600",
        "fitur": [
            "Company Profile / E-Commerce Pro",
            "Panel Admin CMS (Mudah Digunakan)",
            "Optimasi SEO On-Page & Kecepatan",
            "Domain & Hosting 1 Tahun",
            "Sertifikat SSL Gratis",
            "Desain Responsif Mobile"
        ],
        "manfaat": [
            "Kredibilitas bisnis meningkat instan",
            "Aksesibilitas 24 jam bagi pelanggan",
            "Platform penjualan milik sendiri",
            "Fondasi untuk marketing digital"
        ],
        "metrik": [
            { "label": "Kecepatan", "nilai": 95, "akhiran": "/100" },
            { "label": "Skor SEO", "nilai": 90, "akhiran": "/100" },
            { "label": "Mobile Friendly", "nilai": 100, "akhiran": "%" }
        ],
        "teknologi": [
            { "nama": "React", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { "nama": "Next.js", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { "nama": "Tailwind", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
            { "nama": "WordPress", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
            { "nama": "Vercel", "logo": "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png" },
            { "nama": "Figma", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
        ]
    },
    "konten-live": {
        "id": "konten-live",
        "nama": "Konten Instan & Live Service",
        "slogan": "Dampak Visual",
        "deskripsi": "Layanan jasa konten satuan dan live streaming dari produk brand yang ingin di live kan produknya (karna alinlabs ada talent dan juga studionya).",
        "deskripsiPanjang": "Layanan jasa konten satuan dan live streaming dari produk brand yang ingin di live kan produknya (karna alinlabs ada talent dan juga studionya).",
        "gambar": "/lottie/VideoCreator.lottie",
        "warnaAksen": "bg-blue-600",
        "fitur": [
            "Pemotretan Profesional Produk/Tim",
            "1 Video Teaser Sinematik (30dtk)",
            "5 Template Desain Media Sosial",
            "Editing & Color Grading Profesional",
            "Konsep & Storyboard",
            "Dukungan Pencarian Bakat & Lokasi"
        ],
        "manfaat": [
            "Diferensiasi visual yang kuat",
            "Tingkat interaksi media sosial tinggi",
            "Materi iklan yang lebih menjual",
            "Persepsi nilai brand naik"
        ],
        "metrik": [
            { "label": "Interaksi", "nilai": 200, "akhiran": "%" },
            { "label": "Waktu Tonton", "nilai": 45, "akhiran": "s" },
            { "label": "Ingatan Brand", "nilai": 80, "akhiran": "%" }
        ],
        "teknologi": [
            { "nama": "Premiere", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" },
            { "nama": "After Effects", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
            { "nama": "DaVinci", "logo": "https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png" },
            { "nama": "Blender", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
            { "nama": "Sony", "logo": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
            { "nama": "Canon", "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Canon_logo_vector.svg/1024px-Canon_logo_vector.svg.png" }
        ]
    }
  },
  "detail": {
      "ads": {
          "slogan": "Pemasaran Digital",
          "judul": "Iklan & Media Sosial",
          "subJudul": "Pertumbuhan Merek Strategis",
          "deskripsi": "Tingkatkan visibilitas brand Anda dengan strategi pemasaran berbasis data. Kami mengelola kampanye iklan tertarget di Meta (Facebook/Instagram), TikTok, dan Google, serta manajemen konten media sosial yang menarik dan konversional.",
          "gambar": "https://placehold.co/600x450/9333ea/ffffff?text=Social+Media+Growth",
          "urlLottie": "/lottie/SosialMedia.lottie",
          "fitur": ["Manajemen Media Sosial", "Iklan Meta (FB/IG)", "Strategi Iklan TikTok", "Perencanaan Konten", "Laporan Analitik", "Copywriting & Kreatif"],
          "statistik": { "label": "Konversi", "nilai": "+350%" },
          "metodologi": [
              { "judul": "Ahli Iklan Meta", "deskripsi": "Penargetan audiens yang presisi di Facebook & Instagram untuk meningkatkan Brand Awareness dan Sales.", "ikon": "Globe", "warna": "blue" },
              { "judul": "Strategi Viral TikTok", "deskripsi": "Memanfaatkan tren konten vertikal (FYP) untuk menjangkau audiens Gen-Z dan Milenial secara organik maupun berbayar.", "ikon": "Smartphone", "warna": "black" },
              { "judul": "Ekosistem Google", "deskripsi": "SEM (Search Engine Marketing) dan Display Network untuk menangkap user yang sedang aktif mencari produk Anda.", "ikon": "BarChart3", "warna": "orange" }
          ]
      },
      "creative": {
          "slogan": "Agensi Kreatif",
          "judul": "Creative Visual Studio",
          "subJudul": "Keunggulan Bercerita Visual",
          "deskripsi": "Kami menghidupkan cerita Anda melalui visual yang sinematik. Layanan produksi lengkap mulai dari pra-produksi, syuting dengan peralatan standar industri, hingga pasca-produksi (editing & color grading). Spesialis dalam dokumenter, profil perusahaan, dan iklan komersial.",
          "gambar": "https://placehold.co/600x450/d97706/ffffff?text=Cinematic+Production",
          "urlLottie": "/lottie/VideoCreator.lottie",
          "fitur": ["Produksi Film 4K", "Pembuatan Dokumenter", "Video Profil Perusahaan", "Iklan Komersial & TVC", "Konten Media Berita", "Sinematografi Drone"],
          "tahapan": [
              { "judul": "Pra-Produksi", "deskripsi": "Konsep, naskah, storyboard, casting talent, dan survey lokasi.", "ikon": "Clapperboard" },
              { "judul": "Produksi", "deskripsi": "Shooting dengan Kamera Sinema (Sony FX/RED), pengaturan pencahayaan, dan perekaman audio.", "ikon": "Camera" },
              { "judul": "Pasca-Produksi", "deskripsi": "Editing Offline/Online, Color grading (Davinci Resolve), Desain Suara & Mixing.", "ikon": "MonitorPlay" }
          ]
      }
  },
  "sertifikasi": [
      { "ikon": "Lock", "label": "Kode Aman" },
      { "ikon": "Globe", "label": "Jangkauan Global" },
      { "ikon": "Video", "label": "Produksi 4K" },
      { "ikon": "Shield", "label": "Privasi Data" }
  ]
}
;

  
  


  // MAPPING: JSON keys (Indonesian) to Component variables
  // JSON: { hero, paket, detail, sertifikasi }
  const { hero, paket: packagesData, detail: details, sertifikasi: certifications } = data || {};

  // Handle Package Detail View (Using props from App.tsx)
  if (selectedPackageId && packagesData?.[selectedPackageId]) {
      return (
          <PackageDetail 
            data={packagesData[selectedPackageId]} 
            onBack={() => onPackageSelect?.(null)}
            onNavigate={onNavigate}
          />
      );
  }

  const handleSelect = (id: string) => {
    if (onPackageSelect) {
        onPackageSelect(id);
    }
  };

  return (
    <div className="w-full bg-slate-50">
      {/* Visual Hero */}
      <section className="relative w-full aspect-[4/3] md:aspect-[21/9] flex flex-col items-center justify-center bg-slate-100 border-b-4 border-slate-200">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full relative">
            {/* Desktop Image */}
            <img loading="lazy" 
              src="/gambar/banner-desktop5.webp" 
              alt="Layanan Banner"
              className="hidden md:block w-full h-full object-cover object-[center_30%]"
            />
            {/* Mobile Image */}
            <img loading="lazy" 
              src="/gambar/banner-mobile5.webp" 
              alt="Layanan Banner"
              className="block md:hidden w-full h-full object-cover object-[center_30%]"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pb-16 pt-8 pointer-events-none">
        </div>
      </section>

      {/* Strategic Packages Grid */}
      <section className="relative z-20 -mt-12 md:-mt-24 px-4 max-w-7xl mx-auto mb-12 md:mb-24">
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 overflow-x-auto md:overflow-visible gap-4 md:gap-6 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 pb-8 md:pb-0 pt-4 md:pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
             {/* Manajemen Konten & Iklan */}
             {packagesData?.['digital-marketing'] && (
                 <div className="w-[80vw] md:w-auto snap-center h-full flex-shrink-0">
                     <IklanIn 
                        data={packagesData['digital-marketing']}
                        onNavigate={onNavigate} 
                        onDetail={() => handleSelect('digital-marketing')} 
                     />
                 </div>
             )}

             {/* Website & Aplikasi */}
             {packagesData?.['website-aplikasi'] && (
                 <div className="w-[80vw] md:w-auto snap-center h-full flex-shrink-0">
                     <WebsiteIn 
                        data={packagesData['website-aplikasi']}
                        onNavigate={onNavigate} 
                        onDetail={() => handleSelect('website-aplikasi')} 
                     />
                 </div>
             )}
             
             {/* Konten Instant & Live Service */}
             {packagesData?.['konten-live'] && (
                 <div className="w-[80vw] md:w-auto snap-center h-full flex-shrink-0">
                     <KreatifIn 
                        data={packagesData['konten-live']}
                        onNavigate={onNavigate} 
                        onDetail={() => handleSelect('konten-live')} 
                     />
                 </div>
             )}
        </div>
      </section>

    </div>
  );
};
