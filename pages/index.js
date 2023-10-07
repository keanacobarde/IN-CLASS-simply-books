/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1> Welcome, {user.displayName}! </h1>
    </>
  );
}

export default Home;
