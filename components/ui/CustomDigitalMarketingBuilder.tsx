import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../../types';
import { ShoppingCart, Plus, Minus, Info, AlertCircle, Check, Trash2, ChevronUp, ChevronDown, Calendar, ChevronLeft, ChevronRight, Facebook, Search, Video, ShoppingBag, Store } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  placeholder: string;
  className?: string;
  iconColor?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, options, placeholder, className = '', iconColor = 'text-blue-500' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div 
        className="flex items-center justify-between w-full px-3 md:px-4 h-10 md:h-[48px] border border-slate-200 rounded-xl bg-white text-sm outline-none focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all font-medium cursor-pointer shadow-sm hover:border-slate-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`flex items-center gap-2 truncate ${value ? 'text-slate-700' : 'text-slate-400'}`}>
          {selectedOption?.icon}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown className={`w-4 h-4 ml-2 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-500' : 'text-slate-400'}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-2 max-h-60 overflow-y-auto transform opacity-100 scale-100 transition-all origin-top">
          {options.length > 0 ? options.map(opt => (
            <div 
              key={opt.value}
              className={`px-3 md:px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between transition-colors ${value === opt.value ? 'bg-slate-50 font-bold text-slate-800' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2 truncate mr-2">
                {opt.icon && <span className={value === opt.value ? iconColor : 'text-slate-400'}>{opt.icon}</span>}
                <span className="truncate">{opt.label}</span>
              </div>
              {value === opt.value && <Check className={`w-4 h-4 shrink-0 ${iconColor}`} />}
            </div>
          )) : (
            <div className="px-4 py-3 text-sm text-slate-400 italic text-center">Tidak ada pilihan tersedia</div>
          )}
        </div>
      )}
    </div>
  );
};


