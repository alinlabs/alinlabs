
import React, { useEffect, useState } from 'react';
import { ViewState, IdentityData, MetaCollection, MetaItem } from '../../types';

interface MetaTagManagerProps {
  currentView: ViewState;
  identity: IdentityData | null;
}

export const MetaTagManager: React.FC<MetaTagManagerProps> = ({ currentView, identity }) => {
  const metaData: MetaCollection = {
  "default": {
    "judul": "Software House & Agensi Kreatif Purwakarta",
    "deskripsi": "AlinLabs Indonesia adalah software house & digital agency terkemuka di Purwakarta, Subang, Karawang. Menyediakan jasa pembuatan website, integrasi AI, aplikasi, dan digital marketing.",
    "katakunci": "jasa pembuatan website, jasa digital purwakarta, digital marketing subang, software house karawang, agensi kreatif, integrasi AI, jasa AI, alinlabs, alinlabs indonesia, artificial intelligence, agensi it",
    "gambar": "/gambar/metatag-umum.webp"
  },
  "rute": {
    "HOME": {
      "judul": "Beranda - Ekosistem Digital & IT Terintegrasi",
      "deskripsi": "Transformasi bisnis Anda dengan solusi digital end-to-end dari AlinLabs di Purwakarta, Subang, Karawang. Ahli dalam pengembangan web, integrasi AI (Artificial Intelligence), & pemasaran pemasaran digital.",
      "katakunci": "ekosistem digital, jasa it purwakarta, transformasi bisnis, solusi IT terintegrasi, jasa AI",
      "gambar": "/gambar/metatag-umum.webp"
    },
    "PRODUCTS": {
      "judul": "Layanan & Produk (Jasa Website, Aplikasi, AI, & Digital Marketing)",
      "deskripsi": "Jelajahi paket layanan kami: Pengembangan Website & Aplikasi Web, Integrasi AI, Manajemen Iklan Digital, dan Produksi Video Kreatif. Harga transparan, hasil maksimal di Karaba.",
      "katakunci": "jasa seo, google ads, meta ads, jasa video company profile, pembuatan aplikasi purwakarta, software house terdekat, jasa ai",
      "gambar": "/gambar/metatag-layanan.webp"
    },
    "PORTFOLIO": {
      "judul": "Portofolio Karya & Software",
      "deskripsi": "Lihat hasil karya terbaik kami. Studi kasus nyata bagaimana jasa digital kami membantu klien pemerintahan, korporat, dan UMKM bertumbuh secara digital.",
      "katakunci": "portofolio website, contoh video profil, hasil iklan digital, case study teknologi",
      "gambar": "/gambar/metatag-portofolio.webp"
    },
    "ABOUT": {
      "judul": "Tentang Software House & Digital Agency Kami",
      "deskripsi": "Mengenal lebih dekat tim di balik AlinLabs Indonesia. Visi kami menggabungkan teknologi kecerdasan buatan (AI) dengan kreativitas manusia berdedikasi tinggi di Purwakarta.",
      "katakunci": "profil perusahaan alinlabs, agen marketing terdekat, visi misi digital agency, startup purwakarta",
      "gambar": "/gambar/metatag-umum.webp"
    },
    "CONTACT": {
      "judul": "Hubungi Kami (Konsultasi Jasa IT & Marketing)",
      "deskripsi": "Siap memulai proyek website, AI, atau aplikasi? Hubungi tim AlinLabs sekarang untuk konsultasi gratis. Kami melayani klien dari Purwakarta, Subang, Karawang, dan seluruh Indonesia.",
      "katakunci": "kontak developer website, alamat alinlabs purwakarta, konsultasi it gratis, jasa digital",
      "gambar": "/gambar/metatag-umum.webp"
    },
    "SERVICE_ECOSYSTEM": {
      "judul": "Layanan Pembuatan Web & Aplikasi",
      "deskripsi": "Pengembangan sistem web dan aplikasi skala enterprise dengan dukungan AI. Aman, cepat, dan terintegrasi secara profesional.",
      "katakunci": "web development enterprise, jasa pembuatan erp, sistem informasi manajemen, jasa AI",
      "gambar": "/gambar/metatag-layanan.webp"
    },
    "SERVICE_ADS": {
      "judul": "Layanan Digital Marketing & Ads",
      "deskripsi": "Tingkatkan ROI bisnis Anda dengan manajemen iklan Meta, Google, dan TikTok yang tertarget bersama agensi digital terbaik.",
      "katakunci": "jasa iklan facebook, jasa google ads, digital marketing agency purwakarta",
      "gambar": "/gambar/metatag-layanan.webp"
    },
    "SERVICE_CINEMA": {
      "judul": "Creative Visual & Video Studio",
      "deskripsi": "Produksi konten visual premium. Menggabungkan efisiensi produksi video sinematik dan fotografi profesional untuk branding yang kuat.",
      "katakunci": "production house purwakarta, jasa video shooting, fotografer produk profesional",
      "gambar": "/gambar/metatag-layanan.webp"
    }
  }
} as any;

  // Update Head tags when view or data changes
  useEffect(() => {
    if (!metaData) return;

    const brandName = identity?.nama || 'AlinLabs';
    
    // Get specific route config or fallback to defaults
    // Note: We use ViewState strings as keys in JSON
    const routeMeta: MetaItem | undefined = metaData.rute[currentView as keyof typeof ViewState];
    const defaultConfig = metaData.default;

    const title = routeMeta?.judul 
        ? `${brandName} | ${routeMeta.judul}` 
        : `${brandName} | ${defaultConfig.judul}`;
        
    const description = routeMeta?.deskripsi || defaultConfig.deskripsi;
    const keywords = routeMeta?.katakunci || defaultConfig.katakunci;
    let image = routeMeta?.gambar || defaultConfig.gambar;
    if (image.startsWith('/')) {
        image = `${window.location.origin}${image}`;
    }
    const url = window.location.href;

    // 1. Update Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // 3. Open Graph / Social Media Tags
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:site_name', brandName, 'property');

    // 4. Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

  }, [currentView, metaData, identity]);

  // This component doesn't render anything visible
  return null;
};
