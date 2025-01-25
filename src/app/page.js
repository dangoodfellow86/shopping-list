'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login/Login';
import ShoppingLists from './components/ShoppingLists/ShoppingLists';
import Navbar from './components/NavBar/Navbar';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
     <Navbar />
      <main>
        <ShoppingLists user={user} />
      </main>
    </div>
  );
}