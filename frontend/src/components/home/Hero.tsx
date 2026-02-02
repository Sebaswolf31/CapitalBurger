'use client';
import React from 'react';
import { useCart } from '@/context/CartContext'; // Importar contexto

export const Hero = () => {
  const { totalItems, setIsCartOpen } = useCart();

  const handleOrderAction = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (totalItems > 0) {
      // Si hay productos, prevenimos el scroll y abrimos el carrito
      e.preventDefault();
      setIsCartOpen(true);
    }
    // Si es 0, dejamos que el href="#menu" haga su trabajo
  };

  return (
    <section className='relative h-[90vh] w-full flex items-center justify-center overflow-hidden'>
      {/* BACKGROUND IMAGE CON OVERLAY */}
      <div
        className='absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105'
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          filter: 'brightness(0.4)',
        }}
      />

      {/* CONTENIDO TEXTUAL */}
      <div className='relative z-10 text-center px-4'>
        <h1 className='font-bebas text-3xl md:text-8xl lg:text-6xl font-black leading-none tracking-wider text-white uppercase italic text-shadow-graffiti'>
          Capital Burger <br />
          <span className=' text-urban-green'>Sabor real</span>
        </h1>

        <p className='font-bebas mt-6 text-gray-300 text-lg md:text-xl font-sans max-w-lg mx-auto'>
          No seguimos tendencias, las cocinamos.
        </p>

        {/* BOTONES - Aquí usamos las clases que definimos en el CSS */}
        <div className='mt-10 flex flex-col md:flex-row gap-4 justify-center'>
          <a
            href='#menu'
            className='btn-urban border-2 border-urban-green text-urban-green 
             hover:bg-urban-green hover:text-black 
             active:scale-95 active:bg-urban-green active:text-black
             flex items-center justify-center transition-all'
          >
            Ver Menú
          </a>
          <a
            href='#menu'
            onClick={handleOrderAction}
            className='btn-urban bg-urban-green text-black 
             hover:bg-white active:scale-95 active:bg-white
             flex items-center justify-center font-bold transition-all'
          >
            {totalItems > 0 ? 'Ver mi Pedido' : 'Pedir Ahora'}
          </a>
        </div>
      </div>

      <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10' />
    </section>
  );
};
