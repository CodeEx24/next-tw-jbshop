import { create } from 'zustand';

const cartStore = create((set) => ({
  cart: { cartItems: [] },
  cartAddItem: (newItem) =>
    set((state) => {
      // Checking for the existence of item in the cart
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      // Cart Items will change here
      const cartItems = existItem
        ? state.cart.cartItems.map(
            (item) => (item.name === existItem.name ? newItem : item) // Check if the item is existing to update that specific item with updated input quantity
          )
        : [...state.cart.cartItems, newItem];

      return { ...state, cart: { ...state.cart, cartItems } };
    }),
  cartRemoveItem: (newItem) =>
    set((state) => {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== newItem.slug
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }),

  cartQtyUpdateItem: (newItem) =>
    set((state) => {
      const cartItems = state.cart.cartItems.map((item) =>
        item.slug === newItem.slug ? newItem : item
      );

      return { ...state, cart: { ...state.cart, cartItems } };
    }),
}));

export default cartStore;
