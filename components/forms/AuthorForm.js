// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';

// Setting Initial state for useState()
const initialState = {
  email: '',
  favorite: false,
  first_name: '',
  last_name: '',
};

export default function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  console.warn(setFormInput);
  // const router = useRouter();
  // const { user } = useAuth();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormInput((prevState) => {
  //     ({
  //       ...prevState,
  //       [name]: value,
  //     })
  //   })
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <Form>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      <Form.Group className="mb-3 text-white mt-5" controlId="authorFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Author First Name" name="first_name" value={formInput.first_name} required />
      </Form.Group>

      <Form.Group className="mb-3 text-white mt-5" controlId="authorLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" name="last_name" value={formInput.last_name} required />
      </Form.Group>
      <Form.Group className="mb-3 text-white mt-5" controlId="authorEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" name="email" value={formInput.email} required />
      </Form.Group>
      <Form.Group className="mb-3 text-white mt-5" controlId="authorFavorite">
        <Form.Check type="checkbox" label="Favorite?" name="favorite" checked={formInput.favorite} />
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
