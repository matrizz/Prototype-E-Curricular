//@ts-nocheck
import { useState, useRef, useEffect } from 'react';

export default function Textarea() {
  

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      rows={1}
      placeholder="Digite seu texto aqui..."
      className="w-full p-2 border border-gray-300 rounded-md resize-none overflow-hidden"
      style={{ minHeight: '40px' }} // Altura mínima personalizada
    />
  );
}
