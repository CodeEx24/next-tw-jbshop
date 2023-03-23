import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };

    fetchOrders();
  }, []);

  return (
    <Layout title="Order History">
      <div className="flex flex-col w-full">
        <h1 className=" text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Order History
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="w-full overflow-x-auto mt-6">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">DATE</th>
                  <th className="p-5 text-left">TOTAL</th>
                  <th className="p-5 text-left">PAID</th>
                  <th className="p-5 text-left">DELIVERED</th>
                  <th className="p-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="p-5">{order._id.substring(20, 24)}</td>
                    <td className="p-5">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-5">${order.totalPrice}</td>
                    <td
                      className={`p-5 font-medium ${
                        order.isPaid ? 'text-indigo-600' : 'text-red-600'
                      }`}
                    >
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : 'Not Paid'}
                    </td>
                    <td
                      className={`p-5 font-medium ${
                        order.isDelivered ? 'text-indigo-600' : 'text-red-600'
                      }`}
                    >
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : 'Not Delivered'}
                    </td>
                    <td className="p-5 underline text-indigo-600 font-medium">
                      <Link href={`/order/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
