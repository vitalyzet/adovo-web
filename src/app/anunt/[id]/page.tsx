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
  ChevronRight as ChevronRightIcon,
  Minus,
  Plus,
  Truck,
  Tag,
  Star,
  CheckCircle2,
  Package
} from 'lucide-react';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const images = [
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

  const reviews = [
    { name: 'Crut', rating: 5, date: '12.08.2026' },
    { name: 'Spatarel', rating: 5, date: '07.08.2026' },
    { name: 'Nan', rating: 5, date: '07.08.2026' },
  ];

  const similarProducts = [
    {
      title: 'PEPPA PIG PAPUSA PEPPA CANTA SI VORBESTE',
      price: '114,03 RON',
      condition: 'Nou',
      rating: '5.0',
      category: 'Jucarii si jocuri',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png'
    },
    {
      title: 'JOC SAH DIN LEMN IN CUTIE',
      price: '79,77 RON',
      condition: 'Nou',
      rating: '5.0',
      category: 'Jucarii si jocuri',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png'
    },
    {
      title: 'CUB GAN MONSTER GO MG PYRAMINX STANDARD',
      price: '77,07 RON',
      condition: 'Nou',
      rating: '5.0',
      category: 'Jucarii si jocuri',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png'
    },
    {
      title: 'BARBIE PAPUSA BARBIE CU PAR BLOND SI ROZ',
      price: '90,53 RON',
      condition: 'Nou',
      rating: '5.0',
      category: 'Jucarii si jocuri',
      image: '/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header variant="solid" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-24 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-slate-900 transition-colors">Adovo</Link>
          <span>›</span>
          <Link href="/search" className="hover:text-slate-900 transition-colors">Mama si Copilul</Link>
          <span>›</span>
          <Link href="/search" className="hover:text-slate-900 transition-colors">Jucarii si jocuri</Link>
          <span>›</span>
          <span className="font-semibold text-slate-900">ABC TELEFON BEBE ALBASTRU</span>
        </nav>

        {/* Main Grid: Left Details (2/3) + Right Sticky Sidebar (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTENT AREA */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Gallery Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 relative">
              {/* Main Image View */}
              <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center bg-white rounded-2xl overflow-hidden">
                <Image 
                  src={images[currentImageIndex]} 
                  alt="ABC TELEFON BEBE ALBASTRU" 
                  fill 
                  className="object-contain p-4"
                  priority 
                />

                {/* Arrow Controls */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-emerald-100 text-emerald-600 hover:bg-[#059669] hover:text-white hover:border-[#059669] hover:scale-110 active:scale-95 transition-all duration-200 z-10"
                >
                  <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-emerald-100 text-emerald-600 hover:bg-[#059669] hover:text-white hover:border-[#059669] hover:scale-110 active:scale-95 transition-all duration-200 z-10"
                >
                  <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* Page Indicator */}
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 mt-6 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-50 ${
                      currentImageIndex === idx 
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover p-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details & Title Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
              {/* Category Pill */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100">
                  <Tag className="w-3.5 h-3.5" />
                  Jucarii si jocuri
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                ABC TELEFON BEBE ALBASTRU
              </h1>

              {/* Price */}
              <div className="text-4xl font-black text-slate-900 tracking-tight">
                92,77 <span className="text-2xl font-bold text-slate-800">RON</span>
              </div>

              {/* Shipping Pill */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50/80 text-blue-700 text-xs font-semibold rounded-xl border border-blue-100">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>de la <strong className="font-bold">14.99 RON</strong> · livrare curier (Sameday)</span>
                </div>
              </div>

              {/* Condition & Stock */}
              <div className="flex items-center gap-4 text-xs font-medium border-t border-gray-100 pt-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 font-bold rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Nou
                </span>
                <span className="text-gray-500 font-medium">24 bucăți în stoc</span>
              </div>

              {/* Description Divider */}
              <div className="border-t border-gray-100 pt-6">
                <h2 className="text-xl font-extrabold text-slate-900 mb-4">Descriere</h2>
                <div className="text-gray-600 text-base leading-relaxed space-y-4 font-normal">
                  <p>
                    Telefon bebe cu diverse sunete haioase si display cu poze rotative, 20 cm. Acest telefon colorat va capta cu siguranta atentia copilului. Sunetele pot fi activate prin apasarea tastelor. Tasta de reglare a intensitatii sunetului.
                  </p>
                  <p className="text-gray-500 text-sm font-medium pt-2">
                    Posibilitatea de retur garantată pentru 14 zile de la primirea produsului.
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Reviews Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-extrabold text-slate-900">Recenzii vânzător</h2>
                <div className="flex items-center gap-1 text-sm font-bold text-slate-800 ml-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>5.0</span>
                  <span className="text-gray-400 font-normal">(3)</span>
                </div>
              </div>

              <div className="space-y-3">
                {reviews.map((rev, idx) => (
                  <div key={idx} className="bg-gray-50/70 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-800 text-sm">{rev.name}</span>
                      <div className="flex items-center text-yellow-400 gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* More Info SEO Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                ABC TELEFON BEBE ALBASTRU: mai multe informații
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Cauți ABC TELEFON BEBE ALBASTRU? Pe Adovo găsești ABC TELEFON BEBE ALBASTRU nou și alte produse similare din categoria <span className="text-emerald-600 font-medium cursor-pointer">Jucarii si jocuri</span> la prețuri competitive. Consultă descrierea completă și specificațiile produsului, contactează vânzătorul direct prin chat și finalizează achiziția în siguranță, cu plată securizată prin card și livrare prin curier oriunde în România.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Adovo este marketplace-ul românesc unde cumperi și vinzi orice: electronice, mobilă, îmbrăcăminte, electrocasnice, piese auto, articole sport și multe altele. Fie că ești în București sau în orice alt oraș, anunțurile sunt livrate rapid la adresa ta. Adovo reúnește mii de vânzători verificați și oferă o platformă sigură cu sistem de plată integrat, protecție cumpărători și suport dedicat. Descoperă zilnic anunțuri noi din categoria Mama si Copilul și găsește oferta meci perfectă la cel mai bun preț.
              </p>
            </div>

          </div>


          {/* RIGHT SIDEBAR (STICKY BUY/SELLER CONTAINER) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6">
            
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-6">
              
              {/* Seller Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <h3 className="text-lg font-bold text-slate-900">Vânzător</h3>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                    isLiked ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Seller Profile Row */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#059669] text-white font-bold text-xl flex items-center justify-center flex-shrink-0">
                  O
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base leading-tight">ONLINE QAZN SRL</h4>
                  <div className="text-[11px] text-gray-400 font-medium mt-1">
                    CUI: 43511394 · Reg: J23/872/2023
                  </div>
                  <div className="flex items-center gap-1 text-xs text-yellow-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-gray-400 text-xs ml-1 font-medium">(3)</span>
                  </div>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                  Cantitate
                </label>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center border border-gray-200 rounded-xl bg-white p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900 text-base">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    din 24 disponibile
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 pt-1">
                  Total: <span className="text-base font-extrabold">{(92.77 * quantity).toFixed(2).replace('.', ',')} RON</span>
                </div>
              </div>

              {/* TBI Bank Installments Card */}
              <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-lg tracking-wider">
                    tbi <span className="font-normal text-gray-300">bank</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">
                      de la <span className="font-bold">37,41 lei/lună</span> · 4 rate
                    </div>
                    <div className="text-[11px] font-bold text-red-600 mt-0.5">
                      Cumpără acum, plătește mai târziu
                    </div>
                  </div>
                </div>
                <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-slate-700 transition-colors" />
              </div>

              {/* Buy Now Button */}
              <div>
                <button className="w-full btn-gradient">
                  Cumpără acum
                </button>
                <p className="text-[11px] text-gray-400 text-center font-medium mt-2 px-2 leading-tight">
                  Poți cumpăra și fără cont, îți creăm unul automat ca să urmărești comanda.
                </p>
              </div>

              {/* Send Message Button */}
              <button className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-slate-800 font-bold text-base rounded-2xl transition-colors">
                Trimite mesaj
              </button>

              {/* Sameday Courier Pill */}
              <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-3.5 flex items-center gap-3">
                <Package className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  Curier Sameday <span className="font-normal text-gray-500">(0.6 kg)</span>
                </span>
              </div>

              {/* Metadata Footer */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-xs font-medium text-gray-500">
                <div className="flex justify-between">
                  <span>ID Anunț</span>
                  <span className="font-bold text-slate-900">#238697</span>
                </div>
                <div className="flex justify-between">
                  <span>Publicat la</span>
                  <span className="font-bold text-slate-900">22.07.2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Vizualizări</span>
                  <span className="font-bold text-slate-900">2</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Similar Products Section */}
        <section className="mt-16 border-t border-gray-200/60 pt-12">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
            Produse similare
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((prod, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center p-4">
                  <Image src={prod.image} alt={prod.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug mb-2 group-hover:text-emerald-600 transition-colors">
                      {prod.title}
                    </h3>
                    <div className="text-xl font-black text-slate-900 mb-2">
                      {prod.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-200">
                        {prod.condition}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                        <span className="text-yellow-400 text-xs">★</span> {prod.rating}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 font-medium flex items-center gap-1 mb-3">
                      <Tag className="w-3 h-3" /> {prod.category}
                    </div>
                    <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors">
                      Vezi Detalii
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
