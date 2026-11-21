import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { ViewState } from "../../types";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Building2,
  Users,
  User,
  HelpCircle,
  X,
  PenTool,
  Edit3,
  ArrowRight,
  CornerDownRight,
  Globe,
  Fingerprint,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Rocket,
  Layers,
} from "lucide-react";

export const Kontak: React.FC = () => {
  const data: any = {
    hero: {
      slogan: "Inisiasi Percakapan",
      judulAwalan: "Mari",
      judulHighlight: "Berkolaborasi",
      deskripsi:
        "Beritahu visi Anda, dan mari rintis inovasi bersama menuju ranah digital yang lebih baik.",
    },
    info: {
      alamat: {
        judul: "Studio Utama",
        baris: [
          "Jln. Cendrawasih, Nagri Kidul",
          "Kec. Purwakarta, Kabupaten Purwakarta",
          "Jawa Barat 41111",
        ],
      },
      email: {
        judul: "Alamat Surat Elektronik",
        nilai: [
          "office.alinlabs@gmail.com",
          "office.alincorporation@gmail.com",
        ],
      },
      telepon: {
        judul: "Konsultasi Langsung",
        nilai: "0818-070000-54",
        catatan: "Senin - Jumat, 09:00 - 17:00 (WIB)",
      },
      embedPeta:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15854.80224775323!2d107.4495623585075!3d-6.559431731792133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e690fb9f70c3051%3A0x65ea61cf80c1fc51!2sAlinLabs%20Indonesia!5e0!3m2!1sid!2sid!4v1770590443500!5m2!1sid!2sid",
      linkPeta: "https://maps.app.goo.gl/32KK6SSW44ZSdXRP7",
    },
  };

  const [entityType, setEntityType] = useState<
    "company" | "community" | "individual"
  >("company");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<"form" | "kontak" | "faq">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullname || !email || !whatsapp) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const templateParams = {
        subject: `Konfirmasi Konsultasi AlinLabs - ${fullname}`,
        to_email: email, // This is CC/BCC'ed to AlinLabs via dashboard normally, or just sent to user.
        to_name: fullname,
        whatsapp: whatsapp,
        org_name: orgName,
        role: role,
        message: message,
        services: selectedServices.join(", "),
        head_message: 'Terima kasih telah mempercayakan kebutuhan digital Anda kepada <strong>AlinLabs Indonesia</strong>. Tiket permintaan konsultasi Anda telah berhasil kami terima.<br><br>Tim ahli kami (Agent) saat ini sedang meninjau rincian kebutuhan Anda dan akan mengabari Anda melalui nomor WhatsApp <b>maksimal dalam 1 jam ke depan</b> di jam kerja operasional kami.'
      };
      
      await emailjs.send(
        "automail-service",
        "alinlabs-automail",
        templateParams,
        "7pNkN7ceW9P8uHIHU"
      );
      
      // Trigger Notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pesan Terkirim - AlinLabs", {
          body: "Terima kasih! Tim kami akan segera merespons.",
          icon: "/gambar/logo-icon-color.png"
        });
      }

      setSubmitStatus("success");
      setFullname("");
      setEmail("");
      setWhatsapp("");
      setOrgName("");
      setRole("");
      setMessage("");
      setSelectedServices([]);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const servicesList = [
    { id: "konten_iklan", label: "Manajemen Konten & Iklan", icon: Sparkles },
    { id: "web_aplikasi", label: "Website & Aplikasi Custom", icon: Rocket },
    { id: "konten_live", label: "Konten Instan & Live", icon: Globe },
  ];

  const faqs = [
    {
      q: "Berapa lama rata-rata waktu pengerjaan sebuah project?",
      a: "Waktu pengerjaan sangat bervariasi bergantung pada kompleksitas proyek. Sebuah website landing page dapat selesai dalam 1-2 minggu, sementara sistem informasi kompleks / aplikasi dapat memakan waktu 3-6 bulan.",
    },
    {
      q: "Apakah AlinLabs menyediakan layanan maintenance setelah project selesai?",
      a: "Tentu. Kami menyediakan paket SLA (Service Level Agreement) opsional untuk menjamin ketersediaan sistem, update keamanan, dan pemeliharaan server secara rutin.",
    },
    {
      q: "Saya tidak memiliki spesifikasi teknis (SRS), bisakah AlinLabs membantu?",
      a: "Tidak masalah. Tim Business Analyst & UX Researcher kami akan membantu mendefinisikan kebutuhan Anda dari awal melalui sesi workshop / requirement gathering.",
    },
  ];

  const handleServiceToggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const { hero, info } = data;

  return (
    <div className="bg-slate-50 min-h-full text-slate-900 overflow-x-hidden selection:bg-blue-600 selection:text-white pb-20">
      {/* 1. HERO & INTRODUCTION (Clean Light Architecture matching Tentang & Beranda) */}
      <section className="relative pt-12 pb-16 md:pt-24 md:pb-36 overflow-hidden bg-white border-b border-slate-100 flex flex-col items-center justify-center">
        {/* Background Light Grid Texture & Subtle Blue Ambient Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-sky-100/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200/70 bg-blue-50/80 text-blue-700 mb-6 md:mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {hero.slogan}
            </span>
          </div>

          <h1 className="text-[10vw] sm:text-6xl md:text-8xl font-black text-slate-900 mb-3 md:mb-4 tracking-tighter leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 w-full flex items-center justify-center gap-2 sm:gap-4 whitespace-nowrap">
            <span>{hero.judulAwalan}</span>
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500">
              {hero.judulHighlight}
            </span>
          </h1>

          <p className="text-sm md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 px-4">
            {hero.deskripsi}
          </p>
        </div>
      </section>

      {/* 2. THE COMPLEX FORM & INFO GRID */}
      <section className="relative z-20 -mt-8 md:-mt-20 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Tabs */}
        <div className="xl:hidden mb-6 bg-white border border-slate-200 rounded-2xl p-1.5 flex shadow-lg shadow-slate-200/60 relative z-30">
          <button
            onClick={() => setMobileTab("form")}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${
              mobileTab === "form"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setMobileTab("kontak")}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${
              mobileTab === "kontak"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Kontak
          </button>
          <button
            onClick={() => setMobileTab("faq")}
            className={`flex-1 py-3.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 ${
              mobileTab === "faq"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            FAQ
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-8 xl:gap-12">
          {/* LEFT MAIN FORM (Takes up 7 cols on XL) */}
          <div className={`xl:col-span-7 ${mobileTab !== "form" ? "hidden xl:block" : ""} bg-white rounded-2xl md:rounded-[2rem] p-4 sm:p-8 md:p-12 lg:p-14 shadow-xl shadow-slate-200/60 border border-slate-200 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[100%] opacity-50 -z-10 pointer-events-none"></div>

            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-12">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl sm:rounded-2xl flex shrink-0 items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Project Estimator
                </h2>
                <p className="text-[10px] sm:text-sm font-medium text-slate-500 mt-0.5 sm:mt-1">
                  Lengkapi detail untuk memulai
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-12">
              {/* Entity & Base Info Grid */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Identitas Selector */}
                  <div className="sm:w-1/3">
                    <div className="flex flex-col gap-1.5 sm:gap-2 p-1 bg-slate-100 rounded-xl sm:rounded-2xl">
                      <button
                        type="button"
                        onClick={() => setEntityType("company")}
                        className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all font-bold text-xs sm:text-sm ${entityType === "company" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-200/50"}`}
                      >
                        <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                        Perusahaan
                      </button>
                      <button
                        type="button"
                        onClick={() => setEntityType("community")}
                        className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all font-bold text-xs sm:text-sm ${entityType === "community" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-200/50"}`}
                      >
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Instansi
                      </button>
                      <button
                        type="button"
                        onClick={() => setEntityType("individual")}
                        className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-all font-bold text-xs sm:text-sm ${entityType === "individual" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-200/50"}`}
                      >
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Personal
                      </button>
                    </div>
                  </div>

                  {/* Name, Email, WhatsApp */}
                  <div className="sm:w-2/3 space-y-3 sm:space-y-5">
                    <div className="relative group">
                      <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                        className="peer w-full px-4 pt-6 pb-2 sm:px-5 sm:pt-7 sm:pb-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 text-sm sm:text-base font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-transparent"
                        placeholder="Nama Lengkap"
                      />
                      <label
                        htmlFor="fullname"
                        className="absolute left-4 sm:left-5 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2.5 sm:peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[9px] sm:peer-focus:text-[10px] peer-focus:text-blue-600 pointer-events-none"
                      >
                        Nama Lengkap
                      </label>
                    </div>
                    <div className="relative group">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="peer w-full px-4 pt-6 pb-2 sm:px-5 sm:pt-7 sm:pb-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 text-sm sm:text-base font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-transparent"
                        placeholder="Email"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 sm:left-5 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2.5 sm:peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[9px] sm:peer-focus:text-[10px] peer-focus:text-blue-600 pointer-events-none"
                      >
                        Alamat Email Resmi
                      </label>
                    </div>
                    <div className="relative group">
                      <input
                        type="tel"
                        id="whatsapp"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        required
                        className="peer w-full px-4 pt-6 pb-2 sm:px-5 sm:pt-7 sm:pb-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 text-sm sm:text-base font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-transparent"
                        placeholder="No. WhatsApp"
                      />
                      <label
                        htmlFor="whatsapp"
                        className="absolute left-4 sm:left-5 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2.5 sm:peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[9px] sm:peer-focus:text-[10px] peer-focus:text-blue-600 pointer-events-none"
                      >
                        No. WhatsApp (Aktif)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Conditional Company Info */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 transition-all duration-500 overflow-hidden ${entityType === "company" || entityType === "community" ? "max-h-[300px] sm:max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="relative group">
                    <input
                      type="text"
                      id="orgName"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="peer w-full px-4 pt-6 pb-2 sm:px-5 sm:pt-7 sm:pb-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 text-sm sm:text-base font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-transparent"
                      placeholder="Nama Organisasi"
                    />
                    <label
                      htmlFor="orgName"
                      className="absolute left-4 sm:left-5 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2.5 sm:peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[9px] sm:peer-focus:text-[10px] peer-focus:text-blue-600 pointer-events-none"
                    >
                      Nama{" "}
                      {entityType === "company" ? "Perusahaan" : "Instansi"}
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="peer w-full px-4 pt-6 pb-2 sm:px-5 sm:pt-7 sm:pb-3 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 text-sm sm:text-base font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-transparent"
                      placeholder="Jabatan"
                    />
                    <label
                      htmlFor="role"
                      className="absolute left-4 sm:left-5 top-2.5 sm:top-3 text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-xs sm:peer-placeholder-shown:text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:font-medium peer-focus:top-2.5 sm:peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[9px] sm:peer-focus:text-[10px] peer-focus:text-blue-600 pointer-events-none"
                    >
                      Jabatan Anda
                    </label>
                  </div>
                </div>
              </div>

              {/* Needs & Budget */}
              <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-6 border-t border-slate-100">
                {/* Multi-Select Services */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">
                    Area Eksekusi (Pilih satu atau lebih)
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {servicesList.map((srv) => {
                      const Icon = srv.icon;
                      const isActive = selectedServices.includes(srv.id);
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => handleServiceToggle(srv.id)}
                          className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-24 sm:h-28 ${isActive ? "bg-blue-50 border-blue-600 shadow-sm shadow-blue-100" : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50"}`}
                        >
                          <div className="flex justify-between items-start w-full">
                            <Icon
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                            />
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isActive ? "bg-blue-600 border-blue-600" : "border-slate-300"}`}
                            >
                              {isActive && (
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              )}
                            </div>
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs font-bold leading-tight ${isActive ? "text-blue-900" : "text-slate-600"}`}
                          >
                            {srv.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Detail Message */}
              <div className="space-y-2 pt-4 sm:pt-6 border-t border-slate-100">
                <label className="block text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 sm:mb-2">
                  Deskripsi Proyek / Kebutuhan
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 sm:h-40 px-4 py-3 sm:px-5 sm:py-4 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl text-slate-900 text-sm sm:text-base font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                  placeholder="Ceritakan tujuan proyek, fitur impian Anda, atau masalah utama..."
                ></textarea>
              </div>

              {/* Submit Action */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-extrabold text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:bg-blue-700 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 group overflow-hidden relative disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  {isSubmitting ? "Mengirim..." : submitStatus === "success" ? "Berhasil Terkirim!" : "Kirim Permintaan Konsultasi"}
                  {!isSubmitting && submitStatus !== "success" && (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  )}
                </button>
                {submitStatus === "success" && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center animate-in fade-in zoom-in duration-300">
                    <p className="text-sm text-emerald-700 font-bold mb-1">Pesan Berhasil Terkirim!</p>
                    <p className="text-xs text-emerald-600 font-medium">
                      Terima kasih atas pesan Anda. Silakan cek email Anda untuk konfirmasi. Tim ahli kami akan segera menghubungi Anda melalui WhatsApp maksimal 1 jam ke depan untuk sesi diskusi.
                    </p>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center animate-in fade-in zoom-in duration-300">
                    <p className="text-sm text-red-700 font-bold mb-1">Gagal Mengirim Pesan</p>
                    <p className="text-xs text-red-600 font-medium">Mohon coba beberapa saat lagi atau hubungi kami langsung via WhatsApp.</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT BENTO INFO CARDS (Takes up 5 cols on XL) */}
          <div className={`xl:col-span-5 ${mobileTab !== "kontak" ? "hidden xl:flex" : "flex"} flex-col gap-4 sm:gap-6 lg:gap-8`}>
            {/* 1. Main Direct Contacts Bento (Light Unified Card) */}
            <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 sm:p-8 lg:p-10 text-slate-900 shadow-xl shadow-slate-200/60 border border-slate-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-blue-50 via-sky-50/60 to-transparent rounded-bl-[100%] pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
                {/* Phone Block */}
                <div>
                  <div className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 mb-1.5 sm:mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                      {info.telepon.judul}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums mt-1">
                    {info.telepon.nilai}
                  </p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-3 text-[10px] sm:text-xs text-slate-500 font-medium">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />{" "}
                    {info.telepon.catatan}
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* Email Block */}
                <div>
                  <div className="inline-flex items-center gap-2 sm:gap-3 text-blue-600 mb-2 sm:mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                      {info.email.judul}
                    </h3>
                  </div>
                  <div className="space-y-3 sm:space-y-3.5">
                    {info.email.nilai.map((mail: string, idx: number) => (
                      <a
                        key={idx}
                        href={`mailto:${mail}`}
                        className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 transition-all group/mail"
                      >
                        <span className="text-sm sm:text-base font-semibold text-slate-700 group-hover/mail:text-blue-700 truncate pr-2 sm:pr-4">
                          {mail}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover/mail:text-blue-600 group-hover/mail:-rotate-45 transition-transform shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. HQ Embedded Map Block */}
            <div className="bg-white rounded-2xl md:rounded-[2rem] p-2 sm:p-3 shadow-xl shadow-slate-200/50 border border-slate-200 group overflow-hidden flex flex-col relative h-[300px] sm:h-[400px]">
              <div className="absolute inset-0 bg-slate-100 z-0 flex items-center justify-center">
                {/* Iframe for Google Map */}
                <iframe
                  src={info.embedPeta}
                  title="Peta Lokasi AlinLabs Indonesia"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.5) contrast(1.2)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:filter-none"
                ></iframe>
              </div>

              {/* Floating Card inside Map */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 mt-auto mx-2 md:mx-4 mb-2 md:mb-4 shadow-lg border border-slate-100 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">
                      {info.alamat.judul}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium mb-3">
                      {info.alamat.baris.join(", ")}
                    </p>
                    <a
                      href={info.linkPeta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
                    >
                      Petunjuk Arah{" "}
                      <CornerDownRight className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ ACCORDION SECTION */}
      <section className={`py-20 md:py-32 relative z-10 ${mobileTab !== "faq" ? "hidden xl:block" : ""}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Pertanyaan Umum
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? "border-blue-500 shadow-lg shadow-blue-100" : "border-slate-200 hover:border-blue-300"}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-6 sm:p-8 flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <h3
                      className={`text-base sm:text-lg font-bold transition-colors ${isOpen ? "text-blue-700" : "text-slate-800"}`}
                    >
                      {faq.q}
                    </h3>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? "bg-blue-50 border-blue-200 text-blue-600 rotate-180" : "bg-slate-50 border-slate-200 text-slate-400"}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <div
                    className={`px-6 sm:px-8 transition-all duration-500 ease-in-out ${isOpen ? "pb-6 sm:pb-8 max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden pb-0"}`}
                  >
                    <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
