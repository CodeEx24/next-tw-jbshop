import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import cartStore from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function PaymentScreen() {
  const router = useRouter();

  const cart = cartStore((state) => state.cart);
  const savePaymentMethod = cartStore((state) => state.savePaymentMethod);

  const { shippingAddress, paymentMethod } = cart;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }

    savePaymentMethod(selectedPaymentMethod);
    Cookies.set(
      'cart',
      JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod })
    );

    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }

    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <div className="w-5/6 mx-auto">
        <CheckoutWizard activeStep={1} />
        <div className="flex justify-center">
          <form
            className="mt-20 bg-gray-50 w-2/6 p-12 rounded-md"
            onSubmit={submitHandler}
          >
            <h4 className="text-lg font-medium text-gray-900 mb-5">
              Payment Method
            </h4>
            {['Paypal', 'Stripe', 'CashOnDelivery'].map((payment) => (
              <div key={payment} className="mb-4">
                <input
                  name="paymentMethod"
                  id={payment}
                  type="radio"
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />

                <label className="ml-3" htmlFor={payment}>
                  {payment}
                </label>
              </div>
            ))}
            <div className="flex flex-row gap-5">
              <div className="w-1/2">
                <button
                  className="bg-gray-600 text-white px-5 py-2 rounded-md w-full"
                  type="button"
                  onClick={() => router.push('/shipping')}
                >
                  Back
                </button>
              </div>
              <div className="w-1/2">
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-md w-full">
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentScreen;
