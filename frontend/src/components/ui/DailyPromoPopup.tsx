'use client';
import React, { useState, useEffect } from 'react';
import { X, Flame, ArrowRight } from 'lucide-react';

export const DailyPromoPopup = () => {
  const [show, setShow] = useState(false);
  const [promoType, setPromoType] = useState<{
    title: string;
    desc: string;
    day: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    const today = new Date().getDay();
    const isSessionSeen = sessionStorage.getItem('promo-day-seen');

    if (isSessionSeen) return;

    let config = null;

    if (today === 3 || today === 4) {
      config = {
        title: '🔥 DÍAS DE COMBO 🔥',
        desc: 'Solo Miercoles y Jueves combos callejeros pa’ romper el antojo 😈',
        day: 'PROMO',
        image: '/promos/combiCompleta.jpeg',
      };
    } else if (today === 6 || today === 0) {
      config = {
        title: '¡FIN DE PICADAS!',
        desc: 'Pídela hoy y compártela con todo el parche.',
        day: 'ESPECIAL',
        image: '/picadas/picada.jpeg',
      };
    }

    if (config) {
      setPromoType(config);
      // Mantenemos tus 12 segundos de espera
      const timer = setTimeout(() => {
        setShow(true);
      }, 12000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShow(false);
    sessionStorage.setItem('promo-day-seen', 'true');
  };

  // --- ESTA ES LA FUNCIÓN NUEVA ---
  const handleOrderNow = () => {
    // Decidimos a qué categoría ir según el día
    const categoryToOpen =
      promoType?.day === 'PROMO' ? 'promociones' : 'picadas';

    // 1. Enviamos el "grito" (evento) para que el Menú escuche
    window.dispatchEvent(
      new CustomEvent('setMenuCategory', { detail: categoryToOpen }),
    );

    // 2. Cerramos este popup
    closePopup();

    // 3. Bajamos suavemente al menú
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!show || !promoType) return null;

  return (
    <div className='fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-[6000] flex items-end justify-center p-4 md:p-0 animate-in fade-in zoom-in duration-500'>
      <div
        className='fixed inset-0 bg-black/40 md:hidden'
        onClick={closePopup}
      />

      <div className='bg-urban-gray border-2 border-urban-green rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,255,102,0.3)] w-full max-w-[350px] relative z-[6001]'>
        <div className='h-40 w-full relative'>
          <img
            src={promoType.image}
            alt='Promoción'
            className='w-full h-full object-cover'
          />
          <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-urban-gray to-transparent' />
          <button
            onClick={closePopup}
            className='absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white p-1.5 rounded-full hover:bg-urban-green transition-colors'
          >
            <X size={18} />
          </button>
        </div>

        <div className='p-5 text-center'>
          <div className='flex justify-center mb-2'>
            <span className='bg-urban-green/10 text-urban-green text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1 uppercase italic border border-urban-green/20'>
              <Flame size={12} fill='currentColor' /> {promoType.day} DEL DÍA
            </span>
          </div>

          <h4 className='text-white font-heading text-2xl italic uppercase font-black tracking-tighter'>
            {promoType.title}
          </h4>
          <p className='text-gray-400 text-sm mt-2 font-sans leading-tight'>
            {promoType.desc}
          </p>

          <button
            onClick={handleOrderNow} // <-- AQUÍ USAMOS LA FUNCIÓN NUEVA
            className='mt-5 w-full bg-urban-green text-black font-heading font-black uppercase italic py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-all group'
          >
            ¡Pedir Ahora!
            <ArrowRight
              size={18}
              className='group-hover:translate-x-1 transition-transform'
            />
          </button>
        </div>
      </div>
    </div>
  );
};
