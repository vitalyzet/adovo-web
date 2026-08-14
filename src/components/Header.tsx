"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, Plus, Flame, MessageSquare, Heart, Bell, User, ChevronDown,
  Building2, Car, Briefcase, Smartphone, Shirt, Dog, Compass, Gamepad2
} from 'lucide-react';

interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export default function Header({ variant = 'transparent' }: HeaderProps) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [query, setQuery] = useState('');

  const popularSearches = [
    "telefoane", "haine", "iphone", "adidasi", "bmw", "mașini", "iphone 17", "scuter", "telefon"
  ];

  const headerCategories = [
    { name: "Imobiliare", icon: Building2, slug: "imobiliare" },
    { name: "Auto & Moto", icon: Car, slug: "auto-moto" },
    { name: "Locuri de muncă", icon: Briefcase, slug: "locuri-de-munca" },
    { name: "Matrimoniale", icon: Heart, slug: "matrimoniale" },
    { name: "Electronice", icon: Smartphone, slug: "electronice" },
    { name: "Modă", icon: Shirt, slug: "moda" },
    { name: "Animale", icon: Dog, slug: "animale" },
    { name: "Turism", icon: Compass, slug: "turism" },
    { name: "Gaming", icon: Gamepad2, slug: "gaming" },
  ];

  useEffect(() => {
    if (variant === 'solid') {
      setIsScrolled(true); // Always solid if variant is solid
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

  // Determine styling based on scroll/variant
  const isSolid = variant === 'solid' || isScrolled;
  const headerClasses = isSolid 
    ? 'bg-white shadow-sm border-b border-gray-100' 
    : 'bg-transparent text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerClasses}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {/* Mock Logo for Adovo */}
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

        <div className="flex items-center space-x-6">
          {variant === 'solid' ? (
            <div className="flex items-center space-x-5 text-gray-600">
              <button className="hover:text-brand transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="hover:text-brand transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="hover:text-brand transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="hover:text-brand transition-colors flex items-center space-x-1">
                <User className="h-5 w-5" />
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className={`font-medium transition-colors ${isSolid ? 'text-slate-700 hover:text-slate-900' : 'text-white hover:text-white/80'}`}>
                Conectare
              </Link>
              <Link 
                href="/register" 
                className={`flex items-center space-x-1 font-medium px-5 py-2.5 rounded-full transition-all transform hover:-translate-y-0.5 ${
                  isSolid
                    ? 'bg-white border border-gray-200 text-brand shadow-sm hover:shadow-md'
                    : 'bg-white text-brand shadow-lg hover:bg-gray-50'
                }`}
              >
                <Plus className="h-5 w-5" />
                <span>Creeaza cont</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
