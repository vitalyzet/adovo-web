import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export default function Footer() {
  const trendingTags = [
    "Telefoane", "Haine", "Iphone", "Adidasi", "Bmw", "Mașini", "Iphone 17", 
    "Scuter", "Telefon", "Mobila", "Trotinetă electrică", "Autoturisme", 
    "Laptop", "Rochii", "Atv", "Telefoane samsung", "Bara fata", "Audi", "Auto", "Samsung"
  ];

  return (
    <footer className="bg-[#0b101b] text-slate-300 pt-16 pb-12 mt-auto font-sans relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-10">
          
          {/* Column 1: Brand Logo & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black text-white tracking-tighter flex items-center">
                adovo
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-normal">
              Marketplace-ul tău de încredere pentru produse noi si second-hand de calitate în România.
            </p>
          </div>

          {/* Column 2: Link-uri Rapide */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">Link-uri Rapide</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Acasă</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">Caută Anunțuri</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">Adaugă Anunț</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">Anunțurile Mele</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Suport */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">Suport</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">Cum cumpăr</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Livrare</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Întrebări frecvente</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & ANPC */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium mb-5">
              <li>
                <a href="#" className="hover:text-white transition-colors">Termeni și Condiții</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Politica de Confidențialitate</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Politica de Cookies</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Politica de Retur</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Legislație aplicabilă</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">ANPC</a>
              </li>
            </ul>

            {/* ANPC Badge Box */}
            <a 
              href="https://anpc.ro/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white rounded-xl p-2 px-3 border border-slate-700/40 shadow-sm hover:opacity-95 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
                ANPC
              </div>
              <div className="text-[10px] leading-tight text-blue-950 font-bold">
                <span className="block font-black text-blue-900 tracking-tight">ANPC</span>
                <span className="block text-[8px] text-gray-700 uppercase font-semibold">Soluționarea Alternativă</span>
                <span className="block text-[8px] text-blue-800 font-bold uppercase">a Litigiilor · DETALII</span>
              </div>
            </a>
          </div>

        </div>

        {/* Divider Line */}
        <hr className="border-slate-800/80 my-8" />

        {/* Middle Section: Tendinte */}
        <div className="mb-10">
          <h4 className="text-sm font-bold text-white mb-4 tracking-wide">Tendințe</h4>
          <div className="flex flex-wrap gap-2.5">
            {trendingTags.map((tag, idx) => (
              <Link 
                key={idx} 
                href={`/search?q=${encodeURIComponent(tag.toLowerCase())}`}
                className="px-3.5 py-1.5 bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/50 rounded-full text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer shadow-2xs"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-slate-800/80 my-8" />

        {/* Bottom Copyright & Payment Methods */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-medium">
          <div>
            © 2026 Adovo. Toate drepturile rezervate. · <a href="#" className="hover:text-slate-300 transition-colors">Setări cookies</a>
          </div>

          {/* Payment Methods Badges */}
          <div className="flex items-center gap-4">
            <span className="font-extrabold tracking-tight text-white text-sm">
              NETOPIA <span className="text-xs font-normal text-slate-400 uppercase tracking-widest block text-[9px] -mt-1">PAYMENTS</span>
            </span>
            
            {/* Mastercard circles logo */}
            <div className="flex items-center space-x-[-8px]">
              <div className="w-5 h-5 rounded-full bg-red-600 opacity-90"></div>
              <div className="w-5 h-5 rounded-full bg-amber-500 opacity-90"></div>
            </div>

            {/* VISA logo */}
            <span className="font-black italic text-lg text-white tracking-tighter">
              VISA
            </span>
          </div>
        </div>

      </div>

      {/* Floating Chat Trigger Button (Bottom Right) */}
      <button 
        aria-label="Contact / Live Chat"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-[#059669] hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center hover:scale-105 transition-all cursor-pointer border-2 border-white/20"
      >
        <MessageSquare className="w-6 h-6 stroke-[2.2]" />
      </button>
    </footer>
  );
}
