'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const page = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const router = useRouter()

  useEffect(() => {
    // Check if there is a session and if the session status is "authenticated"
    if (session) {
      router.push('/dashboard/student'); // Redirect to sign-in page or any other page

    }
  }, [session]); // Dependencies to re-run this effect


  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    }

    setAuthProviders();
  })


  const handleSignIn = () => {
    signIn();
  }

  return (
    !session && (<div className="page">
      <div className="login-container">
        <div className="casa-logo-container">
          <Image priority={false} className="casa-logo" width={100} height={100} src={"https://res.cloudinary.com/dnmsdb199/image/upload/v1713132785/CasaApp/awmmpuofao8kruog6k2f.svg"} alt="Logo" />
        </div>

        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">Welcome!</span>
            <span className="heading-primary-sub">
              Log in to Casa Chirilagua
            </span>
          </h1>
          {/* <button className="login-button login-button-animated"> </button> */}
          {/* <Link href="/api/auth/login">Login</Link> */}
          {providers && Object.values(providers).map((provider, index) => (
            <button key={index} className="login-button login-button-animated" onClick={() => handleSignIn()}>Sign in</button>
          ))}
        </div>
      </div>
    </div>)

  )
}

export default page