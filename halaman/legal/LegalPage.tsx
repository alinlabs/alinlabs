
import React from 'react';
import { ViewState } from '../../types';
import { ErrorState } from '../../components/ui/Error';
import { Sparkles } from 'lucide-react';

interface LegalPageProps {
  view: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ view }) => {
  const LEGAL_DATA: Record<string, any> = {
  "PRIVACY_POLICY": {
    "judul": "Kebijakan Privasi",
    "terakhirDiperbarui": "24 Mei 2024",
    "hero": {
      "slogan": "PERLINDUNGAN DATA",
      "subJudul": "Komitmen transparansi AlinLabs Indonesia dalam pengelolaan, perlindungan, dan privasi data Anda di era digital."
    },
    "pendahuluan": "AlinLabs Indonesia (\"AlinLabs\", \"kami\", atau \"kita\") sangat menghormati privasi Anda dan berkomitmen penuh untuk melindunginya. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, memproses, dan melindungi informasi Anda saat menggunakan layanan agensi digital kami (seperti pengembangan website, manajemen media sosial, pemasaran digital, dan produksi kreatif), serta saat Anda menelusuri situs web alinlabs.biz.id.",
    "bagian": [
      {
        "judul": "1. Informasi yang Kami Kumpulkan",
        "konten": "Kami mengumpulkan berbagai jenis informasi untuk memberikan layanan digital yang tepat sasaran dan berkualitas tinggi:",
        "daftar": [
          "<strong>Data Identitas & Kontak:</strong> Nama lengkap, alamat email, nomor WhatsApp/telepon, institusi perusahaan, dan jabatan untuk keperluan komunikasi representatif.",
          "<strong>Data Eksekusi Proyek:</strong> Informasi yang Anda berikan untuk keperluan eksekusi, seperti kredensial akses hosting/domain, akun media sosial (Meta, TikTok), preferensi desain, dan aset brand (logo, guidelines).",
          "<strong>Data Teknis Otomatis:</strong> Alamat IP, jenis dan versi peramban (browser), sistem operasi, waktu akses, serta metrik analitik dasar (melalui Google Analytics atau Meta Pixel) saat Anda menelusuri situs web kami."
        ]
      },
      {
        "judul": "2. Tujuan Penggunaan Informasi",
        "konten": "Data yang kami kumpulkan digunakan secara eksklusif untuk tujuan operasional, strategis, dan interaksi yang produktif:",
        "daftar": [
          "<strong>Penyediaan Layanan:</strong> Merancang website, mengeksekusi kampanye periklanan digital (Ads), memproduksi dan mendistribusikan konten media sosial, atau memelihara infrastruktur klien.",
          "<strong>Komunikasi Proyek:</strong> Mengirimkan draf desain, laporan performa iklan (analytics dashboard), pembaruan status sistem, serta faktur penagihan (invoice).",
          "<strong>Kualitas & Analitik:</strong> Menganalisis interaksi pengguna untuk meningkatkan strategi desain antarmuka (UI/UX) dan efektivitas algoritma pemasaran kami."
        ]
      },
      {
        "judul": "3. Perlindungan & Keamanan Manajerial",
        "konten": "Kerahasiaan akun bisnis Anda (seperti kredensial Meta Business Manager atau kontrol akses hosting) adalah prioritas utama kami. Kami menerapkan:",
        "daftar": [
          "Prinsip hak akses minimum (Role-based access control) di mana hanya personel tim developer atau tim kreatif terkait yang memiliki akses silang ke aset digital Anda.",
          "Enkripsi transfer data berlapis serta penggunaan platform manajemen internal terenkripsi end-to-end.",
          "Kami menjamin untuk tidak memperjualbelikan, menyewakan, atau mentransfer aset data pelanggan serta aset klien kami kepada entitas pihak ketiga untuk tujuan komersial sepihak."
        ]
      },
      {
        "judul": "4. Pengungkapan Pihak Ketiga Secara Terbatas",
        "konten": "Dalam memberikan infrastruktur layanan berskala global, kami dapat membagikan informasi dalam kapasitas sangat terbatas:",
        "daftar": [
          "Kepada penyedia infrastruktur terpercaya kelas dunia (contoh: Vercel, AWS, Google Cloud) dan sistem integrasi pembayaran (payment gateway) resmi.",
          "Kepada entitas pengelola distribusi konten dan pengiklan (seperti Ekosistem Meta atau Google Ads) saat kampanye sedang berjalan sesuai persetujuan strategis Anda.",
          "Berdasarkan permintaan hukum resmi yang sah atau untuk melindungi hak, privasi, dan kelangsungan operasional teknologi AlinLabs."
        ]
      },
      {
        "judul": "5. Hak Privasi Anda",
        "konten": "Sebagai mitra kami, Anda berhak sepenuhnya meminta tinjauan ulang, pembaharuan, hingga meminta penghapusan keseluruhan (Right to be Forgotten) atas data akses dan informasi yang tidak lagi diperlukan, serta mencabut otorisasi akses (delegated access) atas akun Anda pasca berhentinya kontrak kerja sama. Tentu saja, ini dilakukan sesuai batasan koridor yang ditetapkan Undang-Undang Perlindungan Data Pribadi (UU PDP) yang berlaku."
      }
    ]
  },
  "TERMS_OF_SERVICE": {
    "judul": "Syarat & Ketentuan",
    "terakhirDiperbarui": "24 Mei 2024",
    "hero": {
      "slogan": "PERJANJIAN LAYANAN",
      "subJudul": "Tata tertib, pedoman layanan, dan ikatan kerja sama profesional antara Anda dan AlinLabs Indonesia."
    },
    "pendahuluan": "Syarat dan Ketentuan (\"Syarat\", \"S&K\") ini merupakan perjanjian mengikat secara hukum antara Anda (Klien/Mitra) dan AlinLabs Indonesia terkait pemanfaatan layanan Agensi Digital kami, yang meliputi Web & App Development, Social Media Management, Digital Marketing, dan Creative Production.",
    "bagian": [
      {
        "judul": "1. Definisi Layanan Digital AlinLabs",
        "konten": "Setiap model layanan kami memiliki definisi operasional:",
        "daftar": [
          "<strong>Web & App Development:</strong> Layanan mencakup perancangan antarmuka (UI/UX), pembuatan kode sumber (coding), pengujian beta (QA), hingga tahap pelepasan proyek online (Live Deployment).",
          "<strong>Digital Marketing & SMM:</strong> Layanan mencakup riset audiens strategis, optimasi (SEO), perencanaan media (media buying/ads), pengelolaan kalender editorial, pembuatan konten, serta pelaporan kinerja algoritma di media sosial.",
          "<strong>Creative Production:</strong> Produksi rekaman visual, desain grafis stasioner, copywriting komersial, motion ads, hingga identitas branding yang sesuai visi merek Anda."
        ]
      },
      {
        "judul": "2. Kewajiban Finansial & Administrasi",
        "konten": "Setiap fase layanan diproses berdasarkan komitmen finansial:",
        "daftar": [
          "<strong>Uang Muka (Down Payment):</strong> Pengembangan teknologi dan kampanye akan dieksekusi setelah dibayarkannya Uang Muka yang disepakati (biasanya rentang 40%-50%). Uang Muka ini bersifat <em>Non-Refundable</em> apabila terjadi pembatalan sepihak setelah proses berjalan.",
          "<strong>Pelunasan (Final Settlement):</strong> Deliverables tahap akhir (misal: hand-over file sumber, migrasi ke domain utama klien) baru kami eksekusi pasca penuntasan pembayaran Invoice secara penuh.",
          "<strong>Anggaran Pihak Ketiga:</strong> Untuk pemasangan Meta/Google/TikTok Ads, besaran anggaran harian/iklan (Ads Spend Budget) wajib disediakan langsung oleh Klien, murni di luar harga tarif layanan atau <em>Agency Fee</em>."
        ]
      },
      {
        "judul": "3. Mekanisme Revisi Pekerjaan",
        "konten": "Profesionalisme eksekusi berfokus pada hasil yang efisien dan memuaskan:",
        "daftar": [
          "Setiap layanan memiliki jumlah persetujuan batas (Term of Revision) hingga dua atau tiga kali per satu tahap pengembangan atau konten.",
          "Revisi yang diwajarkan bersifat penambahan presisi, seperti koreksi layout, modifikasi warna, atau penyesuaian copywriting minor. Revisi fundamental seperti pergantian total arahan konsep desain dan perpindahan fundamental struktur tidak tercakup dalam perjanjian revisi gratis.",
          "Pekerjaan lanjutan yang timbul di luar batasan Proposal Awal (Scope Creep) akan diterbitkan sebagai <em>Change Order</em> dan ditagihkan sebagai pos pengembangan baru."
        ]
      },
      {
        "judul": "4. Tanggung Jawab & Partisipasi Klien",
        "konten": "Kerja sama agensi memerlukan kolaborasi yang lincah dari klien. Anda setuju untuk:",
        "daftar": [
          "Berpartisipasi dalam komunikasi secara wajar serta mengumpulkan umpan balik (feedback) di setiap tahapan, menghindari keterlambatan berlarut karena siklus tunggu.",
          "Bertanggung jawab sepenuhnya atas originalitas aset (logo, trademark, materi tekstual, legalitas properti media) yang disediakan oleh Klien kepada AlinLabs. Klien secara hukum melepaskan kami dari tuntutan penyalahgunaan hak cipta jika aset tersebut dipasok dari pihak Klien.",
          "Siap memfasilitasi akses infrastruktur teknis (contoh: kredensial DNS, panel Cloudflare, dan akses Admin Facebook) tepat waktu agar pergerakan tim teknis berjalan presisi."
        ]
      },
      {
        "judul": "5. Pemeliharaan dan Penyelesaian Proyek",
        "konten": "AlinLabs Indonesia tidak bertanggung jawab atas kerugian interupsi tak terduga (Downtime infrastruktur pihak ketiga seperti server cloud eksternal) dan tidak menjamin garansi bug eksternal apabila tim klien mengubah sendiri secara sepihak skrip, fungsional sistem, atau plugin yang terpadu.",
        "daftar": [
          "Segudang pengerjaan perakitan layanan dianggap Tuntas jika AlinLabs telah melayangkan penyampaian hasil dengan ketiadaan protes terlegitimasi dari klien selama jangka waktu lima (5) hari kerja purna terbit."
        ]
      }
    ]
  },
  "LICENSE": {
    "judul": "Lisensi & Hak Kekayaan Intelektual",
    "terakhirDiperbarui": "24 Mei 2024",
    "hero": {
      "slogan": "PANDUAN LISENSI",
      "subJudul": "Pedoman hak kepemilikan material, aset intelektual, serta lisensi pada seluruh produk digital yang dikembangkan AlinLabs."
    },
    "pendahuluan": "Memahami batasan peruntukan distribusi serta pengalihan Hak Kekayaan Intelektual (HAKI) merupakan elemen esensial demi melahirkan inovasi digital yang beretika. Seluruh perikatan karya cipta di AlinLabs tunduk pada lisensi ini.",
    "bagian": [
      {
        "judul": "1. Karya Teknologi Khusus (Custom Development)",
        "konten": "Ketentuan atas pengembangan aplikasi dan platform berbasis kode:",
        "daftar": [
          "Berdasarkan premis pekerjaan <em>‘Work for Hire’</em>, sesudah seluruh tahap pembayaran selesai sepenuhnya, AlinLabs akan melepaskan serta menyimpahkan 100% hak intelektual material khusus (Source code utama aplikasi, perwajahan desain, desain database spesifik klien).",
          "Klien mendapatkan kemerdekaan eksklusif untuk mengeksploitasi platform custom tersebut—termasuk merubah versi (modifikasi) dan pemindahan tangan infrastruktur.",
          "<strong>Background Technology Reserve:</strong> Klien menyadari bahwa AlinLabs mungkin mempercantik sistem menggunakan modul <em>boilerplate</em> generik dasar perseroan dan rutinitas fungsi dasar standar (pre-existing API libraries). Modul generik ini tidak berpindah hak miliknya tapi membaur sebagai lisensi perpetual untuk Anda manfaatkan secara melekat pada platform."
        ]
      },
      {
        "judul": "2. Materi Konten & Aset Desain Sosial Media",
        "konten": "Ketentuan atas karya seni visual komersial (feed post, ilustrasi, video ads):",
        "daftar": [
          "Apabila karya materi visual adalah hasil paket \"Social Media Management\" berjangka, seluruh keluaran akhir format standar (PNG/JPG/MP4) dipersilakan digunakan secara bebas untuk komersialisasi pemasaran (Hak Guna Komersial).",
          "AlinLabs senantiasa memegang hak kepemilikan atas File Mentah Pengerjaan <em>(Project Repository, Figma Core Files, Adobe AE/Premiere Source Layers)</em>, kecuali Klien merequest paket <em>Transfer of Assets / Full Buyout</em> secara tambahan khusus.",
          "Karya diproduksi bebas dari pemalsuan. Kami secara ketat menjamin perpaduan grafis, motion aset premium, serta perijinan tembang (Audio BGM) adalah berlisensi aman dari Pustaka Premium tersertifikasi milik operasional AlinLabs."
        ]
      },
      {
        "judul": "3. Platform Pihak Ketiga & Integrasi Eksternal",
        "konten": "Sistem kerap menghimpun modul <em>open-source</em> maupun platform raksasa komersial lainnya:",
        "daftar": [
          "Penggunaan perangkat dasar Open Source (seperti sistem React, Next.js, Node.js) sepenuhnya berada dalam perizinan otentik MIT atau lisensi Apache terbuka secara global.",
          "Untuk penggunaan layanan integrasi API (misalnya: Meta Graph API, Google Maps, Payment Gateway), Anda selaku entitas entitas penguasa platform senantiasa terikat pula akan syarat & batas pengoperasian vendor tersebut di luar tanggung jawab modifikasi agensi."
        ]
      },
      {
        "judul": "4. Hak Pemasaran dan Publikasi Agensi (Portfolio Right)",
        "konten": "Bagian integral dari kultur kreasi agensi:",
        "daftar": [
          "Selain diinstruksikan rahasia lewat dokumen Non-Disclosure Agreement (NDA), AlinLabs berhak kuat (tanpa membocorkan angka finansial atau dokumen tertutup data sensitif) menggunakan cuplikan antarmuka proyek, kompilasi profil video promosi, layar analitik, dan pencapaian keberhasilan (Case Studies) untuk portofolio perusahaan demi kemajuan industri bersama."
        ]
      }
    ]
  },
  "PARTNERSHIP_CORPORATE": {
    "judul": "Kerjasama Perusahaan (B2B)",
    "terakhirDiperbarui": "24 Mei 2024",
    "hero": {
      "slogan": "B2B SYNERGY",
      "subJudul": "Skema eksekutif untuk kemitraan agensi, white-label, hingga manajemen eskalasi teknologi tingkat korporasi."
    },
    "pendahuluan": "AlinLabs Indonesia membuka ruang terluasnya untuk sinergi bersama sesama perusahaan, korporasi merek, maupun agensi sejawat (Agency-to-Agency Partner). Ketentuan ini berlaku bagi mitra vendor maupun klien korporatis yang menyetujui ikatan eskalasi bisnis makro.",
    "bagian": [
      {
        "judul": "A. Format Kolaborasi Eksekutif",
        "konten": "Kolaborasi dapat didedikasikan dalam berbagai format fleksibel:",
        "daftar": [
          "<strong>Retainer Agency-On-Record (AOR):</strong> Kami akan menempatkan dedikasi jam terbang teknis dan pemasaran secara konstan sebagai agensi utama bagi operasional merek Anda per semester atau tahunan.",
          "<strong>White-labeling & Subcontract:</strong> Di mana AlinLabs menjalankan kapasitas sebagai tim ahli belakang layar (backbone partner) bagi firma konsultasi IT maupun PR Agency besar.",
          "<strong>Vendor Pihak Ketiga Berkualitas:</strong> Melengkapi rantai integrasi pemasaran perusahaan di pos tertentu (Misalnya: Digital Advertising/Ads Specialist)."
        ]
      },
      {
        "judul": "B. Tata Laksana Pertukaran Informasi & NDA",
        "konten": "Aspek proteksi data yang kami jagokan untuk Mitra B2B:",
        "daftar": [
          "Sejak fase <em>pitching</em>, AlinLabs bersedia menyepakati pakta Non-Disclosure Agreement (NDA) dua arah guna mendinding kuat seluruh cetak biru, kampanye eksklusif, matriks laba vendor (ROAS metrics), atau rahasia dapur kompetisi klien.",
          "AlinLabs meyakinkan adanya etika teguh di mana kami menolak terlibat dengan klien baru yang memunculkan benturan sengketa kepentingan yang merugikan kampanye eksklusif Mitra Korporasi secara frontal dalam segmen pasar spesifik masa waktu berjalan."
        ]
      },
      {
        "judul": "C. Kepatuhan & Terminologi Pembayaran",
        "konten": "Penerimaan kerja sama bisnis bertumpu pada prosedur transparansi dokumentasi hukum:",
        "daftar": [
          "Segala termin ditagihkan dengan faktur legal Perusahaan dan pemotongan kewajiban perpajakan negara lazim yang sesuai (seperti penyertaan faktur pajak PPN maupun pemotongan PPh Jasa Konsultan Pemasaran - 23).",
          "Pembayaran ditoleransi secara standar berbasis Term of Payment (Term Netto-15/30) pasca beredarnya nota (invoice)."
        ]
      }
    ]
  },
  "PARTNERSHIP_COMMUNITY": {
    "judul": "Kerjasama Komunitas & Acara",
    "terakhirDiperbarui": "24 Mei 2024",
    "hero": {
      "slogan": "EMPOWERMENT PLATFORM",
      "subJudul": "Pedoman program inisiasi partisipasi AlinLabs sebagai sponsor, pembicara ahli, dan pendukung ruang event komunitas digital."
    },
    "pendahuluan": "Mendukung pengembangan inovasi di ranah akar rumput (grassroots) merupakan bagian dedikasi tanggung jawab sosial dan industri kami. AlinLabs Indonesia terbiasa berkolaborasi dengan inisiatif acara pendidikan, seminar industri kreatif (webinar/bootcamp), serta perhelatan komunitas strategis.",
    "bagian": [
      {
        "judul": "1. Opsi Partisipasi Sosial & Sponsorship",
        "konten": "Inisiatif kontribusi AlinLabs difokuskan pada:",
        "daftar": [
          "<strong>Pembicara / Expert Mentorship:</strong> Kesediaan tim direksi atau talenta spesial AlinLabs untuk mengisi ruang literasi topik: Transformasi web masa depan, Teknik Jitu Sosial Media Digital (Algoritma TikTok/IG), UI/UX terpadu, dan Periklanan.",
          "<strong>Media Partner & Sponsorship:</strong> Dukungan eksposur cross-channel publikasi, maupun fasilitasi hadiah kompetisi atau suntikan <em>financial in-kind</em> khusus untuk event potensial (Hackathon, Konvensi Creativepreneur)."
        ]
      },
      {
        "judul": "2. Kewajiban Relasi Simbiosis Balik (Reciprocal Values)",
        "konten": "Kami mendorong inisiatif <em>value return</em> berkesinambungan:",
        "daftar": [
          "Penempatan penyebutan nama (Shoutout) maupun pembubuahan logogram perusahaan secara estetik dan resmi pada titik pandang vital kegiatan promosi acara.",
          "Pertukaran akses jejaring beretika; semisal prospek pencarian talenta potensial pasca kelulusan bootcamp di mana AlinLabs berhak mendekatkan prospek karir."
        ]
      },
      {
        "judul": "3. Filter Kurasi & Etik",
        "konten": "Pengajuan event dipantau melalui kriteria tegas: Kami tidak menyeponsori acara rasisme diskriminatif, inisiatif politik partisipan, peretasan membahayakan keamanan nasional, serta perhelatan yang tidak memberikan manfaat kompetisi sehat."
      }
    ]
  },
  "PARTNERSHIP_INDIVIDUAL": {
    "judul": "Kerjasama Independen (Freelance & KOL)",
    "terakhirDiperbarui": "24 Mei 2024",
    "hero": {
      "slogan": "TALENT EMPOWERMENT",
      "subJudul": "Tata panduan kontrak fleksibel bagi talent KOL, Afiliator, maupun Konsultan Freelancer di bawah bendera kampanye AlinLabs."
    },
    "pendahuluan": "Dalam menjalankan mega kampanye untuk berbagai klien besar, kami sering bersekutu dengan para Konten Kreator berbakat (Key Opinion Leaders/KOL), Freelancer desainer, dan para Affiliate penggerak pertumbuhan. Aturan main ini mengikat para talenta independen kami.",
    "bagian": [
      {
        "judul": "A. Kolaborasi Talent Influencer / KOL",
        "konten": "Kemitraan strategis endorsement yang kami selenggarakan atas nama merk Klien:",
        "daftar": [
          "<strong>Orientasi Konten:</strong> Diwajibkan selaras penuh dengan pedoman estetika serta <em>Briefing/Script</em> pengarahan sutradara kampanye tanpa kelewat batas improvisasi sehingga melenceng dari DNA Merek (Brand Safety).",
          "<strong>Klaim Kepemilikan (Whitelisting):</strong> KOL mensetujui pendelegasian hak pemakaian materi buatannya (Boost/Whitelisting Ads) via dasbor Media Sosial untuk diputarkan masal (Ads Amplification) oleh tim pemasar AlinLabs."
        ]
      },
      {
        "judul": "B. Kolaborasi Tenaga Profesi Freelance",
        "konten": "Menjadi mitra keahlian (Graphic Designer, Web Engineer) lepas di balik layer AlinLabs:",
        "daftar": [
          "Dijalankan berdasarkan kaidah <em>White-label & Ghost Worker</em> – Talenta tidak dapat secara terbuka mentransfer kredit (menikmati kepemilikan utuh porto publik) sebelum proyek berhasil sukses dan dikonfirmasi.",
          "Bersikap tertutup. Talenta sangat dilarang 'menerjang batasan' alias (By-pass poaching) dengan langsung mengambil komunikasi dan tawaran dengan klien ritel kami di bawah meja."
        ]
      },
      {
        "judul": "C. Model Afiliasi Kemitraan (Referral)",
        "konten": "Merujuk klien (Referral Affiliate) menuju gerbang pemasaran AlinLabs:",
        "daftar": [
          "Independen akan memperoleh alokasi komisi (Bonus Fee Success) yang divalidasi dan cair pasca tagihan pertama terselesaikan ke rekening utama agensi.",
          "Referral yang didatangkan harus sah berupa prospek sejati, di mana agen individu tidak berafiliasi melakukan penipuan representasi atau janji instan kepada prospek bersangkutan."
        ]
      }
    ]
  },
  "PARTNERSHIP_GOVERNMENT": {
    "judul": "Kerjasama Pemerintahan (G2B)",
    "terakhirDiperbarui": "24 Mei 2024",
    "hero": {
      "slogan": "E-GOV SYNERGY",
      "subJudul": "Standardisasi kompeten penyediaan teknologi terintegrasi dan akuntabel di koridor layanan instansi Pemerintah (G2B)."
    },
    "pendahuluan": "Kami memiliki pengalaman berinteraksi pada pengamanan, keterbukaan informasi, dan kualitas tingkat tinggi yang dihajatkan instansi Badan Nasional maupun Pemerintahan Daearah. Standar operasional sektor birokrasi dijunjung dengan penuh kemuliaan oleh AlinLabs Indonesia.",
    "bagian": [
      {
        "judul": "A. Pemenuhan Kerangka Kepatuhan Nasional (Compliance)",
        "konten": "Standardisasi agensi di ekosistem platform pemerintahan mengutaman aspek regulasi ketat:",
        "daftar": [
          "Optimalisasi arsitektur (Server & Web) senantiasa dicanangkan demi sekuat mungkin menghindari kelemahan fatal demi menjaga keamanan data privat warganegara berpedoman dasar Badan Siber (BSSN) dan standar ISO umum.",
          "Memprioritaskan <em>Local Content / TKDN</em> dengan mendayagunakan perangkat anak negeri, server nasional geo-Indonesia, utamanya pada pengalihan fungsi pengarsipan dokumen kenegaraan menjadi kanal portal digital yang terpadu."
        ]
      },
      {
        "judul": "B. Proses Pengadaan & Mekanisme Pengarsipan",
        "konten": "AlinLabs sangat tertib pada kriteria tata seleksi:",
        "daftar": [
          "Senantiasa transparan turut andil lewat sistem resmi tender negara (LPSE) maupun registrasi E-Katalog di koridor perundang-undangan.",
          "Setiap perlakuan hak kekayaan intelektual 100% beralih menjadi barang milik Instansi Negara (State-Owned Asset) untuk dipergunakan seutuhnya pasca pendeliverian dan penutupan dokumen lelang terminasi proyek sukses."
        ]
      }
    ]
  }
};
  const data = LEGAL_DATA[view];

  if (!data) return <ErrorState message="Dokumen tidak ditemukan." onRetry={() => window.location.reload()} />;

  // Determine bullet color based on view
  const getBulletClass = () => {
      switch (view) {
          case ViewState.PRIVACY_POLICY: return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
          case ViewState.TERMS_OF_SERVICE: return 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
          case ViewState.LICENSE: return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
          case ViewState.PARTNERSHIP_CORPORATE: return 'bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]';
          case ViewState.PARTNERSHIP_COMMUNITY: return 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]';
          case ViewState.PARTNERSHIP_INDIVIDUAL: return 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]';
          case ViewState.PARTNERSHIP_GOVERNMENT: return 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]';
          default: return 'bg-slate-500';
      }
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-48 md:pb-48 overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
        {/* Background Gradients & Textures */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[150px] mix-blend-screen pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md text-indigo-300 mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">{data.hero?.slogan || 'LEGAL'}</span>
            </div>
            
            {/* Title - using 'judul' */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.2] md:leading-[1.1] animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 mb-6 sm:mb-8 max-w-5xl flex flex-col items-center text-center">
              <span className="relative inline-block pt-1 sm:pt-2 mt-2">
                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-teal-400">{data.judul}</span>
                 <span className="absolute bottom-0 left-0 w-full h-[30%] bg-indigo-500/30 -z-10 -rotate-2 transform origin-left opacity-70"></span>
              </span>
            </h1>
            
            {/* Subtitle - using 'hero.subJudul' or 'pendahuluan' */}
            <p className="text-sm md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 px-4">
                {data.hero?.subJudul || (data.pendahuluan ? data.pendahuluan.substring(0, 100) + '...' : '')}
            </p>
         </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-20">
          
          {/* Metadata */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-16 border-b border-slate-100 pb-8 text-center">
              <p className="text-sm text-slate-500 font-medium bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  Terakhir diperbarui: <span className="font-bold text-slate-900 ml-1">{data.terakhirDiperbarui}</span>
              </p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
              {/* Intro Paragraph - using 'pendahuluan' */}
              <p className="lead text-xl text-slate-700 leading-relaxed mb-12">
                  {data.pendahuluan}
              </p>
              
              {/* Sections - using 'bagian' */}
              {data.bagian && data.bagian.map((section: any, idx: number) => (
                  <div key={idx} className="mb-12 scroll-mt-24" id={`section-${idx}`}>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                          {section.judul}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                          {section.konten}
                      </p>
                      {section.daftar && (
                          <ul className="space-y-4 my-6 pl-0 list-none">
                              {section.daftar.map((item: string, i: number) => (
                                  <li key={i} className="flex items-start pl-2">
                                      <div className={`w-2 h-2 rounded-full mt-2.5 mr-4 flex-shrink-0 ${getBulletClass()}`}></div>
                                      <span dangerouslySetInnerHTML={{ __html: item }} className="text-slate-600 leading-relaxed" />
                                  </li>
                              ))}
                          </ul>
                      )}
                  </div>
              ))}
          </div>
          
          {/* Footer Note */}
          <div className="mt-20 pt-10 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-400">
                  &copy; {new Date().getFullYear()} AlinLabs Indonesia. Dokumen ini dilindungi hak cipta.
              </p>
          </div>
      </div>
    </div>
  );
};
