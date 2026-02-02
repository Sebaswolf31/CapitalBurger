'use client';
import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { menu } from '@/data/menu';

export const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('hamburguesas');

  const categories = [
    { id: 'hamburguesas', label: 'Hamburguesas' },
    { id: 'perros', label: 'Perros' },
    { id: 'salchipapas', label: 'Salchipapas' },
  ];

  // --- AQUÍ VA LA LÓGICA MODIFICADA ---
  // Primero filtramos por categoría y luego ordenamos para que los 'isPromo' suban al principio
  const filteredProducts = menu
    .filter((item) => item.category === activeCategory)
    .sort((a, b) => {
      const aVal = a.isPromo ? 1 : 0;
      const bVal = b.isPromo ? 1 : 0;
      return bVal - aVal; // Esto pone los 1 (true) antes que los 0 (false)
    });
  // ------------------------------------

  return (
    <section className='py-8' id='menu'>
      {/* FILTRO ÚNICO Y CENTRADO */}
      <div className='flex justify-center gap-2 mb-8 flex-wrap'>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full font-heading text-[8px] uppercase tracking-wider transition-all border ${
              activeCategory === cat.id
                ? 'bg-urban-green text-black border-urban-green font-bold'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-urban-green/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* TÍTULO DE LA SECCIÓN ACTIVA */}
      <div className='flex items-center gap-4 mb-10'>
        <h2 className='font-heading text-1xl uppercase italic text-white'>
          {activeCategory}{' '}
          <span className='text-urban-green'>Capital Burger</span>
        </h2>
        <div className='h-[1px] flex-grow bg-white/10' />
      </div>

      {/* GRID LIMPIO - Ahora mostrará los destacados primero */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};
