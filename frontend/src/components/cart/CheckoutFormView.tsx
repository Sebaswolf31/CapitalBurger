'use client';
import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

interface CheckoutFormProps {
  formData: {
    address: string;
    paymentMethod: string;
    notes: string;
  };
  setFormData: (data: any) => void;
  error: boolean;
  totalPrice: number;
  cart: any[];
}

export const CheckoutFormView = ({
  formData,
  setFormData,
  error,
  totalPrice,
  cart,
}: CheckoutFormProps) => {
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <label className='text-urban-green font-heading text-[10px] uppercase tracking-[0.2em] flex items-center gap-2'>
          <MapPin size={14} /> Dirección de Entrega{' '}
          <span className='text-red-500'>*</span>
        </label>
        <textarea
          placeholder='Ej: Calle 10 # 4-20, Barrio Capital.'
          className={`w-full bg-white/5 border ${
            error
              ? 'border-red-500'
              : 'border-white/10 focus:border-urban-green'
          } rounded-xl p-4 text-white placeholder-gray-700 outline-none transition-all resize-none h-24 text-sm`}
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
      </div>

      <div className='space-y-2'>
        <label className='text-urban-green font-heading text-[10px] uppercase tracking-[0.2em]'>
          Método de Pago
        </label>
        <div className='grid grid-cols-2 gap-3'>
          {['Efectivo', 'Transferencia'].map((method) => (
            <button
              key={method}
              type='button'
              onClick={() =>
                setFormData({ ...formData, paymentMethod: method })
              }
              className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase transition-all ${
                formData.paymentMethod === method
                  ? 'bg-urban-green text-black border-urban-green shadow-lg'
                  : 'bg-white/5 text-gray-500 border-white/10'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <label className='text-gray-500 font-heading text-[10px] uppercase tracking-[0.2em]'>
          Notas (Opcional)
        </label>
        <textarea
          placeholder='Sin cebolla, portería, etc...'
          className='w-full bg-white/5 border border-white/10 focus:border-urban-green rounded-xl p-3 text-white placeholder-gray-700 outline-none h-20 text-sm'
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>
    </div>
  );
};
