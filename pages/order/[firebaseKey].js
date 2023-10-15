/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Card, Button, CardBody } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getBooksNotInOrder } from '../../api/mergedData';

export default function ViewBookOrderDetails() {
  const { user } = useAuth();
  const [bookDetails, setBookDetails] = useState([]);
  const [booksNotInOrder, setBooksNotInOrder] = useState([]);

  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getBooksNotInOrder(user.uid, firebaseKey).then(setBooksNotInOrder);
  }, []);

  console.warn(bookDetails, setBookDetails, booksNotInOrder);

  return (
    // books not yet in order
    <div>
      <h6 className="text-white mt-5"> ADD BOOKS TO CART </h6>
      <div className="mb-3 text-white mt-5" style={{ display: 'flex' }}>
        {booksNotInOrder.map((book) => (
          <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Img variant="top" src={book.image} alt={book.title} style={{ height: '400px' }} />
            <CardBody>
              <Card.Title>{book.title}</Card.Title>
              <p className="card-text bold">{book.sale && <span>SALE<br /></span> } ${book.price}</p>
              <Link href="/" passHref>
                <Button variant="success" className="m-2">ADD TO CART</Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
