import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import OrderSummary from '@/components/OrderSummary';
import cartStore from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function ShippingScreen() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const cart = cartStore((state) => state.cart);
  const { shippingAddress } = cart;
  const saveShippingAddress = cartStore((state) => state.saveShippingAddress);

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    saveShippingAddress({
      fullName,
      address,
      city,
      postalCode,
      country,
    });

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: { fullName, address, city, postalCode, country },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Shipping Screen">
      <div className="w-5/6 mx-auto">
        <CheckoutWizard />
        <div className="flex flex-col lg:flex-row mt-16 bg-gray-50 rounded-xl mb-16">
          {/* CONTACT INFORMATION */}
          <div className="md:w-full md:px-16 md:py-14 p-8">
            <h4 className="text-lg font-medium text-gray-900">
              Contact Information
            </h4>
            <form onSubmit={handleSubmit(submitHandler)}>
              {/* FULL NAME */}
              <p className="text-sm font-medium text-gray-700 mt-3 mb-2 ml-0.5">
                Full Name
              </p>
              <input
                type="text"
                className="w-full py-1.5 px-3 rounded-md border border-gray-300 focus:outline-1 focus:outline-gray-300"
                autoFocus
                id="fullName"
                {...register('fullName', {
                  required: 'Please enter your Full Name',
                })}
              />
              {errors.fullName && (
                <p className="text-sm font-medium text-red-600 ml-0.5 mt-0.5">
                  {errors.fullName.message}
                </p>
              )}

              {/* ADDRESS */}
              <p className="text-sm font-medium text-gray-700 mt-3 mb-2 ml-0.5">
                Address
              </p>
              <input
                type="text"
                className="w-full py-1.5 px-3 rounded-md border border-gray-300 focus:outline-1 focus:outline-gray-300 "
                id="address"
                {...register('address', {
                  required: 'Please enter your Address',
                })}
              />
              {errors.address && (
                <p className="text-sm font-medium text-red-600 ml-0.5 mt-0.5">
                  {errors.address.message}
                </p>
              )}

              {/* CITY */}
              <p className="text-sm font-medium text-gray-700 mt-3 mb-2 ml-0.5">
                City
              </p>
              <input
                type="text"
                className="w-full py-1.5 px-3 rounded-md border border-gray-300 focus:outline-1 focus:outline-gray-300 "
                id="city"
                {...register('city', {
                  required: 'Please enter your City',
                })}
              />
              {errors.city && (
                <p className="text-sm font-medium text-red-600 ml-0.5 mt-0.5">
                  {errors.city.message}
                </p>
              )}

              {/* POSTAL CODE */}
              <p className="text-sm font-medium text-gray-700 mt-3 mb-2 ml-0.5">
                Postal Code
              </p>
              <input
                type="text"
                className="w-full py-1.5 px-3 rounded-md border border-gray-300 focus:outline-1 focus:outline-gray-300 "
                id="postalCode"
                {...register('postalCode', {
                  required: 'Please enter your Postal Code',
                })}
              />
              {errors.postalCode && (
                <p className="text-sm font-medium text-red-600 ml-0.5 mt-0.5">
                  {errors.postalCode.message}
                </p>
              )}

              {/* COUNTRY */}
              <p className="text-sm font-medium text-gray-700 mt-3 mb-2 ml-0.5">
                Country
              </p>
              <input
                type="text"
                className="w-full py-1.5 px-3 rounded-md border border-gray-300 focus:outline-1 focus:outline-gray-300 "
                id="country"
                {...register('country', {
                  required: 'Please enter your Country',
                })}
              />
              {errors.country && (
                <p className="text-sm font-medium text-red-600 ml-0.5 mt-0.5">
                  {errors.country.message}
                </p>
              )}

              <button className="bg-indigo-600 text-white w-full py-1.5 my-5 rounded-md">
                Next
              </button>
            </form>
          </div>

          {/* ORDER SUMMARYT */}
          <div className="md:w-full  md:px-16 md:py-14 px-8 mb-10">
            <h4 className="text-lg font-medium text-gray-900">Order Summary</h4>
            <div className="bg-white border border-gray-50 rounded-xl">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ShippingScreen;

ShippingScreen.auth = true;
