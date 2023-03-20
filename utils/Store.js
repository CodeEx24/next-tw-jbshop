import { create } from 'zustand';
import Cookies from 'js-cookie';

const cartStore = create((set) => {
  const cart = Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: '' };

  return {
    cart,
    cartAddItem: (newItem) =>
      set((state) => {
        const existItem = state.cart.cartItems.find(
          (item) => item.slug === newItem.slug
        );

        const cartItems = existItem
          ? state.cart.cartItems.map((item) =>
              item.name === existItem.name ? newItem : item
            )
          : [...state.cart.cartItems, newItem];

        Cookies.set('cartItems', JSON.stringify(cartItems));

        return { ...state, cart: { ...state.cart, cartItems } };
      }),
    cartRemoveItem: (newItem) =>
      set((state) => {
        const cartItems = state.cart.cartItems.filter(
          (item) => item.slug !== newItem.slug
        );

        Cookies.set('cartItems', JSON.stringify(cartItems));

        return { ...state, cart: { ...state.cart, cartItems } };
      }),

    cartQtyUpdateItem: (newItem) =>
      set((state) => {
        const cartItems = state.cart.cartItems.map((item) =>
          item.slug === newItem.slug ? newItem : item
        );

        Cookies.set('cartItems', JSON.stringify(cartItems));

        return { ...state, cart: { ...state.cart, cartItems } };
      }),

    cartReset: () =>
      set((state) => {
        return {
          ...state,
          cart: {
            cartItems: [],
            shippingAddress: {},
            paymentMethod: '',
          },
        };
      }),

    cartClearItems: () =>
      set((state) => {
        return {
          ...state,
          cart: { ...state.cart, cartItems: [] },
        };
      }),

    saveShippingAddress: (addressDetails) => {
      set((state) => {
        const { fullName, address, city, postalCode, country } = addressDetails;
        return {
          ...state,
          cart: {
            ...state.cart,
            shippingAddress: {
              ...state.cart.shippingAddress,
              fullName,
              address,
              city,
              postalCode,
              country,
            },
          },
        };
      });
    },

    savePaymentMethod: (method) => {
      set((state) => {
        return {
          ...state,
          cart: {
            ...state.cart,
            paymentMethod: method,
          },
        };
      });
    },
  };
});

export default cartStore;