const CustomDateInput = ({ value, onChange, placeholder }: { value: string, onChange: (val: string) => void, placeholder: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(() => value ? new Date(value) : new Date());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  const displayValue = value ? new Date(value).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : placeholder;

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const handlePrevMonth = (e: React.MouseEvent) => { 
    e.stopPropagation(); 
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); 
  };
  const handleNextMonth = (e: React.MouseEvent) => { 
    e.stopPropagation(); 
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); 
  };

  const handleSelectDate = (d: number) => {
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const day = String(d).padStart(2, '0');
    const year = currentMonth.getFullYear();
    onChange(`${year}-${month}-${day}`);
    setIsOpen(false);
  };

  const isSelected = (d: number) => {
    if (!value) return false;
    const selectedDate = new Date(value);
    return selectedDate.getDate() === d && selectedDate.getMonth() === currentMonth.getMonth() && selectedDate.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (d: number) => {
    const today = new Date();
    return today.getDate() === d && today.getMonth() === currentMonth.getMonth() && today.getFullYear() === currentMonth.getFullYear();
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className={`flex items-center justify-between w-full px-4 h-10 md:h-[48px] border ${isOpen ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200 hover:border-slate-300'} rounded-xl bg-white text-sm font-medium transition-all shadow-sm cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`block truncate ${value ? 'text-slate-700' : 'text-slate-400'}`}>
          {displayValue}
        </span>
        <Calendar className={`w-4 h-4 ml-2 shrink-0 transition-colors ${isOpen ? 'text-indigo-500' : 'text-slate-400'}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl p-4 w-[280px] origin-top transform opacity-100 scale-100 transition-all">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={handlePrevMonth}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-bold text-slate-700 text-sm">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button 
              onClick={handleNextMonth}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-slate-400 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {blanks.map(blank => (
              <div key={`blank-${blank}`} className="w-8 h-8"></div>
            ))}
            {days.map(day => (
              <button
                key={day}
                onClick={() => handleSelectDate(day)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
                  isSelected(day) 
                    ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                    : isToday(day)
                      ? 'bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100'
                      : 'text-slate-700 hover:bg-slate-100 font-medium'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CustomItem {
  id: string;
  nama: string;
  harga: number;
  minimum: number;
  satuan: string;
  qty: number;
  maxQty?: number;
  step?: number;
  isDefaultWajib?: boolean;
  isCalculated?: boolean;
}

interface CustomDigitalMarketingBuilderProps {
  onNavigate: (view: ViewState, payload?: any) => void;
  dataNama: string;
}

export const CustomDigitalMarketingBuilder: React.FC<CustomDigitalMarketingBuilderProps> = ({ onNavigate, dataNama }) => {
  const [socialItems, setSocialItems] = useState<CustomItem[]>([
    { id: 'design', nama: 'Jasa Pembuatan Design', harga: 25000, minimum: 10, satuan: '/Design', qty: 10, step: 1 },
    { id: 'video', nama: 'Jasa Pembuatan Video', harga: 50000, minimum: 10, satuan: '/Video', qty: 10, step: 1 },
    { id: 'rencana', nama: 'Rencana Konten Bulanan', harga: 2500, minimum: 0, satuan: '/Konten', qty: 20, isCalculated: true },
    { id: 'akun', nama: 'Biaya Kelola Akun', harga: 150000, minimum: 1, satuan: '/Akun', qty: 1, isCalculated: true },
    { id: 'cs', nama: 'Cs Admin Support 24/7', harga: 1000000, minimum: 1, satuan: '/Bulan', qty: 1, maxQty: 1, isDefaultWajib: true },
    { id: 'db', nama: 'Manajemen Database', harga: 250000, minimum: 1, satuan: '/Bulan', qty: 1, maxQty: 1, isDefaultWajib: true },
    { id: 'riset', nama: 'Riset Kompetitor & Skema Campaign', harga: 200000, minimum: 1, satuan: '/Bulan', qty: 1, maxQty: 1, isDefaultWajib: true },
    { id: 'laporan', nama: 'Laporan Progress & Analisa Bulanan', harga: 150000, minimum: 1, satuan: '/Bulan', qty: 1, maxQty: 1, isDefaultWajib: true },
  ]);

  const [adsItems, setAdsItems] = useState<CustomItem[]>([
    { id: 'iklan-setup', nama: 'Platform Iklan & Jumlah Setup', harga: 150000, minimum: 1, satuan: '/Setup', qty: 1, isCalculated: true },
    { id: 'iklan-design', nama: 'Konten Iklan Design', harga: 20000, minimum: 2, satuan: '/Design', qty: 2, step: 1 },
    { id: 'iklan-video', nama: 'Konten Iklan Video', harga: 50000, minimum: 2, satuan: '/Video', qty: 2, step: 1 },
    { id: 'iklan-riset', nama: 'Riset Kompetitor & Skema Campaign', harga: 100000, minimum: 1, satuan: '/Proyek', qty: 1, maxQty: 1, isDefaultWajib: true },
    { id: 'iklan-laporan', nama: 'Laporan Progress, Analisa & Evaluasi', harga: 100000, minimum: 1, satuan: '/Proyek', qty: 1, maxQty: 1, isDefaultWajib: true },
  ]);

  const [akunList, setAkunList] = useState<{jenis: string, username: string}[]>([
    { jenis: '', username: '' }
  ]);

  const [adsMulai, setAdsMulai] = useState('');
  const [adsSelesai, setAdsSelesai] = useState('');
  const [adsBudget, setAdsBudget] = useState('');
  const [adsPlatforms, setAdsPlatforms] = useState<{name: string, qty: number}[]>([]);
  const [selectedPlatformInput, setSelectedPlatformInput] = useState('');
  const availablePlatforms = ['Meta Ads (FB/IG)', 'Google Ads', 'Tiktok Ads', 'Shopee Ads', 'Tokopedia Ads'];

  const getPlatformIcon = (name: string, className = "w-4 h-4 md:w-5 md:h-5") => {
    switch (name) {
      case 'Meta Ads (FB/IG)': return <img loading="lazy" src="/icon/meta.png" alt="Meta" className={`${className} object-contain`} />;
      case 'Google Ads': return <img loading="lazy" src="/icon/google.png" alt="Google" className={`${className} object-contain`} />;
      case 'Tiktok Ads': return <img loading="lazy" src="/icon/tiktok.png" alt="Tiktok" className={`${className} object-contain`} />;
      case 'Shopee Ads': return <img loading="lazy" src="/icon/shopee.png" alt="Shopee" className={`${className} object-contain`} />;
      case 'Tokopedia Ads': return <img loading="lazy" src="/icon/tokopedia.png" alt="Tokopedia" className={`${className} object-contain`} />;
      default: return null;
    }
  };

  const getAkunIcon = (name: string, className = "w-4 h-4 md:w-5 md:h-5") => {
    switch (name) {
      case 'Instagram': return <img loading="lazy" src="/icon/instagram.png" alt="Instagram" className={`${className} object-contain`} />;
      case 'Tiktok': return <img loading="lazy" src="/icon/tiktok.png" alt="Tiktok" className={`${className} object-contain`} />;
      case 'Facebook': return <img loading="lazy" src="/icon/facebook.png" alt="Facebook" className={`${className} object-contain`} />;
      default: return null;
    }
  };

  const handleUpdatePlatformQty = (idx: number, delta: number) => {
    const newList = [...adsPlatforms];
    newList[idx].qty = Math.max(1, newList[idx].qty + delta); // Set minimum qty to 1 so if it's there it has at least 1
    setAdsPlatforms(newList);
  };

  useEffect(() => {
    const totalSetupQty = adsPlatforms.reduce((sum, p) => sum + p.qty, 0);
    setAdsItems(prev => prev.map(item => {
      if (item.id === 'iklan-setup') {
        const qty = Math.max(1, totalSetupQty);
        if (item.qty !== qty) {
          return { ...item, qty };
        }
      }
      return item;
    }));
  }, [adsPlatforms]);

  useEffect(() => {
    setSocialItems(prev => prev.map(item => {
      if (item.id === 'akun') {
        const qty = Math.max(1, akunList.length);
        if (item.qty !== qty) {
          return { ...item, qty };
        }
      }
      return item;
    }));
  }, [akunList]);

  const handleAddAkun = () => {
    setAkunList([...akunList, { jenis: '', username: '' }]);
  };

  const handleRemoveAkun = (idx: number) => {
    if (akunList.length > 1) {
      setAkunList(akunList.filter((_, i) => i !== idx));
    }
  };

  const handleUpdateAkun = (idx: number, field: 'jenis' | 'username', value: string) => {
    const newList = [...akunList];
    newList[idx][field] = value;
    setAkunList(newList);
  };

  const getItemPricing = (item: CustomItem, activeType: 'social' | 'ads') => {
    let unitPrice = item.harga;
    if (activeType === 'social' && ['cs', 'db', 'riset', 'laporan'].includes(item.id)) {
      const akunCount = Math.max(1, akunList.length);
      unitPrice = item.harga + (item.harga * 0.2 * (akunCount - 1));
    }
    const subtotal = unitPrice * item.qty;
    return { unitPrice, subtotal };
  };

  const minSocial = 2750000;
  const minAds = 490000;

  const handleUpdateSocialQty = (idx: number, delta: number) => {
    const newItems = [...socialItems];
    const item = { ...newItems[idx] };
    if (item.isDefaultWajib || item.isCalculated) return;
    const step = item.step || 1;

    if (delta > 0) {
      if (item.maxQty && item.qty >= item.maxQty) return;
      item.qty = item.qty === 0 ? item.minimum : item.qty + step;
    } else {
      item.qty = item.qty <= item.minimum ? 0 : item.qty - step;
    }
    newItems[idx] = item;

    if (item.id === 'design' || item.id === 'video') {
       const designQty = newItems.find(i => i.id === 'design')?.qty || 0;
       const videoQty = newItems.find(i => i.id === 'video')?.qty || 0;
       const rencanaIdx = newItems.findIndex(i => i.id === 'rencana');
       if (rencanaIdx !== -1) {
         newItems[rencanaIdx] = { ...newItems[rencanaIdx], qty: designQty + videoQty };
       }
    }

    setSocialItems(newItems);
  };

  const handleUpdateAdsQty = (idx: number, delta: number) => {
    const newItems = [...adsItems];
    const item = newItems[idx];
    if (item.isDefaultWajib) return;
    const step = item.step || 1;

    if (delta > 0) {
      if (item.maxQty && item.qty >= item.maxQty) return;
      item.qty = item.qty === 0 ? item.minimum : item.qty + step;
    } else {
      item.qty = item.qty <= item.minimum ? 0 : item.qty - step;
    }
    setAdsItems(newItems);
  };

  const totalSocial = socialItems.reduce((sum, item) => sum + getItemPricing(item, 'social').subtotal, 0);
  const totalAds = adsItems.reduce((sum, item) => sum + getItemPricing(item, 'ads').subtotal, 0);
  const grandTotal = totalSocial + totalAds;

  const hasSocial = socialItems.some(i => i.qty > 0);
  const socialValid = true;

  const hasAds = adsItems.some(i => i.qty > 0);
  const adsValid = true;
  
  const isAnySelected = hasSocial || hasAds;
  const isValid = isAnySelected;

  const handleCheckout = () => {
    if (!isValid) return;
    
    const selectedSocial = socialItems.filter(i => i.qty > 0).map(i => `${i.nama} (${i.qty})`);
    const selectedAds = adsItems.filter(i => i.qty > 0).map(i => `${i.nama} (${i.qty})`);
    const allSelected = [...selectedSocial, ...selectedAds];
    
    // Add note if ads selected
    if (hasAds) {
      allSelected.push('* Belum termasuk budget iklan harian');
    }
    
    const opsiName = 'Paket Custom Spesial (Sosial Media & Iklan)';
    
    onNavigate(ViewState.CHECKOUT_PAYMENT, {
      packageName: dataNama,
      opsiName: opsiName,
      price: grandTotal,
      minimumTransaksi: 1,
      opsiData: {
        nama: opsiName,
        hargaPromo: grandTotal,
        layanan: allSelected,
        proyek: 'Bulan / Project'
      }
    });
  };

  const renderTable = (items: CustomItem[], handleUpdateQty: (idx: number, delta: number) => void, activeType: 'social' | 'ads') => (
    <div className="flex flex-col">
      {items.map((item, idx) => {
        const { unitPrice, subtotal } = getItemPricing(item, activeType);
        return (
          <div key={item.id} className="flex flex-col border-b border-slate-100 hover:bg-slate-50 transition-colors">
            {/* --- DESKTOP VIEW --- */}
            <div className="hidden md:flex flex-row items-center justify-between p-6 gap-4">
              <div className="flex-1 w-full flex flex-row items-center gap-4 justify-between pr-8">
                <div>
                  <div className="font-bold text-slate-800 text-lg">
                    {item.nama}
                  </div>
                  {item.id === 'iklan-setup' && (
                    <p className="text-xs text-slate-500 mt-1 font-medium">Pilih dan tambahkan platform iklan kemudian sesuaikan jumlah setupnya.</p>
                  )}
                </div>
                {(!item.isDefaultWajib && !item.isCalculated && item.id !== 'iklan-setup') ? (
                  <div className="text-slate-600 font-medium text-base shrink-0 flex items-center justify-between w-[200px]">
                    <span>Rp</span>
                    <span className="text-right flex-1 pr-1">{unitPrice.toLocaleString('id-ID')}</span>
                    <span className="text-sm text-slate-400 font-normal w-12 text-left shrink-0">{item.satuan}</span>
                  </div>
                ) : (['cs', 'db', 'riset', 'laporan'].includes(item.id) && akunList.length > 1) ? (
                  <div className="flex flex-col shrink-0 w-[200px]">
                    <div className="text-slate-600 font-medium text-base flex items-center justify-between w-full">
                      <span>Rp</span>
                      <span className="text-right flex-1 pr-1">{item.harga.toLocaleString('id-ID')}</span>
                      <span className="text-sm font-normal text-slate-400 w-12 text-left shrink-0">{item.satuan}</span>
                    </div>
                    <div className="text-amber-600 text-xs font-bold flex items-center justify-end w-full mt-1">
                      <span className="bg-amber-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                        + Charge Rp {(item.harga * 0.2 * (akunList.length - 1)).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ) : item.id === 'iklan-setup' ? (
                  <div className="shrink-0 flex items-center justify-between w-[200px]">
                    {adsPlatforms.length < availablePlatforms.length && (
                      <CustomSelect
                        value={selectedPlatformInput}
                        onChange={(val) => setSelectedPlatformInput(val)}
                        options={availablePlatforms.filter(p => !adsPlatforms.some(ap => ap.name === p)).map(p => ({ value: p, label: p, icon: getPlatformIcon(p) }))}
                        placeholder="Pilih Platform..."
                        iconColor="text-indigo-500"
                        className="w-full"
                      />
                    )}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between w-auto gap-8 shrink-0">
                <div className="flex items-center justify-center w-[124px] shrink-0">
                  {item.id === 'iklan-setup' ? (
                    adsPlatforms.length < availablePlatforms.length ? (
                      <button 
                        onClick={() => {
                          if (!selectedPlatformInput) return;
                          setAdsPlatforms([...adsPlatforms, { name: selectedPlatformInput, qty: 1 }]);
                          setSelectedPlatformInput('');
                        }}
                        disabled={!selectedPlatformInput}
                        className={`w-full px-4 h-[48px] rounded-xl text-sm font-bold transition-colors ${selectedPlatformInput ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-50 text-slate-300 cursor-not-allowed'}`}
                      >
                        Tambah
                      </button>
                    ) : null
                  ) : item.isDefaultWajib || item.isCalculated ? null : (
                    <div className="flex items-center justify-center space-x-3 bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-[124px]">
                      <button 
                        onClick={() => handleUpdateQty(idx, -1)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-red-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-extrabold w-8 text-center text-lg">{item.qty}</span>
                      <button 
                        onClick={() => handleUpdateQty(idx, 1)}
                        disabled={item.maxQty ? item.qty >= item.maxQty : false}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          (item.maxQty && item.qty >= item.maxQty) ? 'text-slate-300 bg-slate-50 cursor-not-allowed' :
                          activeType === 'social' ? 'text-slate-500 hover:bg-blue-100 hover:text-blue-600' : 'text-slate-500 hover:bg-indigo-100 hover:text-indigo-600'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className={`font-extrabold text-xl w-[140px] shrink-0 flex items-center justify-between ${activeType === 'social' ? 'text-blue-600' : 'text-indigo-600'}`}>
                  <span>Rp</span>
                  <span className="text-right">{subtotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            {/* --- MOBILE VIEW --- */}
            <div className="flex md:hidden flex-col p-4 gap-4">
              <div className="flex flex-col gap-1">
                <div className="font-bold text-slate-800 text-base">
                  {item.nama}
                </div>
                {item.id === 'iklan-setup' && (
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">Pilih dan tambahkan platform iklan kemudian sesuaikan jumlah setupnya.</p>
                )}
              </div>

              {((!item.isDefaultWajib && !item.isCalculated && item.id !== 'iklan-setup') || (['cs', 'db', 'riset', 'laporan'].includes(item.id) && akunList.length > 1)) && (
                <div className="flex flex-col bg-slate-50 border border-slate-100 rounded-xl p-3">
                  {(!item.isDefaultWajib && !item.isCalculated && item.id !== 'iklan-setup') ? (
                    <div className="text-slate-600 font-medium text-sm flex items-center justify-between w-full">
                      <span className="text-slate-500">Harga Satuan</span>
                      <div className="flex items-center">
                        <span className="mr-1">Rp {unitPrice.toLocaleString('id-ID')}</span>
                        <span className="text-xs text-slate-400 font-normal">{item.satuan}</span>
                      </div>
                    </div>
                  ) : (['cs', 'db', 'riset', 'laporan'].includes(item.id) && akunList.length > 1) && (
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-slate-600 font-medium text-sm flex items-center justify-between w-full">
                        <span className="text-slate-500">Harga Dasar</span>
                        <div className="flex items-center">
                          <span className="mr-1">Rp {item.harga.toLocaleString('id-ID')}</span>
                          <span className="text-xs text-slate-400 font-normal">{item.satuan}</span>
                        </div>
                      </div>
                      <div className="text-amber-600 text-xs font-bold flex items-center justify-between w-full border-t border-amber-100/50 pt-2 mt-0.5">
                        <span className="text-amber-700/70 font-medium">Extra Akun</span>
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md whitespace-nowrap">
                          + Charge Rp {(item.harga * 0.2 * (akunList.length - 1)).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {item.id === 'iklan-setup' && adsPlatforms.length < availablePlatforms.length && (
                <div className="flex flex-col gap-3 mt-1">
                  <CustomSelect
                    value={selectedPlatformInput}
                    onChange={(val) => setSelectedPlatformInput(val)}
                    options={availablePlatforms.filter(p => !adsPlatforms.some(ap => ap.name === p)).map(p => ({ value: p, label: p, icon: getPlatformIcon(p) }))}
                    placeholder="Pilih Platform..."
                    iconColor="text-indigo-500"
                    className="w-full"
                  />
                  <button 
                    onClick={() => {
                      if (!selectedPlatformInput) return;
                      setAdsPlatforms([...adsPlatforms, { name: selectedPlatformInput, qty: 1 }]);
                      setSelectedPlatformInput('');
                    }}
                    disabled={!selectedPlatformInput}
                    className={`w-full px-4 h-11 rounded-xl text-sm font-bold transition-colors ${selectedPlatformInput ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100'}`}
                  >
                    Tambah Platform
                  </button>
                </div>
              )}

              <div className="flex items-end justify-between w-full pt-1">
                <div className="flex flex-col gap-0.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Subtotal</div>
                  <div className={`font-extrabold text-lg flex items-center ${activeType === 'social' ? 'text-blue-600' : 'text-indigo-600'}`}>
                    <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                {!(item.isDefaultWajib || item.isCalculated || item.id === 'iklan-setup') && (
                  <div className="flex items-center justify-center space-x-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-[110px]">
                    <button 
                      onClick={() => handleUpdateQty(idx, -1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-red-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-extrabold w-6 text-center text-base">{item.qty}</span>
                    <button 
                      onClick={() => handleUpdateQty(idx, 1)}
                      disabled={item.maxQty ? item.qty >= item.maxQty : false}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        (item.maxQty && item.qty >= item.maxQty) ? 'text-slate-300 bg-slate-50 cursor-not-allowed' :
                        activeType === 'social' ? 'text-slate-500 hover:bg-blue-100 hover:text-blue-600' : 'text-slate-500 hover:bg-indigo-100 hover:text-indigo-600'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {item.id === 'iklan-setup' && adsPlatforms.length > 0 && (
              <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
                <div className={`grid grid-cols-1 gap-4 ${adsPlatforms.length === 1 ? '' : adsPlatforms.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                  {adsPlatforms.map((platform, pIdx) => (
                    <div key={platform.name} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-white shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="text-indigo-500 bg-indigo-50 p-1.5 rounded-lg">
                          {getPlatformIcon(platform.name, "w-4 h-4")}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{platform.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleUpdatePlatformQty(pIdx, -1)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${platform.qty > 1 ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-50 text-slate-300'}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-extrabold text-sm w-4 text-center">{platform.qty}</span>
                        <button 
                          onClick={() => handleUpdatePlatformQty(pIdx, 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <div className="w-px h-6 bg-slate-200 mx-1"></div>
                        <button 
                          onClick={() => {
                            const newPlatforms = [...adsPlatforms];
                            newPlatforms.splice(pIdx, 1);
                            setAdsPlatforms(newPlatforms);
                          }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const availableAkunOptions = [
    "Instagram",
    "Tiktok",
    "Facebook",
  ];

  return (
    <div className="w-full mt-12 mb-8 space-y-6">
      
      {/* Social Media Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 relative">
        <div className="bg-blue-600 p-6 md:p-8 text-white relative">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Build Paket Custom Anda (Sosial Media)</h3>
          <p className="text-blue-100 font-medium">Buat layanan manajemen sosial media yang spesifik sesuai kebutuhan.</p>
        </div>
        
        <div className="p-0 md:p-6 pb-0 md:pb-0">
          <div className="p-4 md:p-6 border-b border-slate-100 bg-white">
            <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-lg">Detail Akun Sosial Media</h4>
                <p className="text-sm text-slate-500">Masukkan akun sosial media yang akan dikelola. Jumlah akun akan menentukan kuantitas Manajemen Akun.</p>
              </div>
              {akunList.length < availableAkunOptions.length && (
                <button 
                  onClick={handleAddAkun}
                  className="inline-flex items-center px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Akun
                </button>
              )}
            </div>
            <div className={`grid grid-cols-1 gap-4 max-w-6xl ${akunList.length === 1 ? '' : 'lg:grid-cols-2'}`}>
              {akunList.map((akun, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <CustomSelect
                    value={akun.jenis}
                    onChange={(val) => handleUpdateAkun(idx, 'jenis', val)}
                    options={availableAkunOptions
                      .filter(opt => !akunList.some((a, i) => i !== idx && a.jenis === opt))
                      .map(opt => ({ value: opt, label: opt, icon: getAkunIcon(opt) }))}
                    placeholder="Pilih Jenis Akun"
                    className="sm:w-2/5"
                  />
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      placeholder="Username / Link Akun"
                      className="w-full px-4 h-10 md:h-[48px] border border-slate-200 rounded-xl bg-white text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-700"
                      value={akun.username}
                      onChange={(e) => handleUpdateAkun(idx, 'username', e.target.value)}
                    />
                    {akunList.length > 1 && (
                      <button 
                        onClick={() => handleRemoveAkun(idx)}
                        className="w-10 h-10 md:w-[48px] md:h-[48px] flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-0 md:p-6 pt-0 md:pt-0">
          {renderTable(socialItems, handleUpdateSocialQty, 'social')}
        </div>
        <div className="p-4 md:px-8 md:py-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mr-4">Total Sosial Media:</span>
            <span className="text-2xl font-extrabold text-blue-600">Rp {totalSocial.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      {(() => {
        let totalIklanPeriode = 0;
        let diffDays = 0;
        let daysLabel = "Budget Harian";

        const budgetNum = parseInt(adsBudget.toString().replace(/\D/g, '')) || 30000;
        const totalSetupsMul = Math.max(1, adsPlatforms.reduce((acc, curr) => acc + curr.qty, 0));

        if (adsMulai && adsSelesai) {
          const start = new Date(adsMulai);
          const end = new Date(adsSelesai);
          const diffTime = end.getTime() - start.getTime();
          diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays >= 0) {
            totalIklanPeriode = (diffDays + 1) * budgetNum * totalSetupsMul;
            daysLabel = `Selama ${diffDays + 1} Hari`;
          }
        }
        
        return (
          <>
            {/* Ads Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 relative">
              <div className="bg-indigo-600 p-6 md:p-8 text-white relative">
                <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Build Paket Custom Anda (Iklan)</h3>
                <p className="text-indigo-100 font-medium">Buat layanan manajemen iklan untuk mengoptimalkan jangkauan bisnis.</p>
              </div>

              <div className="p-0 md:p-6 pb-0 md:pb-0">
                <div className="p-4 md:p-6 border-b border-slate-100 bg-white">
                  <div className="mb-4">
                    <h4 className="font-bold text-slate-800 text-lg">Detail Kampanye Iklan</h4>
                    <p className="text-sm text-slate-500">Lengkapi detail platform, jadwal, dan budget iklan yang ingin dijalankan.</p>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                    <div className="flex-1 flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Mulai</label>
                        <CustomDateInput 
                          value={adsMulai}
                          onChange={(val) => setAdsMulai(val)}
                          placeholder="Pilih Tanggal Mulai"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Tanggal Selesai</label>
                        <CustomDateInput 
                          value={adsSelesai}
                          onChange={(val) => setAdsSelesai(val)}
                          placeholder="Pilih Tanggal Selesai"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-slate-700 mb-1">Rencana Budget Iklan (per hari)</label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 flex items-center h-10 md:h-[48px] border border-slate-200 rounded-xl bg-slate-50 px-4 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                          <span className="text-slate-500 font-medium text-sm mr-2 shrink-0">Rp</span>
                          <div className="flex-1 text-right font-bold text-slate-700 text-sm md:text-base">
                            {adsBudget || '30.000'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 h-10 md:h-[48px]">
                          <button
                            onClick={() => {
                              let curr = parseInt(adsBudget.toString().replace(/\D/g, '')) || 30000;
                              if (curr > 30000) {
                                setAdsBudget((curr - 5000).toLocaleString('id-ID'));
                              } else {
                                setAdsBudget('30.000');
                              }
                            }}
                            className="w-10 h-full md:w-[48px] flex shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors bg-white shadow-sm"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              let curr = parseInt(adsBudget.toString().replace(/\D/g, '')) || 30000;
                              setAdsBudget((curr + 5000).toLocaleString('id-ID'));
                            }}
                            className="w-10 h-full md:w-[48px] flex shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors bg-white shadow-sm"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-[140px] shrink-0 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center text-left lg:text-right lg:pb-1">
                      <div className="text-sm font-bold text-slate-500 mb-0 lg:mb-1 leading-tight">{daysLabel}</div>
                      <div className="text-base md:text-xl font-extrabold text-indigo-600 flex items-center justify-between w-full">
                        <span>Rp</span>
                        <span className="text-right">{totalIklanPeriode.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        <div className="p-0 md:p-6 pt-0 md:pt-0">
          {renderTable(adsItems, handleUpdateAdsQty, 'ads')}
        </div>
        <div className="p-4 md:px-8 md:py-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mr-4">Total Iklan:</span>
            <span className="text-2xl font-extrabold text-indigo-600">Rp {totalAds.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex flex-col md:items-end gap-2 text-sm">
             <div className="text-slate-500 font-medium">
                * Budget Iklan harian itu Mulai dari 30.000 (tidak termasuk biaya layanan ini)
             </div>
          </div>
        </div>
      </div>

      {/* Combined Checkout Footer */}
      <div className="bg-slate-900 rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-800 sticky bottom-4 md:bottom-8 z-40 transform transition-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Grand Total (Sosial Media & Iklan)</div>
            <div className={`text-4xl md:text-5xl font-extrabold ${isValid ? 'text-white' : 'text-slate-500'}`}>
              Rp {grandTotal.toLocaleString('id-ID')}
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={!isValid}
            className={`w-full md:w-auto px-8 py-5 rounded-2xl font-bold flex items-center justify-center shadow-lg transition-all text-sm md:text-lg ${
              isValid ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 hover:-translate-y-1' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-6 h-6 flex-shrink-0 mr-3" />
            Checkout Semua Layanan
          </button>
        </div>
      </div>
      
      </>
        );
      })()}
    </div>
  );
};
