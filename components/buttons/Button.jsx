import React from 'react';
import { GoSync } from 'react-icons/go';
function Button({ color, bgColor, label, loading, setLookUpItem}) {
  // const handleLookUpExistingItem = (event) => {
  //   event.preventDefault();
  //   setLookUpItem(true);
  // };
  return (
    <button
      disabled={loading}
      style={{
        backgroundColor: bgColor,
        color: color,
      }}
      className="login-button-purple login-button-animated flex items-center justify-center "
      type="submit"
      // onClick={handleLookUpExistingItem}
    >
      {loading ? <GoSync className="animate-spin" /> : label}
    </button>
  );
}

export default Button;
