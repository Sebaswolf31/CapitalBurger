'use client';
import { useCart } from '@/context/CartContext';
import { useCartDrawer } from '@/hooks/useCartDrawer'; // Importamos el cerebro
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Send,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image';
import { CartFooter } from './CartFooter';
import { CartListView } from './CartListView';
import { CheckoutFormView } from './CheckoutFormView';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();
  const {
    step,
    formData,
    setFormData,
    error,
    handleCheckout,
    handleBackToCart,
    sendToWhatsApp,
  } = useCartDrawer();

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] z-[300] shadow-2xl transition-transform duration-500 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <header className='p-5 border-b border-white/5 flex items-center justify-between bg-black/50'>
          <div className='flex items-center gap-3'>
            {step === 'checkout' ? (
              <button
                onClick={handleBackToCart}
                className='text-white hover:text-urban-green transition-colors'
              >
                <ArrowLeft size={24} />
              </button>
            ) : (
              <ShoppingBag className='text-urban-green' />
            )}
            <h2 className='font-heading text-xl uppercase italic text-white'>
              {step === 'cart' ? 'Tu Pedido' : 'Datos de Entrega'}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className='text-white hover:bg-white/5 p-2 rounded-full'
          >
            <X size={24} />
          </button>
        </header>

        {/* CONTENIDO */}
        <div className='flex-grow overflow-y-auto p-6 space-y-6 no-scrollbar'>
          {step === 'cart' ? (
            <CartListView
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              setIsCartOpen={setIsCartOpen}
            />
          ) : (
            <CheckoutFormView
              formData={formData}
              setFormData={setFormData}
              error={error}
              totalPrice={totalPrice}
              cart={cart}
            />
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <CartFooter
            step={step}
            totalPrice={totalPrice}
            handleCheckout={handleCheckout}
            sendToWhatsApp={sendToWhatsApp}
          />
        )}
      </div>
    </>
  );
};
