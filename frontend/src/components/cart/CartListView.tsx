'use client';
import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartListViewProps {
  cart: any[];
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  setIsCartOpen: (open: boolean) => void;
}

export const CartListView = ({
  cart,
  removeFromCart,
  updateQuantity,
  setIsCartOpen,
}: CartListViewProps) => {
  if (cart.length === 0) {
    return (
      <div className='h-64 flex flex-col items-center justify-center text-center space-y-4'>
        <div className='w-16 h-16 bg-white/5 rounded-full flex items-center justify-center'>
          <ShoppingBag className='text-gray-600' size={30} />
        </div>
        <p className='text-gray-500 font-sans italic'>
          Tu carrito está vacío...
        </p>
        <button
          onClick={() => setIsCartOpen(false)}
          className='text-urban-green uppercase font-heading text-sm tracking-widest border-b border-urban-green'
        >
          Explorar Menú
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {cart.map((item) => {
        const extrasId =
          item.selectedExtras
            ?.map((e: any) => e.id)
            .sort()
            .join('-') || '';
        const cartItemId = `${item.id}-${extrasId}`;

        const extrasTotal =
          item.selectedExtras?.reduce(
            (acc: number, e: any) => acc + e.price,
            0,
          ) || 0;
        const finalUnitPrice = item.price + extrasTotal;

        return (
          <div
            key={cartItemId}
            className='flex gap-4 bg-white/5 p-3 rounded-xl border border-white/5'
          >
            <div className='relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className='object-cover'
                sizes='64px'
              />
            </div>

            <div className='flex-grow min-w-0 flex flex-col justify-between'>
              <div className='flex justify-between items-start'>
                <div>
                  <h4 className='font-heading text-white uppercase italic text-sm truncate pr-2'>
                    {item.name}
                  </h4>

                  {/* --- AQUÍ ESTÁ EL CAMBIO: LISTADO DE ADICIONALES AGRUPADOS --- */}
                  {item.selectedExtras && item.selectedExtras.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {(() => {
                        const counts: {
                          [key: string]: { name: string; qty: number };
                        } = {};
                        item.selectedExtras.forEach((extra: any) => {
                          if (!counts[extra.id]) {
                            counts[extra.id] = { name: extra.name, qty: 0 };
                          }
                          counts[extra.id].qty += 1;
                        });

                        return Object.entries(counts).map(([id, data]) => (
                          <span
                            key={id}
                            className='text-[9px] text-urban-green bg-urban-green/10 px-1.5 py-0.5 rounded border border-urban-green/20'
                          >
                            {data.qty > 1 ? `${data.qty}x ` : '+ '}
                            {data.name}
                          </span>
                        ));
                      })()}
                    </div>
                  )}
                  {/* --- FIN DEL CAMBIO --- */}
                </div>

                <button
                  onClick={() => removeFromCart(cartItemId)}
                  className='text-gray-500 hover:text-red-500 transition-colors flex-shrink-0 ml-2'
                >
                  <X size={16} />
                </button>
              </div>

              <div className='flex justify-between items-end mt-2'>
                <p className='text-urban-yellow font-bold text-sm italic'>
                  ${(finalUnitPrice * item.quantity).toLocaleString('es-CO')}
                </p>

                <div className='flex items-center gap-2 bg-black rounded-lg p-1 border border-white/5'>
                  <button
                    onClick={() =>
                      updateQuantity(cartItemId, item.quantity - 1)
                    }
                    className='w-6 h-6 flex items-center justify-center text-white hover:text-urban-green'
                  >
                    <Minus size={12} />
                  </button>
                  <span className='text-white text-xs font-bold w-4 text-center'>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(cartItemId, item.quantity + 1)
                    }
                    className='w-6 h-6 flex items-center justify-center text-white hover:text-urban-green'
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
