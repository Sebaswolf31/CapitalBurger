'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Product, ExtraOption } from '@/components/types';
import { useCart } from '@/context/CartContext';
import { FlyingImage } from '../ui/FlyingImage'; // Asegúrate de que la ruta sea correcta

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);

  // ESTADOS PARA LA ANIMACIÓN
  const [isFlying, setIsFlying] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Bloquear scroll al abrir el modal
  useEffect(() => {
    audioRef.current = new Audio('/sounds/add-cart.mp3');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleExtra = (extra: ExtraOption) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra],
    );
  };

  const extrasTotal = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
  const finalPrice = product.price + extrasTotal;

  // NUEVA FUNCIÓN CON ANIMACIÓN
  const handleAdd = (e: React.MouseEvent) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reinicia si el usuario hace clics rápidos
      audioRef.current
        .play()
        .catch((err) => console.log('Error al reproducir audio:', err));
    }
    setCoords({ x: e.clientX, y: e.clientY });
    setIsFlying(true);

    // Agregamos al carrito
    addToCart(product, selectedExtras);

    // Esperamos a que termine el vuelo para cerrar
    setTimeout(() => {
      setIsFlying(false);
      onClose();
    }, 1100);
  };

  return (
    <>
      {/* Componente de la imagen voladora */}
      <FlyingImage
        isVisible={isFlying}
        startPos={coords}
        image={product.image}
      />

      <div className='fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'>
        <div className='bg-urban-dark border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300'>
          {/* IMAGEN Y BOTÓN CERRAR */}
          <div className='relative w-28 h-60 w-full'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover'
            />
            <button
              onClick={onClose}
              className='absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-urban-green transition-colors z-10'
            >
              <X size={20} />
            </button>
          </div>

          <div className='p-6'>
            <h2 className='text-2xl font-heading italic text-white uppercase'>
              {product.name}
            </h2>
            <p className='text-gray-400 text-[11px] text-sm mt-1'>
              {product.description}
            </p>

            {/* SECCIÓN DE ADICIONALES */}
            {product.category !== 'promociones' &&
            product.extras &&
            product.extras.length > 0 ? (
              <div className='mt-6'>
                <h3 className='text-urban-green font-heading text-xs uppercase tracking-widest mb-4'>
                  Personaliza tu pedido
                </h3>
                <div className='space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar'>
                  {product.extras.map((extra) => (
                    <label
                      key={extra.id}
                      className='flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 cursor-pointer hover:border-urban-green/50 transition-all'
                    >
                      <div className='flex items-center gap-3'>
                        <input
                          type='checkbox'
                          checked={selectedExtras.some(
                            (e) => e.id === extra.id,
                          )}
                          onChange={() => toggleExtra(extra)}
                          className='w-4 h-4 accent-urban-green'
                        />
                        <span className='text-white text-sm'>{extra.name}</span>
                      </div>
                      <span className='text-urban-green font-bold text-sm'>
                        + ${extra.price.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className='mt-6 p-4 rounded-xl bg-urban-green/10 border border-urban-green/20 text-center text-urban-green text-xs uppercase font-bold'>
                Combo cerrado - No permite adicionales
              </div>
            )}

            {/* BOTÓN FINAL - Ahora llama a handleAdd con el evento */}
            <button
              onClick={handleAdd}
              className='w-full mt-8 bg-urban-green text-black font-heading py-4 rounded-xl flex justify-between px-6 items-center hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]'
            >
              <span className='uppercase font-black italic'>
                Agregar al carrito
              </span>
              <span className='font-bold'>${finalPrice.toLocaleString()}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
