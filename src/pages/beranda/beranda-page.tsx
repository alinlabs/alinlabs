
import React, { useState, useEffect } from 'react';
import { ViewState } from '../../types';
 // Import fetchData
import { Hero } from './hero';
import { QuickAccess } from './quick-access';
import { NationalReach } from './national-reach';
import { FeaturedServices } from './featured-services';
import { Workflow } from './workflow';
import { TechStack } from './tech-stack';
import { Testimonials } from './testimonials';

interface MainProps {
  onNavigate: (view: ViewState) => void;
  onPackageSelect?: (id: string) => void;
}

export const Main: React.FC<MainProps> = ({ onNavigate, onPackageSelect }) => {
  const data: any = {
  "hero": {
    "slides": [
      {
        "id": 1,
        "slogan": "Pusat Digital Terintegrasi",
        "judul": "Kami Membangun <br/> Ekosistem Digital",
        "deskripsi": "AlinLabs Indonesia menggabungkan ekosistem web canggih, keunggulan agensi kreatif, dan strategi pemasaran digital untuk meningkatkan level brand Anda.",
        "gambar": "/gambar/banner-desktop1.webp",
        "alt": "AlinLabs Ekosistem Digital"
      }
    ],
    "stats": [
      { "label": "Tahun Dipercaya", "nilai": "10+", "ikon": "Shield" },
      { "label": "Proyek Besar", "nilai": "99+", "ikon": "Layers" },
      { "label": "Efektif & Efisien", "nilai": "100%", "ikon": "Activity" },
      { "label": "Kepuasan Customer", "nilai": "A+", "ikon": "Sparkles" }
    ]
  },
  "nationalReach": {
      "slogan": "Jangkauan Nasional",
      "judul": "Telah Dipercaya Di Seluruh Indonesia",
      "deskripsi": "Infrastruktur digital handal untuk bisnis di seluruh Indonesia.",
      "urlLottie": "/lottie/indonesia-connect.lottie",
      "stats": [
          { "label": "Cakupan Area", "nilai": "34 Provinsi", "ikon": "MapPin" },
          { "label": "Konektivitas", "nilai": "Stabil & Cepat", "ikon": "Activity" }
      ]
  },
  "featuredServices": {
      "gambarDesktop": "/gambar/banner-desktop1.webp",
      "urlLottie": "/lottie/loading-rocket.lottie",
      "items": [
        {
            "id": "digital-marketing",
            "nama": "Manage Konten & Iklan",
            "kategori": "Pemasaran Digital",
            "deskripsi": "Layanan bulanan dan paketan pengelolaan sosial media secara rutine dan berkala.",
            "ikon": "Megaphone",
            "targetView": "SERVICE_ADS",
            "techLogos": ["/icon/meta.png", "/icon/tiktok.png", "/icon/google.png"]
        },
        {
            "id": "website-aplikasi",
            "nama": "Website & Aplikasi",
            "kategori": "Layanan Utama",
            "deskripsi": "Jasa pembuatan website sekaligus aplikasi custom namun ada beberapa layanan pilihannya juga.",
            "ikon": "Globe",
            "targetView": "SERVICE_ECOSYSTEM",
            "isCenter": true,
            "techLogos": ["/icon/vercel.png", "/icon/cloudflare.png", "/icon/pwa.png"]
        },
        {
            "id": "konten-live",
            "nama": "Konten Instan & Live",
            "kategori": "Konten & Live",
            "deskripsi": "Layanan jasa konten satuan dan live streaming dari produk brand yang ingin di live kan produknya (karna alinlabs ada talent dan juga studionya).",
            "ikon": "Video",
            "targetView": "SERVICE_CINEMA",
            "techLogos": ["/icon/canon.svg", "/icon/dji.svg", "/icon/lighting.svg"]
        }
      ],
      "platforms": [
        { "nama": "Windows", "logo": "/icon/windows.png" },
        { "nama": "Android", "logo": "/icon/android.png" },
        { "nama": "Apple / iOS", "logo": "/icon/ios.png" }
      ]
  },
  "whyUs": [
    {
        "ikon": "ShieldCheck",
        "judul": "Garansi Kualitas & Keamanan",
        "deskripsi": "Kami memberikan garansi bug-free selama 30 hari setelah peluncuran dan jaminan keamanan data standar industri."
    },
    {
        "ikon": "Users",
        "judul": "100% Tim In-House",
        "deskripsi": "Tidak dilempar ke freelancer. Proyek Anda dikerjakan oleh tim ahli tetap kami untuk kontrol kualitas maksimal."
    },
    {
        "ikon": "Clock",
        "judul": "Tepat Waktu",
        "deskripsi": "Kami menghargai waktu Anda. Timeline proyek yang disepakati adalah komitmen mati bagi kami."
    },
    {
        "ikon": "FileCheck",
        "judul": "Transparansi Total",
        "deskripsi": "Tidak ada biaya tersembunyi. Anda mendapatkan akses penuh ke progress report mingguan dan source code."
    }
  ],
  "techStack": {
      "slogan": "Teknologi Kami",
      "judul": "Integrasi Cerdas Dan Terpercaya",
      "deskripsi": "Teknologi modern agar bisnis berjalan cepat, aman, dan stabil.",
      "groups": [
          {
            "judul": "Website & Aplikasi",
            "items": [
              { "nama": "Next.js", "peran": "Web Framework", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", "bg": "bg-slate-100" },
              { "nama": "React Native", "peran": "Mobile Apps", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "bg": "bg-cyan-50" },
              { "nama": "TypeScript", "peran": "Strict Typing", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", "bg": "bg-blue-50" },
              { "nama": "Tailwind", "peran": "Modern CSS", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", "bg": "bg-sky-50" }
            ]
          },
          {
            "judul": "Digital Marketing",
            "items": [
              { "nama": "Meta Ads", "peran": "FB & IG Ads", "logo": "/icon/meta.png", "bg": "bg-blue-50" },
              { "nama": "Google Ads", "peran": "SEM & Search", "logo": "/icon/google.png", "bg": "bg-amber-50" },
              { "nama": "TikTok Ads", "peran": "Viral Video", "logo": "/icon/tiktok.png", "bg": "bg-slate-900" },
              { "nama": "SEMrush", "peran": "SEO Tools", "logo": "/icon/semrush.svg", "bg": "bg-orange-50" }
            ]
          },
          {
            "judul": "Kreatif & Visual",
            "items": [
              { "nama": "Adobe Audition", "peran": "Audio & Studio", "logo": "/icon/audition.svg", "bg": "bg-slate-100" },
              { "nama": "Figma", "peran": "UI/UX Design", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", "bg": "bg-slate-100" },
              { "nama": "RED Cinema", "peran": "4K Production", "logo": "/icon/red-cinema.svg", "bg": "bg-slate-100" },
              { "nama": "Blender", "peran": "3D Modeling", "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg", "bg": "bg-orange-50" }
            ]
          }
      ]
  },
  "workflow": {
      "slogan": "Bagaimana Kami Bekerja",
      "judul": "Alur Kerja Profesional",
      "deskripsi": "Kolaborasi transparan dan terukur di setiap langkah proyek Anda.",
      "steps": [
        { "judul": "Konsultasi & Strategi", "deskripsi": "Kami membedah kebutuhan bisnis Anda untuk merancang roadmap digital yang tepat sasaran.", "ikon": "MessageSquare" },
        { "judul": "Pengembangan & Kreasi", "deskripsi": "Tim ahli kami membangun sistem dan konten visual dengan standar industri tertinggi.", "ikon": "Briefcase" },
        { "judul": "Optimasi & Peluncuran", "deskripsi": "Pengujian ketat sebelum peluncuran untuk memastikan performa maksimal.", "ikon": "Zap" },
        { "judul": "Dukungan Berkelanjutan", "deskripsi": "Pemeliharaan dan update berkala agar bisnis Anda terus bertumbuh.", "ikon": "UserCheck" }
      ],
      "gambarAmbassador": "/gambar/pilihan-layanan2.webp"
  },
  "testimonials": [
    { "nama": "Budi Santoso", "peran": "CEO, TechJaya", "teks": "Transformasi website kami luar biasa. Penjualan naik 200% dalam 3 bulan pertama." },
    { "nama": "Siti Rahma", "peran": "Owner, BatikNusantara", "teks": "Video profil yang dibuat Creative Visual Studio sangat sinematik dan meningkatkan citra brand kami." },
    { "nama": "Andi Wijaya", "peran": "Marketing Dir, Foodies", "teks": "Strategi iklannya sangat efektif. ROI positif dan target audience tercapai dengan presisi." }
  ],
"faq": {
    "gambar": "/gambar/pilihan-layanan1.webp",
    "items": [
      {
          "pertanyaan": "Berapa lama waktu yang dibutuhkan untuk membuat website?",
          "jawaban": "Waktu pengerjaan bervariasi tergantung kompleksitas. Untuk Company Profile standar biasanya 2-3 minggu. Untuk Toko Online atau Sistem Custom bisa memakan waktu 4-8 minggu. Kami akan memberikan timeline detail di awal proyek."
      },
      {
          "pertanyaan": "Apakah saya mendapatkan akses untuk mengedit konten sendiri?",
          "jawaban": "Tentu saja! Kami membangun website dengan CMS (Content Management System) yang user-friendly. Kami juga menyediakan sesi pelatihan gratis dan video tutorial agar Anda bisa mengelola konten dengan mudah."
      },
      {
          "pertanyaan": "Apakah layanan pembuatan video sudah termasuk model/talent?",
          "jawaban": "Paket standar kami biasanya mencakup biaya produksi dan editing. Untuk talent/model profesional, kami dapat membantu casting dan penyediaan dengan biaya tambahan sesuai rate talent yang dipilih."
      },
      {
          "pertanyaan": "Bagaimana sistem pembayarannya?",
          "jawaban": "Kami menerapkan sistem termin yang adil: 40% DP (Down Payment) di awal, 30% setelah persetujuan desain/mid-term, dan 30% pelunasan sebelum serah terima final (Go-Live)."
      },
      {
          "pertanyaan": "Apakah ada biaya bulanan wajib?",
          "jawaban": "Untuk jasa pengembangan (Web/App/Video), pembayaran bersifat 'One-Time' (sekali bayar). Biaya berulang tahunan hanya untuk Domain & Hosting (pihak ketiga) yang kepemilikannya 100% atas nama Anda."
      }
    ]
  },
  "cta": {
      "judul": "Siap Transformasi Bisnis?",
      "deskripsi": "Jangan biarkan kompetitor mendahului Anda. Mari bangun ekosistem digital yang kuat bersama AlinLabs Indonesia hari ini.",
      "teksTombol": "Hubungi Kami Sekarang",
      "teksTombolSekunder": "Lihat Portofolio"
  }
}
;

  
  


  return (
    <div className="w-full overflow-x-clip">
      <Hero onNavigate={onNavigate} data={data.hero} />
      <QuickAccess onNavigate={onNavigate} />
      <FeaturedServices onNavigate={onNavigate} onPackageSelect={onPackageSelect} data={data.featuredServices} />
      <NationalReach data={data.nationalReach} whyUsData={data.whyUs} />
      <TechStack data={data.techStack} />
      <Workflow data={data.workflow} />
      <Testimonials data={data.testimonials} />
    </div>
  );
};
