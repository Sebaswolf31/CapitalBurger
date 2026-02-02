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
      let message = `*🔥 NUEVO PEDIDO - CAPITAL BURGER 🔥*\n\n`;
      message += `*Cliente:* Web\n`;
      message += `-----------------------------------\n`;

      cart.forEach((item) => {
        message += `▪️ ${item.quantity}x ${item.name} - $${(
          item.price * item.quantity
        ).toLocaleString('es-CO')}\n`;
      });

      message += `-----------------------------------\n`;
      message += `*💰 TOTAL: $${totalPrice.toLocaleString('es-CO')}*\n\n`;
      message += `*📍 DIRECCIÓN:* ${formData.address}\n`;
      message += `*💵 MÉTODO DE PAGO:* ${formData.paymentMethod}\n`;
      if (formData.notes) message += `*📝 NOTAS:* ${formData.notes}\n`;

      const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
        message,
      )}`;

      window.open(url, '_blank');
      clearCart();
      setIsCartOpen(false);
      setStep('cart');
      setFormData({ address: '', paymentMethod: 'Efectivo', notes: '' });
    }, 3000);
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
