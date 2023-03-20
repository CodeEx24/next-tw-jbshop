import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import OrderSummary2 from '@/components/OrderSummary2';
import cartStore from '@/utils/Store';
import Link from 'next/link';
import React from 'react';

function PlaceOrderScreen() {
  const cart = cartStore((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  return (
    <Layout title="Place Order">
      <div className="w-5/6 mx-auto">
        <CheckoutWizard activeStep={3} />
        <div className="flex flex-col lg:flex-row mt-16 bg-gray-50 rounded-xl mb-16">
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
              <div>
                <Link href="/shipping" className="text-indigo-600">
                  Edit
                </Link>
              </div>
            </div>
            <div className="bg-white border border-gray-50 rounded-xl my-6 p-5">
              <h4 className="text-lg font-medium text-gray-900">
                Payment Method
              </h4>
              <div className="pt-2 pb-5">{paymentMethod}</div>
              <div>
                <Link href="/payment" className="text-indigo-600">
                  Edit
                </Link>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="md:w-3/6  md:pr-10 md:py-14 px-8 mb-10">
            <h4 className="text-lg font-medium text-gray-900">Order Summary</h4>
            <div className="bg-white border border-gray-50 rounded-xl">
              {cartItems.length === 0 ? (
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
                  <OrderSummary2 />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PlaceOrderScreen;

PlaceOrderScreen.auth = true;
