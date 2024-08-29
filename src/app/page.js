'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login/Login';
import ShoppingLists from './components/ShoppingLists/ShoppingLists';

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
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-black text-center">Shopping List App</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">{user.email}</span>
              <button 
                onClick={() => auth.signOut()} 
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <ShoppingLists user={user} />
      </main>
    </div>
  );
}