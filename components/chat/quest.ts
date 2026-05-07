
export type IntentID = 
  | 'GREETING'
  | 'ASK_NAME'
  | 'ASK_PRICE'
  | 'SERVICE_WEB'
  | 'SERVICE_APP'
  | 'SERVICE_ADS'
  | 'SERVICE_CREATIVE'
  | 'SERVICE_ECOSYSTEM'
  | 'PORTFOLIO'
  | 'CONTACT'
  | 'LOCATION'
  | 'PROCESS_TIME'
  | 'WARRANTY'
  | 'TECH_STACK'
  | 'CAREER'
  | 'CLOSING'
  | 'UNKNOWN'
  | 'ABOUT_US'
  | 'LEGAL'
  | 'PARTNERSHIP'
  | 'CHECKOUT'
  | 'ALL_PAGES'
  | 'ASK_PRICE_SOSMED';

interface IntentDef {
  id: IntentID;
  keywords: string[];
}

export const KNOWLEDGE_BASE: IntentDef[] = [
  {
    id: 'ALL_PAGES',
    keywords: [
      'sitemap', 'semua halaman', 'menu website', 'peta situs', 'semua menu', 'tampilkan menu',
      'navigasi', 'daftar halaman', 'ada halaman apa saja', 'fitur website', 'halaman apa aja', 'menu apa aja', 'tolong tampilkan menu', 'list halaman', 'list menu', 'home', 'beranda', 'index', 'kategori menu'
    ]
  },
  {
    id: 'GREETING',
    keywords: [
      'halo', 'hai', 'hi', 'hello', 'pagi', 'siang', 'sore', 'malam', 
      'permisi', 'assalamualaikum', 'salam', 'tes', 'ping', 'hola', 'test',
      'helo', 'selamat pagi', 'sore kak', 'malem', 'oy', 'punten', 'hallo', 'hay'
    ]
  },
  {
    id: 'ASK_PRICE_SOSMED',
    keywords: [
      'berapa harga kelola sosial media', 'harga instagram', 'harga digital marketing',
      'biaya sosmed', 'biaya iklan', 'berapa kelola sosial media', 'harga kelola sosial media',
      'price list sosmed', 'pricelist instagram', 'biaya kelola ig', 'harga jasa admin instagram',
      'paket sosmed', 'paket instagram', 'harga seo', 'biaya fb ads', 'harga meta ads'
    ]
  },
  {
    id: 'ASK_NAME',
    keywords: [
      'siapa kamu', 'siapa ini', 'namamu', 'bot apa manusia', 'robot', 'admin', 
      'kamu siapa', 'dengan siapa', 'bot', 'artificial intelligence', 'nama kamu siapa',
      'halo admin', 'ini siapa ya', 'anda siapa', 'bot ya', 'aira', 'nama mbak siapa'
    ]
  },
  {
    id: 'ASK_PRICE',
    keywords: [
      'harga', 'biaya', 'cost', 'tarif', 'budget', 'mahal', 'murah', 'pricelist', 
      'dana', 'uang', 'bayar', 'paket', 'rate card', 'diskon', 'promo', 'penawaran',
      'berapa', 'harganya', 'price', 'daptar harga', 'list harga', 'biayanya', 'estimasi harga', 
      'kisaran harga', 'price list'
    ]
  },
  {
    id: 'SERVICE_WEB',
    keywords: [
      'web', 'website', 'landing page', 'landingpage', 'company profile', 'compro', 
      'toko online', 'ecommerce', 'e-commerce', 'blog', 'portal', 'situs', 
      'bikin web', 'buat web', 'seo', 'domain', 'hosting', 'wordpress', 'cms',
      'jasa web', 'buat website', 'bikin website', 'pembuatan website', 'harga web', 'web custom'
    ]
  },
  {
    id: 'SERVICE_APP',
    keywords: [
      'app', 'aplikasi', 'mobile', 'android', 'ios', 'apk', 'playstore', 'appstore', 
      'iphone', 'coding', 'sistem', 'software', 'program', 'kasir', 'erp', 'pos',
      'startup', 'bikin aplikasi', 'buat aplikasi', 'jasa aplikasi', 'developer app',
      'bikin apk', 'pembuatan aplikasi'
    ]
  },
  {
    id: 'SERVICE_ADS',
    keywords: [
      'iklan', 'ads', 'sosmed', 'social media', 'instagram', 'tiktok', 'facebook', 
      'meta', 'google ads', 'sem', 'marketing', 'pemasaran', 'digital marketing', 
      'kol', 'influencer', 'viral', 'fyp', 'traffic', 'leads', 'penjualan', 'omzet',
      'jasa iklan', 'kelola ig', 'admin sosmed', 'jasa sosmed', 'naikkan omset'
    ]
  },
  {
    id: 'SERVICE_CREATIVE',
    keywords: [
      'desain', 'design', 'logo', 'branding', 'identitas', 'video', 'foto', 
      'fotografi', 'videografi', 'konten', 'content', 'reels', 'tiktok video', 
      'brosur', 'banner', 'kartu nama', 'animasi', 'editing', 'edit',
      'bikin logo', 'buat logo', 'jasa desain', 'jasa video', 'company profile video', 'jasa foto'
    ]
  },
  {
    id: 'SERVICE_ECOSYSTEM',
    keywords: [
      'paket lengkap', 'semuanya', 'full service', 'ekosistem', 'all in one', 
      'transformasi', 'digitalisasi', 'urus semua', 'total', 'manage',
      'paket enterprise', 'semua layanan', 'jasa full ngurusin'
    ]
  },
  {
    id: 'PORTFOLIO',
    keywords: [
      'porto', 'portofolio', 'portfolio', 'hasil', 'karya', 'contoh', 'case study', 
      'klien', 'client', 'proyek', 'pengalaman', 'lihat', 'buktikan', 'trust',
      'contoh hasil', 'karya alinlabs', 'udah pernah bikin', 'siapa aja kliennya', 'contoh web'
    ]
  },
  {
    id: 'CONTACT',
    keywords: [
      'kontak', 'hubungi', 'wa', 'whatsapp', 'telp', 'telepon', 'nomor', 'hp', 
      'email', 'surel', 'konsultasi', 'tanya', 'ngobrol', 'chat', 'meeting', 'ketemu',
      'minta wa', 'no wa', 'bisa ditelpon', 'hubungi tim', 'nomor cs', 'customer service'
    ]
  },
  {
    id: 'LOCATION',
    keywords: [
      'lokasi', 'alamat', 'kantor', 'dimana', 'posisi', 'map', 'maps', 'kota', 
      'purwakarta', 'tempat', 'visit', 'kunjung', 'lokasinya', 'alamatnya dimana', 'kantornya cuman', 'di kota mana'
    ]
  },
  {
    id: 'PROCESS_TIME',
    keywords: [
      'lama', 'waktu', 'berapa hari', 'durasi', 'kapan', 'selesai', 'cepat', 
      'kilat', 'deadline', 'timeline', 'jadwal', 'bisa berapa lama', 'estimasi waktu',
      'seberapa cepat', 'pengerjaan', 'prosesnya'
    ]
  },
  {
    id: 'WARRANTY',
    keywords: [
      'garansi', 'jaminan', 'rusak', 'error', 'bug', 'maintenance', 'perbaikan', 
      'support', 'bantuan', 'after sales', 'aman', 'kalau rusak', 'garansinya',
      'gimana kalau error', 'ada garansi', 'tanggung jawab'
    ]
  },
  {
    id: 'ABOUT_US',
    keywords: [
      'tentang', 'about', 'profil perusahaan', 'sejarah', 'visi', 'misi', 'siapa alinlabs', 'perusahaan apa',
      'alinlabs itu apa', 'kenalan', 'profil alinlabs', 'tujuan', 'latar belakang'
    ]
  },
  {
    id: 'LEGAL',
    keywords: [
      'legal', 'privasi', 'privacy policy', 'syarat', 'ketentuan', 'terms', 'lisensi', 'aturan', 'hukum',
      'kebijakan', 'aturan main', 'hak cipta', 'nda', 'perjanjian'
    ]
  },
  {
    id: 'PARTNERSHIP',
    keywords: [
      'partner', 'partnership', 'kerjasama', 'kolaborasi', 'mitra', 'corporate', 'community', 'komunitas', 'government', 'pemerintah',
      'afiliasi', 'join', 'b2b', 'kerjasama bisnis', 'mou'
    ]
  },
  {
    id: 'CHECKOUT',
    keywords: [
      'checkout', 'cara bayar', 'pembayaran', 'pesan sekarang', 'order', 'beli', 'transaksi',
      'metode pembayaran', 'cara pesan', 'mau order', 'bayarnya gimana', 'bisa cicil'
    ]
  },
  {
    id: 'TECH_STACK',
    keywords: [
      'teknologi', 'tech', 'stack', 'bahasa', 'react', 'nextjs', 'node', 'php', 
      'laravel', 'flutter', 'react native', 'cloud', 'server', 'database',
      'pakai apa', 'bahasanya', 'framework', 'vps'
    ]
  },
  {
    id: 'CAREER',
    keywords: [
      'loker', 'lowongan', 'kerja', 'karir', 'magang', 'intern', 'rekrutmen', 
      'gabung', 'staff', 'karyawan', 'ada lowongan', 'buka loker', 'internship', 'freelance'
    ]
  },
  {
    id: 'CLOSING',
    keywords: [
      'makasih', 'terima kasih', 'thanks', 'thank you', 'ok', 'oke', 'siap', 
      'baik', 'sip', 'mantap', 'keren', 'good', 'bye', 'dah', 'yaudah', 'kamsahamnida',
      'nuhun', 'matur nuwun', 'paham'
    ]
  }
];
