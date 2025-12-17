
import React from 'react';
import { ComparisonData } from '../types';

interface ArticleCardProps {
  article: ComparisonData;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="border-b border-gray-300 pb-8 mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-classic uppercase font-bold tracking-widest text-red-800">{article.category}</span>
        <span className="text-xs font-classic italic">{article.date}</span>
      </div>
      <h2 className="font-newspaper-serif text-3xl font-bold mb-3 hover:underline cursor-pointer leading-tight">
        {article.title}
      </h2>
      <p className="font-body-serif italic text-lg mb-4 text-gray-700">
        {article.subtitle}
      </p>
      <div className="font-body-serif text-sm leading-relaxed text-gray-800 line-clamp-3 mb-4">
        {article.summary}
      </div>
      <div className="flex items-center text-xs font-classic">
        <span className="uppercase font-bold">By {article.author}</span>
        <span className="mx-2">•</span>
        <span className="uppercase">5 Min Read</span>
      </div>
    </article>
  );
};

export default ArticleCard;
