'use client'
import { useState, useRef, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { VscSignOut } from 'react-icons/vsc';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'
//User Session
import { signOut, useSession } from 'next-auth/react';


/**
 * The top navigation bar component which contains the logo and use profile image
 * 
 * 
 * @returns NavigationBar component
 */
function NavigationBar() {

  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const pathname = usePathname();


  const popupRef = useRef(); // Create a ref for the popup menu
  const [popUpMenu, setPopUpMenu] = useState(false);

  // Event handler to close the popup if clicked outside
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopUpMenu(false);
    }
  };

  // Effect hook to add and remove the event listener
  useEffect(() => {
    if (popUpMenu) {
      // Add the event listener only if the popup is visible
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popUpMenu]); // Empty array ensures this effect runs only once

  try {
    return (
      pathname !== '/login' && <nav className="navbar-container">
        <div className="navbar-left">
          <Link href="/dashboard/student" className=" p-5">
            <Image priority={false} className="logo p-1" alt="logo" src={"https://res.cloudinary.com/dnmsdb199/image/upload/v1713132785/CasaApp/awmmpuofao8kruog6k2f.svg"} height={100} width={100} />
          </Link>
        </div>
        <div className="navbar-center">{/* <SearchBar /> */}</div>
        <div className="navbar-right">
          <div className="greeting">Hello, {session?.user?.name || 'Guest'}</div>
          <div className="user-icon-container">
            <Image className="user-icon border-solid border-white border-2 p-1" height={150} width={150} src={profileImage} alt={session?.user?.name} onClick={() => setPopUpMenu(!popUpMenu)}
            />
          </div>
          {popUpMenu && (
            <div ref={popupRef} className="drop-down">
              {/* PopupMenu contents go here */}
              {PopUpMenu(signOut, profileImage, session?.user?.name)}
            </div>
          )}
        </div>
      </nav>
    );
  } catch (error) {
    //error);
  }
}

function PopUpMenu(signOut, picture, name, popupRef) {
  const router = useRouter()
  // Function to handle sign-out
  const handleSignOut = () => {
    signOut();
    router.push('/login') // Redirect to sign-in page or any other page
  };


  return (
    <div ref={popupRef} className="drop-down">
      <div className="drop-down-profile">
        <Image
          style={{
            height: '4rem',
            width: '4rem',
            border: 'solid .15rem white',
            borderRadius: '100%',
          }}
          className="user-icon"
          src={picture}
          alt={name}
          height={100}
          width={100}
        />
        <div>{name}</div>
      </div>

      <div className="drop-down-item">
        <CgProfile className='avatar' />

        <Link style={{ color: "#343a40" }} href="/user-profile" >
          View Profile
        </Link>
      </div>

      <div className="drop-down-item" onClick={handleSignOut}>
        <VscSignOut className='avatar' />

        <div>Sign out</div>
      </div>
    </div>
  );
}

export default NavigationBar;
