import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';

import { getError } from '@/utils/error';
// import cartStore from '@/utils/Store';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderScreen() {
  const { query } = useRouter();
  const orderId = query.id;

  //   const cart = cartStore((state) => state.cart);

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [orderId, order]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Order ${orderId}`}>
      {loading ? (
        <div>Loading ...</div>
      ) : error ? (
        <div className="text-red-600 font-bold text-lg">{error}</div>
      ) : (
        <div className="w-5/6 mx-auto">
          <CheckoutWizard activeStep={3} />
          <h4 className="text-2xl font-medium text-gray-700 mt-8">
            {`Order ${orderId}`}
          </h4>
          <div className="flex flex-col lg:flex-row mt-8 bg-gray-50 rounded-xl mb-16">
            {/* CONTACT INFORMATION */}
            <div className="md:w-3/6 md:pl-10 md:py-14 p-8">
              <h4 className="text-lg font-medium text-gray-900">
                Order Information
              </h4>
              <div className="bg-white border border-gray-50 rounded-xl p-5">
                <h4 className="text-lg font-medium text-gray-900">
                  Shipping Address
                </h4>
                <div className="pt-2 pb-5">
                  <p className="font-medium text-gray-700">
                    {shippingAddress.fullName}
                  </p>
                  <p>
                    {shippingAddress.address}, {shippingAddress.city},
                    {shippingAddress.postalCode}
                  </p>
                  <p> {shippingAddress.country}</p>
                </div>
                <div className="flex">
                  {isDelivered ? (
                    <p className="text-indigo-600 font-medium ">
                      Delivered at {deliveredAt}
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium ">Not delivered</p>
                  )}
                </div>
              </div>
              <div className="bg-white border border-gray-50 rounded-xl my-6 p-5">
                <h4 className="text-lg font-medium text-gray-900">
                  Payment Method
                </h4>
                <div className="pt-2 pb-5">{paymentMethod}</div>
                <div>
                  {isPaid ? (
                    <p className="text-indigo-600 font-medium ">
                      Paid at {paidAt}
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium ">Not paid</p>
                  )}
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="md:w-3/6  md:pr-10 md:py-14 px-8 mb-10">
              <h4 className="text-lg font-medium text-gray-900">
                Order Summary
              </h4>
              <div className="bg-white border border-gray-50 rounded-xl">
                {orderItems.length === 0 ? (
                  <div className=" p-6">
                    <p className="text-2xl font-medium mb-6"> Cart is Empty</p>
                    <div>
                      <Link href="/" className="text-indigo-600 font-medium">
                        Go Shopping
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      {orderItems.map((product, index) => (
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
                                <h1 className="font-medium text-gray-600">
                                  {product.name}
                                </h1>
                                <p className="font-medium text-gray-900">
                                  ${product.price}.00
                                </p>
                              </div>
                              <p className="text-gray-500">
                                x{product.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="py-5 px-5"></div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between px-5 pb-2 pt-5">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ${itemsPrice}.00
                        </dd>
                      </div>
                      <div className="flex items-center justify-between px-5 pb-2">
                        <dt className="text-sm text-gray-600">Tax</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ${taxPrice}.00
                        </dd>
                      </div>
                      <div className="flex items-center justify-between px-5 pb-2">
                        <dt className="text-sm text-gray-600">
                          Shipping Price
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ${shippingPrice}.00
                        </dd>
                      </div>
                      <div className="flex items-center justify-between px-5 pb-7">
                        <dt className="text-sm text-gray-600">Total Price</dt>
                        <dd className="text-sm font-medium text-gray-900">
                          ${totalPrice}.00
                        </dd>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;

export default OrderScreen;
