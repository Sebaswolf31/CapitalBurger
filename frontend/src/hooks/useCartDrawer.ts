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
    notes: '',
  });

  const PHONE_NUMBER = '573225917373';

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
      duration: 4000,
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

        message += `▪️ ${item.quantity}x ${item.name}\n`;

        // Si tiene adicionales, los listamos debajo del nombre
        if (item.selectedExtras && item.selectedExtras.length > 0) {
          const extrasList = item.selectedExtras
            .map((e: any) => e.name)
            .join(', ');
          message += `   _Adicionales: ${extrasList}_\n`;
        }

        message += `   Subtotal: $${(
          totalUnitario * item.quantity
        ).toLocaleString('es-CO')}\n\n`;
      });

      message += `-----------------------------------\n`;
      message += `*💰 TOTAL A PAGAR: $${totalPrice.toLocaleString(
        'es-CO',
      )}*\n\n`;
      message += `*📍 DIRECCIÓN:* ${formData.address}\n`;
      message += `*💵 MÉTODO DE PAGO:* ${formData.paymentMethod}\n`;

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
