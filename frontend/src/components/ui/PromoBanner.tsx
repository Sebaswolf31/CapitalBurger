'use client';
import { useState } from 'react';
import { X, Bike, Flame } from 'lucide-react';

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className='bg-urban-green text-black relative z-[400] shadow-lg shadow-urban-green/20'>
      <div className='max-w-md mx-auto px-4 py-2 flex items-center justify-between'>
        {/* TEXTO DE LA OFERTA */}
        <div className='flex-1 flex items-center justify-center gap-2 text-center'>
          <Bike size={18} className='animate-bounce hidden sm:block' />
          <p className='font-heading font-bold text-[10px] sm:text-xs uppercase tracking-widest'>
            <span className='hidden sm:inline'>¡Solo por hoy! </span>
            Domicilio{' '}
            <span className='bg-black text-urban-green px-1 mx-1 rounded'>
              GRATIS
            </span>{' '}
            pidiendo aquí
          </p>
          <Flame size={16} className='text-red-600 animate-pulse' />
        </div>

        {/* BOTÓN CERRAR */}
        <button
          onClick={() => setIsVisible(false)}
          className='absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors'
          aria-label='Cerrar oferta'
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
