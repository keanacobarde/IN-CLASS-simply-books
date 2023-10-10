// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';

// Setting Initial state for useState()
const initialState = {
  email: '',
  favorite: false,
  first_name: '',
  last_name: '',
};

export default function AuthorForm() {
// const [formInput, setFormInput ] = useState(initialState);
// const router = useRouter();
// const { user } = useAuth();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialState,
};
