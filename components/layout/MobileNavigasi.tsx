import React, { useState, useEffect } from "react";
import { ViewState } from "../../types";
import {
  Globe,
  Box,
  Layers,
  Mail,
  Calculator,
  MessageSquare,
} from "lucide-react";

interface MobileNavigasiProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const MobileNavigasi: React.FC<MobileNavigasiProps> = ({
  currentView,
  onNavigate,
}) => {
  const [hideNav, setHideNav] = useState(false);

  useEffect(() => {
    const handleHide = () => setHideNav(true);
    const handleShow = () => setHideNav(false);
    
    window.addEventListener('hide-bottom-nav', handleHide);
    window.addEventListener('show-bottom-nav', handleShow);
    
    return () => {
      window.removeEventListener('hide-bottom-nav', handleHide);
      window.removeEventListener('show-bottom-nav', handleShow);
    }
  }, []);

  const navItems = [
    { label: "Home", view: ViewState.HOME, icon: Globe },
    { label: "Portofolio", view: ViewState.PORTFOLIO, icon: Layers },
    { label: "Layanan", view: ViewState.PRODUCTS, icon: Box },
    { label: "Chat", view: "CHAT", icon: MessageSquare },
    { label: "Kontak", view: ViewState.CONTACT, icon: Mail },
  ];

  // Check active state logic (handling sub-pages)
  const isActive = (view: any) => {
    if (currentView === view) return true;
    if (
      view === ViewState.PRODUCTS &&
      [
        ViewState.SERVICE_ECOSYSTEM,
        ViewState.SERVICE_ADS,
        ViewState.SERVICE_CINEMA,
      ].includes(currentView)
    )
      return true;
    return false;
  };

  return (
    // Container: Fixed Bottom + Rounded Top Corners (1.5rem) + Shadow
    <div className={`fixed bottom-0 left-0 right-0 z-[45] bg-white border-t border-slate-100 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.1)] md:hidden pb-[env(safe-area-inset-bottom)] rounded-t-[1.5rem] transition-all duration-300 ${hideNav ? "translate-y-[150%] opacity-0" : "translate-y-0 opacity-100"}`}>
      {/* Grid Container */}
      <div className="grid grid-cols-5 h-[4.5rem] relative items-center">
        {navItems.map((item, index) => {
          const active = isActive(item.view);
          const isCenter = index === 2; // Layanan is the 3rd item

          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.view === "CHAT") {
                  window.dispatchEvent(new CustomEvent("open-chat"));
                } else {
                  onNavigate(item.view as ViewState);
                }
              }}
              className="group relative flex flex-col items-center justify-center w-full h-full transition-all duration-200 active:bg-slate-50 outline-none"
            >
              {isCenter ? (
                <>
                  {/* Centered Floating Action Button Style */}
                  <div className={`absolute -top-5 flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-blue-500/30 transition-transform duration-300 group-active:scale-95 ${active ? 'bg-blue-700' : 'bg-blue-600'}`}>
                    <item.icon className="w-6 h-6 text-white stroke-[2px]" />
                  </div>
                  {/* Label pushes down slightly to make room for absolute icon */}
                  <span className={`text-[10px] tracking-tight transition-colors duration-300 mt-7 ${active ? 'font-bold text-blue-600' : 'font-medium text-slate-400 group-hover:text-slate-600'}`}>
                    {item.label}
                  </span>
                </>
              ) : (
                <>
                  {/* Icon Wrapper */}
                  <div
                    className={`mb-1 transition-transform duration-300 ${active ? "transform -translate-y-0.5" : "group-active:scale-90"}`}
                  >
                    <item.icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        active
                          ? "text-blue-600 fill-blue-600/10 stroke-[2.5px]"
                          : "text-slate-400 stroke-[1.5px] group-hover:text-slate-600"
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[10px] tracking-tight transition-colors duration-300 ${
                      active
                        ? "font-bold text-blue-600"
                        : "font-medium text-slate-400 group-hover:text-slate-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
