'use client';
import React from 'react';
import { Send, ArrowLeft } from 'lucide-react';

interface CartFooterProps {
  step: 'cart' | 'checkout';
  totalPrice: number;
  handleCheckout: () => void;
  sendToWhatsApp: () => void;
}

export const CartFooter = ({
  step,
  totalPrice,
  handleCheckout,
  sendToWhatsApp,
}: CartFooterProps) => {
  return (
    <footer className='p-6 bg-black border-t border-white/5 space-y-4'>
      <div className='flex justify-between items-end mb-1'>
        <span className='text-gray-500 uppercase text-[10px] font-heading tracking-[0.2em]'>
          Total Pedido
        </span>
        <span className='text-2xl font-heading text-urban-green italic font-black leading-none'>
          ${totalPrice.toLocaleString('es-CO')}
        </span>
      </div>

      {step === 'cart' ? (
        <button
          onClick={handleCheckout}
          className='w-full bg-urban-green text-black font-heading uppercase italic py-3 rounded-xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group'
        >
          Continuar Compra
          <ArrowLeft
            size={14}
            className='rotate-180 group-hover:translate-x-1 transition-transform'
          />
        </button>
      ) : (
        <button
          onClick={sendToWhatsApp}
          className='w-full bg-[#25D366] text-white font-heading uppercase italic py-4 rounded-xl font-black text-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2'
        >
          <Send size={16} className='-rotate-45' /> Enviar Pedido
        </button>
      )}
    </footer>
  );
};
