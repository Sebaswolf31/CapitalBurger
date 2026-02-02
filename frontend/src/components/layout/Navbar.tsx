'use client';

import { useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import { ShoppingCart, Menu, X } from 'lucide-react';

import { useCart } from '@/context/CartContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { totalItems, setIsCartOpen } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  // Función para subir al inicio suavemente cuando le das al Logo

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    closeMenu();
  };

  return (
    <>
      <nav className='fixed top-0 left-0 w-full h-20 bg-black/90 backdrop-blur-md z-[200] border-b border-white/5'>
        <div className='container mx-auto h-full px-4 flex items-center justify-between'>
          {/* LOGO: Con z-index alto para que siempre sea clickable */}

          <div
            onClick={scrollToTop}
            className='relative z-[210] flex items-center cursor-pointer'
          >
            <Image
              src='/logo.png'
              alt='Capital Burger'
              width={50} /* Bajamos de 100 a 90 */
              height={50}
              className='object-contain active:scale-95 transition-transform'
              priority
            />
          </div>

          {/* DESKTOP NAV */}

          <div className='hidden md:flex gap-8 font-heading text-[11px] text-white uppercase tracking-[0.2em]'>
            <a
              href='#inicio'
              className='hover:text-urban-green transition-colors'
            >
              Inicio
            </a>
            <a
              href='#menu'
              className='hover:text-urban-green transition-colors'
            >
              Menú
            </a>

            <a
              href='#contacto'
              className='hover:text-urban-green transition-colors'
            >
              Contacto
            </a>
          </div>

          {/* ICONOS DERECHA */}

          <div className='flex items-center gap-5 relative z-[210]'>
            <div
              onClick={() => setIsCartOpen(true)} // ABRIR AL DAR CLIC AL ICONO
              className='relative cursor-pointer group p-2'
            >
              <ShoppingCart
                className='text-white group-hover:text-urban-green transition-colors'
                size={24}
              />

              {totalItems > 0 && (
                <span className='absolute top-0 right-0 bg-urban-green text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-bounce'>
                  {totalItems}
                </span>
              )}
            </div>

            {/* BOTÓN HAMBURGUESA: Visible solo en móvil */}

            <button
              className='md:hidden text-white p-2 outline-none'
              onClick={toggleMenu}
              aria-label='Abrir menú'
            >
              {isOpen ? (
                <X size={20} className='text-urban-green' />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MENÚ MÓVIL PANTALLA COMPLETA */}

      <div
        className={`fixed inset-0 bg-black z-[150] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } md:hidden`}
      >
        <div className='flex flex-col items-center gap-8 font-heading text-20xl uppercase italic text-white'>
          <a
            href='#inicio'
            onClick={closeMenu}
            className='active:text-urban-green'
          >
            Inicio
          </a>

          <a
            href='#menu'
            onClick={closeMenu}
            className='active:text-urban-green'
          >
            Menú
          </a>

          <a
            href='#contacto'
            onClick={closeMenu}
            className='active:text-urban-green'
          >
            Contacto
          </a>

          <div className='mt-10 opacity-20'>
            <Image src='/logo.png' alt='Logo Fondo' width={120} height={50} />
          </div>
        </div>
      </div>
    </>
  );
};
