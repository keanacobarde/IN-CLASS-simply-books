/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getBooksNotInOrder } from '../../api/mergedData';

export default function ViewBookOrderDetails() {
  const { user } = useAuth();
  const [bookDetails, setBookDetails] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getBooksNotInOrder(user.uid, firebaseKey).then(console.warn);
  }, []);

  console.warn(bookDetails, setBookDetails);

  return (
    <div>[firebaseKey]</div>
  );
}
