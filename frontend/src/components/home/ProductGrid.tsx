'use client';
import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { menu } from '@/data/menu';
import { ProductModal } from './ProductModal';
import { Product } from '@/components/types/index';

export const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('hamburguesas');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Estado para el modal

  const [availableCategories, setAvailableCategories] = useState([
    { id: 'hamburguesas', label: 'Hamburguesas' },
    { id: 'perros', label: 'Perros' },
    { id: 'salchipapas', label: 'Salchipapas' },
  ]);

  useEffect(() => {
    // 0=Dom, 1=Lun, 2=Mar, 3=Mie, 4=Jue, 5=Vie, 6=Sab
    const today = new Date().getDay();

    // Categorías base que siempre están
    const cats = [
      { id: 'hamburguesas', label: 'Hamburguesas' },
      { id: 'perros', label: 'Perros' },
      { id: 'salchipapas', label: 'Salchipapas' },
    ];

    // Lógica de Miércoles (3) y Jueves (4) - PROMOCIONES
    if (today === 3 || today === 4) {
      cats.push({ id: 'promociones', label: 'Promociones' });
    }

    // Lógica de Sábado (6) y Domingo (0) - PICADAS
    if (today === 6 || today === 0) {
      cats.push({ id: 'picadas', label: 'Picadas' });
    }

    setAvailableCategories(cats);
  }, []);

  useEffect(() => {
    const handleExternalCategoryChange = (event: any) => {
      const newCategory = event.detail; // Aquí llega 'promociones' o 'picadas'
      setActiveCategory(newCategory);
    };

    // Nos ponemos en modo "escucha"
    window.addEventListener('setMenuCategory', handleExternalCategoryChange);

    // Limpiamos al salir
    return () => {
      window.removeEventListener(
        'setMenuCategory',
        handleExternalCategoryChange,
      );
    };
  }, []);

  // --- TU LÓGICA DE FILTRADO Y ORDEN (SE MANTIENE IGUAL) ---
  const filteredProducts = menu
    .filter((item) => item.category === activeCategory)
    .sort((a, b) => {
      const aVal = a.isPromo ? 1 : 0;
      const bVal = b.isPromo ? 1 : 0;
      return bVal - aVal;
    });

  return (
    <section className='py-8' id='menu'>
      {/* FILTRO ÚNICO Y CENTRADO */}
      <div className='flex justify-center gap-2 mb-8 flex-wrap'>
        {availableCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-1.5 rounded-full font-heading text-[10px] uppercase tracking-wider transition-all border ${
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
          <div
            key={item.id}
            onClick={() => setSelectedProduct(item)}
            className='cursor-pointer transition-transform hover:scale-[1.01] active:scale-95'
          >
            {/* IMPORTANTE: Dentro de ProductCard NO debe haber botones con addToCart.
               La tarjeta entera ahora funciona como el disparador del modal.
            */}
            <ProductCard product={item} />
          </div>
        ))}
      </div>

      {/* Solo mostramos el modal si hay un producto seleccionado */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};
