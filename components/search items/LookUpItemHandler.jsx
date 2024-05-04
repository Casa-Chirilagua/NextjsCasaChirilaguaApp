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
    <div style={{ paddingTop: '1rem' }}>
      <h4 className="page-title">{title}</h4>
      <div className="button-container">
        <button
          className="login-button-purple login-button-animated"
          onClick={handleLookUpExistingItem}
        >
          {buttonLabel}
        </button>
      </div>

      {lookUpItem && (
        <div className="grids-container">
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
