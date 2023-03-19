import cartStore from '@/utils/Store';
import Image from 'next/image';
import React from 'react';

function OrderSummary() {
  const cart = cartStore((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems.map((product) => product.name));

  const cartRemoveItem = cartStore((state) => state.cartRemoveItem);

  const removeCartItemHandler = (product) => {
    cartRemoveItem(product);
  };

  return (
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
                <p className="font-medium text-gray-900">${product.price}.00</p>
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
  );
}

export default OrderSummary;
