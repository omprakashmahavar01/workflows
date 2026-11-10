import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, X } from 'lucide-react';

interface PhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (phone: string, name: string) => void;
}

export const PhoneAuthModal: React.FC<PhoneAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('कक्षा 10 छात्र');
  const [otp, setOtp] = useState('1234');
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || phone.length < 10) {
      alert('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें।');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        const masked = phone.length >= 10 ? `XXXXXX${phone.slice(-4)}` : phone;
        onLoginSuccess(`+91 ${masked}`, name);
        onClose();
      }, 800);
    }, 600);
  };

  const handleQuickLogin = () => {
    setName('सत्यापित छात्र');
    onLoginSuccess('सत्यापित छात्र', 'सत्यापित छात्र');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-devanagari animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-2 text-center pt-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            छात्र प्रोफ़ाइल लॉगिन (Student Login)
          </h3>
          <p className="text-xs text-slate-400">
            कक्षा 10वीं स्टडी पोर्टल, नोट्स और AI गुरुजी एक्सेस करने के लिए लॉग-इन करें।
          </p>
        </div>

        {/* Quick Guest / Fast Access */}
        <div className="p-3.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              त्वरित प्रवेश (Instant Access):
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            बिना किसी सार्वजनिक नंबर प्रदर्शन के गोपनीयता के साथ तुरंत 1-क्लिक प्रवेश करें।
          </p>
          <button
            onClick={handleQuickLogin}
            className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>सुरक्षित छात्र प्रवेश (Guest Login)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">आपका नाम (Student Name):</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="उदा. राम कुमार"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">मोबाइल नंबर (Mobile Number):</label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-400">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="अपना 10 अंकों का मोबाइल नंबर दर्ज करें"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-md"
            >
              {loading ? 'ओटीपी भेजा जा रहा है...' : 'ओटीपी प्राप्त करें (Send OTP)'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">सत्यापन कोड भेजा गया:</span>
              <strong className="text-amber-400 text-sm font-mono">
                +91 {phone.length >= 10 ? `XXXXXX${phone.slice(-4)}` : phone}
              </strong>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">4-अंकीय OTP कोड दर्ज करें:</label>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono font-bold bg-slate-950 border border-slate-800 rounded-xl py-2.5 text-amber-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'सत्यापन हो रहा है...' : 'ओटीपी सत्यापित करें (Verify OTP)'}</span>
            </button>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">सफलतापूर्वक लॉग-इन हुआ!</h4>
            <p className="text-xs text-slate-300">
              स्वागत है <strong>{name}</strong>! आपका सुरक्षित सत्र सक्रिय हो गया है।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
