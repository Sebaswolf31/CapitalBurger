'use client';
import { motion, AnimatePresence } from 'framer-motion';

export const FlyingImage = ({
  isVisible,
  startPos,
  image,
}: {
  isVisible: boolean;
  startPos: { x: number; y: number };
  image: string;
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.img
          src={image}
          initial={{
            position: 'fixed',
            top: startPos.y,
            left: startPos.x,
            width: 80,
            height: 80,
            borderRadius: '50%',
            zIndex: 999,
            opacity: 1,
          }}
          animate={{
            top: 20, // Coordenada Y del icono del carrito
            left: 'calc(100% - 60px)', // Coordenada X aproximada del carrito
            width: 20,
            height: 20,
            opacity: 0,
            rotate: 360,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='object-cover border-2 border-urban-green'
        />
      )}
    </AnimatePresence>
  );
};
