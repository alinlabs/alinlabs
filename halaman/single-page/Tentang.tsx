
import React, { useState, useEffect } from 'react';
import { ViewState } from '../../types';
import { Info, Target, Users, History, Zap, Briefcase, Quote, Linkedin, Twitter, Mail, Handshake, ArrowRight, Sparkles, Globe, Compass, Cpu, Layers } from 'lucide-react';

export const Tentang: React.FC = () => {
  const data: any = {
  "hero": {
      "slogan": "Cerita Kami",
      "judulAwalan": "Mendefinisikan Ulang",
      "judulHighlight": "Lanskap Digital",
      "deskripsi": "AlinLabs Indonesia menciptakan produk digital yang tidak hanya bekerja secara teknis, namun memukau secara estetika."
  },
  "cerita": {
      "sejak": "Sejak 2010",
      "teksSejak": "Dari sebuah studio kecil menjadi ekosistem digital terintegrasi skala nasional.",
      "judul": "Evolusi & Inovasi",
      "subJudul": "Menyulam Seni ke dalam Teknologi",
      "gambar": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "konten": "AlinLabs Indonesia lahir dari keyakinan bahwa teknologi tanpa seni adalah mesin yang dingin, dan seni tanpa teknologi hanyalah ide yang tak tersentuh. Kami menggabungkan ketelitian rekayasa perangkat lunak dengan intuisi desain kreatif untuk membangun ekosistem digital yang hidup dan terus berkembang bersama bisnis Anda.",
      "kutipan": "Kami tidak sekadar menulis baris kode; kami merancang setiap piksel untuk bercerita, dan setiap interaksi untuk bermakna."
  },
  "visi": {
      "judul": "Katalisator Visi",
      "konten": "Visi kami sangat sederhana namun ambisius: Mendorong transformasi digital yang memanusiakan teknologi. Kami membangun untuk memecahkan masalah esensial, tanpa melupakan pentingnya pengalaman yang elegan."
  },
  "stats": [
      { nilai: "250+", label: "Proyek Selesai", icon: Briefcase },
      { nilai: "50+", label: "Mitra Strategis", icon: Handshake },
      { nilai: "99%", label: "Klien Puas", icon: Sparkles }
  ],
        "pendiri": [
            {
                "id": "f1",
                "nama": "Alvareza H. Pratama",
                "namaMobile": "Alvareza",
                "peran": "Founder & CEO",
                "gambar": "https://imgur.com/xgQGqbr.png",
                "bio": "Mantan system architect yang beralih menjadi digital ecologist. Percaya bahwa arsitektur yang baik harus sebangun dengan desain yang indah."
            },
            {
                "id": "f2",
                "nama": "Mela Melati Aprilia",
                "namaMobile": "Melati Aprilia",
                "peran": "Co-Founder & COO",
                "gambar": "https://imgur.com/XtAkB99.png",
                "bio": "Mengkurasi talenta dan membangun budaya kerja di mana seniman dan engineer dapat berdebat dan menciptakan mahakarya."
            }
        ],
      "timStrategis": [
          {
              "id": "t1",
              "nama": "Agus Suyanto",
              "peran": "Lead Architect",
              "bio": "Arsitek sistem full-stack. Memandang kode layaknya puisi algoritmik."
          },
          {
              "id": "t2",
              "nama": "Sari Wahyuni",
              "peran": "Head of Creative",
              "bio": "Perfeksionis visual. Peka terhadap pergerakan piksel sekecil apapun."
          },
          {
              "id": "t3",
              "nama": "Budi Santoso",
              "peran": "Digital Growth",
              "bio": "Melihat data sebagai kanvas untuk menggambar peta keuntungan audiens."
          },
          {
              "id": "t4",
              "nama": "Siti Aminah",
              "peran": "UX Researcher",
              "bio": "Pendengar yang baik. Menterjemahkan frustasi pengguna menjadi solusi intuitif."
          },
          {
              "id": "t5",
              "nama": "Joko Susilo",
              "peran": "Senior Frontend Engineer",
              "bio": "Berfokus pada interaksi dan kehalusan animasi di antar muka pengguna."
          },
          {
              "id": "t6",
              "nama": "Fitriani",
              "peran": "Backend Developer",
              "bio": "Membangun sistem dan API yang tangguh di belakang layar."
          },
          {
              "id": "t7",
              "nama": "Bambang Supriyadi",
              "peran": "DevOps Engineer",
              "bio": "Memastikan infrastruktur selalu siap sedia dan efisien."
          },
          {
              "id": "t8",
              "nama": "Ayu Lestari",
              "peran": "Copywriter",
              "bio": "Merangkai kata-kata yang membujuk dan memikat audiens."
          },
          {
              "id": "t9",
              "nama": "Kurniawan Dwi",
              "peran": "Data Analyst",
              "bio": "Mengubah angka menjadi keputusan dan wawasan bagi bisnis."
          },
          {
              "id": "t10",
              "nama": "Rina Putri",
              "peran": "Project Manager",
              "bio": "Menjaga proyek tetap berjalan sesuai jadwal dan anggaran."
          },
          {
              "id": "t11",
              "nama": "Arief Rachman",
              "peran": "UI Designer",
              "bio": "Memastikan aspek visual selaras dengan visi brand."
          },
          {
              "id": "t12",
              "nama": "Farhan Saputra",
              "peran": "Mobile Developer",
              "bio": "Ahli dalam merancang aplikasi di ujung jari pengguna."
          }
      ]
  };
;
  const partnersData = [
    "Pertamina",
    "AWS",
    "Telkom",
    "Midtrans",
    "Mandiri",
    "Google",
    "Gojek"
  ];

  const { hero, cerita, visi, pendiri, timStrategis, stats } = data;

  return (
    <div className="bg-slate-50 w-full overflow-x-hidden text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* --- HERO SECTION: Modern Minimalist Abstract --- */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-28 bg-white overflow-hidden border-b border-slate-100">
        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Floating Abstract Shapes */}
        <div className="absolute top-1/4 -right-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 -left-10 w-[30rem] h-[30rem] bg-indigo-100/40 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-200/50 bg-blue-50/50 backdrop-blur-md text-blue-700 mb-6 sm:mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider">{hero.slogan}</span>
            </div>
            
            {/* Display Typography */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.2] md:leading-[1.1] animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 mb-6 sm:mb-8 max-w-5xl flex flex-col items-center whitespace-nowrap">
              <span>{hero.judulAwalan}</span>
              <span className="relative inline-block pt-1 sm:pt-2 mt-2">
                 <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">{hero.judulHighlight}</span>
                 <span className="absolute bottom-0 left-0 w-full h-[30%] bg-blue-200/40 -z-10 -rotate-2 transform origin-left"></span>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
               {hero.deskripsi}
            </p>
        </div>

        {/* --- STATISTIC BENTO --- */}
        <div className="mt-10 md:mt-16 relative z-20">
            <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-4">
                  {stats.map((stat: any, i: number) => {
                      const Icon = stat.icon;
                      return (
                          <div key={i} className="bg-white/90 backdrop-blur-xl p-2 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-all duration-300">
                              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 sm:mb-4">
                                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                              </div>
                              <h4 className="text-sm sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-1 leading-tight tracking-tighter">{stat.nilai}</h4>
                              <p className="text-[8px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 leading-tight">{stat.label}</p>
                          </div>
                      );
                  })}
              </div>
          </div>
        </div>
      </section>

      {/* --- CREATIVE SQUAD: Clean Modern Grid --- */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight">Pikiran di Balik Karya</h2>
                <p className="text-base sm:text-lg text-slate-500 font-light px-4 sm:px-0">
                    Kombinasi talenta kreatif dan teknis untuk merealisasikan ide mustahil menjadi produk fungsional.
                </p>
            </div>

            {/* Founders - 2 columns on all devices, but larger max-width on desktop */}
            <div className="grid grid-cols-2 lg:max-w-3xl mx-auto gap-4 sm:gap-8 md:gap-x-12 md:gap-y-16 mb-8 sm:mb-16">
                {(pendiri || []).map((member: any) => (
                    <div key={member.id} className="group relative flex flex-col items-center text-center">
                         <div className="relative w-24 h-24 sm:w-48 sm:h-48 mb-4 sm:mb-6 mx-auto">
                              <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 group-hover:border-blue-400 group-hover:rotate-180 transition-all duration-1000 -m-2 sm:-m-3"></div>
                              {member.gambar ? (
                                  <img loading="lazy" src={member.gambar} alt={member.nama} className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 shadow-sm transition-all duration-500 border-2 sm:border-4 border-white" />
                              ) : (
                                  <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-4xl sm:text-6xl border-2 sm:border-4 border-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                      {member.nama.charAt(0)}
                                  </div>
                              )}
                              <div className="absolute top-0 right-0 w-6 h-6 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                  <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                              </div>
                         </div>
                         <h3 className="text-base sm:text-2xl font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight sm:leading-normal">
                             <span className="sm:hidden">{member.namaMobile || member.nama}</span>
                             <span className="hidden sm:inline">{member.nama}</span>
                         </h3>
                         <p className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest sm:mb-4">{member.peran}</p>
                         <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed px-2 sm:px-4 hidden sm:block">
                             {member.bio}
                         </p>
                    </div>
                ))}
            </div>

            {/* Strategic Team */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-x-8 md:gap-y-16">
                {(timStrategis || []).map((member: any) => (
                    <div key={member.id} className="group relative flex flex-col items-center text-center">
                         <div className="relative w-24 h-24 sm:w-48 sm:h-48 mb-4 sm:mb-6 mx-auto">
                              <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 group-hover:border-blue-400 group-hover:rotate-180 transition-all duration-1000 -m-2 sm:-m-3"></div>
                              {member.gambar ? (
                                  <img loading="lazy" src={member.gambar} alt={member.nama} className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 shadow-sm transition-all duration-500 border-2 sm:border-4 border-white" />
                              ) : (
                                  <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-4xl sm:text-6xl border-2 sm:border-4 border-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                      {member.nama.charAt(0)}
                                  </div>
                              )}
                              <div className="absolute top-0 right-0 w-6 h-6 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                  <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                              </div>
                         </div>
                         <h3 className="text-base sm:text-2xl font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight sm:leading-normal">{member.nama}</h3>
                         <p className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest sm:mb-4">{member.peran}</p>
                         <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed px-2 sm:px-4 hidden sm:block">
                             {member.bio}
                         </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- PARTNERS MARQUEE: Sleek Minimal --- */}
      <section className="py-10 md:py-16 bg-slate-50 border-t border-slate-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-10 text-center">
              <h2 className="text-[10px] sm:text-sm font-bold text-slate-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] px-2">Dipercaya Oleh Ekosistem Digital</h2>
          </div>
          
          <div className="relative w-full flex overflow-x-hidden">
              <div className="animate-scroll whitespace-nowrap flex gap-10 sm:gap-16 md:gap-32 items-center pr-10 sm:pr-16 md:pr-32">
                 {[...partnersData, ...partnersData, ...partnersData].map((partner, idx) => (
                     <span key={idx} className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-200 hover:text-slate-400 transition-colors cursor-default select-none uppercase tracking-tight">
                         {partner}
                     </span>
                 ))}
              </div>
              {/* Blur edges */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
          </div>
      </section>

    </div>
  );
};

