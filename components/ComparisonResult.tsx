
import React from 'react';
import { ComparisonData, GroundingSource } from '../types';

interface ComparisonResultProps {
  data: ComparisonData;
  sources?: any[];
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({ data, sources = [] }) => {
  const formattedSources: GroundingSource[] = (sources || [])
    .filter(s => s.web || s.maps)
    .map(s => s.web ? { title: s.web.title, uri: s.web.uri } : { title: s.maps?.title || 'Location Source', uri: s.maps?.uri });

  const renderProduct = (product: typeof data.productA, side: 'A' | 'B') => (
    <div className="border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-newspaper-serif text-3xl font-bold mb-2 border-b-2 border-black pb-2">{product.name}</h3>
      
      {product.imageUrl && (
        <div className="mb-6 border-4 border-double border-black p-1">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="mt-2 text-[10px] font-classic uppercase italic text-center border-t border-gray-200 pt-1">
            Fig. {side}: {product.name} depicted in studio lighting.
          </div>
        </div>
      )}

      <div className="text-xl font-classic mb-4 font-bold text-gray-600">{product.priceRange}</div>
      
      <div className="mb-6">
        <h4 className="font-classic uppercase font-bold text-green-700 mb-2 border-b border-green-100">The Strengths</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm font-body-serif">
          {product.pros.map((pro, i) => <li key={i}>{pro}</li>)}
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="font-classic uppercase font-bold text-red-700 mb-2 border-b border-red-100">The Drawbacks</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm font-body-serif">
          {product.cons.map((con, i) => <li key={i}>{con}</li>)}
        </ul>
      </div>

      <a 
        href={product.affiliateUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full bg-black text-white text-center py-3 font-classic uppercase font-bold tracking-widest hover:bg-gray-800 transition-colors"
      >
        Check Current Price
      </a>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto my-12 animate-fade-in">
      <div className="mb-10 text-center">
        <div className="text-sm font-classic uppercase font-bold text-red-800 mb-2">Exclusive Review</div>
        <h2 className="font-newspaper-serif text-4xl md:text-6xl font-bold mb-6 leading-none">
          {data.title}
        </h2>
        <div className="border-y border-black py-4 mb-8">
          <p className="font-body-serif italic text-xl md:text-2xl text-gray-700 leading-tight">
            {data.subtitle}
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 text-sm font-classic uppercase font-bold">
          <span>By {data.author}</span>
          <span>|</span>
          <span>{data.date}</span>
        </div>
      </div>

      <div className="column-count-2 font-body-serif text-gray-800 leading-relaxed text-justify mb-12">
        <span className="float-left text-7xl font-newspaper-serif font-bold mr-3 mt-1 leading-none">
          {data.summary.charAt(0)}
        </span>
        {data.summary.slice(1)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 border-t-2 border-black pt-12">
        {renderProduct(data.productA, 'A')}
        {renderProduct(data.productB, 'B')}
      </div>

      <div className="bg-[#1a1a1a] text-white p-10 mb-12">
        <h3 className="font-newspaper-serif text-4xl font-bold mb-4 border-b border-gray-600 pb-2">The Verdict</h3>
        <p className="font-body-serif text-lg italic leading-relaxed">
          "{data.verdict}"
        </p>
      </div>

      {formattedSources.length > 0 && (
        <div className="border-t border-gray-300 pt-8 mb-12">
          <h4 className="font-classic uppercase font-bold mb-4 text-xs tracking-widest">Grounding References & Resources</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formattedSources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-body-serif text-blue-800 underline hover:text-blue-600 truncate"
              >
                {source.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonResult;
