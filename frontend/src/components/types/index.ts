// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // Cambiamos esto a string para que coincida con menu.ts
  tag?: string; // El signo ? ya indica que puede ser opcional o undefined
  tagColor?: string;
  isPromo?: boolean ;
}

export interface CartItem extends Product {
  quantity: number;
}