"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

export interface CartItem extends Product {
  quantity: number;
  selectedVariation?: {
    size: string;
    price: number;
  };
  selectedColor?: string;
  kitItems?: Product['bundleItems'];
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, variation?: CartItem['selectedVariation'], color?: string, kitItems?: Product['bundleItems']) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  includeInstallation: boolean;
  setIncludeInstallation: (value: boolean) => void;
  totalItems: number;
  totalPrice: number;
  installationPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [includeInstallation, setIncludeInstallation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedInstallation = localStorage.getItem('includeInstallation');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Санитарная проверка: если в selectedColor попал объект (из-за старых данных в localStorage), 
        // конвертируем его в строку (название цвета), чтобы не было ошибок React.
        const sanitizedCart = parsedCart.map((item: CartItem) => {
          const colorValue = (item as unknown as { selectedColor?: string | { name?: string } }).selectedColor;
          if (colorValue && typeof colorValue === 'object') {
            return {
              ...item,
              selectedColor: colorValue.name || 'Стандартный'
            };
          }
          return item;
        });
        setItems(sanitizedCart);
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
    if (savedInstallation) {
      setIncludeInstallation(savedInstallation === 'true');
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
      localStorage.setItem('includeInstallation', String(includeInstallation));
    }
  }, [items, includeInstallation, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1, variation?: CartItem['selectedVariation'], color?: string, kitItems?: Product['bundleItems']) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => 
        item.id === product.id && 
        item.selectedVariation?.size === variation?.size && 
        item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        const newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      }

      const finalPrice = variation ? variation.price : product.price;

      return [...currentItems, { 
        ...product, 
        quantity, 
        selectedVariation: variation, 
        selectedColor: color,
        price: finalPrice,
        kitItems: kitItems
      }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(currentItems => currentItems.filter(item => {
      const currentItemId = `${item.id}-${item.selectedVariation?.size || 'default'}-${item.selectedColor || 'default'}`;
      return currentItemId !== itemId;
    }));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item => {
        const currentItemId = `${item.id}-${item.selectedVariation?.size || 'default'}-${item.selectedColor || 'default'}`;
        return currentItemId === itemId ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.length;
  const itemsPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const installationPrice = includeInstallation ? Math.round(itemsPrice * 0.15) : 0;
  const totalPrice = itemsPrice + installationPrice;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, includeInstallation, setIncludeInstallation, totalItems, totalPrice, installationPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
