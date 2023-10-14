import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  customer_name: '',
  orderType: '',
  email: '',
  dateCreated: Date.now(),
};

export default function OrderForm({ orderObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form>
      <h2 className="text-white mt-5">{orderObj.firebaseKey ? 'Update' : 'Create'} Order</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="customer_name"
          value={formInput.customer_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formInput.customer_name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
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
    orderType: PropTypes.string,
    email: PropTypes.string,
    dateCreated: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  orderObj: initialState,
};
