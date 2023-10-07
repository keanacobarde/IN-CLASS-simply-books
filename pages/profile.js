/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <h1> {user.displayName} </h1>
      <h1> {user.email} </h1>
      <img alt="User Profile" src={user.photoURL} />
    </>
  );
}
