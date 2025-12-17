
import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { EditorialBlock, ProductData } from '../types';

interface EditorBlockProps {
  block: EditorialBlock;
  isLocked: boolean;
  onUpdate: (id: string, updates: Partial<EditorialBlock>) => void;
  onDelete: (id: string) => void;
}

const EditorBlock: React.FC<EditorBlockProps> = ({ block, isLocked, onUpdate, onDelete }) => {
  const nodeRef = useRef(null);

  const handleResize = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = block.position.w;
    const startH = block.position.h;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newW = Math.max(100, startW + (moveEvent.clientX - startX));
      const newH = Math.max(50, startH + (moveEvent.clientY - startY));
      onUpdate(block.id, { position: { ...block.position, w: newW, h: newH } });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const updateProductField = (field: keyof ProductData, value: any) => {
    if (!block.product) return;
    onUpdate(block.id, {
      product: { ...block.product, [field]: value }
    });
  };

  const renderContent = () => {
    switch (block.type) {
      case 'headline':
        return (
          <textarea
            className="w-full h-full bg-transparent font-newspaper-serif font-bold text-center resize-none border-none focus:outline-none leading-none overflow-hidden"
            style={{ fontSize: `${Math.min(block.position.w / 10, 80)}px` }}
            value={block.content}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            readOnly={isLocked}
          />
        );
      case 'text':
        return (
          <textarea
            className="w-full h-full bg-transparent font-body-serif text-lg leading-relaxed text-justify resize-none border-none focus:outline-none"
            value={block.content}
            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
            readOnly={isLocked}
          />
        );
      case 'product':
        if (!block.product) return null;
        return (
          <div className="h-full border-2 border-black p-4 flex flex-col bg-white">
            <input
              className="font-newspaper-serif text-2xl font-bold border-b border-gray-200 mb-2 focus:outline-none"
              value={block.product.name}
              placeholder="Product Name"
              onChange={(e) => updateProductField('name', e.target.value)}
              readOnly={isLocked}
            />
            
            <div className="flex-1 overflow-auto space-y-4 py-2">
              <div>
                <span className="text-[10px] font-classic uppercase font-bold text-green-700 block mb-1">Strengths</span>
                <textarea 
                  className="w-full text-xs font-body-serif bg-green-50/30 p-1 min-h-[60px]"
                  value={block.product.pros.join('\n')}
                  onChange={(e) => updateProductField('pros', e.target.value.split('\n'))}
                  placeholder="One pro per line..."
                  readOnly={isLocked}
                />
              </div>
              <div>
                <span className="text-[10px] font-classic uppercase font-bold text-red-700 block mb-1">Drawbacks</span>
                <textarea 
                  className="w-full text-xs font-body-serif bg-red-50/30 p-1 min-h-[60px]"
                  value={block.product.cons.join('\n')}
                  onChange={(e) => updateProductField('cons', e.target.value.split('\n'))}
                  placeholder="One con per line..."
                  readOnly={isLocked}
                />
              </div>
            </div>

            <div className="mt-4 border-t border-black pt-2">
              <input 
                className="w-full text-xs font-classic border-none mb-2 focus:outline-none"
                value={block.product.link}
                placeholder="Affiliate Link URL"
                onChange={(e) => updateProductField('link', e.target.value)}
                readOnly={isLocked}
              />
              <a 
                href={block.product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-black text-white text-center py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800"
              >
                Buy Now &rarr;
              </a>
            </div>
          </div>
        );
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".move-handle"
      position={{ x: block.position.x, y: block.position.y }}
      onStop={(e, data) => onUpdate(block.id, { position: { ...block.position, x: data.x, y: data.y } })}
      disabled={isLocked}
    >
      <div 
        ref={nodeRef}
        className={`block-container absolute group transition-shadow ${isLocked ? '' : 'hover:shadow-xl ring-1 ring-gray-200 ring-offset-2'}`}
        style={{ width: block.position.w, height: block.position.h }}
      >
        {!isLocked && (
          <div className="block-controls absolute -top-8 left-0 right-0 flex justify-between items-center px-1 bg-white border border-gray-200 rounded shadow-sm z-50">
            <div className="move-handle flex-1 h-6 flex items-center justify-center">
              <span className="text-[10px] font-classic uppercase font-bold text-gray-400">Drag to Move</span>
            </div>
            <button 
              onClick={() => onDelete(block.id)}
              className="text-red-500 hover:text-red-700 px-2 text-xs font-bold"
            >
              &times;
            </button>
          </div>
        )}

        {renderContent()}

        {!isLocked && (
          <div 
            className="resize-handle"
            onMouseDown={handleResize}
          />
        )}
      </div>
    </Draggable>
  );
};

export default EditorBlock;
