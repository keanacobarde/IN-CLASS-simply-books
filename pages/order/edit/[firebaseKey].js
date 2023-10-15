import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../../api/orderData';
import OrderForm from '../../../components/forms/OrderForm';

export default function EditOrder() {
  const [editOrder, setEditOrder] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleOrder(firebaseKey).then(setEditOrder);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderForm orderObj={editOrder} />
  );
}
