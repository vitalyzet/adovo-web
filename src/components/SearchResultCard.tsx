import { BarChart2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SearchResultCardProps {
  title: string;
  price: number;
  currency?: string;
  condition: string;
  date: string;
  promoted?: boolean;
  isAuto?: boolean;
  specs?: string[];
  href?: string;
  image?: string;
}

export default function SearchResultCard({ 
  title, 
  price, 
  currency = 'RON',
  condition, 
  date,
  promoted = false,
  isAuto = false,
  specs = [],
  href,
  image = "/262ed2f0-b9bb-403c-89ef-3de48e1c8a10-1.png"
}: SearchResultCardProps) {
  // Format price
  const formattedPrice = currency === 'EUR'
    ? price.toLocaleString('ro-RO')
    : new Intl.NumberFormat('ro-RO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);

  const targetHref = href || (isAuto || currency === 'EUR' ? '/auto/1' : '/anunt/1');
  const isSvg = image.endsWith('.svg');

  return (
    <Link href={targetHref} className="listing-card-item cursor-pointer w-full block group">
      {/* Image Container */}
      <div className={`relative w-full h-full min-h-[105px] border-r border-gray-100 overflow-hidden flex items-center justify-center ${isSvg ? 'bg-emerald-50/50 p-4' : 'bg-gray-50'}`}>
        <div className="w-full h-full flex items-center justify-center">
          <Image 
            src={image} 
            alt={title} 
            width={170} 
            height={105} 
            className={`group-hover:scale-105 transition-transform duration-300 ${isSvg ? 'object-contain max-w-[48px] max-h-[48px] w-auto h-auto' : 'w-full h-full object-cover'}`} 
          />
        </div>
        
        {/* Promovat Badge */}
        {promoted && (
          <div className="absolute top-0 left-0 bg-[#059669] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg shadow-sm z-10">
            Promovat
          </div>
        )}

        {/* Graph button overlay */}
        <button className="absolute bottom-1.5 left-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md text-gray-500 hover:text-emerald-600 transition-colors z-10 border border-gray-100">
          <BarChart2 className="w-3 h-3" />
        </button>
      </div>

      {/* Content Container (Middle Section) */}
      <div className="py-2.5 px-3.5 flex flex-col justify-between border-r border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-1.5 line-clamp-1 group-hover:text-emerald-600 transition-colors leading-snug">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full border border-emerald-200/80">
              {condition}
            </span>

            {/* Render car spec badges if available */}
            {specs.map((spec, index) => (
              <span key={index} className="inline-flex items-center px-2 py-0.5 bg-gray-50 text-gray-600 text-[11px] font-medium rounded-md border border-gray-200/70">
                {spec}
              </span>
            ))}

            {!isAuto && (
              <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium ml-1">
                <span className="text-yellow-400 text-xs">★</span> 5.0
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-1">
          <div className="text-[11px] font-medium text-gray-400">
            {date}
          </div>
        </div>
      </div>

      {/* Pricing Container (Right Section) */}
      <div className="py-2.5 px-3.5 flex flex-col justify-center items-end bg-white min-w-[140px]">
        <div className="text-lg font-extrabold text-slate-900 flex items-baseline whitespace-nowrap">
          {formattedPrice}
          <span className="text-[11px] font-bold text-slate-700 ml-1">{currency}</span>
        </div>
        <div className="text-xs text-slate-500 font-medium mt-0.5">Negociabil</div>
      </div>
    </Link>
  );
}
