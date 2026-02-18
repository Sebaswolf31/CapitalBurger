'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export const useCartDrawer = () => {
  const { cart, totalPrice, clearCart, setIsCartOpen } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    paymentMethod: 'Efectivo',
    changeFor: '',
    notes: '',
  });

  const PHONE_NUMBER = '573225917373';
  const NEQUI_NUMBER = '3148797450';

  const handleCheckout = () => {
    setStep('checkout');
    setError(false);
  };

  const handleBackToCart = () => setStep('cart');

  const sendToWhatsApp = () => {
    if (!formData.address.trim()) {
      setError(true);
      toast.error('Falta la dirección', {
        description: 'Por favor dinos a dónde enviamos tu pedido.',
      });
      return;
    }

    toast.success('¡Pedido procesado!', {
      description: 'Te estamos redirigiendo a WhatsApp para finalizar.',
      duration: 2400,
      style: {
        background: '#0a0a0a',
        color: '#fff',
        border: '1px solid #00FF66',
      },
    });

    setTimeout(() => {
      // 1. DECLARAMOS LA VARIABLE MESSAGE AQUÍ
      let message = `*🔥 NUEVO PEDIDO - CAPITAL BURGER 🔥*\n\n`;
      message += `*Cliente:* Web\n`;
      message += `-----------------------------------\n`;

      // 2. RECORREMOS EL CARRITO INCLUYENDO EXTRAS
      cart.forEach((item) => {
        const extrasCost =
          item.selectedExtras?.reduce(
            (acc: number, e: any) => acc + e.price,
            0,
          ) || 0;
        const totalUnitario = item.price + extrasCost;

        // Nombre del producto en negrita y cantidad
        message += `*▪️ ${item.quantity}x ${item.name.toUpperCase()}*\n`;

        // Si tiene adicionales, los listamos uno debajo del otro con un guion
        if (item.selectedExtras && item.selectedExtras.length > 0) {
          const counts: { [key: string]: number } = {};
          item.selectedExtras.forEach((e: any) => {
            counts[e.name] = (counts[e.name] || 0) + 1;
          });

          // Encabezado pequeño para los extras
          message += `   _Adicionales por unidad:_\n`;

          Object.entries(counts).forEach(([name, qty]) => {
            const qtyText = qty > 1 ? `${qty}x ` : '';
            message += `   - ${qtyText}${name}\n`; // Lista hacia abajo
          });
        }

        message += `   *Subtotal:* $${(
          totalUnitario * item.quantity
        ).toLocaleString('es-CO')}\n\n`;
      });

      message += `-----------------------------------\n`;
      message += `*💰 TOTAL A PAGAR: $${totalPrice.toLocaleString(
        'es-CO',
      )}*\n\n`;
      message += `*📍 DIRECCIÓN:* ${formData.address}\n`;
      message += `*💵 MÉTODO DE PAGO:* ${formData.paymentMethod}\n`;

      if (formData.paymentMethod === 'Efectivo') {
        if (formData.changeFor) {
          const valorLimpio = formData.changeFor.replace(/\./g, '');
          const pagaCon = parseInt(valorLimpio) || 0;
          const devuelta = pagaCon - totalPrice;
          message += `*💸 PAGA CON:* $${pagaCon.toLocaleString('es-CO')}\n`;
          message += `*🔄 DEVUELTA:* $${
            devuelta > 0 ? devuelta.toLocaleString('es-CO') : '0'
          }\n`;
        } else {
          message += `*💸 PAGA CON:* Exacto (No requiere devuelta)\n`;
        }
      }

      if (formData.paymentMethod === 'Transferencia') {
        message += `*📲 DATOS DE TRANSFERENCIA:* Nequi ${NEQUI_NUMBER}\n`;
      }

      if (formData.notes) {
        message += `*📝 NOTAS:* ${formData.notes}\n`;
      }

      const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
        message,
      )}`;

      window.open(url, '_blank');

      // Limpiar y cerrar después de enviar
      setTimeout(() => {
        clearCart();
        setIsCartOpen(false);
        setStep('cart');
      }, 1600);
    }, 2000);
  };

  return {
    step,
    formData,
    setFormData,
    error,
    handleCheckout,
    handleBackToCart,
    sendToWhatsApp,
  };
};
