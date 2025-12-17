
import React, { useState } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ComparisonResult from './components/ComparisonResult';
import ManualEditor from './components/ManualEditor';
import { generateProductComparison } from './services/geminiService';
import { ComparisonData } from './types';

type Tab = 'generator' | 'editor' | 'published';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generator');
  const [productA, setProductA] = useState('');
  const [productB, setProductB] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  
  // Editorial State
  const [comparisonData, setComparisonData] = useState<ComparisonData>({
    title: "New Product Comparison",
    subtitle: "Investigating the latest market trends and consumer value.",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    category: "General",
    summary: "In today's fast-moving market, choosing the right tool for the job is harder than ever. We dive into the details.",
    productA: { name: "", pros: [], cons: [], priceRange: "$$$", affiliateUrl: "#", rating: 5, imageUrl: "" },
    productB: { name: "", pros: [], cons: [], priceRange: "$$$", affiliateUrl: "#", rating: 5, imageUrl: "" },
    verdict: "Awaiting final analysis.",
    author: "Editorial Staff"
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productA || !productB) return;

    setLoading(true);
    setError(null);

    try {
      const result = await generateProductComparison(productA, productB);
      setComparisonData(result.data);
      setSources(result.sources);
      setActiveTab('editor'); // Go to editor after generation so they can edit text/add images
    } catch (err: any) {
      setError(err.message || "An error occurred during comparison.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualCompose = () => {
    setActiveTab('editor');
  };

  const handleCommitToPrint = () => {
    setActiveTab('published');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf2] pb-20">
      <Header />
      
      {/* Newspaper Section Navigation (Tabs) */}
      <nav className="max-w-6xl mx-auto border-b border-gray-300 mb-8 flex">
        <button 
          onClick={() => setActiveTab('generator')}
          className={`px-8 py-3 font-classic uppercase font-bold tracking-widest text-xs transition-all border-r border-gray-200 ${activeTab === 'generator' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
        >
          I. The Generator
        </button>
        <button 
          onClick={() => setActiveTab('editor')}
          className={`px-8 py-3 font-classic uppercase font-bold tracking-widest text-xs transition-all border-r border-gray-200 ${activeTab === 'editor' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
        >
          II. The Press Room
        </button>
        {activeTab === 'published' && (
          <div className="px-8 py-3 font-classic uppercase font-bold tracking-widest text-xs bg-red-800 text-white">
            III. Final Edition
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-4">
        {activeTab === 'generator' && (
          <section className="animate-fade-in">
            <div className="newspaper-border py-12 mb-12 bg-white/50 px-6 border-x border-gray-200">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="font-newspaper-serif text-3xl font-bold mb-6 uppercase tracking-tight">Intelligence-Driven Review</h3>
                <p className="font-body-serif italic text-gray-600 mb-8">Deploy our automated research suite to draft a comprehensive comparison between any two products instantly.</p>
                <form onSubmit={handleGenerate} className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <input 
                      type="text" 
                      placeholder="Product A (e.g. Sony A7IV)" 
                      value={productA}
                      onChange={(e) => setProductA(e.target.value)}
                      className="flex-1 bg-transparent border-b-2 border-black font-body-serif py-3 text-xl focus:outline-none focus:border-red-800 transition-colors"
                      required
                    />
                    <div className="flex items-center justify-center font-classic font-bold italic text-gray-300 text-2xl">vs</div>
                    <input 
                      type="text" 
                      placeholder="Product B (e.g. Canon R6II)" 
                      value={productB}
                      onChange={(e) => setProductB(e.target.value)}
                      className="flex-1 bg-transparent border-b-2 border-black font-body-serif py-3 text-xl focus:outline-none focus:border-red-800 transition-colors"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="mt-4 bg-black text-white py-4 px-12 font-classic uppercase font-bold tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-400 text-sm"
                  >
                    {loading ? 'Transmitting to Archives...' : 'Initiate Automated Analysis'}
                  </button>
                </form>
                <div className="mt-8 text-[10px] font-classic uppercase text-gray-400">
                  OR <button onClick={handleManualCompose} className="underline hover:text-black">COMPOSE MANUALLY IN THE PRESS ROOM</button>
                </div>
                {error && <p className="mt-4 text-red-700 font-classic font-bold text-sm italic">{error}</p>}
              </div>
            </div>

            {/* Front Page Mockup for Context */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all pointer-events-none">
              <div className="md:col-span-2 border-r border-gray-200 pr-8">
                 <h4 className="font-classic uppercase font-bold mb-4 border-b border-black">Latest Headlines</h4>
                 <div className="space-y-8">
                   <div className="border-b border-gray-200 pb-4">
                     <span className="text-xs font-classic uppercase font-bold text-red-800">Technology</span>
                     <h2 className="font-newspaper-serif text-3xl font-bold">The Silicon Frontier: Mobile Giants Clash</h2>
                   </div>
                 </div>
              </div>
              <aside>
                <h4 className="font-classic uppercase font-bold mb-4 border-b border-black">Opinion</h4>
                <p className="font-body-serif italic text-sm">"The death of the affiliate link has been greatly exaggerated..."</p>
              </aside>
            </div>
          </section>
        )}

        {activeTab === 'editor' && (
          <section className="animate-fade-in">
             <ManualEditor 
               data={comparisonData} 
               onChange={setComparisonData} 
               onPreview={handleCommitToPrint} 
             />
          </section>
        )}

        {activeTab === 'published' && (
          <section className="animate-fade-in">
            <div className="flex justify-between items-center mb-8 border-b border-black pb-2">
              <button 
                onClick={() => setActiveTab('editor')}
                className="text-xs font-classic uppercase font-bold hover:underline"
              >
                &larr; Back to Editorial Desk
              </button>
              <div className="text-[10px] font-classic uppercase italic">Live Preview: Press Quality</div>
            </div>
            <ComparisonResult data={comparisonData} sources={sources} />
            <div className="mt-20 flex flex-col items-center">
               <p className="font-classic uppercase text-xs font-bold mb-4">Ready for Circulation?</p>
               <button className="bg-green-800 text-white px-12 py-3 font-classic uppercase font-bold tracking-widest hover:bg-green-900 transition-all">Publish to Web</button>
            </div>
          </section>
        )}

        {loading && (
          <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full animate-spin mb-6"></div>
            <p className="font-classic uppercase tracking-[0.3em] font-bold text-lg animate-pulse">Researching Archives</p>
            <p className="font-body-serif italic mt-2 text-gray-500">Cross-referencing sources for journalistic integrity...</p>
          </div>
        )}
      </main>

      <footer className="mt-20 py-10 border-t-2 border-black max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-classic uppercase tracking-widest font-bold text-gray-500">
          <p>&copy; 2024 THE EDITORIAL REVIEW. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Affiliate Disclosure</a>
            <a href="#" className="hover:text-black transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
