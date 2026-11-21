export interface TeamMember {
  id: string;
  nama: string;
  peran: string;
  gambar: string;
  bio: string;
}

export interface PortfolioItem {
  id: string;
  judul: string;
  kategori: "Ekosistem Web" | "Agensi Kreatif" | "Pemasaran Digital";
  klien: string;
  logoKlien?: string;
  tahun: string;
  gambar: string;
  deskripsi: string;
  teknologi: any[];
  url?: string;
  galeri?: string[];
  statistik?: any[];
  hasil?: string[];
}

export interface Event {
  id: string;
  judul: string;
  tanggal: string;
  lokasi: string;
  kategori: "Webinar" | "Workshop" | "Konferensi" | "Hackathon";
  gambar: string;
  deskripsi: string;
}

export interface Article {
  id: string;
  judul: string;
  kategori: string;
  penulis: string;
  tanggal: string;
  gambar: string;
  ringkasan: string;
  waktuBaca: string;
}

export enum ViewState {
  HOME = "HOME",
  PRODUCTS = "PRODUCTS",
  PORTFOLIO = "PORTFOLIO",
  ABOUT = "ABOUT",
  CONTACT = "CONTACT",
  IDENTITY = "IDENTITY",
  PRIVACY_POLICY = "PRIVACY_POLICY",
  TERMS_OF_SERVICE = "TERMS_OF_SERVICE",
  LICENSE = "LICENSE",
  PARTNERSHIP_CORPORATE = "PARTNERSHIP_CORPORATE",
  PARTNERSHIP_COMMUNITY = "PARTNERSHIP_COMMUNITY",
  PARTNERSHIP_INDIVIDUAL = "PARTNERSHIP_INDIVIDUAL",
  PARTNERSHIP_GOVERNMENT = "PARTNERSHIP_GOVERNMENT",
  SERVICE_ECOSYSTEM = "SERVICE_ECOSYSTEM",
  SERVICE_ADS = "SERVICE_ADS",
  SERVICE_CINEMA = "SERVICE_CINEMA",
  CHECKOUT_PAYMENT = "CHECKOUT_PAYMENT",
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  isLoading?: boolean;
  timestamp?: string;
  status?: "sent" | "delivered" | "read";
  buttons?: { label: string; url: string }[];
  whatsappLink?: { phone: string; text: string };
  suggestedTopics?: string[];
}

export interface IdentityData {
  nama: string;
  slogan: string;
  subLabel: string;
  urlLogo: string;
  urlLottieLogo?: string;
  instruksiSistem: string;
}

export interface MetaItem {
  judul: string;
  deskripsi: string;
  katakunci: string;
  gambar: string;
}

export interface MetaCollection {
  default: MetaItem;
  rute: Partial<Record<keyof typeof ViewState, MetaItem>>;
}
