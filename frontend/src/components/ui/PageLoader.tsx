'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className='fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center'
        >
          <div className='flex flex-col items-center'>
            {/* SVG DE LA HAMBURGUESA QUE SE DIBUJA */}
            <svg
              width='120'
              height='120'
              viewBox='0 0 100 100'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mb-6'
            >
              {/* PAN SUPERIOR CON SEMILLAS */}
              <motion.path
                d='M20 50C20 30 35 25 50 25C65 25 80 30 80 50H20Z'
                stroke='#00FF66'
                strokeWidth='2.5'
                strokeLinecap='round'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Semillas del pan */}
              {[35, 50, 65].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={35 + (i % 2) * 5}
                  r='1'
                  fill='#00FF66'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.2 }}
                />
              ))}

              {/* LECHUGA (Línea ondulada) */}
              <motion.path
                d='M18 55C22 52 26 58 30 55C34 52 38 58 42 55C46 52 50 58 54 55C58 52 62 58 66 55C70 52 74 58 78 55C82 52 83 55 83 55'
                stroke='#00FF66'
                strokeWidth='2'
                strokeLinecap='round'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              {/* CARNE (Más gruesa) */}
              <motion.path
                d='M20 65H80'
                stroke='#00FF66'
                strokeWidth='6'
                strokeLinecap='round'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />

              {/* PAN INFERIOR */}
              <motion.path
                d='M22 75C22 82 35 85 50 85C65 85 78 82 78 75H22Z'
                stroke='#00FF66'
                strokeWidth='2.5'
                strokeLinecap='round'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              />
            </svg>

            {/* TEXTO QUE APARECE DESPUÉS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className='text-center'
            >
              <h1 className='text-4xl font-heading italic font-black text-white uppercase tracking-tighter'>
                Capital{' '}
                <span className='text-urban-green drop-shadow-[0_0_8px_#00FF66]'>
                  Burger
                </span>
              </h1>

              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className='mt-4'
              >
                <p className='text-gray-500 font-sans text-[10px] uppercase tracking-[0.4em]'>
                  Calle y fuego, Así se cocina...
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* BARRA DE PROGRESO DE FONDO (Sutil) */}
          <div className='absolute bottom-10 w-48 h-[1px] bg-white/10 overflow-hidden'>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='w-full h-full bg-urban-green shadow-[0_0_10px_#00FF66]'
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
