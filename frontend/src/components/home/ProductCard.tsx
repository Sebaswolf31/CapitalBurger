'use client';
import React, { useState } from 'react';
import { Product } from '@/components/types/index';
import { Flame } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, price, tag, image, isPromo } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NOTA: Quitamos el useCart y el addToCart de aquí.
  // Ahora la tarjeta solo "muestra" la info y abre el modal de personalización.

  return (
    <>
      <div
        className={`relative rounded-xl overflow-hidden flex flex-row h-full border transition-all duration-400 group shadow-lg ${
          isPromo
            ? 'bg-[#0f0f0f] border-urban-green shadow-[0_0_20px_rgba(0,255,102,0.15)] scale-[1.01]'
            : 'bg-urban-gray border-white/5'
        }`}
      >
        {/* INDICADOR DE PRODUCTO DEL MES */}
        {isPromo && (
          <div className='absolute top-0 right-0 bg-urban-green text-black px-2 py-1 z-20 rounded-bl-lg font-heading font-black text-[8px] md:text-[10px] uppercase italic flex items-center gap-1 shadow-md'>
            <Flame size={10} fill='black' /> Producto del Mes
          </div>
        )}

        {/* IMAGEN - Abre el visor de imagen al tocarla */}
        <div
          className='relative w-28 h-28 md:w-40 md:h-full overflow-hidden cursor-zoom-in bg-black flex-shrink-0'
          onClick={(e) => {
            e.stopPropagation(); // Evita que se abra el modal de adicionales al querer ver la foto
            setIsModalOpen(true);
          }}
        >
          {tag && !isPromo && (
            <span className='absolute top-2 left-2 z-10 bg-urban-yellow text-black text-[6px] md:text-[10px] font-black px-2 py-0.5 rounded-sm uppercase italic'>
              {tag}
            </span>
          )}
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110 ${
              isPromo ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
            }`}
          />
        </div>

        {/* CONTENIDO */}
        <div className='p-3 md:p-5 flex flex-col justify-between flex-grow cursor-pointer'>
          <div>
            <h3
              className={`font-heading text-lg md:text-xl uppercase italic leading-tight tracking-tighter ${
                isPromo ? 'text-urban-green font-black' : 'text-white'
              }`}
            >
              {name}
            </h3>
            <p className='text-gray-400 text-[7px] md:text-sm mt-1 md:mt-2 line-clamp-2 font-sans'>
              {description}
            </p>
          </div>

          <div className='mt-3 md:mt-5 flex items-center justify-between'>
            <span
              className={`font-heading text-lg md:text-2xl font-bold ${
                isPromo ? 'text-white' : 'text-urban-yellow'
              }`}
            >
              ${price.toLocaleString('es-CO')}
            </span>

            {/* Este botón ya no agrega, ahora solo indica que se puede "Ver más/Agregar" */}
            <div
              className={`font-bold text-[10px] md:text-[11px] py-2 px-4 md:px-6 rounded transition-all duration-150 uppercase shadow-sm ${
                isPromo
                  ? 'bg-urban-green text-black group-hover:bg-white border-none scale-105 shadow-[0_0_10px_rgba(0,255,102,0.5)]'
                  : 'bg-transparent border border-urban-green text-urban-green group-hover:bg-urban-green group-hover:text-black'
              }`}
            >
              {isPromo ? '¡Lo quiero!' : 'Agregar'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};