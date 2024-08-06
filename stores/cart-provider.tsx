"use client";

import {useState, createContext, useContext} from "react";
import {create} from "zustand";
import type { Cart } from "./cart-store";

const createStore = (cart:Cart) => create<{
  cart: Cart;
  totalItems: number;
  setCart: (cart:Cart) => void;
}>((set) => ({
  cart,
  totalItems: cart.products.reduce((acc, product) => acc + product.quantity, 0),
  setCart(cart:Cart) {
    set({cart});
  }
}))

const CartContext = createContext<ReturnType<typeof createStore> | null>(null);

export const useCart = () => {
  if(!CartContext) throw new Error("useCart must be used within a CartProvider");
  return useContext(CartContext);
}

const CartProvider = ({cart, children}:{cart:Cart, children:React.ReactNode}) => {
  const [store] = useState(() => createStore(cart));

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>
}

export default CartProvider;
