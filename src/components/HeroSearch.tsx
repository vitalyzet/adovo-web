"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Flame } from 'lucide-react';

export default function HeroSearch() {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const popularSearches = [
    "telefoane", "haine", "iphone", "adidasi", "bmw", "mașini", "iphone 17", "scuter", "telefon"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-start gap-4 w-full max-w-3xl mb-4 md:mb-8 relative z-50">
      <div className="flex-1 w-full relative">
        <Search className="absolute left-5 top-[22px] h-5 w-5 text-gray-400" />
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ce cauti azi?"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="w-full h-[64px] pl-14 pr-4 bg-white rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-brand shadow-sm"
        />
        
        {isFocused && (
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
      </div>
      <button type="submit" className="w-full sm:w-auto flex items-center justify-center btn-gradient">
        <Search className="h-5 w-5 mr-2 text-white" />
        Cauta
      </button>
    </form>
  );
}
