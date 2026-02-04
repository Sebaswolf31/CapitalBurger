'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ExtraOption } from '@/components/types';

interface CartContextType {
  cart: CartItem[];
  // Ahora addToCart recibe los adicionales seleccionados
  addToCart: (product: Product, selectedExtras?: ExtraOption[]) => void;
  // Usaremos un identificador único para no borrar todas las hamburguesas del mismo tipo
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. CARGAR DATOS AL INICIO
  useEffect(() => {
    const savedCart = localStorage.getItem('capital-burger-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error cargando carrito', error);
      }
    }
  }, []);

  // 2. GUARDAR DATOS
  useEffect(() => {
    localStorage.setItem('capital-burger-cart', JSON.stringify(cart));
  }, [cart]);

  // Dentro de CartContext.tsx

  const addToCart = (product: Product, selectedExtras: ExtraOption[] = []) => {
    setCart((prevCart) => {
      // Creamos una firma única para este pedido (ID + Extras seleccionados)
      const extrasId = selectedExtras
        .map((e) => e.id)
        .sort()
        .join('-');

      // Buscamos si ya existe EXACTAMENTE el mismo producto con los mismos extras
      const existingItem = prevCart.find((item) => {
        const itemExtrasId =
          item.selectedExtras
            ?.map((e) => e.id)
            .sort()
            .join('-') || '';
        return item.id === product.id && itemExtrasId === extrasId;
      });

      if (existingItem) {
        // Si ya existe igualito, solo aumentamos cantidad
        return prevCart.map((item) => {
          const itemExtrasId =
            item.selectedExtras
              ?.map((e) => e.id)
              .sort()
              .join('-') || '';
          return item.id === product.id && itemExtrasId === extrasId
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      }

      // Si es nuevo o los extras son diferentes, se agrega como línea nueva
      return [...prevCart, { ...product, quantity: 1, selectedExtras }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        const itemExtrasId =
          item.selectedExtras
            ?.map((e) => e.id)
            .sort()
            .join('-') || '';
        const currentId = `${item.id}-${itemExtrasId}`;
        return currentId !== cartItemId;
      }),
    );
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => {
        const itemExtrasId =
          item.selectedExtras
            ?.map((e) => e.id)
            .sort()
            .join('-') || '';
        const currentId = `${item.id}-${itemExtrasId}`;
        return currentId === cartItemId ? { ...item, quantity } : item;
      }),
    );
  };

  // Cálculo del precio TOTAL (Precio Base + Extras) x Cantidad
  const totalPrice = cart.reduce((acc, item) => {
    const extrasCost =
      item.selectedExtras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
    return acc + (item.price + extrasCost) * item.quantity;
  }, 0);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart: () => setCart([]),
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
