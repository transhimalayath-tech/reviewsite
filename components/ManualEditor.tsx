
import React, { useState } from 'react';
import { ComparisonData, ProductDetails } from '../types';

interface ManualEditorProps {
  data: ComparisonData;
  onChange: (updatedData: ComparisonData) => void;
  onPreview: () => void;
}

const ManualEditor: React.FC<ManualEditorProps> = ({ data, onChange, onPreview }) => {
  const [activeSubTab, setActiveSubTab] = useState<'copy' | 'media'>('copy');

  const updateField = (field: keyof ComparisonData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const updateProduct = (productKey: 'productA' | 'productB', field: keyof ProductDetails, value: any) => {
    onChange({
      ...data,
      [productKey]: { ...data[productKey], [field]: value }
    });
  };

  const handleListUpdate = (productKey: 'productA' | 'productB', listKey: 'pros' | 'cons', index: number, value: string) => {
    const list = [...data[productKey][listKey]];
    list[index] = value;
    updateProduct(productKey, listKey, list);
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm p-8">
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h3 className="font-classic uppercase text-xs font-bold tracking-[0.2em]">Refining the Draft</h3>
        <div className="flex bg-gray-100 p-1 rounded">
          <button 
            onClick={() => setActiveSubTab('copy')}
            className={`px-4 py-1.5 text-[10px] uppercase font-bold rounded transition-all ${activeSubTab === 'copy' ? 'bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Editorial Copy
          </button>
          <button 
            onClick={() => setActiveSubTab('media')}
            className={`px-4 py-1.5 text-[10px] uppercase font-bold rounded transition-all ${activeSubTab === 'media' ? 'bg-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Media & Links
          </button>
        </div>
      </div>

      {activeSubTab === 'copy' ? (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="md:col-span-2">
               <label className="text-[10px] uppercase font-bold text-gray-400">Main Headline</label>
               <input 
                 className="w-full border-b border-gray-300 py-2 font-newspaper-serif text-2xl focus:outline-none focus:border-black"
                 value={data.title}
                 onChange={(e) => updateField('title', e.target.value)}
               />
             </div>
             <div>
               <label className="text-[10px] uppercase font-bold text-gray-400">Byline</label>
               <input 
                 className="w-full border-b border-gray-300 py-2 font-classic text-sm focus:outline-none focus:border-black"
                 value={data.author}
                 onChange={(e) => updateField('author', e.target.value)}
               />
             </div>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400">Editorial Hook (Subtitle)</label>
            <input 
              className="w-full border-b border-gray-300 py-2 font-body-serif italic text-lg focus:outline-none focus:border-black"
              value={data.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400">Opening Statement (Summary)</label>
            <textarea 
              className="w-full border border-gray-200 p-4 font-body-serif text-sm leading-relaxed h-32 focus:outline-none focus:ring-1 focus:ring-black"
              value={data.summary}
              onChange={(e) => updateField('summary', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
            {['productA', 'productB'].map((p) => {
              const pKey = p as 'productA' | 'productB';
              return (
                <div key={p}>
                  <h4 className="text-[10px] uppercase font-bold mb-4 bg-gray-50 p-2 text-center">{pKey === 'productA' ? 'Primary' : 'Secondary'} Candidate</h4>
                  <input 
                    className="w-full font-bold text-sm border-b border-gray-200 mb-4 focus:outline-none focus:border-black"
                    value={data[pKey].name}
                    onChange={(e) => updateProduct(pKey, 'name', e.target.value)}
                  />
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold text-gray-300">Strengths (one per line)</label>
                    {data[pKey].pros.map((pro, i) => (
                      <input 
                        key={i}
                        className="w-full text-xs font-body-serif border-none bg-green-50/30 px-2 py-1 focus:outline-none"
                        value={pro}
                        onChange={(e) => handleListUpdate(pKey, 'pros', i, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-8 border-t border-gray-100">
            <label className="text-[10px] uppercase font-bold text-gray-400">The Editorial Verdict</label>
            <textarea 
              className="w-full bg-black text-white p-4 font-body-serif text-sm italic h-24 focus:outline-none"
              value={data.verdict}
              onChange={(e) => updateField('verdict', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-10 max-w-3xl mx-auto">
          {['productA', 'productB'].map((p) => {
            const pKey = p as 'productA' | 'productB';
            return (
              <div key={p} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-gray-100 bg-gray-50/50">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase">{data[pKey].name || 'Product ' + (pKey === 'productA' ? 'A' : 'B')}</h4>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-400">Image Asset URL</label>
                    <input 
                      className="w-full text-xs border border-gray-300 p-2 bg-white"
                      value={data[pKey].imageUrl || ''}
                      onChange={(e) => updateProduct(pKey, 'imageUrl', e.target.value)}
                      placeholder="https://images..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-400">Affiliate Destination Link</label>
                    <input 
                      className="w-full text-xs border border-gray-300 p-2 bg-white"
                      value={data[pKey].affiliateUrl || ''}
                      onChange={(e) => updateProduct(pKey, 'affiliateUrl', e.target.value)}
                      placeholder="https://amzn.to/..."
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase font-bold text-gray-400">Estimated Price Range</label>
                    <input 
                      className="w-full text-xs border border-gray-300 p-2 bg-white"
                      value={data[pKey].priceRange || ''}
                      onChange={(e) => updateProduct(pKey, 'priceRange', e.target.value)}
                      placeholder="$299 - $349"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center border-2 border-dashed border-gray-200">
                   {data[pKey].imageUrl ? (
                     <img src={data[pKey].imageUrl} className="max-h-32 grayscale object-contain" />
                   ) : (
                     <span className="text-[10px] uppercase text-gray-300">Preview Asset</span>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center border-t border-gray-100 pt-8">
        <button 
          onClick={onPreview}
          className="bg-red-700 text-white px-12 py-4 font-classic uppercase font-bold tracking-widest hover:bg-red-800 shadow-xl transition-all"
        >
          Publish to Live Site
        </button>
      </div>
    </div>
  );
};

export default ManualEditor;
