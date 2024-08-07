import {createStore} from 'zustand/vanilla';
import type { ProductDetailsType } from '@/schema';


type CartProduct = ProductDetailsType & {
	quantity: number;
};

export type Cart = {
		products: CartProduct[];
	};

export type CartActions = {
  addToCart: ( product:CartProduct) => void,
  subtractFromCart: ( product:CartProduct) => void,
  removeFromCart: ( product:CartProduct) => void,
  clearCart: () => void,

}

export type CartStore = Cart & CartActions




export const defaultInitState: Cart = {
  products: [],

}



const cart:Cart = {
  products:  [],

}

export const getCart = async (): Promise<Cart> => {
	return cart;
};

export const createCartStore = (initState: Cart = cart) => {
	return createStore<CartStore>((set) => ({
		...initState,
		 addToCart: (product: CartProduct) =>
      set((state) => {
        const productIndex = state.products.findIndex(
          (p) => p.id === product.id,
        );
        if (productIndex === -1) {
          return {
            ...state,
            products: [...state.products, { ...product, quantity: 1 }],
          };
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          const updatedProducts = state.products.map((p, index) =>
            index === productIndex
              ? { ...p, quantity: p.quantity + 1 }
              : p
          );
          return {
            ...state,
            products: updatedProducts,
          };
        }
      }),
		subtractFromCart: (product: CartProduct) =>
			set((state) => ({
        products: state.products.map((p) => {
          if (p.id === product.id) {
            p.quantity -= 1;
          }
          return p;
        }),
      })),
		removeFromCart: (product: CartProduct) =>
			set((state) => ({products: state.products.filter((p) => p.id !== product.id)})),
		clearCart: () =>
			set((state) => ({products: []})),
	}));
};






