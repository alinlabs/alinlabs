
import React from 'react';
import { ViewState } from '../../types';
import { Globe, Mail, Github, Linkedin, Twitter, MapPin } from 'lucide-react';
import { UniversalLottie } from '../ui/UniversalLottie';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  companyName: string;
  tagline: string;
  logoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ 
    onNavigate, 
    companyName, 
    tagline, 
    logoUrl = "/lottie/Logo.lottie" // Default fallback
}) => {
  
  // Footer Links Data
  const servicesLinks = [
    { label: 'Ekosistem Digital', view: ViewState.SERVICE_ECOSYSTEM },
    { label: 'Digital Marketing', view: ViewState.SERVICE_ADS },
    { label: 'Creative Studio', view: ViewState.SERVICE_CINEMA },
  ];

  const quickLinks = [
    { label: 'Beranda', view: ViewState.HOME },
    { label: 'Tentang Kami', view: ViewState.ABOUT },
    { label: 'Portofolio', view: ViewState.PORTFOLIO },
    { label: 'Kontak', view: ViewState.CONTACT },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', view: ViewState.PRIVACY_POLICY },
    { label: 'Terms of Service', view: ViewState.TERMS_OF_SERVICE },
    { label: 'Lisensi', view: ViewState.LICENSE },
  ];

  const partnershipLinks = [
    { label: 'Kerjasama Perusahaan', view: ViewState.PARTNERSHIP_CORPORATE },
    { label: 'Partner Komunitas', view: ViewState.PARTNERSHIP_COMMUNITY },
    { label: 'Freelance & KOL', view: ViewState.PARTNERSHIP_INDIVIDUAL },
    { label: 'Pemerintahan', view: ViewState.PARTNERSHIP_GOVERNMENT },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-24 md:pb-10 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Main Footer Content (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                         <img loading="lazy" src="/gambar/logo-icon-white.png" alt="Logo" className="w-10 h-10 object-contain" />
                         <span className="text-xl font-bold text-white tracking-tight">{companyName}</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        {tagline}. Kami membantu bisnis bertransformasi melalui teknologi, data, dan kreativitas visual.
                    </p>
                    <div className="flex gap-4">
                        {[Twitter, Github, Linkedin].map((Icon, i) => (
                            <button key={i} onClick={(e) => e.preventDefault()} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <Icon className="w-5 h-5" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services & Quick Links Column */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Layanan</h4>
                        <ul className="space-y-3">
                            {servicesLinks.map((link) => (
                                <li key={link.label}>
                                    <button 
                                        onClick={() => onNavigate(link.view)}
                                        className="text-slate-400 hover:text-blue-400 transition-colors text-xs md:text-sm flex items-center group text-left"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Perusahaan</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <button 
                                        onClick={() => onNavigate(link.view)}
                                        className="text-slate-400 hover:text-white transition-colors text-xs md:text-sm text-left"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Kantor Pusat</h4>
                    <div className="space-y-4">
                        <div className="flex items-start text-sm text-slate-400">
                            <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-blue-500" />
                            <span className="leading-relaxed">Jln. Cendrawasih, Nagri Kidul, Purwakarta, Jawa Barat 41111</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-400">
                            <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-blue-500" />
                            <span>office.alinlabs@gmail.com</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Legal & Partnership - Dedicated Bottom Section */}
            <div className="border-t border-slate-800 py-10">
                <div className="flex flex-col md:flex-row gap-10 md:gap-24">
                    
                    {/* Legal Section */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Legal</h4>
                        <div className="flex flex-wrap items-center gap-x-3 text-sm text-slate-400">
                            {legalLinks.map((link, index) => (
                                <React.Fragment key={link.label}>
                                    <button 
                                        onClick={() => onNavigate(link.view)}
                                        className="hover:text-emerald-400 transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                    {index < legalLinks.length - 1 && <span className="text-slate-700">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Partnership Section */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-bold text-sm uppercase tracking-wider">Partnership</h4>
                        <div className="flex flex-wrap items-center gap-x-3 text-sm text-slate-400">
                            {partnershipLinks.map((link, index) => (
                                <React.Fragment key={link.label}>
                                    <button 
                                        onClick={() => onNavigate(link.view)}
                                        className="hover:text-purple-400 transition-colors"
                                    >
                                        {link.label}
                                    </button>
                                    {index < partnershipLinks.length - 1 && <span className="text-slate-700">|</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Indonesia (ID)</span>
                </div>
            </div>
        </div>
    </footer>
  );
};
