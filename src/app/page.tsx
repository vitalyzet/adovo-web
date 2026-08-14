"use client";

import { useEffect, useState, useRef } from "react";
import { Search, Building2, Car, Briefcase, Heart, Smartphone, Shirt, Dog, Compass, Gamepad2 } from "lucide-react";
import Image from "next/image";
import HeroSearch from "@/components/HeroSearch";

function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 2000;
    let startTime: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(easeOutQuad * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">
      {count.toLocaleString('ro-RO')}{suffix}
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: "Imobiliare", icon: Building2, count: "142.9k anunțuri", slug: "imobiliare" },
    { name: "Auto & Moto", icon: Car, count: "89.4k anunțuri", slug: "auto-moto" },
    { name: "Locuri de muncă", icon: Briefcase, count: "34.1k anunțuri", slug: "locuri-de-munca" },
    { name: "Matrimoniale", icon: Heart, count: "12.8k anunțuri", slug: "matrimoniale" },
    { name: "Electronice", icon: Smartphone, count: "67.5k anunțuri", slug: "electronice" },
    { name: "Modă", icon: Shirt, count: "51.2k anunțuri", slug: "moda" },
    { name: "Animale", icon: Dog, count: "19.3k anunțuri", slug: "animale" },
    { name: "Turism", icon: Compass, count: "15.0k anunțuri", slug: "turism" },
    { name: "Gaming", icon: Gamepad2, count: "22.7k anunțuri", slug: "gaming" },
  ];

  return (
    <div className="flex flex-col w-full font-sans">
      {/* Hero Section */}
      <section 
        className="relative w-full pt-20 pb-8 md:pt-24 md:pb-10 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f3d25 0%, #174f35 30%, #1d7d4e 70%, #2a9d63 100%)' }}
      >
        {/* Decorative Circles */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-white/10 opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full border border-white/5 opacity-50 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 max-w-4xl leading-tight">
            Gaseste ce cauti,<br/>
            <span className="text-[#50c878]">vinde ce nu-ti</span><br/>
            <span className="text-[#50c878]">mai trebuie</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Anunturi gratuite, tranzactii sigure, livrare rapida.
          </p>

          <HeroSearch />
        </div>

        {/* Bottom SVG Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[40px] md:h-[80px]" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 Q720,150 1440,50 L1440,150 L0,150 Z" fill="var(--background)"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-center reveal-on-scroll">
          <div className="w-full flex-1 pt-4 md:pt-0">
            <AnimatedCounter target={3500} suffix="+" />
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">ANUNȚURI ACTIVE</div>
          </div>
          <div className="w-full flex-1 pt-4 md:pt-0">
            <AnimatedCounter target={700} suffix="+" />
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">UTILIZATORI</div>
          </div>
          <div className="w-full flex-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600 mb-1 tracking-tight flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Gratuit
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">SĂ PUBLICI ANUNȚURI</div>
          </div>
          <div className="w-full flex-1 pt-4 md:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1 tracking-tight">14 zile</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">RETUR GARANTAT*</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50/70 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4 reveal-on-scroll">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 block">Categorii principale</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Explorează pe categorii</h2>
            </div>
            <a href="/search" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors flex items-center gap-1 text-sm group">
              Toate categoriile <span className="group-hover:translate-x-1 transition-transform">›</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, idx) => (
              <a 
                key={idx} 
                href={`/search?cat=${cat.slug}`} 
                style={{ transitionDelay: `${idx * 60}ms` }}
                className="reveal-on-scroll flex items-center justify-between p-5 bg-white border border-gray-100/90 rounded-2xl shadow-2xs hover:shadow-md hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-all duration-300 shadow-xs flex-shrink-0">
                    <cat.icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{cat.count}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                  <span className="text-lg font-bold">›</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Ads Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-8 reveal-on-scroll">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-1">Anunțuri recente</h2>
              <p className="text-gray-500">Cele mai noi oferte din diverse categorii</p>
            </div>
            <a href="/search" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center">
              Vezi toate <span className="ml-1 text-xl">›</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item, idx) => (
              <a 
                href="/anunt/1"
                key={`recent-${item}`} 
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="reveal-on-scroll bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#059669] text-white text-xs font-bold px-2.5 py-1 rounded-lg z-10">NOU</div>
                  <Image src="/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png" alt="Ad image" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">ABC TELEFON BEBE ALBASTRU {item}</h3>
                  <div className="text-xl font-extrabold text-slate-900 mb-4 mt-auto">
                    {(92.77 * item).toFixed(2).replace('.', ',')} <span className="text-xs font-bold text-gray-500">RON</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-xl">
                    <span className="truncate font-medium">Nou • Cu sunete și lumini</span>
                  </div>
                  <button className="w-full btn-gradient">
                    Vezi Detalii
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Cars Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-8 reveal-on-scroll">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-1">Mașini adăugate recent</h2>
              <p className="text-gray-500">Cele mai noi anunțuri din Autoturisme</p>
            </div>
            <a href="/search?cat=auto-moto" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center">
              Vezi toate <span className="ml-1 text-xl">›</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item, idx) => (
              <a 
                href="/auto/1"
                key={`car-${item}`} 
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="reveal-on-scroll bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <div className="absolute top-3 left-3 bg-[#059669] text-white text-xs font-bold px-2.5 py-1 rounded-lg z-10">NOU</div>
                  <Image src="/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png" alt="Car image" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">Volkswagen Golf {item}</h3>
                  <div className="text-xl font-extrabold text-slate-900 mb-4 mt-auto">
                    {(14500 + item * 500).toLocaleString('ro-RO')} <span className="text-xs font-bold text-gray-500">EUR</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                    <span className="bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 font-medium">Volkswagen</span>
                    <span className="bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 font-medium">2018</span>
                  </div>
                  <button className="w-full btn-gradient">
                    Vezi Detalii
                  </button>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* spacer to scroll down */}
      <div className="h-16"></div>
    </div>
  );
}
