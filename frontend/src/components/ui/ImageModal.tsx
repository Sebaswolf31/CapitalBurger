'use client';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const ImageModal = ({ isOpen, onClose, imageSrc, altText }: any) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 transition-all duration-300'
      onClick={onClose} // Cierre al tocar el fondo
    >
      {/* Botón de cerrar optimizado para móvil horizontal */}
      <button
        className='absolute top-4 right-4 p-2 text-white/70 hover:text-urban-green transition-colors z-[1000] bg-black/50 rounded-full border border-white/10'
        onClick={(e) => {
          e.stopPropagation(); // Evita conflictos de burbujeo
          onClose();
        }}
        type='button'
        aria-label='Cerrar modal'
      >
        <X size={28} />
      </button>

      <div
        className='relative w-full h-full flex flex-col items-center justify-center'
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageSrc}
          alt={altText}
          className='max-h-[75vh] md:max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl border border-white/5'
        />
        {/* Texto opcional más pequeño para no empujar la imagen en horizontal */}
        <p className='mt-3 font-heading text-sm text-white/80 uppercase italic tracking-[0.2em]'>
          {altText}
        </p>
      </div>
    </div>
  );
};
