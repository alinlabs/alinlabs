
import React, { useEffect } from 'react';
import { ViewState } from '../../types';
import { X, Globe, Box, Layers, Info, Mail, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  companyName: string;
  logoUrl?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    isOpen, 
    onClose, 
    currentView, 
    onNavigate, 
    companyName, 
    logoUrl = "/lottie/Logo.lottie" 
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Beranda', view: ViewState.HOME, icon: Globe },
    { label: 'Layanan', view: ViewState.PRODUCTS, icon: Box },
    { label: 'Portofolio', view: ViewState.PORTFOLIO, icon: Layers },
    { label: 'Tentang', view: ViewState.ABOUT, icon: Info },
    { label: 'Kontak', view: ViewState.CONTACT, icon: Mail },
  ];

  const handleNavigate = (view: ViewState) => {
    onClose();
    setTimeout(() => {
      onNavigate(view);
    }, 200); // Give time for close animation to start before heavy navigation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end pointer-events-auto">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          ></motion.div>

          {/* Sidebar Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.8 }}
            className="relative w-[80%] max-w-[320px] bg-white h-full shadow-2xl flex flex-col"
          >
            
            {/* Header with Logo */}
            <div className="p-4 sm:p-6 flex justify-between items-center border-b border-slate-100 bg-white z-10">
                <div 
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer active:scale-95 transition-transform"
                    onClick={() => handleNavigate(ViewState.HOME)}
                >
                    <img loading="lazy" src="/gambar/logo-icon-color.png" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                    <div>
                        <span className="font-bold text-base sm:text-lg text-slate-900 block leading-none">{companyName}</span>
                        <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5 block">Menu</span>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="p-1.5 sm:p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto py-4 px-4 sm:py-6 sm:px-6 space-y-2 sm:space-y-3 custom-scrollbar">
                {navItems.map((item, idx) => {
                    const isActive = currentView === item.view;
                    return (
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.05, ease: 'easeOut' }}
                            key={item.label}
                            onClick={() => handleNavigate(item.view)}
                            className={`group w-full flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-200 ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 sm:translate-x-2' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className={`p-1.5 sm:p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white group-hover:shadow-sm'} transition-all`}>
                                    <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                                </div>
                                <span className="font-bold text-xs sm:text-sm">{item.label}</span>
                            </div>
                            {isActive && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />}
                        </motion.button>
                    );
                })}

                {/* Additional Links */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-6 mt-4 border-t border-slate-100"
                >
                    <div className="mb-4">
                        <h4 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mb-1.5 px-2">Partnership</h4>
                        <div className="flex flex-col space-y-0.5 px-2 text-xs text-slate-400">
                            <div className="flex items-center space-x-2 py-0.5">
                                <button onClick={() => handleNavigate(ViewState.PARTNERSHIP_GOVERNMENT)} className={`hover:text-slate-600 transition-colors ${currentView === ViewState.PARTNERSHIP_GOVERNMENT ? 'text-blue-600 font-bold' : ''}`}>Pemerintahan</button>
                                <span className="text-slate-300">&bull;</span>
                                <button onClick={() => handleNavigate(ViewState.PARTNERSHIP_CORPORATE)} className={`hover:text-slate-600 transition-colors ${currentView === ViewState.PARTNERSHIP_CORPORATE ? 'text-blue-600 font-bold' : ''}`}>Perusahaan</button>
                            </div>
                            <div className="flex items-center space-x-2 py-0.5">
                                <button onClick={() => handleNavigate(ViewState.PARTNERSHIP_COMMUNITY)} className={`hover:text-slate-600 transition-colors ${currentView === ViewState.PARTNERSHIP_COMMUNITY ? 'text-blue-600 font-bold' : ''}`}>Komunitas</button>
                                <span className="text-slate-300">&bull;</span>
                                <button onClick={() => handleNavigate(ViewState.PARTNERSHIP_INDIVIDUAL)} className={`hover:text-slate-600 transition-colors ${currentView === ViewState.PARTNERSHIP_INDIVIDUAL ? 'text-blue-600 font-bold' : ''}`}>Freelance</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mb-2">
                        <h4 className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mb-1.5 px-2">Legal</h4>
                        <div className="flex flex-col space-y-0.5 px-2 text-[11px] text-slate-400">
                            <div className="flex items-center space-x-2 py-0.5">
                                <button onClick={() => handleNavigate(ViewState.PRIVACY_POLICY)} className={`hover:text-slate-600 transition-colors ${currentView === ViewState.PRIVACY_POLICY ? 'text-blue-600 font-bold' : ''}`}>Privacy</button>
                                <span className="text-slate-300">&bull;</span>
                                <button onClick={() => handleNavigate(ViewState.LICENSE)} className={`hover:text-slate-600 transition-colors ${currentView === ViewState.LICENSE ? 'text-blue-600 font-bold' : ''}`}>Lisence</button>
                            </div>
                            <button onClick={() => handleNavigate(ViewState.TERMS_OF_SERVICE)} className={`text-left py-0.5 hover:text-slate-600 transition-colors ${currentView === ViewState.TERMS_OF_SERVICE ? 'text-blue-600 font-bold' : ''}`}>Term Of Service</button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-center text-[9px] sm:text-[10px] text-slate-400 font-medium">
                        &copy; {new Date().getFullYear()} {companyName}.
                    </p>
                    <div className="w-8 sm:w-12 h-1 bg-slate-200 rounded-full mt-2"></div>
                </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
