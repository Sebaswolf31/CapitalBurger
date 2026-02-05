'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react'; // Importamos Plus y Minus
import { Product, ExtraOption } from '@/components/types';
import { useCart } from '@/context/CartContext';
import { FlyingImage } from '../ui/FlyingImage';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addToCart, totalItems } = useCart();
  // CAMBIO: Ahora guardamos el objeto del extra + su cantidad
  const [selectedExtras, setSelectedExtras] = useState<
    { extra: ExtraOption; qty: number }[]
  >([]);

  const [isFlying, setIsFlying] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/add-cart.mp3');
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // NUEVA FUNCIÓN: Maneja cantidades de 0 a 4
  const updateExtraQty = (extra: ExtraOption, amount: number) => {
    setSelectedExtras((prev) => {
      const existing = prev.find((item) => item.extra.id === extra.id);

      if (existing) {
        const newQty = existing.qty + amount;
        if (newQty <= 0)
          return prev.filter((item) => item.extra.id !== extra.id);
        if (newQty > 4) return prev; // LÍMITE DE 4 POR EXTRA
        return prev.map((item) =>
          item.extra.id === extra.id ? { ...item, qty: newQty } : item,
        );
      }

      return amount > 0 ? [...prev, { extra, qty: 1 }] : prev;
    });
  };

  const extrasTotal = selectedExtras.reduce(
    (acc, item) => acc + item.extra.price * item.qty,
    0,
  );
  const finalPrice = product.price + extrasTotal;

  const handleAdd = (e: React.MouseEvent) => {
    // Evitar múltiples clics
    if (isFlying) return;

    // 2. VALIDACIÓN: Usamos el totalItems que ya extrajimos arriba
    if (totalItems >= 20) {
      addToCart(product, []);
      // El toast ya lo dispara el context, así que solo detenemos la función aquí
      return;
    }

    // Preparamos los extras
    const flattenedExtras: ExtraOption[] = [];
    selectedExtras.forEach((item) => {
      for (let i = 0; i < item.qty; i++) {
        flattenedExtras.push(item.extra);
      }
    });

    // Agregamos al carrito
    addToCart(product, flattenedExtras);

    // Efectos visuales y de sonido
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setCoords({ x: e.clientX, y: e.clientY });
    setIsFlying(true);

    setTimeout(() => {
      setIsFlying(false);
      onClose();
    }, 1100);
  };

  return (
    <>
      <FlyingImage
        isVisible={isFlying}
        startPos={coords}
        image={product.image}
      />

      <div className='fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'>
        <div className='bg-urban-dark border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300'>
          {/* IMAGEN: Cambiamos object-cover por object-contain para que se vea completa */}
          <div className='relative h-64 w-full bg-black/40'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-contain p-4' // 'contain' para que no se corte
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
            <p className='text-gray-400 text-xs mt-1'>{product.description}</p>

            {product.category !== 'promociones' &&
            product.extras &&
            product.extras.length > 0 ? (
              <div className='mt-6'>
                <h3 className='text-urban-green font-heading text-xs uppercase tracking-widest mb-4'>
                  Personaliza (Máx 4 c/u)
                </h3>
                <div className='space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar'>
                  {product.extras.map((extra) => {
                    const currentQty =
                      selectedExtras.find((item) => item.extra.id === extra.id)
                        ?.qty || 0;
                    return (
                      <div
                        key={extra.id}
                        className='flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5'
                      >
                        <div className='flex flex-col'>
                          <span className='text-white text-sm font-bold'>
                            {extra.name}
                          </span>
                          <span className='text-urban-green text-[10px]'>
                            + ${extra.price.toLocaleString()}
                          </span>
                        </div>

                        {/* CONTADOR -0+ */}
                        <div className='flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10'>
                          <button
                            onClick={() => updateExtraQty(extra, -1)}
                            className='p-1 text-gray-400 hover:text-white'
                          >
                            <Minus size={16} />
                          </button>
                          <span className='text-white font-bold min-w-[12px] text-center'>
                            {currentQty}
                          </span>
                          <button
                            onClick={() => updateExtraQty(extra, 1)}
                            className='p-1 text-urban-green hover:text-white'
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className='mt-6 p-4 rounded-xl bg-urban-green/10 border border-urban-green/20 text-center text-urban-green text-xs uppercase font-bold'>
                Combo cerrado - No permite adicionales
              </div>
            )}

            <button
              onClick={handleAdd}
              className='w-full mt-8 bg-urban-green text-black font-heading py-4 rounded-xl flex justify-between px-6 items-center hover:scale-[1.02] active:scale-95 transition-all'
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
