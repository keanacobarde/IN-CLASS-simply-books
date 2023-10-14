import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { deleteOrder } from '../api/orderData';

export default function OrderCard({ orderObj, onUpdate }) {
  const deleteThisBookOrder = () => {
    if (window.confirm(`Delete ${orderObj.customer_name}'s Order?`)) {
      deleteOrder(orderObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{orderObj.customer_name}</Card.Title>
        <p> {orderObj.email} </p>
        <Link href={`/order/${orderObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/order/edit/${orderObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBookOrder} className="m-2">
          DELETE
        </Button>
        {orderObj.online ? <p> Online </p> : <p>In-Person</p>}
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    customer_name: PropTypes.string,
    online: PropTypes.bool,
    email: PropTypes.string,
    dateCreated: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
