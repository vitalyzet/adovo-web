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
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

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
      setError('Parolele introduse nu potrivesc.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pt-8 px-8 pb-4 text-center">
          <span className="text-3xl font-black tracking-tighter text-slate-900 block mb-2">
            adovo
          </span>
          <h3 className="text-xl font-bold text-gray-900">
            {mode === 'register' ? 'Creează un cont nou' : 'Bine ai revenit!'}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {mode === 'register' 
              ? 'Alătură-te celei mai mari comunități de anunțuri din România' 
              : 'Introdu datele tale pentru a te conecta la cont'}
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="mx-8 mb-6 p-1 bg-gray-100 rounded-xl flex text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('register'); setError(null); setSuccess(null); }}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              mode === 'register' 
                ? 'bg-white text-slate-900 shadow-sm font-bold' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Creează cont
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              mode === 'login' 
                ? 'bg-white text-slate-900 shadow-sm font-bold' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Autentificare
          </button>
        </div>

        {/* Form Container */}
        <div className="px-8 pb-8">

          {/* Success Banner */}
          {success && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={mode === 'register' ? handleRegister : handleLogin} className="space-y-4">

            {/* Name input (Only for registration) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Nume și prenume
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Alexandru Popescu"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900"
                  />
                </div>
              </div>
            )}

            {/* Email input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Adresă de Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nume@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Parolă
                </label>
                {mode === 'login' && (
                  <a href="#" className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700">
                    Ai uitat parola?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password input (Only for registration) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Confirmă parola
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all text-gray-900"
                  />
                </div>
              </div>
            )}

            {/* Terms checkbox */}
            {mode === 'register' && (
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <label htmlFor="terms" className="text-[11px] text-gray-600 leading-tight">
                  Sunt de acord cu <a href="#" className="text-emerald-600 font-bold hover:underline">Termenii și Condițiile</a> și <a href="#" className="text-emerald-600 font-bold hover:underline">Politica de Confidențialitate</a>.
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#059669] hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
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
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium">sau continuă cu</span>
            </div>
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold text-xs transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-2xs"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
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
