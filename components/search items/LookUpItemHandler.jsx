'use client'
import { useState } from 'react';
import GridList from '@/components/list/GridList';


function LookUpItemHandler({
  buttonLabel,
  items,
  title,
  handleItemId,
  selectItemLabel,
  canSelectMultiple,
}) {
  const [lookUpItem, setLookUpItem] = useState(false);
  const handleLookUpExistingItem = (event) => {
    event.preventDefault();
    setLookUpItem(true);
  };
  return (
    <div className='mt-20 mx-6'>
      <div style={{ width: "100%", color: "#343a40" }} className="text-5xl font-normal text-center pb-20">{title}</div>
      <div className=" button-container">
        <button
          className="p-6 mx-20 transition ease-in delay-500 bg-zinc-100  text-2xl rounded-md border-black md:border-black hover:bg-black md:hover:bg-black hover:text-white md:hover:text-white"
          onClick={handleLookUpExistingItem}
        >
          {buttonLabel}
        </button>
      </div>

      {lookUpItem && (
        <div className="mx-8">
          <GridList
            handleItemId={handleItemId}
            items={items}
            label={selectItemLabel}
            canSelectMultiple={canSelectMultiple}
          />
          {/* Additional logic based on guardian type */}
        </div>
      )}
    </div>
  );
}

export default LookUpItemHandler;
