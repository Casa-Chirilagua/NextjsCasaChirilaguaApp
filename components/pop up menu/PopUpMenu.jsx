import React, { useRef, useEffect } from 'react';

function PopUpMenu({
  children,
  component,
  buttonIcon,
  buttonLabel,
  open,
  setIsVisible,
  handleClick
}) {

  const popupRef = useRef(); // Create a ref for the popup menu

  const toggleMenu = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the document
    setIsVisible(!open);
  };

  // Event handler to close the pop up if clicked outside
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

  return (
    <div className="popup-up-menu-container" onClick={toggleMenu}>
      {children}
      {open && (
        <div
          ref={popupRef}
          className="popup-menu-component"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pop-up-content-container">{component}</div>
          <div className="save-button-container">
            <button onClick={handleClick} className="notes-save">
              {buttonIcon}
              {buttonLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopUpMenu;
