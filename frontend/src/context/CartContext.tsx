'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/components/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean; // NUEVO
  setIsCartOpen: (open: boolean) => void; // NUEVO
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. CARGAR DATOS AL INICIO (Solo en el cliente)
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

  // 2. GUARDAR DATOS CADA VEZ QUE CAMBIA EL CARRITO
  useEffect(() => {
    // Verificamos si hay items o si ya cargó para no borrar lo guardado al inicio
    if (cart.length > 0 || localStorage.getItem('capital-burger-cart')) {
      localStorage.setItem('capital-burger-cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    const audio = new Audio('/sounds/add-cart.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    // ABRIR AUTOMÁTICAMENTE AL AGREGAR
    //setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
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
