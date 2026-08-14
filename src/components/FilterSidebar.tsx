"use client";

import { ChevronDown, LayoutGrid, MapPin, CheckCircle } from 'lucide-react';

export default function FilterSidebar() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between">
        <h2 className="font-bold text-slate-900 text-xl">Filtre</h2>
        <button className="text-emerald-500 font-semibold text-base hover:text-emerald-600 transition-colors">
          Resetează
        </button>
      </div>

      {/* Categorie */}
      <div className="px-6 py-4.5 cursor-pointer hover:bg-gray-50/60 transition-colors group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-400 mb-0.5">Categorie</div>
              <div className="text-[15px] font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Toate categoriile</div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-emerald-600 stroke-[2] group-hover:translate-y-0.5 group-hover:scale-110 transition-all" />
        </div>
      </div>

      {/* Locație */}
      <div className="px-6 py-4.5 cursor-pointer hover:bg-gray-50/60 transition-colors group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-400 mb-0.5">Locație</div>
              <div className="text-[15px] font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Toate locațiile</div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-emerald-600 stroke-[2] group-hover:translate-y-0.5 group-hover:scale-110 transition-all" />
        </div>
      </div>

      {/* Stare */}
      <div className="px-6 py-4.5 cursor-pointer hover:bg-gray-50/60 transition-colors group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <CheckCircle className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-400 mb-0.5">Stare</div>
              <div className="text-[15px] font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Toate</div>
            </div>
          </div>
          <ChevronDown className="w-5 h-5 text-emerald-600 stroke-[2] group-hover:translate-y-0.5 group-hover:scale-110 transition-all" />
        </div>
      </div>

      {/* Preț */}
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-base font-bold text-slate-900">Preț</div>
          <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg border border-emerald-100/60">
            RON
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <input 
            type="text" 
            placeholder="De la" 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          <span className="text-gray-400 font-medium text-sm">-</span>
          <input 
            type="text" 
            placeholder="Până la" 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-slate-700 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Apply Button Container */}
      <div className="p-3 bg-gray-50/30">
        <button className="w-full py-3.5 bg-[#059669] hover:bg-[#047857] active:bg-[#065f46] text-white font-bold text-base rounded-xl transition-colors shadow-sm">
          Aplică filtrele
        </button>
      </div>
    </div>
  );
}
