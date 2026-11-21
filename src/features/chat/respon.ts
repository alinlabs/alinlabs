
import { IntentID } from './quest';

export interface BotResponse {
  text: string;
  buttons?: { label: string; url: string; }[];
  whatsappLink?: { phone: string; text: string; };
  suggestedTopics?: string[];
}

export const RESPONSE_LIBRARY: Record<string, BotResponse[]> = {
  ALL_PAGES: [
    {
      text: "Tentu! Ini daftar menu cepat untuk menjelajahi website AlinLabs ya kak 😊",
      buttons: [
        { label: "Beranda Utama", url: "/" },
        { label: "Layanan Kami", url: "/layanan" },
        { label: "Portofolio Karya", url: "/portofolio" },
        { label: "Tentang AlinLabs", url: "/tentang" },
        { label: "Hubungi Kami", url: "/kontak" }
      ]
    },
    {
      text: "Siap kak! Aira bantu munculkan semua menu utamanya di sini biar lebih mudah dicarinya:",
      buttons: [
        { label: "Beranda Utama", url: "/" },
        { label: "Layanan Kami", url: "/layanan" },
        { label: "Portofolio Karya", url: "/portofolio" },
        { label: "Tentang AlinLabs", url: "/tentang" },
        { label: "Hubungi Kami", url: "/kontak" }
      ]
    }
  ],
  GREETING: [
    {
      text: "Halo kak! 👋 Selamat datang di AlinLabs Indonesia. Aku Aira, asisten yang siap bantu kamu. Ada yang bisa Aira bantu seputar layanan kita?",
      buttons: [
        { label: "Layanan Digital & IT", url: "/layanan" },
        { label: "Portofolio Kami", url: "/portofolio" },
        { label: "Tentang Perusahaan", url: "/tentang" }
      ]
    },
    {
      text: "Hai kak! Senang banget bisa ketemu kamu di sini 🌟 Kalau ada yang mau ditanyain soal pembuatan website, aplikasi, atau digital marketing, langsung curhat aja ya ke Aira!",
      buttons: [
        { label: "Lihat Daftar Layanan", url: "/layanan" },
        { label: "Kunjungi Portofolio", url: "/portofolio" },
        { label: "Info Kontak", url: "/kontak" }
      ]
    },
    {
      text: "Selamat pagi/siang/sore kak! Aira di sini 🙋‍♀️ Boleh banget tanya-tanya dulu seputar kebutuhan digital bisnis kakak. Aira siap bantu jelaskan!",
      buttons: [
        { label: "Layanan Digital & IT", url: "/layanan" },
        { label: "Portofolio Kami", url: "/portofolio" }
      ]
    }
  ],
  ASK_NAME: [
    { 
      text: "Kenalin, aku Aira! 🥰 Asisten virtual cerdas asli buatan AlinLabs. Tugasku bantu jawab semua kebutuhan kakak di sini. Butuh bantuan ke menu tertentu?",
      buttons: [
        { label: "Masuk ke Beranda", url: "/" },
        { label: "Tentang Kami", url: "/tentang" }
      ]
    },
    {
      text: "Aku Aira kak, salam kenal ya! 👋 Boleh minta waktunya sebentar untuk jelasin layanan unggulan kita, atau kakak mau langsung cek menu?",
      buttons: [
        { label: "Layanan Digital & IT", url: "/layanan" },
        { label: "Info Kontak", url: "/kontak" }
      ]
    }
  ],
  ASK_PRICE: [
    { 
      text: "Buat harganya sangat bervariasi menyesuaikan fitur yang kakak butuhin nih. Tapi tenang, harganya super worth it kok! Cek detail paketnya di sini ya:",
      buttons: [
        { label: "Harga Layanan & Paket", url: "/layanan" },
        { label: "Cara Checkout", url: "/checkout" }
      ]
    },
    {
      text: "Wah kalau soal harga, Aira pastikan yang terbaik deh buat kakak ✨ Kakak bisa cek transparan di halaman paket layanan. Cobain intip di tombol ini ya:",
      buttons: [
        { label: "Giá & Layanan", url: "/layanan" }
      ]
    }
  ],
  SERVICE_WEB: [
    { 
      text: "Wah pas banget! Kita spesialis banget nih bikin web dari Mendarat (Landing Page) sampai E-Commerce. Semuanya kencang dan kekinian! Intip hasil kerjanya ya 👇", 
      buttons: [
        { label: "Layanan Ekosistem Website", url: "/layanan/website-aplikasi" },
        { label: "Kembali ke Semua Layanan", url: "/layanan" }
      ]
    },
    {
      text: "Bebas mau bikin apa aja! Mulai company profile sampe portal khusus, Aira jamin tim developer kita bisa laksanakan 💻 Lihat di sini ya paket-paketnya:",
      buttons: [
        { label: "Bikin Website & App", url: "/layanan/website-aplikasi" }
      ]
    }
  ],
  SERVICE_APP: [
    { 
      text: "Kita bisa bikin aplikasi Android dan iOS loh, kak! Pake teknologi modern yang hemat tapi powerful. Coba liat detil paket pembangunannya ya 📱",
      buttons: [
        { label: "Layanan Pembuatan Aplikasi", url: "/layanan/website-aplikasi" },
        { label: "Kembali ke Semua Layanan", url: "/layanan" }
      ]
    }
  ],
  SERVICE_ADS: [
    { 
      text: "Biar bisnis kakak makin cuan dan dikenal luas, kita punya layanan nanganin medsos sampai iklan Meta/Google lho! Serahin aja ke ahlinya 🚀",
      buttons: [
        { label: "Layanan Digital Marketing", url: "/layanan/digital-marketing" }
      ]
    },
    {
      text: "Pengen jualan lebih banyak? Kelola medsos dan optimasi iklan aja bareng tim kita! Aira yakin banget omzet bisa langsung terbang 💸 Cek detailnya ya:",
      buttons: [
        { label: "Digital Marketing & Iklan", url: "/layanan/digital-marketing" }
      ]
    }
  ],
  SERVICE_CREATIVE: [
    { 
      text: "Dari desain logo, materi brosur, sampai edit video sosmed yang keren, tim desainer kita siap bantu bikin visual brand kakak level up! 🎨",
      buttons: [
        { label: "Layanan Konten & Identitas Visual", url: "/layanan/konten-live" }
      ]
    }
  ],
  SERVICE_ECOSYSTEM: [
    { 
      text: "Suka yang full package? Ekosistem Digital cocok banget! Kita yang mikirin dari A sampe Z dari website, aplikasi, sampe iklannya 🌐 Tinggal terima beres!",
      buttons: [
        { label: "Mulai Transformasi (Layanan)", url: "/layanan" },
        { label: "Lihat Kemitraan (Corporate)", url: "/partnership/corporate" }
      ]
    }
  ],
  PORTFOLIO: [
    { 
      text: "Kita nggak main-main soal hasil kak😎 Udah ratusan project nyelesaiin bareng brand ternama. Biar bukti yang bicara, silakan klik portofolio kita:",
      buttons: [
        { label: "Buka Portofolio Utama", url: "/portofolio" }
      ]
    },
    {
      text: "Buktikan sendiri kualitas keren dari tim kita kak! ✨ Langsung aja intip beberapa hasil kerja kita buat klien-klien sebelumnya:",
      buttons: [
        { label: "Lihat Portofolio", url: "/portofolio" }
      ]
    }
  ],
  CONTACT: [
    { 
      text: "Pengen diskusi lebih dalem dan spesifik? Boleh banget! Mending langsung ngobrol sama tim konsultan ahli kita lewat WhatsApp aja biar cepet 👩‍💼",
      buttons: [
        { label: "Halaman Detail Kontak", url: "/kontak" }
      ],
      whatsappLink: { phone: "+6281807000054", text: "Halo tim AlinLabs, saya ingin ngobrol dan konsultasi lebih lanjut nih soal project saya." }
    },
    {
      text: "Aira bisa banget bantu sambungin kakak ke tim ahli kita nih! Tinggal klik aja, nanti kita atur jadwal diskusinya 😊",
      buttons: [
        { label: "Halaman Detail Kontak", url: "/kontak" }
      ],
      whatsappLink: { phone: "+6281807000054", text: "Halo AlinLabs, saya butuh konsultasi layanan." }
    }
  ],
  LOCATION: [
    { 
      text: "Basecamp utama kita ada di pusat Purwakarta, Jawa Barat, kak. Lengkapnya ada di Google Maps. Boleh main kalau lagi deket! 🗺️",
      buttons: [
        { label: "Cek Lokasi & Kontak", url: "/kontak" }
      ]
    }
  ],
  PROCESS_TIME: [
    { 
      text: "Estimasi waktunya macam-macam, kak. Mulai dari yang cepet banget cuma 3 harian, sampai berbulan-bulan kalau kompleks. Garansi selalu aman kok! ⏱️",
      buttons: [
        { label: "Syarat & Ketentuan Proses", url: "/legal/terms" }
      ]
    }
  ],
  WARRANTY: [
    { 
      text: "Jangan panik kalau ada error ya! Kita kasih garansi perbaikan 30 hari penuh demi ketenangan batin kakak 🥰 Tersedia jua maintenance jangka panjangnya.",
      buttons: [
        { label: "Kebijakan Garansi & Lisensi", url: "/legal/license" }
      ]
    }
  ],
  TECH_STACK: [
    { 
      text: "Tim IT kita cuma pakai teknologi paling top tier sekarang kak, kaya Next.js, React, Node.js dan super cloud services 💻 Intip selengkapnya di sini:",
      buttons: [
        { label: "Mengenal AlinLabs", url: "/tentang" }
      ]
    }
  ],
  CAREER: [
    { 
      text: "Wah, tertarik join sama kita? Saat ini kita lagi seru ngejalin kemitraan dari perorangan sampai komunitas. Yuk intip cara joinnya! 🤝",
      buttons: [
        { label: "Kemitraan Corporate", url: "/partnership/corporate" },
        { label: "Kemitraan Komunitas", url: "/partnership/community" },
        { label: "Program Individual", url: "/partnership/individual" }
      ]
    }
  ],
  CLOSING: [
    { 
      text: "Sama-sama kak! 🥰 Senang banget kalau penjelasan Aira membantu. Kalau butuh apa-apa, ketik aja lagi ya. Have a great day!",
      buttons: [
        { label: "Kembali ke Beranda", url: "/" }
      ]
    },
    {
      text: "Oke siap kak! Sukses selalu untuk projectnya ❤️ Tanyakan ke Aira kapan pun kalau butuh pencerahan lagi.",
      buttons: [
        { label: "Kembali ke Beranda", url: "/" }
      ]
    }
  ],
  ASK_PRICE_SOSMED: [
    { 
      text: "Buat biaya urus sosmed atau promosi beda-beda tiap tiernya kak 📱 Mulai dari UMKM sampe brand gede kita ada paketan lengkap dan transparan!",
      buttons: [
        { label: "Layanan Digital Marketing", url: "/layanan/digital-marketing" },
        { label: "Layanan Konten & Visual", url: "/layanan/konten-live" }
      ]
    }
  ],
  UNKNOWN: [
    { 
      text: "Aduh, maaf ya kak 😥 Aira agak bingung sama pertanyaannya. Gapapa deh, Aira kasih list menu cepat, atau kakak bisa langsung chat cs WhatsApp biar lebih enak obrolannya 👩‍💼",
      buttons: [
        { label: "Layanan Tersedia", url: "/layanan" },
        { label: "Halaman Bantuan/Kontak", url: "/kontak" }
      ],
      whatsappLink: { phone: "+6281807000054", text: "Halo mas/mba tim AlinLabs, asisten Aira agak mentok nih, saya mau nanya langsung." }
    },
    {
      text: "Hmm... kayaknya hal itu nggak ada di database otak Aira deh 🥺 Mending kakak langsung chat ke konsultan ahlinya aja. Aira drop tombolnya di bawah ini ya!",
      buttons: [
        { label: "Ngobrol sama Konsultan", url: "/kontak" },
        { label: "Lihat Layanan Tersedia", url: "/layanan" }
      ],
      whatsappLink: { phone: "+6281807000054", text: "Halo tim AlinLabs, saya mau tanya-tanya nih." }
    }
  ],
  ABOUT_US: [
    {
      text: "Pengen denger cerita soal AlinLabs dari awal sampai sekarang? 🏢 Boleh banget! Kakak bisa baca visi, misi dan profil para ahli di baliknya:",
      buttons: [
        { label: "Tentang AlinLabs", url: "/tentang" }
      ]
    }
  ],
  LEGAL: [
    {
      text: "Tenang kak, data sama project kakak bener-bener privasi. Kita ada aturan mainnya yang jelas kok, kakak bisa baca lengkapnya di mari:",
      buttons: [
        { label: "Kebijakan Privasi", url: "/legal/privacy" },
        { label: "Syarat & Ketentuan", url: "/legal/terms" },
        { label: "Info Lisensi", url: "/legal/license" }
      ]
    }
  ],
  PARTNERSHIP: [
    {
      text: "Kita terbuka banget buat kerja bareng siapa aja! Mau b2b company, komunitas asyik, atau freelance affiliator, let's go! 🚀",
      buttons: [
        { label: "Sinergi B2B (Corporate)", url: "/partnership/corporate" },
        { label: "Dukungan Komunitas", url: "/partnership/community" },
        { label: "Afiliasi Individual", url: "/partnership/individual" },
        { label: "Kolaborasi Pemerintah", url: "/partnership/government" }
      ]
    }
  ],
  CHECKOUT: [
    {
      text: "Wih udah nemu paket yang cocok nih kayanya? 😍 Langsung aja amanin slot pembangunannya di halaman checkout khusus kita kak!",
      buttons: [
        { label: "Halaman Checkout Pesanan", url: "/checkout" }
      ]
    }
  ]
};
