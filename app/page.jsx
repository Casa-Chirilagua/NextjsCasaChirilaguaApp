'use client';
import { signOut } from 'next-auth/react';

const HomePage = () => {
  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/login' });
    window.location.href = '/login'; // Redirect to sign-in page or any other page
  };

  return (
    <div>
      <button className='bg-red-500' onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default HomePage;

