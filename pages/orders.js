/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getOrders } from '../api/orderData';
import OrderCard from '../components/OrderCard';

export default function ShowOrders() {
  const [orders, setOrders] = useState([]);

  const { user } = useAuth();

  const getAllTheOrders = () => {
    getOrders(user.uid).then(setOrders);
  };

  useEffect(() => {
    getAllTheOrders();
  }, []);

  console.warn(orders);

  return (
    <div>
      {orders.map((order) => <OrderCard key={order.firebaseKey} orderObj={order} onUpdate={getAllTheOrders} />)}
    </div>
  );
}
