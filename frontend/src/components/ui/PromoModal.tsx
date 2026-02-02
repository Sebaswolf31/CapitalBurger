'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Flame } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { menu } from '@/data/menu'; // <-- Importamos tu array real

export const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  // 1. Buscamos el producto que tiene isPromo: true en tu data
  const promoProduct = menu.find((item) => item.isPromo);

  useEffect(() => {
    // Si no hay ningún producto marcado como promo, no hacemos nada
    if (!promoProduct) return;

    const hasSeenPromo = sessionStorage.getItem('seenPromo');

    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('seenPromo', 'true');
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [promoProduct]);

  const handleAddPromo = () => {
    if (!promoProduct) return;

    addToCart(promoProduct); // Agregamos el producto encontrado
    setIsOpen(false);
    setIsCartOpen(false);
  };

  // Nueva función: Cierra el modal y navega al menú con scroll suave
  const handleCloseAndGoToMenu = () => {
    // Vibración opcional (50ms, solo en móviles compatibles)
    if (navigator.vibrate) {
      navigator.vibrate(80);
    }
    setIsOpen(false);
    // Scroll suave a la sección #menu
    const menuSection = document.getElementById('hero');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Si no existe un producto con isPromo, no renderizamos nada
  if (!promoProduct) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4'
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className='fixed z-[210] w-full max-w-sm bg-[#121212] border border-urban-green/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,102,0.15)]'
          >
            <div className='bg-urban-green text-black text-center py-1 font-heading uppercase text-[10px] tracking-widest font-black flex items-center justify-center gap-2'>
              <Flame size={14} fill='black' /> Producto del Mes{' '}
              <Flame size={14} fill='black' />
            </div>

            <div className='relative h-56 w-full bg-black'>
              <Image
                src={promoProduct.image}
                alt={promoProduct.name}
                fill
                className='object-cover opacity-90 group-hover:scale-105 transition-transform duration-700'
              />

              <button
                onClick={() => setIsOpen(false)}
                className='absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-urban-green hover:text-black transition-all z-30'
              >
                <X size={20} />
              </button>
            </div>

            <div className='p-6 space-y-4 text-center'>
              <div>
                <h3 className='text-2xl font-heading text-white italic uppercase leading-none'>
                  {promoProduct.name}
                </h3>
                <p className='text-gray-400 text-xs mt-3 leading-relaxed font-sans px-2'>
                  {promoProduct.description}
                </p>
              </div>

              <div className='flex flex-col gap-3 pt-2'>
                <div className='text-3xl font-heading text-urban-yellow italic font-bold'>
                  ${promoProduct.price.toLocaleString('es-CO')}
                </div>

                <button
                  onClick={handleAddPromo}
                  className='w-full bg-urban-green text-black font-heading uppercase italic py-4 rounded-xl font-black text-lg hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.3)]'
                >
                  <ShoppingBag size={20} strokeWidth={3} /> ¡La Quiero Ya!
                </button>

                {/* Botón modificado: Ahora navega al menú y tiene feedback en móvil */}
                <button
                  onClick={handleCloseAndGoToMenu}
                  className='text-gray-500 text-[12px] uppercase tracking-[0.3em]  font-heading hover:text-green active:text-urban-green active:scale-200 active:font-bold transition-all duration-200'
                  aria-label='Cerrar modal y ver menú'
                >
                  No, gracias, continuar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
