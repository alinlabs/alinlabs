import { KNOWLEDGE_BASE, IntentID } from "./quest";
import { BotResponse, RESPONSE_LIBRARY } from "./respon";

/**
 * Logic-based Auto Responder
 * Menggunakan pendekatan pencocokan kata kunci (Keyword Matching)
 * yang didefinisikan di quest.ts dan mengambil jawaban dari respon.ts
 */

const TOPIC_SUGGESTIONS: Record<IntentID, string[]> = {
  GREETING: ["Tampilkan Semua Menu", "Harga Layanan", "Manajemen Sosmed", "Bikin Website"],
  ALL_PAGES: ["Layanan Website", "Layanan Iklan", "Portofolio Utama", "Kontak WhatsApp"],
  ASK_NAME: ["Apa saja layanannya?", "Lokasi kantor dimana?", "Tampilkan Semua Menu"],
  ASK_PRICE: ["Pricelist Website", "Harga Kelola Sosmed", "Cara Checkout", "Tampilkan Menu"],
  SERVICE_WEB: [
    "Berapa lama buat web?",
    "Bisa bikin toko online?",
    "Lihat Paket Layanan",
  ],
  SERVICE_APP: [
    "Bisa Android & iOS?",
    "Berapa biaya bikin App?",
    "Lihat Portofolio App"
  ],
  SERVICE_ADS: [
    "Bisa Instagram Ads?",
    "Berapa budget minimal?",
    "Lihat Paket Iklan",
  ],
  SERVICE_CREATIVE: [
    "Bikin logo berapa?",
    "Bisa foto produk?",
    "Paket Kreatif",
  ],
  SERVICE_ECOSYSTEM: [
    "Apa itu Ekosistem Digital?",
    "Berapa biayanya?",
    "Tampilkan Semua Menu",
  ],
  PORTFOLIO: [
    "Lihat contoh website",
    "Klien sebelumnya siapa?",
    "Layanan App",
  ],
  CONTACT: ["Chat WhatsApp", "Lokasi Kantor", "Jadwal Buka"],
  LOCATION: ["Bisa meeting online?", "Alamat lengkap", "Hubungi Kontak"],
  PROCESS_TIME: [
    "Bisa dipercepat?",
    "Ada garansi waktu?",
    "Lihat Aturan Layanan",
  ],
  WARRANTY: [
    "Berapa lama garansinya?",
    "Bisa maintenance bulanan?",
    "Lihat Info Legal",
  ],
  TECH_STACK: [
    "Framework yang dipakai?",
    "Kenapa pakai React?",
    "Lihat Karir",
  ],
  CAREER: [
    "Syarat lamar kerja?",
    "Ada program kemitraan?",
    "Tentang Perusahaan",
  ],
  CLOSING: ["Kembali ke Beranda", "Tampilkan Semua Menu", "Kontak WhatsApp"],
  UNKNOWN: ["Tampilkan Semua Menu", "Bikin Website", "Kelola Sosmed & Iklan", "Kontak Agent"],
  ABOUT_US: ["Visi Misi", "Lokasi Kantor", "Kemitraan", "Semua Menu"],
  LEGAL: ["Syarat & Ketentuan", "Kebijakan Privasi", "Kontak Support"],
  PARTNERSHIP: ["Kemitraan Corporate", "Program Afiliasi", "Hubungi Tim Bisnis"],
  CHECKOUT: ["Cara Pembayaran", "Paket Layanan", "Bantuan Agent"],
  ASK_PRICE_SOSMED: ["Layanan Website", "Layanan Desain", "Cara Pembayaran"]
};

export const getSmartResponse = async (
  message: string,
): Promise<BotResponse> => {
  // Simulasi delay berpikir agar terasa natural (ketik-ketik)
  await new Promise((resolve) =>
    setTimeout(resolve, 600 + Math.random() * 800),
  );

  const lowerMsg = message.toLowerCase().trim();

  // 1. Logika Deteksi Intent
  // Mencari intent pertama yang keyword-nya muncul di pesan user
  let detectedIntent: IntentID = "UNKNOWN";

  for (const knowledge of KNOWLEDGE_BASE) {
    // Cek apakah ada keyword dari intent ini yang muncul di pesan user
    const match = knowledge.keywords.some((keyword) => {
      // Exact phrase match atau word boundary match bisa ditambahkan jika perlu regex kompleks
      // Untuk sekarang, simple includes() sudah cukup robust untuk bahasa natural
      return lowerMsg.includes(keyword.toLowerCase());
    });

    if (match) {
      detectedIntent = knowledge.id;
      break; // Prioritas berdasarkan urutan di array KNOWLEDGE_BASE
    }
  }

  // 2. Logika Seleksi Jawaban
  // Mengambil array jawaban berdasarkan intent
  const possibleResponses = RESPONSE_LIBRARY[detectedIntent];

  // Memilih satu jawaban secara acak
  const randomIndex = Math.floor(Math.random() * possibleResponses.length);
  const selectedResponse = { ...possibleResponses[randomIndex] };

  // 3. Attach suggested topics
  selectedResponse.suggestedTopics = TOPIC_SUGGESTIONS[detectedIntent];

  return selectedResponse;
};
