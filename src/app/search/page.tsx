"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import FilterSidebar from '@/components/FilterSidebar';
import SearchResultCard from '@/components/SearchResultCard';
import { Search, X, Building2, Car, Briefcase, Heart, Smartphone, Shirt, Dog, Compass, Gamepad2, Layers } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentCatSlug = searchParams.get('cat') || 'all';

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
  }, [currentCatSlug]);

  const categories = [
    { name: "Toate", slug: "all", icon: Layers },
    { name: "Imobiliare", slug: "imobiliare", icon: Building2 },
    { name: "Auto & Moto", slug: "auto-moto", icon: Car },
    { name: "Locuri de muncă", slug: "locuri-de-munca", icon: Briefcase },
    { name: "Matrimoniale", slug: "matrimoniale", icon: Heart },
    { name: "Electronice", slug: "electronice", icon: Smartphone },
    { name: "Modă", slug: "moda", icon: Shirt },
    { name: "Animale", slug: "animale", icon: Dog },
    { name: "Turism", slug: "turism", icon: Compass },
    { name: "Gaming", slug: "gaming", icon: Gamepad2 },
  ];

  // Category specific listings database
  const categoryData: Record<string, Array<any>> = {
    "auto-moto": [
      {
        title: 'Volkswagen Golf 6 - 1.6 TDI / 105 CP / 2011 / Euro 5',
        price: 5200.00,
        currency: 'EUR',
        condition: 'Second-hand',
        specs: ['Volkswagen', '2011', '220.000 km'],
        date: '13.08.2026',
        promoted: true,
        isAuto: true,
        id: '1'
      },
      {
        title: 'Volkswagen Passat 2012 1.4L Benzină Euro 5',
        price: 5490.00,
        currency: 'EUR',
        condition: 'Second-hand',
        specs: ['Volkswagen', '2012', '185.000 km'],
        date: '12.08.2026',
        promoted: false,
        isAuto: true,
        id: '2'
      },
      {
        title: 'Volkswagen Tiguan 2.0 TDI 2008 4x4',
        price: 5999.00,
        currency: 'EUR',
        condition: 'Second-hand',
        specs: ['Volkswagen', '2008', '210.000 km'],
        date: '10.08.2026',
        promoted: false,
        isAuto: true,
        id: '3'
      },
      {
        title: 'BMW E46 Cabrio 320d Pachet M complet',
        price: 10000.00,
        currency: 'EUR',
        condition: 'Second-hand',
        specs: ['BMW', '2004', '190.000 km'],
        date: '09.08.2026',
        promoted: true,
        isAuto: true,
        id: '4'
      },
      {
        title: 'Audi A4 2.0 TDI 2015 Transmisie Automată',
        price: 9850.00,
        currency: 'EUR',
        condition: 'Second-hand',
        specs: ['Audi', '2015', '165.000 km'],
        date: '05.08.2026',
        promoted: false,
        isAuto: true,
        id: '5'
      }
    ],
    "imobiliare": [
      {
        title: 'Apartament 2 Camere Decomandat Zona Centrală 62 mp',
        price: 89500.00,
        currency: 'EUR',
        condition: 'Finisat modern • Bloc nou',
        date: '11.08.2026',
        promoted: true
      },
      {
        title: 'Garsonieră Spațioasă Etaj 2 Mobilată Complet',
        price: 43000.00,
        currency: 'EUR',
        condition: 'Mobilat & Utilat',
        date: '08.08.2026',
        promoted: false
      },
      {
        title: 'Casă Individuală cu Grădină 500 mp Zona Rezidențială',
        price: 165000.00,
        currency: 'EUR',
        condition: 'Construcție nouă 2024',
        date: '04.08.2026',
        promoted: false
      }
    ],
    "locuri-de-munca": [
      {
        title: 'Șofer Profesionist Categoria C+E Comunitate',
        price: 2800.00,
        currency: 'EUR / lună',
        condition: 'Full-time • Contract determinat',
        date: '12.08.2026',
        promoted: true,
        image: '/26.svg'
      },
      {
        title: 'Specialist Vânzări & Relații Clienți Limba Engleză',
        price: 4500.00,
        currency: 'RON / lună',
        condition: 'Hybrid / Remote',
        date: '10.08.2026',
        promoted: false,
        image: '/26.svg'
      },
      {
        title: 'Ospătar / Barman Restaurant Central',
        price: 3800.00,
        currency: 'RON / lună',
        condition: 'Full-time • Program flexibil',
        date: '08.08.2026',
        promoted: false,
        image: '/26.svg'
      }
    ],
    "matrimoniale": [
      {
        title: 'Bărbat 35 ani căut o relație serioasă și prietenie',
        price: 0,
        currency: 'Contact direct',
        condition: 'Relație serioasă',
        date: '10.08.2026',
        promoted: false
      }
    ],
    "electronice": [
      {
        title: 'ABC TELEFON BEBE ALBASTRU',
        price: 92.77,
        currency: 'RON',
        condition: 'Nou',
        date: '22.07.2026',
        promoted: false
      },
      {
        title: 'iPhone 15 Pro Max 256GB Titan Natural Sigilat',
        price: 5390.00,
        currency: 'RON',
        condition: 'Nou • Cu garanție',
        date: '11.08.2026',
        promoted: true
      },
      {
        title: 'WINFUN TELEFON CU CLAPETA CU SUNETE',
        price: 64.30,
        currency: 'RON',
        condition: 'Nou',
        date: '08.07.2026',
        promoted: false
      },
      {
        title: 'Laptop Gaming ASUS ROG Strix Core i7 16GB RTX 4060',
        price: 4799.00,
        currency: 'RON',
        condition: 'Second-hand • Ca nou',
        date: '07.08.2026',
        promoted: false
      }
    ],
    "moda": [
      {
        title: 'Geacă Iarnă Puf Bărbati Impermeabilă Mărimea L',
        price: 249.00,
        currency: 'RON',
        condition: 'Nou • Cu etichetă',
        date: '09.08.2026',
        promoted: false
      },
      {
        title: 'Adidași Nike Air Max 270 Mărimea 42 Originali',
        price: 320.00,
        currency: 'RON',
        condition: 'Purtați o singură dată',
        date: '06.08.2026',
        promoted: true
      }
    ],
    "animale": [
      {
        title: 'Pui Ciobănesc German Pedigree Tip A Vaccinați',
        price: 1500.00,
        currency: 'RON',
        condition: 'Deparazitați & Carnet',
        date: '12.08.2026',
        promoted: true
      },
      {
        title: 'Pisicuță British Shorthair Rasa Curată 2 Luni',
        price: 1800.00,
        currency: 'RON',
        condition: 'Educată la litieră',
        date: '09.08.2026',
        promoted: false
      }
    ],
    "turism": [
      {
        title: 'Sejur 3 Nopți Cabană Tradițională Poiana Brașov',
        price: 950.00,
        currency: 'RON',
        condition: 'Mic dejun inclus',
        date: '10.08.2026',
        promoted: true
      }
    ],
    "gaming": [
      {
        title: 'Consolă PlayStation 5 Slim 1TB Disc Edition 2 Manete',
        price: 2199.00,
        currency: 'RON',
        condition: 'Nou • Factură & Garanție',
        date: '12.08.2026',
        promoted: true
      },
      {
        title: 'Volan Gaming Logitech G29 Driving Force cu Pedale',
        price: 890.00,
        currency: 'RON',
        condition: 'Second-hand • Funcționează perfect',
        date: '08.08.2026',
        promoted: false
      }
    ]
  };

  // Determine displayed items
  let activeListings: Array<any> = [];
  if (currentCatSlug === 'all') {
    activeListings = Object.values(categoryData).flat();
  } else if (categoryData[currentCatSlug]) {
    activeListings = categoryData[currentCatSlug];
  } else {
    activeListings = categoryData["electronice"];
  }

  const selectedCategoryObj = categories.find(c => c.slug === currentCatSlug) || categories[0];

  const handleCategorySelect = (slug: string) => {
    if (slug === 'all') {
      router.push('/search');
    } else {
      router.push(`/search?cat=${slug}`);
    }
  };

  return (
    <div className="search-page min-h-screen bg-gray-50/70 pb-20 overflow-hidden font-sans">
      <Header variant="solid" />

      {/* Top Search Bar */}
      <div className="pt-28 pb-8 bg-white border-b border-gray-100 shadow-2xs reveal-on-scroll">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text"
                defaultValue={currentCatSlug !== 'all' ? selectedCategoryObj.name : "Toate produsele"}
                className="w-full py-4 pl-14 pr-4 bg-gray-50/70 rounded-2xl text-gray-800 text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs border border-gray-200/70"
              />
            </div>
            <button className="w-full sm:w-auto btn-gradient">
              Caută
            </button>
          </div>
        </div>
      </div>

      {/* Separated Categories Horizontal Navigation Filter */}
      <div className="bg-white border-b border-gray-100 py-4 shadow-2xs sticky top-[72px] z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap py-1">
            {categories.map((cat) => {
              const isActive = currentCatSlug === cat.slug;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#059669] text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
                      : 'bg-gray-50 border border-gray-200/70 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-1/4 flex-shrink-0 lg:sticky lg:top-36 self-start reveal-on-scroll">
            <FilterSidebar />
          </div>

          {/* Right Results Area */}
          <div className="flex-1 w-full">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 reveal-on-scroll">
              <div className="text-gray-900 mb-4 sm:mb-0">
                <span className="font-extrabold text-xl">{activeListings.length}</span> 
                <span className="text-gray-500 ml-1.5 font-medium">anunțuri în {selectedCategoryObj.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sortare:</span>
                <button className="px-4 py-2 bg-white border border-gray-200/80 rounded-xl text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors flex items-center shadow-2xs">
                  Cele mai recente
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {currentCatSlug !== 'all' && (
              <div className="flex flex-wrap items-center gap-2 mb-6 reveal-on-scroll">
                <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs font-bold text-emerald-800 flex items-center shadow-2xs">
                  Categorie: {selectedCategoryObj.name}
                  <button onClick={() => handleCategorySelect('all')} className="ml-2 text-emerald-600 hover:text-emerald-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Result List */}
            <div className="flex flex-col gap-4">
              {activeListings.map((result, idx) => (
                <div
                  key={idx}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                  className="reveal-on-scroll"
                >
                  <SearchResultCard 
                    title={result.title}
                    price={result.price}
                    currency={result.currency}
                    condition={result.condition}
                    date={result.date}
                    promoted={result.promoted}
                    isAuto={result.isAuto}
                    specs={result.specs}
                    image={result.image}
                    href={result.isAuto ? `/auto/${result.id || 1}` : `/anunt/${result.id || 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-32 text-center text-gray-500 font-bold">Se încarcă categoriile...</div>}>
      <SearchContent />
    </Suspense>
  );
}
