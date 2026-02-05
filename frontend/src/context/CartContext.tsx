'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ExtraOption } from '@/components/types';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedExtras?: ExtraOption[]) => void;
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

  // Cálculos derivados del estado
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => {
    const extrasCost =
      item.selectedExtras?.reduce((sum, extra) => sum + extra.price, 0) || 0;
    return acc + (item.price + extrasCost) * item.quantity;
  }, 0);

  // --- FUNCIONES DE ACCIÓN ---

  const addToCart = (product: Product, selectedExtras: ExtraOption[] = []) => {
    const MAX_TOTAL = 20;

    // VALIDACIÓN 1: Límite global (Fuera del setCart para evitar fantasmas)
    if (totalItems >= MAX_TOTAL) {
      toast.error('¡Carrito lleno!', {
        id: 'limit-cart',
        description: `Por seguridad, no aceptamos pedidos de más de ${MAX_TOTAL} productos.`,
      });
      return;
    }

    setCart((prevCart) => {
      const extrasId = selectedExtras
        .map((e) => e.id)
        .sort()
        .join('-');

      const existingItem = prevCart.find((item) => {
        const itemExtrasId =
          item.selectedExtras
            ?.map((e) => e.id)
            .sort()
            .join('-') || '';
        return item.id === product.id && itemExtrasId === extrasId;
      });

      if (existingItem) {
        // VALIDACIÓN 2: Límite por producto
        if (existingItem.quantity >= 10) {
          toast.error('¡Máximo 10 unidades!', {
            id: 'limit-product',
            description:
              'No aceptamos más de 10 unidades de un mismo producto.',
          });
          return prevCart;
        }

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

      return [...prevCart, { ...product, quantity: 1, selectedExtras }];
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;

    // Buscamos el item actual para comparar (fuera del setCart)
    const itemToUpdate = cart.find((item) => {
      const itemExtrasId =
        item.selectedExtras
          ?.map((e: any) => e.id)
          .sort()
          .join('-') || '';
      return `${item.id}-${itemExtrasId}` === cartItemId;
    });

    if (!itemToUpdate) return;

    // Si el usuario intenta aumentar la cantidad, validamos límites
    if (quantity > itemToUpdate.quantity) {
      // Validar límite por producto
      if (quantity > 10) {
        toast.error('¡Límite alcanzado!', {
          id: 'limit-product',
          description: 'Máximo 10 unidades por producto.',
        });
        return;
      }

      // Validar límite global
      if (totalItems >= 20) {
        toast.error('¡Carrito lleno!', {
          id: 'limit-cart',
          description: 'Por seguridad, No aceptamos pedidos de más de 20 productos.',
        });
        return;
      }
    }

    // Solo si pasó los filtros, actualizamos el estado
    setCart((prev) =>
      prev.map((item) => {
        const itemExtrasId =
          item.selectedExtras
            ?.map((e: any) => e.id)
            .sort()
            .join('-') || '';
        return `${item.id}-${itemExtrasId}` === cartItemId
          ? { ...item, quantity }
          : item;
      }),
    );
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
