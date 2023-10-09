// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';

// // Setting Initial state for useState()
// const initialState = {
//   email: '',
//   favorite: false,
//   first_name: '',
//   last_name: '',
// };

// export default function AuthorForm({ obj }) {
// const [formInput, setFormInput ] = useState(initialState);
// const router = useRouter();
// const { user } = useAuth();

// const handleSubmit = (e) => {
//   e.preventDefault();
// };

//   return (
//     <div>AuthorForm</div>
//   );
// }

// AuthorForm.propTypes = {
//   obj: PropTypes.shape({
//     email: PropTypes.string,
//     favorite: PropTypes.bool,
//     firebaseKey: PropTypes.string,
//     first_name: PropTypes.string,
//     last_name: PropTypes.string,
//   }),
// };

// AuthorForm.defaultProps = {
//   obj: initialState,
// };
