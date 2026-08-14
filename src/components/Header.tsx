"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, Plus, Flame, MessageSquare, Heart, Bell, User as UserIcon, ChevronDown,
  Building2, Car, Briefcase, Smartphone, Shirt, Dog, Compass, Gamepad2, LogOut
} from 'lucide-react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import AuthModal from '@/components/AuthModal';

interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export default function Header({ variant = 'transparent' }: HeaderProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState('');
  
  // Auth states
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const popularSearches = [
    "telefoane", "haine", "iphone", "adidasi", "bmw", "mașini", "iphone 17", "scuter", "telefon"
  ];

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (variant === 'solid') {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUserDropdownOpen(false);
  };

  const isSolid = variant === 'solid' || isScrolled;
  const headerClasses = isSolid 
    ? 'bg-white shadow-sm border-b border-gray-100' 
    : 'bg-transparent text-white';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${headerClasses}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-3xl font-bold tracking-tighter flex items-center ${isSolid ? 'text-slate-900' : 'text-white'}`}>
              adovo
            </span>
          </Link>
          
          <div className="hidden md:flex flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <span className={`absolute inset-y-0 left-0 pl-4 flex items-center ${isSolid ? 'text-gray-400' : 'text-white/70'}`}>
                <Search className="h-4 w-4" strokeWidth={2} />
              </span>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={variant === 'solid' ? "telefoane" : "Cauta produse, categorii, branduri..."}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className={`w-full pl-11 pr-4 py-2 text-sm rounded-full focus:outline-none focus:ring-2 transition-all ${
                  isSolid 
                    ? 'bg-gray-50 border border-gray-200 text-slate-900 placeholder-gray-500 focus:ring-brand/50 hover:bg-gray-100' 
                    : 'bg-white/5 border border-white/20 text-white placeholder-white/70 focus:ring-white/30'
                }`}
              />
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                  <div className="px-5 py-4 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-500 tracking-wider">POPULARE ACUM</span>
                  </div>
                  <div className="py-2 max-h-[400px] overflow-y-auto">
                    {popularSearches.map((term, index) => (
                      <div 
                        key={index} 
                        onMouseDown={(e) => {
                          e.preventDefault();
                          router.push(`/search?q=${encodeURIComponent(term)}`);
                        }}
                        className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Flame className="w-5 h-5 text-orange-500" strokeWidth={2} />
                        <span className="text-gray-800 text-base">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center space-x-2 font-medium text-sm px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    isSolid 
                      ? 'border-gray-200 text-slate-800 hover:bg-gray-50' 
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center text-xs font-bold">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.displayName || user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl py-2 z-50 border border-gray-100 text-slate-800 text-xs">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-bold truncate">{user.displayName || 'Utilizator'}</p>
                      <p className="text-gray-400 text-[10px] truncate">{user.email}</p>
                    </div>
                    <Link 
                      href="/search" 
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2.5 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Anunțurile mele
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 transition-colors font-semibold flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Deconectare
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => openAuth('login')}
                  className={`font-semibold text-sm transition-colors cursor-pointer ${
                    isSolid ? 'text-slate-700 hover:text-slate-900' : 'text-white hover:text-white/80'
                  }`}
                >
                  Conectare
                </button>
                
                <button 
                  onClick={() => openAuth('register')}
                  className={`flex items-center space-x-1.5 font-bold text-xs px-4 py-2.5 rounded-full transition-all transform hover:-translate-y-0.5 cursor-pointer ${
                    isSolid
                      ? 'bg-[#059669] text-white shadow-md hover:bg-emerald-600'
                      : 'bg-white text-slate-900 shadow-lg hover:bg-gray-50'
                  }`}
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" />
                  <span>Creează cont</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal Component */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </>
  );
}
