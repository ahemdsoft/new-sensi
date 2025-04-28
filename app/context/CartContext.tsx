'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  brand: string;
  mobile: string;
  quantity: number; // added quantity here
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void; // update item quantity
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
          setCartCount(parsedCart.length);
        } else {
          console.error('Invalid cart data format');
          localStorage.removeItem('cart');
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      localStorage.removeItem('cart');
    }
  }, []);

  // Update localStorage and count when cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setCartCount(cartItems.length);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      // If item already in cart, increase quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity; // increment the quantity
      setCartItems(updatedCart);
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateItemQuantity, removeFromCart, clearCart, cartCount }}>
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
