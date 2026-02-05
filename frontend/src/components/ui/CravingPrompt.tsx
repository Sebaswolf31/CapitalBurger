'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Plus, CheckCircle2 } from 'lucide-react';
import { menu } from '@/data/menu';
import { useCart } from '@/context/CartContext';

export const CravingPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const { addToCart, setIsCartOpen, cart } = useCart();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // REFERENCIA PARA EL AUDIO
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const promoProduct = menu.find((item) => item.isPromo);
  const MAX_ATTEMPTS = 3;
  const SNOOZE_TIME = 120000; // 2 minutos

  // 1. Inicialización del audio
  useEffect(() => {
    audioRef.current = new Audio('/sounds/notification.mp3');
    audioRef.current.volume = 0.3; // Volumen sugerido (30%)
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 2. Función centralizada para mostrar y sonar
  const triggerShow = () => {
    // Si el usuario ya agregó algo mientras el timer corría, no mostramos nada
    if (cart.length > 0) return;

    setIsVisible(true);
    setAttempts((prev) => prev + 1);
    
    // Reproducir sonido al aparecer
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia el audio por si acaso
      audioRef.current.play().catch((e) => {
        console.log("El navegador bloqueó el audio automático hasta que el usuario interactúe.");
      });
    }
  };

  // 3. Control de los tiempos de aparición
  useEffect(() => {
    if (!promoProduct || cart.length > 0) {
      setIsVisible(false);
      return;
    }

    // Primer intento: a los 38 segundos
    if (attempts === 0) {
      timerRef.current = setTimeout(() => {
        triggerShow();
      }, 35000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [promoProduct, cart.length, attempts]);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!promoProduct) return;

    addToCart(promoProduct);
    setAdded(true);

    // Pequeño delay para que el usuario vea el check antes de abrir el carrito
    setTimeout(() => {
      setIsCartOpen(true);
      setIsVisible(false);
    }, 800);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);

    // Si aún quedan intentos, programar la reaparición
    if (attempts < MAX_ATTEMPTS && cart.length === 0) {
      timerRef.current = setTimeout(() => {
        triggerShow();
      }, SNOOZE_TIME);
    }
  };

  if (!promoProduct || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
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
            {attempts > 1 ? '¿Aún con antojo?' : 'Recomendada'}
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

        {/* CERRAR */}
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