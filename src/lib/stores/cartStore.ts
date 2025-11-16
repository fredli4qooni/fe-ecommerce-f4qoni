/**
 * ------------------------------------------------------------
 * Project     : e-commerce fredli4qoni
 * File        : cartStore.ts
 * Author      : Fredli Fourqoni
 * Created     : 17 Nov 2025
 * Description : Zustand store for managing the shopping cart state.
 *
 * License     : MIT License
 * Copyright (c) 2025 Fredli Fourqoni
 * ------------------------------------------------------------
 */

import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '$lib/types';
import type { StateCreator } from 'zustand';

/**
 * Represents a product item within the shopping cart, including quantity.
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Defines the state and actions for the cart store.
 */
export interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

type CartStoreCreator = StateCreator<CartState>;

const createCartSlice: CartStoreCreator = (set) => ({
  items: [],

  addItem: (product) => set((state) => {
    const existingItem = state.items.find((item) => item.id === product.id);
    if (existingItem) {
      // If item exists, increment quantity
      const updatedItems = state.items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { items: updatedItems };
    } else {
      // If new item, add to cart with quantity 1
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return { items: state.items.filter((item) => item.id !== productId) };
    }
    return {
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    };
  }),
  
  clearCart: () => set({ items: [] }),
});

/**
 * Zustand store for managing the global shopping cart state.
 * This store is persisted to localStorage to maintain the cart across sessions.
 */
export const useCartStore = createStore<CartState>()(
  persist(
    createCartSlice,
    {
      name: 'cart-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);