
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import EditorBlock from './components/EditorBlock';
import { EditorialBlock, BlockType } from './types';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [blocks, setBlocks] = useState<EditorialBlock[]>([
    {
      id: '1',
      type: 'headline',
      position: { x: 50, y: 10, w: 1000, h: 100 },
      content: 'THE NEW EDITORIAL REVOLUTION'
    },
    {
      id: '2',
      type: 'text',
      position: { x: 50, y: 150, w: 450, h: 400 },
      content: 'Compose your stories by dragging and resizing these blocks. This canvas allows you to create the authentic newspaper look for your affiliate marketing needs. Every paragraph, headline, and product card is under your total control.'
    }
  ]);

  const addBlock = (type: BlockType) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newBlock: EditorialBlock = {
      id,
      type,
      position: { x: 100, y: 100, w: type === 'headline' ? 600 : 300, h: type === 'product' ? 400 : 200 },
      content: type === 'headline' ? 'New Headline' : 'Enter your story text here...',
      product: type === 'product' ? {
        name: 'Product Name',
        pros: ['First Strength'],
        cons: ['First Weakness'],
        price: '$0.00',
        link: 'https://'
      } : undefined
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = useCallback((id: string, updates: Partial<EditorialBlock>) => {
    setBlocks(current => current.map(b => b.id === id ? { ...b, ...updates } : b));
  }, []);

  const deleteBlock = (id: string) => {
    setBlocks(current => current.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen pb-40">
      {/* Control Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex gap-4 bg-black text-white px-6 py-3 rounded-full shadow-2xl items-center border border-gray-700">
        <div className="flex gap-2 pr-4 border-r border-gray-700">
          <button 
            onClick={() => addBlock('headline')}
            className="text-[10px] uppercase font-bold tracking-widest hover:text-gray-400 transition-colors"
          >
            + Headline
          </button>
          <button 
            onClick={() => addBlock('text')}
            className="text-[10px] uppercase font-bold tracking-widest hover:text-gray-400 transition-colors"
          >
            + Paragraph
          </button>
          <button 
            onClick={() => addBlock('product')}
            className="text-[10px] uppercase font-bold tracking-widest hover:text-gray-400 transition-colors"
          >
            + Product
          </button>
        </div>
        
        <button 
          onClick={() => setIsLocked(!isLocked)}
          className={`px-4 py-1 text-[10px] uppercase font-bold tracking-widest transition-all rounded ${isLocked ? 'bg-red-800 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
        >
          {isLocked ? 'Unlock Editor' : 'Lock Layout (Read Mode)'}
        </button>
      </div>

      <Header />

      <main className={`max-w-[1200px] mx-auto mt-8 relative ${isLocked ? '' : 'drafting-board shadow-inner border border-gray-200'}`}>
        {blocks.map(block => (
          <EditorBlock 
            key={block.id} 
            block={block} 
            isLocked={isLocked} 
            onUpdate={updateBlock} 
            onDelete={deleteBlock}
          />
        ))}

        {/* Informative placeholder if empty */}
        {blocks.length === 0 && (
          <div className="h-[500px] flex items-center justify-center text-gray-300 font-classic text-xl italic">
            Your canvas is empty. Use the controls below to start drafting.
          </div>
        )}
      </main>

      {isLocked && (
        <footer className="mt-40 py-20 border-t border-black max-w-[1200px] mx-auto text-center px-4">
           <p className="font-classic text-[10px] uppercase tracking-[0.2em] text-gray-500">
             THE EDITORIAL REVIEW &copy; {new Date().getFullYear()} — MANUALLY CRAFTED FOR EXCELLENCE
           </p>
        </footer>
      )}
    </div>
  );
};

export default App;
