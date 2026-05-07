import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { ViewState } from '../../types';
import { CheckCircle2, Check, FileText, Info, ShieldCheck, ChevronDown, X } from 'lucide-react';
import { CheckoutStep1 } from './CheckoutStep1';
import { CheckoutStep2 } from './CheckoutStep2';
import { CheckoutStep3 } from './CheckoutStep3';

interface CheckoutProps {
  onNavigate: (view: ViewState) => void;
  data?: any; // Contains { packageName, opsiName, price, minimumTransaksi, originalPackage: any }
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate, data }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    perusahaan: ''
  });
  const [customNotes, setCustomNotes] = useState('');
  const [bankTarget, setBankTarget] = useState('Seabank');
  const [isPaid, setIsPaid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSummarySheetOpen, setIsSummarySheetOpen] = useState(false);

  // Live Accounts State
  const [liveAccounts, setLiveAccounts] = useState([{ jenis: '', username: '' }]);
  const [liveSchedules, setLiveSchedules] = useState([{ tanggal: '', waktuMulai: '', waktuSelesai: '' }]);
  const [quantity, setQuantity] = useState(data ? data.minimumTransaksi || 1 : 1);

  const [estimasiSelesai, setEstimasiSelesai] = useState('');

  const bankAccounts = [
    { bank: 'Seabank', number: '901387277710', name: 'Mela melati aprilia' },
    { bank: 'BTN', number: '360-161-001-9430', name: 'Alvareza hilka pratama' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  useEffect(() => {
    if (data) {
      setQuantity(data.minimumTransaksi || 1);
    }
  }, [data]);

  // Request Notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (isSummarySheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSummarySheetOpen]);

  const singlePrice = data ? data.price * quantity : 0;
  const singleNormalPrice = data ? (data.opsiData?.hargaNormal || data.price * 1.15) * quantity : 0;
  
  const unitName = data?.opsiData?.proyek || 'Satuan';
  
  // ... rest of calculations
  const isLivePackage = data && data.opsiData?.proyek === 'Jam';
  const isKontenInstanPackage = data && data.opsiData?.proyek === 'Video';

  const subTotalPromo = isLivePackage
    ? liveAccounts.reduce((acc, _, i) => acc + (i === 0 ? singlePrice : singlePrice * 0.75), 0)
    : singlePrice;

  const subTotalNormal = isLivePackage
    ? liveAccounts.reduce((acc, _, i) => acc + (i === 0 ? singleNormalPrice : singleNormalPrice * 0.75), 0)
    : singleNormalPrice;
    
  const totalSavings = subTotalNormal - subTotalPromo;
  const ppn = subTotalPromo * 0.11;
  const finalPrice = subTotalPromo + ppn;

  const handleConfirmAction = async () => {
    setIsSubmitting(true);
    try {
      const templateParams = {
        subject: `Pesanan Baru AlinLabs - ${data.packageName} - ${formData.nama}`,
        to_email: 'office.alincorporation@gmail.com', // To AlinLabs
        to_name: 'AlinLabs Admin',
        whatsapp: formData.telepon,
        org_name: formData.perusahaan || '-',
        role: formData.email, // Use role field for customer email
        message: `Total Tagihan: Rp ${finalPrice.toLocaleString('id-ID')}\nBank Tujuan: ${bankTarget}\nCatatan: ${customNotes || '-'}`,
        services: `${data.packageName} (${data.opsiName})`,
        head_message: 'Telah masuk <b>pesanan baru</b> ke sistem AlinLabs. <br>Silakan tinjau rincian pesanan berikut dan segera hubungi pelanggan atau proses tagihan untuk kelanjutan project.'
      };
      
      await emailjs.send(
        "automail-service",
        "alinlabs-automail",
        templateParams,
        "7pNkN7ceW9P8uHIHU"
      );

      // Trigger Notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("AlinLabs Indonesia", {
          body: "Pesanan Anda sedang kami proses. Terima kasih!",
          icon: "/gambar/logo-icon-color.png"
        });
      }

      setIsPaid(true);
    } catch (error) {
      console.error("Gagal mengirim notifikasi pesanan:", error);
      // Even if email fails, let user go through or alert them
      setIsPaid(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-xl mx-auto">
          <p className="text-slate-500 mb-6">Belum ada paket yang dipilih.</p>
          <button onClick={() => onNavigate(ViewState.HOME)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">Pilih Layanan</button>
        </div>
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Pembayaran Berhasil!</h2>
          <p className="text-slate-600 mb-8 text-lg">Terima kasih. Struk dan detail project telah dikirim ke email Anda. Tim kami akan segera menghubungi Anda untuk langkah selanjutnya.</p>
          <button 
            onClick={() => onNavigate(ViewState.HOME)} 
            className="bg-slate-100 text-slate-700 py-4 px-8 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    );
  }

  const isTimeValid = (time: string, pkgType: string) => {
    if (!time) return false;
    const [hours, minutes] = time.split(':').map(Number);
    const timeInMins = hours * 60 + minutes;
    const pkgLC = pkgType.toLowerCase();
    
    if (pkgLC.includes('awarness') || pkgLC.includes('having fun') || pkgLC.includes('siang')) {
       return timeInMins >= 8 * 60 && timeInMins <= 15 * 60;
    } else if (pkgLC.includes('business') || pkgLC.includes('malam')) {
       return timeInMins >= 15 * 60 + 30 && timeInMins <= 21 * 60 + 30;
    } else if (pkgLC.includes('always') || pkgLC.includes('larut') || pkgLC.includes('subuh')) {
       return timeInMins >= 22 * 60 || timeInMins <= 6 * 60 + 30;
    }
    return true;
  };

  const isStep1Valid = isLivePackage 
    ? !liveAccounts.some(acc => !acc.jenis || !acc.username) && !liveSchedules.some(s => {
        const pkgName = data?.opsiName || data?.packageName || '';
        return !s.tanggal || !s.waktuMulai || !s.waktuSelesai || !isTimeValid(s.waktuMulai, pkgName) || !isTimeValid(s.waktuSelesai, pkgName);
      })
    : isKontenInstanPackage ? !!estimasiSelesai : true;

  const isStep2Valid = !!formData.nama && !!formData.email && !!formData.telepon;

  const OrderSummaryContent = () => (
    <>
      <div className="relative z-10 w-full text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">Detail Pesanan.</h1>

        <div className="mb-4">
          <h2 className="text-xl font-bold flex items-center mb-6 border-b border-blue-500/50 pb-4 text-blue-50">
            <FileText className="w-6 h-6 mr-3 text-blue-200" /> Ringkasan Pilihan
          </h2>

          <div className="mb-8 p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm shadow-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-2 block">Layanan Utama</span>
            <h3 className="text-2xl font-bold mb-1">{data.packageName}</h3>
            <p className="text-blue-100 font-medium text-lg">{data.opsiName}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="inline-block px-4 py-2 bg-blue-500/30 rounded-full text-sm font-bold text-blue-50 border border-blue-400/30">
                Jumlah: {quantity} {unitName}
              </div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-blue-200 mb-4 uppercase tracking-wider">Detail Layanan Termasuk</h3>
          <div className="space-y-6 mb-8 pr-2">
            {data.opsiData?.layanan && (
              <div>
                <h4 className="font-bold text-sm md:text-base text-blue-50 mb-3 flex items-center"><CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-300" /> Fitur Utama</h4>
                <ul className="space-y-2">
                  {data.opsiData.layanan.map((f: string, i: number) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-blue-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.opsiData?.ketentuan && (
              <div className="pt-4 border-t border-blue-500/30">
                <h4 className="font-bold text-sm md:text-base text-blue-50 mb-3 flex items-center"><Info className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-300" /> Ketentuan</h4>
                <ul className="space-y-2">
                  {data.opsiData.ketentuan.map((k: string, i: number) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-blue-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-300 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="leading-snug">{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.opsiData?.jaminan && (
              <div className="pt-4 border-t border-blue-500/30">
                <h4 className="font-bold text-sm md:text-base text-blue-50 mb-3 flex items-center"><ShieldCheck className="w-4 h-4 md:w-5 md:h-5 mr-2 text-emerald-300" /> Jaminan & Garansi</h4>
                <ul className="space-y-2">
                  {data.opsiData.jaminan.map((j: string, i: number) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-blue-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="leading-snug">{j}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-blue-500/50">
            {isLivePackage && liveAccounts.length > 0 && (
              <div className="space-y-2 mb-2 pb-4 border-b border-blue-500/30">
                {liveAccounts.map((_, idx) => (
                  <div key={idx} className="flex justify-between items-center text-blue-100 text-sm">
                    <span>Akun #{idx + 1} {idx > 0 && '(Diskon 25%)'}</span>
                    <span>Rp {(idx === 0 ? singlePrice : singlePrice * 0.75).toLocaleString('id-ID')}</span>
                  </div>
                ))}
            </div>
            )}
            <div className="flex justify-between items-end border-b border-blue-500/30 pb-4">
              <div>
                <span className="text-blue-100 font-medium text-sm block mb-1">Harga Normal</span>
                <span className="text-blue-300 font-medium line-through">Rp {subTotalNormal.toLocaleString('id-ID')}</span>
              </div>
              <div className="text-right">
                <span className="text-blue-100 font-medium text-sm block mb-1">Potongan Harga</span>
                <span className="text-emerald-300 font-bold">- Rp {totalSavings.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="flex justify-between items-center border-b border-blue-500/30 pb-4">
              <span className="text-blue-100 font-medium text-sm">Subtotal (Setelah Promo)</span>
              <span className="text-white font-medium text-lg">Rp {subTotalPromo.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center border-b border-blue-500/30 pb-4">
              <span className="text-blue-100 font-medium text-sm">PPN (11%)</span>
              <span className="text-white font-medium text-lg">Rp {ppn.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-blue-100 font-medium text-lg">Total Estimasi</span>
              <span className="text-3xl lg:text-4xl font-extrabold text-white">Rp {finalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Background Blob */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-28 lg:pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Bar */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
              style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
            ></div>
            
            <div className={`relative z-10 flex flex-col items-center gap-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${currentStep >= 1 ? 'bg-white border-blue-600 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:block text-center">Customisasi<br/>Layanan</span>
            </div>
            
            <div className={`relative z-10 flex flex-col items-center gap-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${currentStep >= 2 ? 'bg-white border-blue-600 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:block text-center">Data<br/>Identitas</span>
            </div>
            
            <div className={`relative z-10 flex flex-col items-center gap-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${currentStep >= 3 ? 'bg-white border-blue-600 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                3
              </div>
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:block text-center">Detail<br/>Pembayaran</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-12 lg:pb-0">
          
          {/* Kiri: Detail Pesanan (Blue Card) - Hidden on Mobile */}
          <div className="hidden lg:block w-full lg:w-5/12 bg-blue-600 text-white rounded-[2rem] p-8 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden h-fit lg:sticky lg:top-28">
            <OrderSummaryContent />
          </div>

          {/* Kanan: Form & Pembayaran (White Area) */}
          <div className="w-full lg:w-7/12 text-slate-900 rounded-[2rem] bg-white p-6 sm:p-8 md:p-10 shadow-lg border border-slate-100">
            {currentStep === 1 && (
              <CheckoutStep1 
                quantity={quantity}
                setQuantity={setQuantity}
                minQuantity={data.minimumTransaksi || 1}
                unitPrice={data.price}
                unitName={unitName}
                packageName={data.opsiName || data.packageName || ''}
                isLivePackage={isLivePackage}
                isKontenInstanPackage={isKontenInstanPackage}
                estimasiSelesai={estimasiSelesai}
                setEstimasiSelesai={setEstimasiSelesai}
                liveAccounts={liveAccounts}
                setLiveAccounts={setLiveAccounts}
                liveSchedules={liveSchedules}
                setLiveSchedules={setLiveSchedules}
                customNotes={customNotes}
                setCustomNotes={setCustomNotes}
                onNext={() => setCurrentStep(2)}
                isValid={isStep1Valid}
              />
            )}

            {currentStep === 2 && (
              <CheckoutStep2 
                formData={formData}
                setFormData={setFormData}
                bankTarget={bankTarget}
                setBankTarget={setBankTarget}
                bankAccounts={bankAccounts}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
                isValid={isStep2Valid}
              />
            )}

            {currentStep === 3 && (
              <CheckoutStep3 
                basePrice={finalPrice}
                data={data}
                bankTarget={bankTarget}
                bankAccounts={bankAccounts}
                onConfirm={handleConfirmAction}
                onBack={() => setCurrentStep(2)}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] py-4 px-6 z-40 flex justify-between items-center rounded-t-2xl">
        <div>
          <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Total Tagihan</p>
          <p className="text-lg font-extrabold text-blue-600">Rp {finalPrice.toLocaleString('id-ID')}</p>
        </div>
        <button 
          onClick={() => setIsSummarySheetOpen(true)}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
        >
          <FileText className="w-4 h-4" /> Ringkasan
        </button>
      </div>

      {/* Mobile Bottom Sheet for Order Summary */}
      <AnimatePresence>
      {isSummarySheetOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsSummarySheetOpen(false)}
          />
          
          {/* Sheet Content */}
          <motion.div 
            initial={{ y: '100%', opacity: 0.5, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }}
            className="absolute bottom-0 left-0 w-full bg-blue-600 text-white rounded-t-[2rem] p-6 pb-12 sm:p-8 max-h-[85vh] overflow-y-auto"
          >
            {/* Close Handle / Button */}
            <div className="sticky top-0 right-0 w-full flex justify-end z-20 mb-2">
              <button 
                onClick={() => setIsSummarySheetOpen(false)}
                className="p-2 bg-white/20 rounded-full text-blue-50 hover:text-white hover:bg-white/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <OrderSummaryContent />
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
};

