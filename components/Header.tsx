
import React from 'react';

const Header: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="py-8 px-4 text-center border-b-2 border-black max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm font-classic uppercase tracking-widest border-b border-gray-300 pb-2 mb-4">
        <span>ESTABLISHED 2024</span>
        <span>PRICELESS ADVICE</span>
        <span>VOL. I ... NO. 001</span>
      </div>
      
      <h1 className="font-newspaper-serif text-5xl md:text-8xl font-black mb-4 uppercase tracking-tighter">
        The Editorial Review
      </h1>
      
      <div className="newspaper-border py-2 flex flex-col md:flex-row justify-between items-center text-sm font-classic uppercase tracking-wider italic font-bold">
        <span>{today}</span>
        <span className="hidden md:block">COMPARING THE BEST, FOR THE SAVVY SHOPPER</span>
        <span>LATEST EDITION</span>
      </div>
    </header>
  );
};

export default Header;
