import React, { useState } from 'react';
import { CreditCard, Check, Copy, ArrowRight, ArrowLeft } from 'lucide-react';

interface CheckoutStep3Props {
  basePrice: number;
  data: any;
  bankTarget: string;
  bankAccounts: { bank: string; number: string; name: string }[];
  onConfirm: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const CheckoutStep3: React.FC<CheckoutStep3Props> = ({
  basePrice,
  data,
  bankTarget,
  bankAccounts,
  onConfirm,
  onBack,
  isSubmitting = false
}) => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const account = bankAccounts.find(b => b.bank === bankTarget) || bankAccounts[0];

  const handleCopy = (e: React.MouseEvent, bank: string, number: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(number);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold flex items-center mb-8 text-slate-900 border-b border-slate-200 pb-4">
        <CreditCard className="w-7 h-7 mr-3 text-blue-600" /> Detail Pembayaran
      </h2>

      <div className="bg-white border text-center border-slate-200 rounded-3xl p-6 md:p-10 mb-8 shadow-sm">
        <div className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Total Tagihan</div>
        <div className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-8">
          Rp {basePrice.toLocaleString('id-ID')}
        </div>
        
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 inline-block w-full max-w-md mx-auto text-left">
          <div className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider border-b border-slate-200 pb-2">
            Transfer Ke Rekening
          </div>
          <div className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-1">
            {account.bank}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="text-2xl md:text-3xl font-extrabold tracking-wider font-mono text-slate-800">
              {account.number}
            </div>
            <button 
              onClick={(e) => handleCopy(e, account.bank, account.number)}
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-colors w-28 flex-shrink-0 ${
                copiedBank === account.bank 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {copiedBank === account.bank ? (
                <><Check className="w-4 h-4" /> Disalin</>
              ) : (
                <><Copy className="w-4 h-4" /> Salin</>
              )}
            </button>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Atas Nama: <span className="font-bold text-slate-800">{account.name}</span>
          </div>
        </div>
      </div>

      <div className="mb-10 text-slate-600 space-y-3">
        <h4 className="font-bold text-slate-800 mb-2 text-lg">Tata Cara Pembayaran:</h4>
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">1</div>
          <p>Transfer sesuai nominal total tagihan ke nomor rekening di atas.</p>
        </div>
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">2</div>
          <p>Setelah melakukan transfer, klik tombol <strong>"Konfirmasi Pembayaran"</strong> di bawah.</p>
        </div>
        <div className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">3</div>
          <p>Tim kami akan memverifikasi pembayaran Anda dan menghubungi Anda melalui WhatsApp atau Email.</p>
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-4">
        <button 
          onClick={onBack} 
          disabled={isSubmitting}
          className="w-full md:w-1/3 py-5 rounded-2xl font-bold flex justify-center items-center text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-6 h-6 mr-2" /> Kembali
        </button>
        <button 
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full md:w-2/3 py-5 rounded-2xl font-bold flex justify-center items-center bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Memproses...' : (
            <>
              Konfirmasi Pembayaran <Check className="w-6 h-6 ml-2" />
            </>
          )}
        </button>
      </div>
      <p className="text-center text-sm text-slate-500 mt-6 font-medium">Dengan melakukan pembayaran, Anda menyetujui Ketentuan Layanan kami.</p>
    </div>
  );
};
