import React from 'react';
import { Calendar, Clock, Info, Plus, Trash2, ArrowRight, Settings, AlertCircle } from 'lucide-react';

interface CheckoutStep1Props {
  quantity: number;
  setQuantity: (q: number) => void;
  minQuantity: number;
  unitPrice: number;
  unitName: string;
  packageName: string;
  isLivePackage: boolean;
  isKontenInstanPackage: boolean;
  estimasiSelesai: string;
  setEstimasiSelesai: (date: string) => void;
  liveAccounts: { jenis: string; username: string }[];
  setLiveAccounts: (accs: { jenis: string; username: string }[]) => void;
  liveSchedules: { tanggal: string; waktuMulai: string; waktuSelesai: string }[];
  setLiveSchedules: (scheds: { tanggal: string; waktuMulai: string; waktuSelesai: string }[]) => void;
  customNotes: string;
  setCustomNotes: (notes: string) => void;
  onNext: () => void;
  isValid: boolean;
}

const TimeInput = ({ 
  value, 
  onChange, 
  isInvalid,
  allowedHours
}: { 
  value: string; 
  onChange: (val: string) => void; 
  idPrefix: string; 
  isInvalid: boolean; 
  allowedHours?: string[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultH = allowedHours?.length ? allowedHours[0] : '08';
  const [h, m] = value ? value.split(':') : [defaultH, '00'];

  // Scroll to selected element when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const hEl = document.getElementById(`hour-${h}`);
        const mEl = document.getElementById(`minute-${m}`);
        if (hEl) hEl.scrollIntoView({ block: 'center' });
        if (mEl) mEl.scrollIntoView({ block: 'center' });
      }, 10);
    }
  }, [isOpen, h, m]);

  const hoursList = allowedHours || Array.from({length: 24}).map((_, i) => i.toString().padStart(2, '0'));

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className={`flex justify-between items-center w-full px-4 py-3.5 rounded-xl border bg-white cursor-pointer transition-colors ${isInvalid ? 'border-red-500 text-red-500' : 'border-slate-200 focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-400'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'font-medium text-slate-800 tracking-wider' : 'text-slate-400 font-medium'}>
          {value ? value : 'HH : MM'}
        </span>
        <Clock className={`w-5 h-5 ${isInvalid ? 'text-red-400' : 'text-slate-400'}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl flex w-full overflow-hidden h-64 top-full left-0 opacity-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex-1 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] border-r border-slate-100 relative">
            <div className="sticky top-0 bg-slate-50 border-b border-slate-100 py-2.5 text-center text-xs font-bold text-slate-500 z-10 shadow-sm">JAM</div>
            <div className="py-2">
              {hoursList.map((hour) => {
                const isSelected = h === hour;
                return (
                  <div 
                    id={`hour-${hour}`}
                    key={`h-${hour}`}
                    className={`py-2.5 mx-2 my-1 rounded-lg text-center cursor-pointer transition-colors ${isSelected ? 'bg-blue-600 text-white font-bold shadow-md' : 'hover:bg-slate-100 text-slate-700'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(`${hour}:${m}`);
                    }}
                  >
                    {hour}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
            <div className="sticky top-0 bg-slate-50 border-b border-slate-100 py-2.5 text-center text-xs font-bold text-slate-500 z-10 shadow-sm">MENIT</div>
            <div className="py-2">
              {Array.from({length: 60}).map((_, i) => {
                const minute = i.toString().padStart(2, '0');
                const isSelected = m === minute;
                return (
                  <div 
                    id={`minute-${minute}`}
                    key={`m-${minute}`}
                    className={`py-2.5 mx-2 my-1 rounded-lg text-center cursor-pointer transition-colors ${isSelected ? 'bg-blue-600 text-white font-bold shadow-md' : 'hover:bg-slate-100 text-slate-700'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(`${h}:${minute}`);
                    }}
                  >
                    {minute}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CheckoutStep1: React.FC<CheckoutStep1Props> = ({
  quantity,
  setQuantity,
  minQuantity,
  unitPrice,
  unitName,
  packageName,
  isLivePackage,
  isKontenInstanPackage,
  estimasiSelesai,
  setEstimasiSelesai,
  liveAccounts,
  setLiveAccounts,
  liveSchedules,
  setLiveSchedules,
  customNotes,
  setCustomNotes,
  onNext,
  isValid
}) => {
  const minEstimasiSelesai = new Date();
  minEstimasiSelesai.setDate(minEstimasiSelesai.getDate() + 5);
  const minDateString = minEstimasiSelesai.toISOString().split('T')[0];

  let isCrossMidnight = false;
  
  const maxSessions = Math.floor(quantity / 2) || 1;
  const currentSchedulesCount = Math.max(1, Math.min(liveSchedules.length, maxSessions));
  const totalMinutes = (quantity * 60) / currentSchedulesCount;
  const sessionDurationMins = totalMinutes;

  let baseMinTimeMins = 0;
  let baseMaxTimeMins = 24 * 60;

  const pkgLC = packageName?.toLowerCase() || '';
  if (pkgLC.includes('awarness') || pkgLC.includes('having fun') || pkgLC.includes('siang')) {
    baseMinTimeMins = 8 * 60; // 08:00
    baseMaxTimeMins = 15 * 60; // 15:00
  } else if (pkgLC.includes('business') || pkgLC.includes('malam')) {
    baseMinTimeMins = 15 * 60 + 30; // 15:30
    baseMaxTimeMins = 21 * 60 + 30; // 21:30
  } else if (pkgLC.includes('always') || pkgLC.includes('larut') || pkgLC.includes('subuh')) {
    baseMinTimeMins = 22 * 60; // 22:00
    baseMaxTimeMins = 6 * 60 + 30 + (24 * 60); // 06:30 next day
    isCrossMidnight = true;
  }

  const actualMaxStartTimeMins = baseMaxTimeMins - sessionDurationMins;

  const formatTimeMins = (mins: number) => {
    const h = Math.floor(mins / 60) % 24;
    const m = Math.floor(mins % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  let allowedHours: string[] = [];
  if (actualMaxStartTimeMins >= baseMinTimeMins) {
    for (let i = baseMinTimeMins; i <= actualMaxStartTimeMins; i += 60) {
      const hourStr = Math.floor((i % (24 * 60)) / 60).toString().padStart(2, '0');
      if (!allowedHours.includes(hourStr)) allowedHours.push(hourStr);
    }
    // Also include the hour for actualMaxStartTimeMins if it has minutes (e.g. 19:30 -> 19 is already added)
    const maxHourStr = Math.floor((actualMaxStartTimeMins % (24 * 60)) / 60).toString().padStart(2, '0');
    if (!allowedHours.includes(maxHourStr)) allowedHours.push(maxHourStr);
  }

  const minTimeStr = formatTimeMins(baseMinTimeMins);
  const maxTimeStr = formatTimeMins(actualMaxStartTimeMins);
  const maxEndTimeStr = formatTimeMins(baseMaxTimeMins);

  let timeHint = '';
  if (baseMaxTimeMins !== 24 * 60) {
    if (actualMaxStartTimeMins < baseMinTimeMins) {
      timeHint = 'Durasi per sesi terlalu panjang untuk paket ini. Silakan tambah jumlah sesi/hari.';
    } else {
      timeHint = `Pilih waktu mulai antara ${minTimeStr} hingga ${maxTimeStr} (maks. selesai ${maxEndTimeStr})`;
    }
  }

  React.useEffect(() => {
    if (!pkgLC.includes('live') || liveSchedules.length === 0) return;

    let hasChanges = false;
    const maxSessions = Math.floor(quantity / 2) || 1;
    let currentSchedules = [...liveSchedules];

    if (currentSchedules.length > maxSessions) {
      currentSchedules = currentSchedules.slice(0, maxSessions);
      hasChanges = true;
    }

    const totalMinutes = (quantity * 60) / currentSchedules.length;
    const hoursPerSession = Math.floor(totalMinutes / 60);
    const minutesPerSession = Math.round(totalMinutes % 60);
    
    const newSchedules = currentSchedules.map(sch => {
      if (sch.waktuMulai && sch.waktuMulai.length === 5) {
        const [hStr, mStr] = sch.waktuMulai.split(':');
        let newH = parseInt(hStr) + hoursPerSession;
        let newM = parseInt(mStr) + minutesPerSession;
        
        if (newM >= 60) {
            newH += Math.floor(newM / 60);
            newM = newM % 60;
        }
        if (newH > 23) newH = newH % 24;
        
        const newWaktuSelesai = `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
        if (sch.waktuSelesai !== newWaktuSelesai) {
          hasChanges = true;
          return { ...sch, waktuSelesai: newWaktuSelesai };
        }
      }
      return sch;
    });

    if (hasChanges) {
      setLiveSchedules(newSchedules);
    }
  }, [quantity, liveSchedules.length, liveSchedules.map(s => s.waktuMulai).join(','), pkgLC, setLiveSchedules]);

  const isTimeValid = (time: string) => {
    if (!time) return true;
    if (actualMaxStartTimeMins < baseMinTimeMins) return false;
    
    const [hours, minutes] = time.split(':').map(Number);
    let timeInMins = hours * 60 + minutes;
    
    if (isCrossMidnight && timeInMins < 12 * 60) {
       timeInMins += 24 * 60;
    }

    return timeInMins >= baseMinTimeMins && timeInMins <= actualMaxStartTimeMins;
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold flex items-center mb-6 text-slate-900 border-b border-slate-200 pb-4">
          <Settings className="w-7 h-7 mr-3 text-blue-600" /> Pengaturan Pesanan
        </h2>
        
        <label className="block text-sm font-bold text-slate-700 mb-3">Atur Jumlah ({unitName})</label>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden flex-shrink-0">
              <button 
                onClick={() => setQuantity(Math.max(minQuantity, quantity - (minQuantity >= 12 ? minQuantity : 1)))}
                disabled={quantity <= minQuantity}
                className="px-5 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-r border-slate-200 text-lg"
              >
                -
              </button>
              <div className="px-6 py-3.5 font-bold text-slate-800 min-w-[4rem] text-center text-lg">
                {quantity}
              </div>
              <button 
                onClick={() => setQuantity(quantity + (minQuantity >= 12 ? minQuantity : 1))}
                className="px-5 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors border-l border-slate-200 text-lg"
              >
                +
              </button>
            </div>
            <span className="text-slate-500 font-medium text-sm">
              Minimal pemesanan: <span className="font-bold text-slate-700">{minQuantity} {unitName}</span> {minQuantity >= 12 && '(Beli dalam kelipatan tahun)'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-500 block mb-1">Harga Satuan</span>
            <span className="font-bold text-slate-800">Rp {unitPrice.toLocaleString('id-ID')}</span> <span className="text-sm text-slate-500">/ {unitName}</span>
          </div>
        </div>
      </div>

      {isLivePackage ? (
        <>
          <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4">
            <Calendar className="w-7 h-7 mr-3 text-blue-600" /> Jadwal Live Streaming
          </h2>
          
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8 mt-[-1rem]">
            <p className="text-amber-800 text-sm font-medium">
              <Info className="w-4 h-4 inline mr-1 -mt-0.5" />
                Berdasarkan ketentuan, setiap sesi live minimal 2 jam. Total jam yang Anda beli akan dibagi rata ke semua sesi yang Anda buat.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {liveSchedules.map((schedule, index) => (
              <div key={index} className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 flex items-center"><Clock className="w-4 h-4 mr-2 text-slate-500" /> Sesi #{index + 1}</h3>
                  {index > 0 && (
                    <button 
                      onClick={() => setLiveSchedules(liveSchedules.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-600 p-1 bg-red-50 rounded-lg transition-colors"
                      title="Hapus Sesi"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Pelaksanaan*</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors" 
                      value={schedule.tanggal} 
                      onChange={e => {
                        const newSchedules = [...liveSchedules];
                        newSchedules[index].tanggal = e.target.value;
                        setLiveSchedules(newSchedules);
                      }} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Waktu Mulai*</label>
                    <TimeInput
                      value={schedule.waktuMulai}
                      onChange={(val) => {
                        const newSchedules = [...liveSchedules];
                        newSchedules[index].waktuMulai = val;
                        setLiveSchedules(newSchedules);
                      }}
                      idPrefix={`waktuMulai-${index}`}
                      isInvalid={schedule.waktuMulai ? !isTimeValid(schedule.waktuMulai) : false}
                      allowedHours={allowedHours}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Waktu Selesai (Otomatis)</label>
                    <div className={`w-full px-4 py-3.5 rounded-xl border ${schedule.waktuMulai && !isTimeValid(schedule.waktuMulai) ? 'border-red-500 text-red-500 bg-red-50' : 'border-slate-200 bg-slate-50 text-slate-500'} font-medium cursor-not-allowed flex justify-between items-center`}>
                      <span>{schedule.waktuSelesai || 'HH : MM'}</span>
                      <Clock className={`w-5 h-5 ${schedule.waktuMulai && !isTimeValid(schedule.waktuMulai) ? 'text-red-400' : 'text-slate-400'}`} />
                    </div>
                  </div>
                </div>
                {((schedule.waktuMulai && !isTimeValid(schedule.waktuMulai))) ? (
                  <p className="text-xs text-red-500 mt-2 font-medium"><AlertCircle className="w-3 h-3 inline mr-1" /> {timeHint}</p>
                ) : timeHint && baseMaxTimeMins !== 24 * 60 ? (
                  <p className="text-xs text-slate-500 mt-2"><Info className="w-3 h-3 inline mr-1" /> {timeHint}</p>
                ) : null}
              </div>
            ))}
            
            {liveSchedules.length < Math.floor(quantity / 2) && (
              <button 
                onClick={() => setLiveSchedules([...liveSchedules, { tanggal: '', waktuMulai: '', waktuSelesai: '' }])}
                className="w-full py-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-2xl font-bold flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" /> Tambah Sesi / Hari
              </button>
            )}
          </div>

          <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4">
            <Settings className="w-7 h-7 mr-3 text-blue-600" /> Informasi Akun Live
          </h2>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 mt-[-1rem]">
            <p className="text-blue-800 text-sm font-medium mb-2">
              <Info className="w-4 h-4 inline mr-1 -mt-0.5" />
              Setiap penambahan akun live (akun ke-2 dan seterusnya) mendapatkan diskon spesial 25%.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {liveAccounts.map((acc, index) => (
              <div key={index} className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Akun #{index + 1}</h3>
                  {index > 0 && (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Diskon 25%</span>
                      <button 
                        onClick={() => setLiveAccounts(liveAccounts.filter((_, i) => i !== index))}
                        className="text-red-500 hover:text-red-600 p-1 bg-red-50 rounded-lg transition-colors"
                        title="Hapus Akun"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Platform / Jenis*</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors" 
                      value={acc.jenis} 
                      onChange={e => {
                        const newAccounts = [...liveAccounts];
                        newAccounts[index].jenis = e.target.value;
                        setLiveAccounts(newAccounts);
                      }} 
                      placeholder="Cth: TikTok, Shopee" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Username*</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors" 
                      value={acc.username} 
                      onChange={e => {
                        const newAccounts = [...liveAccounts];
                        newAccounts[index].username = e.target.value;
                        setLiveAccounts(newAccounts);
                      }} 
                      placeholder="@username" 
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => setLiveAccounts([...liveAccounts, { jenis: '', username: '' }])}
              className="w-full py-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-2xl font-bold flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" /> Tambah Akun Lainnya
            </button>
          </div>
        </>
      ) : isKontenInstanPackage ? (
        <>
          <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4 mt-8">
            <Calendar className="w-7 h-7 mr-3 text-blue-600" /> Jadwalkan Estimasi Selesai
          </h2>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 mt-[-1rem]">
            <p className="text-blue-800 text-sm font-medium">
              <Info className="w-4 h-4 inline mr-1 -mt-0.5" />
              Pilih tanggal target produksi konten. Ingat bahwa terdapat proses 24 jam untuk script dan 3 hari produksi setelah persetujuan script.
            </p>
          </div>

          <div className="mb-12">
            <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Estimasi Selesai*</label>
            <input 
              type="date" 
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors shadow-sm" 
              value={estimasiSelesai} 
              min={minDateString}
              onChange={e => setEstimasiSelesai(e.target.value)} 
            />
          </div>
          
          <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4 mt-8">
            <Settings className="w-7 h-7 mr-3 text-blue-600" /> Customisasi Layanan
          </h2>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 mt-[-1rem]">
            <p className="text-blue-800 text-sm font-medium">
              <Info className="w-4 h-4 inline mr-1 -mt-0.5" />
              Ceritakan secara singkat bagaimana Anda ingin kami mengkustomisasi layanan ini (misal: referensi akun, gaya video, atau produk).
            </p>
          </div>

          <div className="mb-12">
            <label className="block text-sm font-bold text-slate-700 mb-2">Brief / Customisasi (Opsional)</label>
            <textarea 
              rows={6} 
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors shadow-sm custom-scrollbar" 
              value={customNotes} 
              onChange={e => setCustomNotes(e.target.value)} 
              placeholder="Tuliskan brief tambahan, referensi akun atau link video referensi..."
            ></textarea>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4 mt-8">
            <Settings className="w-7 h-7 mr-3 text-blue-600" /> Customisasi Layanan
          </h2>
          
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 mt-[-1rem]">
            <p className="text-blue-800 text-sm font-medium">
              <Info className="w-4 h-4 inline mr-1 -mt-0.5" />
              Ceritakan secara singkat bagaimana Anda ingin kami mengkustomisasi layanan ini (misal: warna referensi, gaya desain, atau target audiens).
            </p>
          </div>

          <div className="mb-12">
            <label className="block text-sm font-bold text-slate-700 mb-2">Brief / Customisasi (Opsional)</label>
            <textarea 
              rows={6} 
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors shadow-sm custom-scrollbar" 
              value={customNotes} 
              onChange={e => setCustomNotes(e.target.value)} 
              placeholder="Tuliskan brief tambahan, referensi akun atau link website kompetitor..."
            ></textarea>
          </div>
        </>
      )}

      <button 
        onClick={onNext} 
        disabled={!isValid}
        className={`w-full py-5 rounded-2xl font-bold flex justify-center items-center transition-all text-lg ${!isValid ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
      >
        Selanjutnya: Data Diri <ArrowRight className="w-6 h-6 ml-2" />
      </button>
    </div>
  );
};
