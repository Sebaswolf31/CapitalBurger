// src/types/index.ts

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // Cambiamos esto a string para que coincida con menu.ts
  tag?: string; // El signo ? ya indica que puede ser opcional o undefined
  tagColor?: string;
  isPromo?: boolean;
  extras?: ExtraOption[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedExtras?: ExtraOption[];
}
