/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getAuthors } from '../api/authorData';
import AuthorCard from '../components/AuthorCard';

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
    <div className="text-center my-4">
      <Link href="/author/new" passHref>
        <Button> Add an Author </Button>
      </Link>
      {authors.map((author) => <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllAuthors} />)}
    </div>
  );
}
