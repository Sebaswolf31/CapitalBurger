'use client';
import React, { useState } from 'react';
// Añadimos los iconos que faltaban: Banknote, Smartphone, Copy y Check
import {
  MapPin,
  Banknote,
  Smartphone,
  Copy,
  Check,
  Calculator,
} from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutFormProps {
  formData: {
    address: string;
    paymentMethod: string;
    changeFor: string;
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
}: CheckoutFormProps) => {
  const [copied, setCopied] = useState(false);
  const NEQUI_NUMBER = '3148797450';

  // --- FUNCIONES DE FORMATO ---
  const formatInputMoney = (value: string) => {
    // Elimina todo lo que no sea número
    const cleanValue = value.replace(/\D/g, '');
    // Formatea con puntos de miles
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputMoney(e.target.value);
    setFormData({ ...formData, changeFor: formatted });
  };

  // Calcular devuelta en tiempo real
  const numericPagaCon = parseInt(formData.changeFor.replace(/\./g, '')) || 0;
  const devuelta = numericPagaCon - totalPrice;

  const handleCopy = () => {
    navigator.clipboard.writeText(NEQUI_NUMBER);
    setCopied(true);
    toast.success('¡Número copiado!', {
      description: 'Ya puedes pegarlo en tu App de Nequi.',
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='space-y-6'>
      {/* DIRECCIÓN */}
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

      {/* MÉTODO DE PAGO */}
      <div className='space-y-3'>
        <label className='text-urban-green font-heading text-[10px] uppercase tracking-[0.2em]'>
          Método de Pago
        </label>
        <div className='grid grid-cols-2 gap-3'>
          <button
            type='button'
            onClick={() =>
              setFormData({ ...formData, paymentMethod: 'Efectivo' })
            }
            className={`py-3 px-4 rounded-xl border font-bold text-[10px] uppercase transition-all flex items-center justify-center gap-2 ${
              formData.paymentMethod === 'Efectivo'
                ? 'bg-urban-green text-black border-urban-green shadow-lg'
                : 'bg-white/5 text-gray-500 border-white/10'
            }`}
          >
            <Banknote size={16} /> Efectivo
          </button>
          <button
            type='button'
            onClick={() =>
              setFormData({ ...formData, paymentMethod: 'Transferencia' })
            }
            className={`py-3 px-4 rounded-xl border font-bold text-[10px] uppercase transition-all flex items-center justify-center gap-2 ${
              formData.paymentMethod === 'Transferencia'
                ? 'bg-urban-green text-black border-urban-green shadow-lg'
                : 'bg-white/5 text-gray-500 border-white/10'
            }`}
          >
            <Smartphone size={16} /> Nequi
          </button>
        </div>

        {/* EFECTIVO Y DEVUELTA */}
        {formData.paymentMethod === 'Efectivo' && (
          <div className='animate-in fade-in slide-in-from-top-2 pt-2 space-y-3'>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm'>
                $
              </span>
              <input
                type='text'
                inputMode='numeric'
                placeholder='¿Con cuánto pagas?'
                className='w-full bg-white/5 border border-white/10 focus:border-urban-green rounded-xl p-3 pl-8 text-white placeholder-gray-700 outline-none text-sm'
                value={formData.changeFor}
                onChange={handleMoneyChange}
              />
            </div>

            {/* CUADRO DE CÁLCULO DE DEVUELTA */}
            {numericPagaCon > totalPrice && (
              <div className='bg-white/5 border border-dashed border-white/10 rounded-xl p-4 flex justify-between items-center animate-pulse'>
                <div className='flex items-center gap-2 text-gray-400'>
                  <Calculator size={12} />
                  <span className='text-[10px] uppercase font-bold tracking-tighter'>
                    Tu devuelta:
                  </span>
                </div>
                <span className='text-urban-green font-bold text-lg'>
                  ${devuelta.toLocaleString('es-CO')}
                </span>
              </div>
            )}

            {numericPagaCon > 0 && numericPagaCon < totalPrice && (
              <p className='text-[10px] text-red-400 italic text-center'>
                El valor es menor al total del pedido ($
                {totalPrice.toLocaleString('es-CO')})
              </p>
            )}
          </div>
        )}

        {/* NEQUI */}
        {formData.paymentMethod === 'Transferencia' && (
          <div className='p-4 rounded-xl bg-urban-green/5 border border-urban-green/20 animate-in fade-in zoom-in'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-urban-green text-[10px] font-bold uppercase'>
                  Nequi De Capital Burger:
                </p>
                <p className='text-white font-mono text-lg tracking-wider'>
                  {NEQUI_NUMBER}
                </p>
                <p className='text-[10px] text-gray-400 italic mt-1'>
                  Envía el comprobante al finalizar.
                </p>
              </div>
              <button
                type='button'
                onClick={handleCopy}
                className={`p-3 rounded-lg transition-all ${
                  copied
                    ? 'bg-urban-green text-black'
                    : 'bg-white/10 text-white'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* NOTAS */}
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
