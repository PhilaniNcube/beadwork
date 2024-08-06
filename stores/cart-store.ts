import {createStore} from 'zustand/vanilla';
import type {Database} from '@/supabase'
import type { ProductDetailsType } from '@/schema';
import { revalidatePath } from 'next/cache';

type CartProduct = ProductDetailsType & {
	quantity: number;
};

export type Cart = {
		products: CartProduct[];
	};

export type CartActions = {
  addToCart: (Cart:Cart, product:CartProduct) => void,
  subtractFromCart: (Cart:Cart, product:CartProduct) => void,
  removeFromCart: (Cart:Cart, product:CartProduct) => void,
  clearCart: (Cart:Cart) => void,
}

export type CartStore = Cart & CartActions

// get the cart from local storage


export const defaultInitState: Cart = {
  products: [],
}



const cart:Cart = {
  products:  [],
}

export const getCart = async (): Promise<Cart> => {


	return cart;
};

export const totalItems = (cart:Cart) => {
  return cart.products.reduce((acc, product) => acc + product.quantity, 0);
};

export const addToCart =  (product:CartProduct) => {
  // check if the product is already in the cart
  const productIndex = cart.products.findIndex(p => p.id === product.id);
  if(productIndex === -1) {
    cart.products.push({...product, quantity: 1});
  } else {
    cart.products[productIndex].quantity += 1;
  }

  return cart;
};

export const subtractFromCart = (product:CartProduct) => {
  const productIndex = cart.products.findIndex(p => p.id === product.id);
  if(productIndex === -1) {
    return cart;
  }
  if(cart.products[productIndex].quantity === 1) {
    cart.products = cart.products.filter(p => p.id !== product.id);
  } else {
    cart.products[productIndex].quantity -= 1;
  }


};

export const removeFromCart = (product:CartProduct) => {
  cart.products = cart.products.filter(p => p.id !== product.id);


};

export const clearCart = () => {
  cart.products = [];


};


export const cartCount = () => {
  console.log(cart.products.reduce((acc, product) => acc + product.quantity, 0));
  return cart.products.reduce((acc, product) => acc + product.quantity, 0);
}
