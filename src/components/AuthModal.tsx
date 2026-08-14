"use client";

import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  updateProfile 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, 
  ShieldCheck, Zap, MessageSquare, Sparkles, Phone, Building2
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'register' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [accountType, setAccountType] = useState<'fizica' | 'firma'>('fizica');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Status state
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Sync mode whenever modal opens or initialMode prop changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
      setSuccess(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleAuthError = (errCode: string) => {
    switch (errCode) {
      case 'auth/email-already-in-use':
        return 'Există deja un cont cu această adresă de email.';
      case 'auth/weak-password':
        return 'Parola trebuie să aibă cel puțin 6 caractere.';
      case 'auth/invalid-email':
        return 'Adresa de email introdusă nu este validă.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Emailul sau parola sunt incorecte.';
      default:
        return 'A apărut o eroare. Vă rugăm să încercați din nou.';
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError('Vă rugăm să introduceți numele complet.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Parolele introduse nu se potrivesc.');
      return;
    }

    if (password.length < 6) {
      setError('Parola trebuie să conțină minim 6 caractere.');
      return;
    }

    if (!termsAccepted) {
      setError('Trebuie să fii de acord cu Termenii și Condițiile.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }

      setSuccess('Contul tău Adovo a fost creat cu succes!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(handleAuthError(err.code || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Te-ai autentificat cu succes!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(handleAuthError(err.code || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    try {
      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccess('Te-ai conectat cu Google cu succes!');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setError(handleAuthError(err.code || ''));
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Horizontal Split Modal Container */}
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-800/20 relative flex flex-col md:flex-row animate-in zoom-in-95 duration-200 min-h-[520px]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors z-20 cursor-pointer"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: Horizontal Branding & Features */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-[#0b101b] via-[#0f172a] to-[#064e3b] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle decorative mesh blur circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

          <div className="relative z-10">
            <span className="text-3xl font-black tracking-tighter text-white block mb-6">
              adovo
            </span>
            
            <h2 className="text-xl font-bold tracking-tight text-white mb-2 leading-snug">
              {mode === 'register' ? 'Alătură-te comunității Adovo' : 'Bine ai revenit pe Adovo'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-6 font-normal">
              Marketplace-ul tău de încredere pentru produse noi și second-hand în România.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Anunțuri gratuite în doar câteva secunde</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Cumpărături și tranzacții sigure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span>Contact direct și rapid cu vânzătorii</span>
              </div>
            </div>
          </div>

          {/* Bottom Live Stats Badge */}
          <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>3.500+ anunțuri active • 700+ utilizatori</span>
          </div>
        </div>

        {/* RIGHT PANEL: Form Inputs */}
        <div className="w-full md:w-7/12 p-8 sm:p-10 flex flex-col justify-center bg-white relative">

          {/* Tabs Switcher */}
          <div className="mb-6 p-1 bg-slate-100 rounded-xl flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); setSuccess(null); }}
              className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer ${
                mode === 'register' 
                  ? 'bg-white text-slate-900 shadow-sm font-bold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Creează cont
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
              className={`flex-1 py-2.5 rounded-lg transition-all cursor-pointer ${
                mode === 'login' 
                  ? 'bg-white text-slate-900 shadow-sm font-bold' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Autentificare
            </button>
          </div>

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center gap-2.5 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-4">

            {/* Name & Phone Grid (Only for registration) */}
            {mode === 'register' && (
              <>
                {/* Account Type (Tip cont) Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Tip cont
                    </label>
                    <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/70">
                      Nu se mai poate schimba ulterior
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAccountType('fizica')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        accountType === 'fizica'
                          ? 'bg-emerald-50/80 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Persoană fizică</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType('firma')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        accountType === 'firma'
                          ? 'bg-emerald-50/80 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Firma / Dealer</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nume și prenume
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Alexandru Popescu"
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Număr de telefon
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07xx xxx xxx"
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adresă de Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nume@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-900"
                />
              </div>
            </div>

            {/* Password Grid (2 Columns for register, 1 Column for login) */}
            {mode === 'register' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parolă
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirmă parola
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Parolă
                  </label>
                  <a href="#" className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700">
                    Ai uitat parola?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms checkbox */}
            {mode === 'register' && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight">
                  Sunt de acord cu <a href="#" className="text-emerald-600 font-bold hover:underline">Termenii și Condițiile</a> și <a href="#" className="text-emerald-600 font-bold hover:underline">Politica de Confidențialitate</a>.
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#059669] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Se procesează...</span>
                </>
              ) : (
                <span>{mode === 'register' ? 'Creează cont gratuit' : 'Intră în cont'}</span>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-slate-400 font-medium">sau continuă cu</span>
            </div>
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-2xs"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.37 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                />
              </svg>
            )}
            <span>Conectează-te cu Google</span>
          </button>

        </div>
      </div>
    </div>
  );
}
