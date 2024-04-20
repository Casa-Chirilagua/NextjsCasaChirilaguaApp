import React, { useState, useRef, useEffect } from 'react';

function PopUpMenuMain({ children, data }) {
  const [isVisible, setIsVisible] = useState(false);

  const popupRef = useRef(); // Create a ref for the popup menu

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  // Event handler to close the popup if clicked outside
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };
  // Effect hook to add and remove the event listener
  useEffect(() => {
    // Add when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty array ensures this effect runs only once

  // Data should have the following structure:
  // data = [
  //     { icon: <icon/>, content: 'Content 1' },
  return (
    <div className="pop-up-menu-container" onClick={toggleMenu}>
      {children}

      {isVisible && (
        <ul ref={popupRef} className="popup-menu">
          {data.map((item, index) => (
            <li key={index}>
              {item.icon}
              <div>{item.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PopUpMenuMain;
