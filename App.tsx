
import React, { useState } from 'react';
import Header from './components/Header';
import ComparisonResult from './components/ComparisonResult';
import ManualEditor from './components/ManualEditor';
import { generateProductComparison } from './services/geminiService';
import { ComparisonData } from './types';

type AppMode = 'admin' | 'live';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('admin');
  const [activeTab, setActiveTab] = useState<'generator' | 'editor'>('generator');
  const [productA, setProductA] = useState('');
  const [productB, setProductB] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Editorial State
  const [comparisonData, setComparisonData] = useState<ComparisonData>({
    title: "The Battle of Giants: A Product Comparison",
    subtitle: "In-depth analysis of today's leading market solutions.",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: "Market Analysis",
    summary: "Select two products above to generate a professional journalistic review using our archival analysis engine.",
    productA: { name: "", pros: [], cons: [], priceRange: "", affiliateUrl: "#", rating: 5, imageUrl: "" },
    productB: { name: "", pros: [], cons: [], priceRange: "", affiliateUrl: "#", rating: 5, imageUrl: "" },
    verdict: "Awaiting data input.",
    author: "The Editorial Board"
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productA || !productB) return;

    setLoading(true);
    setError(null);

    try {
      const result = await generateProductComparison(productA, productB);
      setComparisonData(result.data);
      setActiveTab('editor'); // Move to editor to allow fine-tuning
    } catch (err: any) {
      setError(err.message || "An error occurred during archival retrieval.");
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'live') {
    return (
      <div className="min-h-screen bg-[#fcfaf2]">
        <div className="max-w-4xl mx-auto pt-4 px-4">
          <button 
            onClick={() => setMode('admin')}
            className="text-[10px] font-classic uppercase tracking-widest text-gray-400 hover:text-black mb-4 print:hidden"
          >
            &larr; Return to Press Office
          </button>
        </div>
        <Header />
        <main className="max-w-4xl mx-auto px-4 pb-20">
          <ComparisonResult data={comparisonData} />
        </main>
        <footer className="border-t border-black max-w-4xl mx-auto py-8 text-center px-4">
           <p className="font-classic text-[10px] uppercase tracking-[0.2em] text-gray-500">
             &copy; {new Date().getFullYear()} The Editorial Review. All Affiliate Links Active.
           </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Admin Dashboard Header */}
      <div className="bg-black text-white py-2 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="font-classic uppercase text-xs tracking-widest font-bold">Press Room Dashboard</div>
        <button 
          onClick={() => setMode('live')}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-1 text-[10px] uppercase font-bold tracking-widest transition-colors"
        >
          View Live Site
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <nav className="flex mb-6 bg-white shadow-sm border border-gray-200">
          <button 
            onClick={() => setActiveTab('generator')}
            className={`flex-1 py-4 text-xs font-classic uppercase font-bold tracking-widest transition-all ${activeTab === 'generator' ? 'bg-white border-b-2 border-black' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
          >
            1. AI Content Engine
          </button>
          <button 
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-4 text-xs font-classic uppercase font-bold tracking-widest transition-all ${activeTab === 'editor' ? 'bg-white border-b-2 border-black' : 'bg-gray-50 text-gray-400 hover:text-gray-600'}`}
          >
            2. Manual Copy Desk
          </button>
        </nav>

        {activeTab === 'generator' ? (
          <div className="bg-white p-12 border border-gray-200 shadow-sm animate-fade-in">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-newspaper-serif text-3xl font-bold mb-4 uppercase tracking-tighter">New Comparison Request</h2>
              <p className="font-body-serif text-gray-500 mb-10 italic">Input products for the "Backend" AI to analyze. The result will be populated in your editor.</p>
              
              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Product Name A" 
                    value={productA}
                    onChange={(e) => setProductA(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 p-3 font-body-serif focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Product Name B" 
                    value={productB}
                    onChange={(e) => setProductB(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 p-3 font-body-serif focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-black text-white py-4 font-classic uppercase font-bold tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400"
                >
                  {loading ? 'AI Engine Processing...' : 'Draft with AI'}
                </button>
              </form>
              {error && <p className="mt-4 text-red-600 font-classic text-sm font-bold italic">{error}</p>}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <ManualEditor 
              data={comparisonData} 
              onChange={setComparisonData} 
              onPreview={() => setMode('live')} 
            />
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-2 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
          <p className="font-classic uppercase tracking-[0.4em] text-sm font-bold">Consulting Archives</p>
        </div>
      )}
    </div>
  );
};

export default App;
