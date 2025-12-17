
import React, { useState } from 'react';
import { ComparisonData, ProductDetails } from '../types';

interface ManualEditorProps {
  data: ComparisonData;
  onChange: (updatedData: ComparisonData) => void;
  onPreview: () => void;
}

const ManualEditor: React.FC<ManualEditorProps> = ({ data, onChange, onPreview }) => {
  const [activeSubTab, setActiveSubTab] = useState<'text' | 'media'>('text');

  const updateField = (field: keyof ComparisonData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const updateProduct = (productKey: 'productA' | 'productB', field: keyof ProductDetails, value: any) => {
    onChange({
      ...data,
      [productKey]: { ...data[productKey], [field]: value }
    });
  };

  const updateList = (productKey: 'productA' | 'productB', listKey: 'pros' | 'cons', index: number, value: string) => {
    const newList = [...data[productKey][listKey]];
    newList[index] = value;
    updateProduct(productKey, listKey, newList);
  };

  const addListItem = (productKey: 'productA' | 'productB', listKey: 'pros' | 'cons') => {
    const newList = [...data[productKey][listKey], ''];
    updateProduct(productKey, listKey, newList);
  };

  return (
    <div className="editor-grid border-2 border-gray-300 p-8 mb-12 min-h-[600px] shadow-inner relative">
      <div className="flex justify-between items-center mb-8 border-b-2 border-black pb-4">
        <h3 className="font-newspaper-serif text-2xl font-bold uppercase tracking-tighter">Drafting Room</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveSubTab('text')}
            className={`px-4 py-1 text-xs font-classic uppercase font-bold border border-black transition-all ${activeSubTab === 'text' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            Lead Story
          </button>
          <button 
            onClick={() => setActiveSubTab('media')}
            className={`px-4 py-1 text-xs font-classic uppercase font-bold border border-black transition-all ${activeSubTab === 'media' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            Media Assets
          </button>
        </div>
      </div>

      {activeSubTab === 'text' ? (
        <div className="space-y-6 font-typewriter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold mb-1 opacity-50">Headline</label>
              <input 
                className="w-full bg-white/80 border border-gray-200 p-2 text-lg font-bold"
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold mb-1 opacity-50">Author Byline</label>
              <input 
                className="w-full bg-white/80 border border-gray-200 p-2"
                value={data.author}
                onChange={(e) => updateField('author', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold mb-1 opacity-50">Subheadline (The Hook)</label>
            <textarea 
              className="w-full bg-white/80 border border-gray-200 p-2 h-20 italic"
              value={data.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold mb-1 opacity-50">Main Body Copy (Summary)</label>
            <textarea 
              className="w-full bg-white/80 border border-gray-200 p-2 h-40 leading-relaxed"
              value={data.summary}
              onChange={(e) => updateField('summary', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
            {['productA', 'productB'].map((key) => {
              const pKey = key as 'productA' | 'productB';
              return (
                <div key={key}>
                  <h4 className="text-xs uppercase font-bold mb-4 border-b border-black">{pKey === 'productA' ? 'Primary' : 'Secondary'} Product Details</h4>
                  <div className="space-y-4">
                    <input 
                      placeholder="Product Name"
                      className="w-full bg-white border border-gray-200 p-2 font-bold"
                      value={data[pKey].name}
                      onChange={(e) => updateProduct(pKey, 'name', e.target.value)}
                    />
                    <div>
                      <label className="block text-[10px] uppercase mb-1">Pros</label>
                      {data[pKey].pros.map((pro, i) => (
                        <input 
                          key={i}
                          className="w-full bg-transparent border-b border-gray-100 text-sm mb-1"
                          value={pro}
                          onChange={(e) => updateList(pKey, 'pros', i, e.target.value)}
                        />
                      ))}
                      <button onClick={() => addListItem(pKey, 'pros')} className="text-[10px] text-blue-600 hover:underline">+ Add Strength</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6">
            <label className="block text-[10px] uppercase font-bold mb-1 opacity-50">Final Verdict</label>
            <textarea 
              className="w-full bg-[#1a1a1a] text-white border-none p-4 h-24 italic text-sm"
              value={data.verdict}
              onChange={(e) => updateField('verdict', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-8 font-typewriter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {['productA', 'productB'].map((key) => {
              const pKey = key as 'productA' | 'productB';
              return (
                <div key={key} className="space-y-4">
                  <h4 className="text-xs uppercase font-bold border-b border-black pb-1">Media for {data[pKey].name || 'Product ' + (pKey === 'productA' ? 'A' : 'B')}</h4>
                  <div className="aspect-video bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group">
                    {data[pKey].imageUrl ? (
                      <img src={data[pKey].imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    ) : (
                      <span className="text-gray-400 text-[10px] uppercase">No image linked</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase mb-1">Image URL</label>
                    <input 
                      className="w-full bg-white border border-gray-200 p-2 text-xs"
                      placeholder="Paste image URL here..."
                      value={data[pKey].imageUrl || ''}
                      onChange={(e) => updateProduct(pKey, 'imageUrl', e.target.value)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-yellow-50 p-4 border border-yellow-200 text-[10px] uppercase leading-tight italic">
            Note: For the authentic "Editorial Review" look, high-contrast imagery is recommended. Images will be processed as grayscale in the final publication layout.
          </div>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <button 
          onClick={onPreview}
          className="bg-black text-white px-12 py-4 font-classic uppercase font-bold tracking-[0.2em] shadow-lg hover:bg-gray-800 transition-all transform hover:-translate-y-1"
        >
          Commit to Print
        </button>
      </div>
    </div>
  );
};

export default ManualEditor;
