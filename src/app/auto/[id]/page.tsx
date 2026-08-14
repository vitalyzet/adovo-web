"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MapPin, 
  Tag, 
  Check, 
  Eye, 
  Calendar, 
  Hash, 
  Phone, 
  MessageSquare
} from 'lucide-react';

export default function AutoDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const images = [
    "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png",
    "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png",
    "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png",
    "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png",
    "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png",
    "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png",
    "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png"
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const carSpecs = [
    { label: "Model", value: "Golf" },
    { label: "An fabricație", value: "2011" },
    { label: "Kilometraj", value: "220000" },
    { label: "Combustibil", value: "Diesel" },
    { label: "Capacitate motor", value: "1600" },
    { label: "Putere (CP)", value: "105" },
    { label: "Cutie de viteze", value: "Manuală" },
    { label: "Caroserie", value: "Break" },
    { label: "Număr uși", value: "5" },
    { label: "Culoare", value: "Negru" },
    { label: "Stare", value: "Second hand" }
  ];

  const similarCars = [
    {
      title: 'Volkswagen Passat 2012 1.4L Benzină',
      price: '5.490 EUR',
      condition: 'Second-hand · Urme normale de uzură',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png',
      promoted: false
    },
    {
      title: 'Volkswagen Tiguan 2.0 TDI 2008 4x4',
      price: '5.999 EUR',
      condition: 'Second-hand · Urme normale de uzură',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png',
      promoted: false
    },
    {
      title: 'Golf 5 united 1900 diesel',
      price: '3.650 EUR',
      condition: 'Second-hand · Urme normale de uzură',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png',
      promoted: false
    },
    {
      title: 'Bmw E46 Cabrio 320d (Expoz...',
      price: '10.000 EUR',
      condition: 'Second-hand · Urme normale de uzură',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png',
      promoted: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 pb-20 font-sans">
      <Header variant="solid" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-emerald-600 transition-colors">Adovo</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/search?cat=auto-moto" className="hover:text-emerald-600 transition-colors">Auto, Moto si Ambarcatiuni</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/search?q=volkswagen" className="hover:text-emerald-600 transition-colors">Volkswagen</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-slate-800 font-medium truncate max-w-xs sm:max-w-md">Volkswagen Golf 6 - 1.6 TDI / 105 CP / 2011 / Euro 5</span>
        </nav>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLUMNS: Gallery & Product Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gallery Box */}
            <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-xs border border-gray-100">
              
              {/* Main Image Viewport */}
              <div className="relative h-[380px] sm:h-[480px] md:h-[520px] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
                <Image 
                  src={images[currentImageIndex]} 
                  alt="Volkswagen Golf 6" 
                  fill 
                  priority
                  className="object-contain"
                />

                {/* Floating Navigation Arrows */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-800 hover:text-emerald-600 hover:scale-105 transition-all z-10"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>

                <button 
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-slate-800 hover:text-emerald-600 hover:scale-105 transition-all z-10"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* Page Counter Pill */}
                <div className="absolute bottom-4 right-4 bg-[#1c4e38]/85 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                  <span>{currentImageIndex + 1} / {images.length}</span>
                </div>
              </div>

              {/* Thumbnails Carousel */}
              <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar py-1">
                <button 
                  onClick={handlePrevImage}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 flex-shrink-0 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-[#059669] ring-2 ring-emerald-500/20' 
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100">
              
              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-2 bg-emerald-50/80 text-emerald-700 border border-emerald-200/60 px-4 py-2 rounded-xl text-sm font-bold mb-6">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Volkswagen</span>
              </div>

              {/* Mint Specifications Pills Grid */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {carSpecs.map((spec, index) => (
                  <div 
                    key={index}
                    className="bg-[#e6f7f0] border border-emerald-100 text-slate-700 text-sm px-4 py-2 rounded-xl flex items-center font-medium shadow-2xs"
                  >
                    <span>{spec.label}:</span>
                    <strong className="ml-1 text-slate-900 font-bold">{spec.value}</strong>
                  </div>
                ))}
              </div>

              {/* Listing Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Volkswagen Golf 6 - 1.6 TDI / 105 CP / 2011 / Euro 5
              </h1>

              {/* Price */}
              <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
                5.200 EUR
              </div>

              {/* Condition Badge */}
              <div className="inline-block bg-gray-100/90 text-gray-600 px-4 py-1.5 rounded-full text-xs font-medium mb-8">
                Second-hand · Utilizat - Urme normale de uzură
              </div>

              <hr className="border-gray-100 my-8" />

              {/* Description Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Descriere</h2>
                <div className="text-slate-700 space-y-3 leading-relaxed font-normal text-base">
                  <p className="font-semibold text-slate-900">Volkswagen Golf 6 - 1.6 TDI / 105 CP / 2011 / Euro 5</p>
                  
                  <ul className="space-y-1.5 list-none pl-0">
                    <li>- Kilometraj: 220.000 km</li>
                    <li>- An fabricație: 2011</li>
                    <li>- Motorizare: 1.6 TDI Diesel – 105 CP</li>
                    <li>- Transmisie: Manuală, 5 trepte</li>
                    <li>- Normă de poluare: Euro 5</li>
                    <li>- Caroserie: Hatchback, 5 uși</li>
                    <li>- Culoare: Negru metalizat</li>
                    <li>- Tracțiune: Față</li>
                  </ul>

                  <div className="pt-2 pb-2 text-gray-300 font-light">———</div>

                  <p className="font-semibold text-slate-900">- Dotări și echipamente:</p>
                  <ul className="space-y-1 list-none pl-4">
                    <li>• Climatronic (climă automată pe două zone)</li>
                    <li>• Volan multifuncțional îmbrăcat în piele</li>
                    <li>• Senzori parcare spate</li>
                    <li>• Geamuri electrice față + spate</li>
                    <li>• Oglinzi electrice și încălzite</li>
                    <li>• Jante aliaj originale VW pe 17"</li>
                    <li>• Radio CD original cu ecran și suport MP3</li>
                    <li>• Conectivitate AUX / SD / Bluetooth</li>
                    <li>• Computer de bord – afișaj multifuncțional</li>
                    <li>• Închidere centralizată cu telecomandă</li>
                    <li>• ESP, ABS, ASR – Systeme de siguranță activă</li>
                    <li>• Isofix pentru scaun copil</li>
                    <li>• Interior textil foarte bine întreținut</li>
                  </ul>

                  <div className="pt-2 pb-2 text-gray-300 font-light">———</div>

                  <p className="font-semibold text-slate-900">Stare generală:</p>
                  <p>
                    Mașina se prezintă într-o stare foarte bună, atât tehnic cât și estetic , curând a fost schimbat tot kit-ul de distribuție – fără accidente, fără probleme ascunse. Întreținere făcută la timp , ideală pentru oraș dar și pentru drumuri lungi, cu un motor fiabil și economic.
                  </p>
                </div>
              </div>

            </div>

            {/* SEO Info Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-100">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Volkswagen Golf 6 - 1.6 TDI / 105 CP / 2011 / Euro 5: mai multe informații
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Cauți Volkswagen Golf 6 - 1.6 TDI / 105 CP / 2011 / Euro 5? Pe Adovo găsești Volkswagen Golf 6 - 1.6 TDI / 105 CP / 2011 / Euro 5 în stare bună și alte produse similare din categoria Volkswagen la prețuri competitive. Consultă descrierea completă și specificațiile produsului, contactează vânzătorul direct prin chat și finalizează achiziția în siguranță, cu plată securizată prin card și livrare prin curier oriunde în România.
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Adovo este marketplace-ul românesc unde cumperi și vinzi orice: electronice, mobilă, îmbrăcăminte, electrocasnice, piese auto, articole sport și multe altele. Fie că ești în Viseu de Sus sau în orice alt oraș, anunțurile sunt livrate rapid la adresa ta. Adovo reunește mii de vânzători verificați și oferă o platformă sigură cu sistem de plată integrat, protecție cumpărători și suport dedicat. Descoperă zilnic anunțuri noi din categoria Auto, Moto si Ambarcatiuni și găsește oferta perfectă la cel mai bun preț.
              </p>
            </div>

            {/* Similar Products Carousel / Grid */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Produse similare</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {similarCars.map((car, index) => (
                  <a 
                    href="/auto/1"
                    key={index}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                  >
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      <Image src={car.image} alt={car.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h4 className={`font-bold text-sm mb-2 line-clamp-2 ${car.promoted ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-600'} transition-colors`}>
                        {car.title}
                      </h4>
                      <div className="text-lg font-black text-slate-900 mb-2 mt-auto">
                        {car.price}
                      </div>
                      <div className="text-[11px] text-gray-400 border-t border-gray-50 pt-2 font-medium">
                        {car.condition}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 1 COLUMN: Seller Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 self-start bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-gray-100">
              
              {/* Header: Vânzător + Liked Heart */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-slate-900">Vânzător</h3>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-colors ${
                    isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'text-gray-400 hover:text-red-500 hover:border-red-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Seller Profile Avatar & Name */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-13 h-13 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-2xl shadow-xs flex-shrink-0">
                  C
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">Cristian</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Membru din 2026</p>
                </div>
              </div>

              {/* Location Badge Box */}
              <div className="bg-gray-50/90 border border-gray-100 p-3.5 rounded-2xl flex items-center gap-2.5 text-slate-800 text-sm font-bold mb-6">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Viseu de Sus, Maramures</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <button 
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full py-4 bg-[#059669] hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xs transition-all text-center text-base flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>{showPhone ? "0740 123 456" : "Afișează nr. telefon"}</span>
                </button>
                <button className="w-full py-4 bg-gray-50/90 hover:bg-gray-100 text-slate-800 font-bold rounded-2xl border border-gray-200/80 transition-all text-center text-base flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span>Trimite mesaj</span>
                </button>
              </div>

              {/* Listing Details Divider */}
              <hr className="border-gray-100 my-6" />

              {/* ID Anunț, Publicat la, Vizualizari */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-gray-500">
                  <span>ID Anunț</span>
                  <span className="font-bold text-slate-900">#294885</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>Publicat la</span>
                  <span className="font-bold text-slate-900">13.08.2026</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>Vizualizari</span>
                  <span className="font-bold text-slate-900">11</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
