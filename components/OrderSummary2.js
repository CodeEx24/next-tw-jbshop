import { getError } from '@/utils/error';
import cartStore from '@/utils/Store';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function OrderSummary() {
  const cart = cartStore((state) => state.cart);
  const cartReset = cartStore((state) => state.cartReset);
  const { cartItems, shippingAddress, paymentMethod } = cart;
  // console.log(cartItems.map((product) => product.name));

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      cartReset();
      Cookies.set('cart', JSON.stringify({ ...cart, cartItems: [] }));

      router.push(`/order/${data._id}`);
    } catch (error) {
      setLoading(false);
      toast.error(getError(error));
    }
  };

  const cartRemoveItem = cartStore((state) => state.cartRemoveItem);

  const removeCartItemHandler = (product) => {
    cartRemoveItem(product);
  };

  return (
    <>
      <div>
        {cartItems.map((product, index) => (
          <div
            key={index}
            className="flex flex-row justify-between border-b  border-gray-100"
          >
            <div className="flex flex-row py-5 px-5">
              <Image
                width={70}
                height={70}
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-md object-center object-cover sm:w-24 sm:h-24"
              />
              <div className="flex flex-col justify-between ml-4">
                <div>
                  <h1 className="font-medium text-gray-600">{product.name}</h1>
                  <p className="font-medium text-gray-900">
                    ${product.price}.00
                  </p>
                </div>
                <p className="text-gray-500">x{product.quantity}</p>
              </div>
            </div>
            <div className="py-5 px-5">
              <button
                type="button"
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => removeCartItemHandler(product)}
              >
                {/* TRASH ICON */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between p-5">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            ${cartItems.reduce((p, c) => p + c.quantity * c.price, 0)}
            .00
          </dd>
        </div>
      </div>
      <div className="px-5 pt-5">
        <button
          disabled={loading}
          onClick={placeOrderHandler}
          className={`bg-indigo-600 text-white w-full py-1.5 my-5 rounded-md ${
            loading ? 'opacity-50' : ''
          }`}
        >
          {loading ? 'Loading...' : 'Place Order'}
        </button>
      </div>
    </>
  );
}

export default OrderSummary;
