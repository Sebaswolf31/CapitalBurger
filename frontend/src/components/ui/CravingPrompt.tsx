'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Plus, CheckCircle2 } from 'lucide-react';
import { menu } from '@/data/menu';
import { useCart } from '@/context/CartContext';

export const CravingPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const [attempts, setAttempts] = useState(0); // Contador de veces mostrado

  const { addToCart, setIsCartOpen, cart } = useCart(); // Traemos 'cart' para verificar si está vacío
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const promoProduct = menu.find((item) => item.isPromo);
  const MAX_ATTEMPTS = 3; // Solo insistiremos 3 veces
  const SNOOZE_TIME = 120000; // 2 minutos (120,000 ms) antes de volver a salir

  useEffect(() => {
    // Si no hay promo, o ya compraron algo, no molestamos
    if (!promoProduct || cart.length > 0) return;

    // Primer intento: aparece a los 38 segundos
    if (attempts === 0) {
      timerRef.current = setTimeout(() => {
        setIsVisible(true);
        setAttempts((prev) => prev + 1);
      }, 38000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [promoProduct, cart.length, attempts]); // Se reinicia si cambia el carrito o los intentos

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!promoProduct) return;

    addToCart(promoProduct);
    setAdded(true);

    // Al comprar, cerramos y ya NO vuelve a salir (porque cart.length > 0)
    setTimeout(() => {
      setIsCartOpen(true);
      setIsVisible(false);
    }, 800);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);

    // Lógica de "Snooze" (Posponer)
    // Si aún no hemos superado el límite de intentos y el carrito sigue vacío...
    if (attempts < MAX_ATTEMPTS && cart.length === 0) {
      console.log(`Prompt cerrado. Volverá en ${SNOOZE_TIME / 60000} minutos.`);

      // Programamos la reaparición
      timerRef.current = setTimeout(() => {
        // Doble verificación: ¿Sigue vacío el carrito?
        if (cart.length === 0) {
          setIsVisible(true);
          setAttempts((prev) => prev + 1);
        }
      }, SNOOZE_TIME);
    }
  };

  // Si ya compraron algo, forzamos que se oculte si estaba abierto
  useEffect(() => {
    if (cart.length > 0) setIsVisible(false);
  }, [cart]);

  if (!promoProduct || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className='fixed bottom-24 right-0 z-[100] pl-4 pr-4 py-3 bg-[#0a0a0a] border-l-4 border-urban-green shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center gap-4 rounded-l-2xl border-y border-white/5'
      >
        {/* IMAGEN */}
        <div className='relative w-12 h-12 rounded-full overflow-hidden border border-urban-green/30 bg-black flex-shrink-0'>
          <img
            src={promoProduct.image}
            alt={promoProduct.name}
            className='w-full h-full object-cover'
          />
        </div>

        {/* TEXTO */}
        <div className='flex flex-col max-w-[140px]'>
          <span className='text-white font-urban text-[10px] uppercase italic tracking-wider leading-none flex items-center gap-1'>
            <Flame size={10} className='text-urban-green' fill='currentColor' />
            {attempts > 1 ? '¿No te has decidido?' : 'Recomendada'}{' '}
            {/* Cambiamos el texto si vuelve a salir */}
          </span>
          <span className='text-white font-heading text-xs uppercase mt-1 truncate'>
            {promoProduct.name}
          </span>
          <span className='text-urban-yellow font-bold text-[10px]'>
            ${promoProduct.price.toLocaleString('es-CO')}
          </span>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button
          onClick={handleQuickAdd}
          disabled={added}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
            added
              ? 'bg-white text-black scale-90'
              : 'bg-urban-green text-black hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(0,255,102,0.4)]'
          }`}
        >
          {added ? (
            <CheckCircle2 size={20} />
          ) : (
            <Plus size={20} strokeWidth={3} />
          )}
        </button>

        {/* CERRAR (Activa el Snooze) */}
        <button
          onClick={handleClose}
          className='absolute -top-2 left-2 bg-gray-900 text-gray-500 w-5 h-5 rounded-full text-[10px] flex items-center justify-center border border-white/10 hover:text-white hover:bg-red-900 transition-colors'
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
