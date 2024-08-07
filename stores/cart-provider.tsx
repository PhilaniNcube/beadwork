"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";
import { type Cart, type CartStore, createCartStore } from "./cart-store";

export type CartStoreApi = ReturnType<typeof createCartStore>;

export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export interface CartStoreProviderProps {
  children:ReactNode;
}

export const CartStoreProvider = ({children}: CartStoreProviderProps) => {
  const storeRef = useRef<CartStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(
  selector: (store:CartStore) => T,
):T => {

 const cartStoreContext = useContext(CartStoreContext);

  if (!cartStoreContext) {
    throw new Error('useCart must be used within a CartStoreProvider');
  }

  return useStore(cartStoreContext, selector);

};
