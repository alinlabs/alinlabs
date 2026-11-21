import React from 'react';
import { User, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';

interface CheckoutStep2Props {
  formData: {
    nama: string;
    email: string;
    telepon: string;
    perusahaan: string;
  };
  setFormData: (data: any) => void;
  bankTarget: string;
  setBankTarget: (bank: string) => void;
  bankAccounts: { bank: string; number: string; name: string }[];
  onNext: () => void;
  onBack: () => void;
  isValid: boolean;
}

export const CheckoutStep2: React.FC<CheckoutStep2Props> = ({
  formData,
  setFormData,
  bankTarget,
  setBankTarget,
  bankAccounts,
  onNext,
  onBack,
  isValid
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4">
        <User className="w-7 h-7 mr-3 text-blue-600" /> Informasi Pembeli
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap*</label>
          <input 
            type="text" 
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors shadow-sm" 
            value={formData.nama} 
            onChange={e => setFormData({...formData, nama: e.target.value})} 
            placeholder="Cth: Budi Santoso" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email*</label>
          <input 
            type="email" 
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors shadow-sm" 
            value={formData.email} 
            onChange={e => setFormData({...formData, email: e.target.value})} 
            placeholder="budi@email.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">No. WhatsApp*</label>
          <input 
            type="tel" 
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors shadow-sm" 
            value={formData.telepon} 
            onChange={e => setFormData({...formData, telepon: e.target.value})} 
            placeholder="08123456789" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Perusahaan/Instansi (Opsional)</label>
          <input 
            type="text" 
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors shadow-sm" 
            value={formData.perusahaan} 
            onChange={e => setFormData({...formData, perusahaan: e.target.value})} 
            placeholder="PT Maju Jaya" 
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4">
        <CreditCard className="w-7 h-7 mr-3 text-blue-600" /> Pilih Metode Rekening
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {bankAccounts.map((account) => (
          <div 
            key={account.bank}
            onClick={() => setBankTarget(account.bank)}
            className={`border-2 rounded-2xl p-6 relative cursor-pointer transition-all ${
              bankTarget === account.bank 
                ? 'border-blue-600 bg-blue-50/50 text-slate-900 shadow-md' 
                : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-800'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 absolute top-6 right-6 flex items-center justify-center ${bankTarget === account.bank ? 'border-blue-600' : 'border-slate-300'}`}>
              <div className={`w-2.5 h-2.5 rounded-full bg-blue-600 transition-transform ${bankTarget === account.bank ? 'scale-100' : 'scale-0'}`}></div>
            </div>
            <div className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
              Transfer {account.bank}
            </div>
            <div className="font-bold text-slate-800">
              {account.name}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-4">
        <button 
          onClick={onBack} 
          className="w-full md:w-1/3 py-5 rounded-2xl font-bold flex justify-center items-center text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2" /> Kembali
        </button>
        <button 
          onClick={onNext} 
          disabled={!isValid}
          className={`w-full md:w-2/3 py-5 rounded-2xl font-bold flex justify-center items-center transition-all text-lg ${!isValid ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
        >
          Selanjutnya: Pembayaran <ArrowRight className="w-6 h-6 ml-2" />
        </button>
      </div>
    </div>
  );
};
