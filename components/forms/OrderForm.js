import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, updateOrder } from '../../api/orderData';

const initialState = {
  customer_name: '',
  online: false,
  email: '',
  date_created: new Date().toLocaleDateString,
};

export default function OrderForm({ orderObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.firebaseKey) {
      updateOrder(formInput).then(() => router.push(`/order/${orderObj.firebaseKey}}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createOrder(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateOrder(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{orderObj.firebaseKey ? 'Update' : 'Create'} Order</h2>
      <Form.Group className="mb-3 text-white mt-5" controlId="formBasicEmail">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="customer_name"
          value={formInput.customer_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3 text-white mt-5" controlId="formBasicPassword">
        <Form.Label>Customer Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3 text-white mt-5" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Online?"
          name="orderType"
          checked={formInput.orderType}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              orderType: e.target.checked,
            }));
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

OrderForm.propTypes = {
  orderObj: PropTypes.shape({
    customer_name: PropTypes.string,
    orderType: PropTypes.bool,
    email: PropTypes.string,
    dateCreated: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};
