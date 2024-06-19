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
      className="p-6 w-full transition text-white ease-in delay-500 bg-green-700  text-2xl rounded-xl  hover:bg-green-900 md:hover:bg-green-800 hover:text-white md:hover:text-white flex items-center justify-center"
      type="submit"
    >
      {loading ? <GoSync className="animate-spin" /> : label}
    </button>
  );
}

export default Button;
