import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthorForm from '../../../components/forms/AuthorForm';
import { getSingleAuthor } from '../../../api/authorData';

export default function EditAuthor() {
  const [editItem, setEditItem] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  console.warn(editItem);

  useEffect(() => {
    getSingleAuthor(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <AuthorForm obj={editItem} />
  );
}
