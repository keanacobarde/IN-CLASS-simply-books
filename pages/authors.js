/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getAuthors } from '../api/authorData';

export default function Authors() {
  // Create useState for authors
  const [authors, setAuthors] = useState([]);

  // Obtain user.uid
  const { user } = useAuth();

  // Get all authors w/ user.uid w/ API call
  const getAllAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  // Create useEffect so that operation is done whenever page is rednered.
  useEffect(() => {
    getAllAuthors();
  }, []);

  return (
    <div>authors</div>
  );
}
