
import React, { useState, useEffect } from 'react';
import { ViewState } from '../../types';
 // Import fetchData
import { Hero } from './Hero';
import { QuickAccess } from './QuickAccess';
import { NationalReach } from './NationalReach';
import { FeaturedServices } from './FeaturedServices';
import { Workflow } from './Workflow';
import { TechStack } from './TechStack';
import { Testimonials } from './Testimonials';

interface MainProps {
  onNavigate: (view: ViewState) => void;
  onPackageSelect?: (id: string) => void;
}

export const Main: React.FC<MainProps> = ({ onNavigate, onPackageSelect }) => {
  const data: any = {
  "hero": {
    "backgroundVideo": "https://cdn.pixabay.com/video/2022/12/28/144581-785095778_tiny.mp4",
    "slides": [
      {
        "id": 1,
        "slogan": "Pusat Digital Terintegrasi",
        "judul": "Kami Membangun <br/> Ekosistem Digital",
        "deskripsi": "AlinLabs Indonesia menggabungkan ekosistem web canggih, keunggulan agensi kreatif, dan strategi pemasaran digital untuk meningkatkan level brand Anda.",
        "gambar": "https://imgur.com/gwKYr0S.png",
        "alt": "Professional CEO"
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
      "deskripsi": "Menghubungkan bisnis dan inovasi dari Sabang sampai Merauke melalui infrastruktur digital yang handal.",
      "urlLottie": "/lottie/IndonesiaConnect.lottie",
      "stats": [
          { "label": "Cakupan Area", "nilai": "34 Provinsi", "ikon": "MapPin" },
          { "label": "Konektivitas", "nilai": "Stabil & Cepat", "ikon": "Activity" }
      ]
  },
  "featuredServices": {
      "gambarDesktop": "https://imgur.com/x2ortf5.png",
      "urlLottie": "/lottie/LoadingRocket.lottie",
      "items": [
        {
            "id": "digital-marketing",
            "nama": "Manage Konten & Iklan",
            "kategori": "Pemasaran Digital",
            "deskripsi": "Layanan bulanan dan paketan pengelolaan sosial media secara rutine dan berkala.",
            "ikon": "Megaphone",
            "targetView": "SERVICE_ADS",
            "techLogos": ["https://imgur.com/ZD8NqrQ.png", "https://imgur.com/btoGlgz.png", "https://imgur.com/5KHhcB7.png"]
        },
        {
            "id": "website-aplikasi",
            "nama": "Website & Aplikasi",
            "kategori": "Layanan Utama",
            "deskripsi": "Jasa pembuatan website sekaligus aplikasi custom namun ada beberapa layanan pilihannya juga.",
            "ikon": "Globe",
            "targetView": "SERVICE_ECOSYSTEM",
            "isCenter": true,
            "techLogos": ["https://imgur.com/QpjeHpG.png", "https://imgur.com/LsSzxNy.png", "https://imgur.com/YMctVdt.png"]
        },
        {
            "id": "konten-live",
            "nama": "Konten Instan & Live",
            "kategori": "Konten & Live",
            "deskripsi": "Layanan jasa konten satuan dan live streaming dari produk brand yang ingin di live kan produknya (karna alinlabs ada talent dan juga studionya).",
            "ikon": "Video",
            "targetView": "SERVICE_CINEMA",
            "techLogos": ["https://imgur.com/KZW34Yf.png", "https://imgur.com/5wZl9sJ,png", "https://imgur.com/MTd67Kh.png"]
        }
      ],
      "platforms": [
        { "nama": "Windows", "logo": "https://imgur.com/5MZP9qW.png" },
        { "nama": "Android", "logo": "https://imgur.com/Q3iH068.png" },
        { "nama": "Apple / iOS", "logo": "https://imgur.com/bjKf1Ka.png" }
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
      "deskripsi": "Fondasi teknologi terbaik untuk memastikan bisnis Anda berjalan lancar, aman, dan dapat diandalkan.",
      "groups": [
          {
            "judul": "Website & Aplikasi",
            "items": [
              { "nama": "Next.js", "peran": "Web Framework", "logo": "https://imgur.com/BfdxlYr.png", "bg": "bg-slate-100" },
              { "nama": "React Native", "peran": "Mobile Apps", "logo": "https://imgur.com/wpDEVAr.png", "bg": "bg-cyan-50" },
              { "nama": "TypeScript", "peran": "Strict Typing", "logo": "https://imgur.com/USUcfkW.png", "bg": "bg-blue-50" },
              { "nama": "Tailwind", "peran": "Modern CSS", "logo": "https://imgur.com/5FvTY9i.png", "bg": "bg-teal-50" }
            ]
          },
          {
            "judul": "Digital Marketing",
            "items": [
              { "nama": "Meta Ads", "peran": "FB & IG Ads", "logo": "https://imgur.com/ZD8NqrQ.png", "bg": "bg-blue-50" },
              { "nama": "Google Ads", "peran": "SEM & Search", "logo": "https://imgur.com/5KHhcB7.png", "bg": "bg-yellow-50" },
              { "nama": "TikTok Ads", "peran": "Viral Video", "logo": "https://imgur.com/btoGlgz.png", "bg": "bg-slate-900" },
              { "nama": "SEMrush", "peran": "SEO Tools", "logo": "https://imgur.com/i4SydNy.png", "bg": "bg-orange-50" }
            ]
          },
          {
            "judul": "Kreatif & Visual",
            "items": [
              { "nama": "Adobe CC", "peran": "Design Suite", "logo": "https://imgur.com/SYZNA0W.png", "bg": "bg-red-50" },
              { "nama": "Figma", "peran": "UI/UX Design", "logo": "https://imgur.com/DK7u4Iq.png", "bg": "bg-purple-50" },
              { "nama": "Davinci", "peran": "Color Grading", "logo": "https://imgur.com/sswytoT.png", "bg": "bg-pink-50" },
              { "nama": "Blender", "peran": "3D Modeling", "logo": "https://imgur.com/Ppzqcd3.png", "bg": "bg-orange-50" }
            ]
          }
      ]
  },
  "workflow": {
      "slogan": "Bagaimana Kami Bekerja",
      "judul": "Alur Kerja Profesional",
      "deskripsi": "Transparansi dan efisiensi adalah kunci kolaborasi kami. Kami memastikan setiap langkah terukur dan berdampak.",
      "steps": [
        { "judul": "Konsultasi & Strategi", "deskripsi": "Kami membedah kebutuhan bisnis Anda untuk merancang roadmap digital yang tepat sasaran.", "ikon": "MessageSquare" },
        { "judul": "Pengembangan & Kreasi", "deskripsi": "Tim ahli kami membangun sistem dan konten visual dengan standar industri tertinggi.", "ikon": "Briefcase" },
        { "judul": "Optimasi & Peluncuran", "deskripsi": "Pengujian ketat sebelum peluncuran untuk memastikan performa maksimal.", "ikon": "Zap" },
        { "judul": "Dukungan Berkelanjutan", "deskripsi": "Pemeliharaan dan update berkala agar bisnis Anda terus bertumbuh.", "ikon": "UserCheck" }
      ],
      "gambarAmbassador": "https://imgur.com/0ChYWHv.png"
  },
  "testimonials": [
    { "nama": "Budi Santoso", "peran": "CEO, TechJaya", "teks": "Transformasi website kami luar biasa. Penjualan naik 200% dalam 3 bulan pertama." },
    { "nama": "Siti Rahma", "peran": "Owner, BatikNusantara", "teks": "Video profil yang dibuat Creative Visual Studio sangat sinematik dan meningkatkan citra brand kami." },
    { "nama": "Andi Wijaya", "peran": "Marketing Dir, Foodies", "teks": "Strategi iklannya sangat efektif. ROI positif dan target audience tercapai dengan presisi." }
  ],
"faq": {
    "gambar": "https://imgur.com/9SXT82g.png",
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
    <div className="w-full overflow-hidden">
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
