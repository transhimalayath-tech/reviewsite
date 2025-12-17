
import React from 'react';
import { ComparisonData } from '../types';

interface ComparisonResultProps {
  data: ComparisonData;
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({ data }) => {
  const renderProduct = (product: typeof data.productA, side: 'A' | 'B') => (
    <div className="border-b border-gray-200 md:border-none pb-8 md:pb-0">
      <h3 className="font-newspaper-serif text-3xl font-bold mb-4 border-b-2 border-black pb-2">{product.name}</h3>
      
      {product.imageUrl && (
        <div className="mb-6 border-2 border-black p-1">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-64 object-cover grayscale"
          />
          <div className="mt-2 text-[10px] font-classic uppercase italic text-center border-t border-gray-100 pt-1">
            Product Profile: {product.name}
          </div>
        </div>
      )}

      <div className="text-2xl font-classic mb-6 font-bold text-gray-900 border-b border-gray-100 inline-block">{product.priceRange}</div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div>
          <h4 className="font-classic uppercase font-bold text-green-800 text-xs mb-3 tracking-widest">Key Advantages</h4>
          <ul className="space-y-2 text-sm font-body-serif leading-relaxed">
            {product.pros.map((pro, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-800 font-bold">✓</span> {pro}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-classic uppercase font-bold text-red-800 text-xs mb-3 tracking-widest">Notable Disadvantages</h4>
          <ul className="space-y-2 text-sm font-body-serif leading-relaxed opacity-80">
            {product.cons.map((con, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-red-800 font-bold">✕</span> {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a 
        href={product.affiliateUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block bg-black text-white px-8 py-3 font-classic uppercase font-bold tracking-widest text-xs hover:bg-gray-800 transition-colors"
      >
        Check Availability & Pricing &rarr;
      </a>
    </div>
  );

  return (
    <article className="animate-fade-in">
      <div className="mb-12 text-center">
        <span className="inline-block text-[10px] font-classic uppercase font-bold text-red-800 border border-red-800 px-3 py-1 mb-4">The Final Word</span>
        <h1 className="font-newspaper-serif text-5xl md:text-7xl font-bold mb-6 leading-none tracking-tighter">
          {data.title}
        </h1>
        <div className="max-w-2xl mx-auto">
          <p className="font-body-serif italic text-xl md:text-2xl text-gray-600 leading-tight mb-6">
            {data.subtitle}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 text-[10px] font-classic uppercase font-bold border-y border-gray-200 py-3 mt-4">
          <span>By {data.author}</span>
          <span className="text-gray-300">|</span>
          <span>{data.date}</span>
        </div>
      </div>

      <div className="font-body-serif text-gray-800 leading-relaxed text-lg mb-16 max-w-2xl mx-auto first-letter:text-7xl first-letter:font-newspaper-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:mt-1">
        {data.summary}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20 border-t-4 border-black pt-12">
        {renderProduct(data.productA, 'A')}
        {renderProduct(data.productB, 'B')}
      </div>

      <div className="bg-[#1a1a1a] text-white p-12 md:p-16 mb-16 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-newspaper-serif text-4xl font-bold mb-6 border-b border-gray-700 pb-4">Conclusion</h3>
          <p className="font-body-serif text-xl italic leading-relaxed text-gray-300">
            "{data.verdict}"
          </p>
        </div>
        <div className="absolute top-0 right-0 p-4 font-classic text-[60px] opacity-10 font-bold select-none">"</div>
      </div>

      <div className="border-t-2 border-black pt-12 text-center">
        <p className="font-classic text-[10px] uppercase tracking-widest font-bold mb-6">Product Information & Affiliate Disclosure</p>
        <p className="font-body-serif text-xs text-gray-500 max-w-lg mx-auto italic">
          Prices and availability are accurate at the time of publication. This review represents the independent analysis of the Editorial Board. We may receive a commission for purchases made through links on this page.
        </p>
      </div>
    </article>
  );
};

export default ComparisonResult;
