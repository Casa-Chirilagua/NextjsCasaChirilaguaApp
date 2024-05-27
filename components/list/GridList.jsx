'use client'
import { useState } from 'react';

import HandleName from '@/functions/HandleName';
import Colors from '@/data/Colors';
function GridList({
  items,
  label,
  handleItemId,
  canSelectMultiple,
  color,
  itemTextColor,
  bgColor,
  boxShadow,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsId, setSelectedItemsid] = useState([]);
  //items);

  let labelColor = color ? color : '	#28282B';
  let itemTextColors = itemTextColor ? itemTextColor : '#28282B';
  let backgroundColor = bgColor ? bgColor : 'white';
  let containerBoxshadow = boxShadow ? boxShadow : " rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px";
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  let filteredItems;
  try {
    filteredItems = items.filter((item) => {
      if (item.first_name) {
        return item.first_name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (item.name) {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return [];
      }
    });
  } catch (error) {
    //error);
  }

  const handleItemClick = (item) => {
    handleItemId(item._id);
    setSelectedItem(item);
  };

  const handleItemsClick = (item) => {
    try {
      if (selectedItems.includes(item)) {
        setSelectedItems(
          selectedItems.filter((selectedItem) => selectedItem !== item),
        );
        setSelectedItemsid(selectedItemsId.filter((id) => id !== item._id)); // Remove the unselected item's ID
      } else {
        setSelectedItems([...selectedItems, item]);
        setSelectedItemsid([...selectedItemsId, item._id]);
      }
    } catch (error) {
      //error);
    }
  };

  if (canSelectMultiple) {
    handleItemId(selectedItemsId);
  }

  try {
    return (
      <div style={{ boxShadow: containerBoxshadow }} className="grid-list-container">
        <label style={{ color: labelColor }} className="form-label">
          {label}
        </label>
        <input
          style={{ borderColor: "lightgray" }}
          className="search-bar"
          placeholder="  Search..."
          onChange={handleChange}
        ></input>
        <div className="select-list">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="grid-list-button"
              style={{
                color: itemTextColors,
                // backgroundColor: backgroundColor,
              }}
              onClick={() => {
                if (canSelectMultiple) {
                  handleItemsClick(item);
                } else {
                  handleItemClick(item);
                }
              }}
            >
              {HandleName(item)}
            </div>
          ))}
        </div>

        {!canSelectMultiple && selectedItem && (
          <>
            <h6 style={{ color: labelColor }}>Selected: </h6>
            <div
              style={{
                width: '15rem',
                color: itemTextColors,
                backgroundColor: backgroundColor,
              }}
              className="grid-list-button"
            >
              {HandleName(selectedItem)}
            </div>
          </>
        )}
        {canSelectMultiple && selectedItems && (
          <>
            <h6 style={{ color: labelColor }}>Selected: </h6>
            <div className="select-list">
              {selectedItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    style={{
                      width: '15rem',
                      color: itemTextColors,
                      backgroundColor: backgroundColor,
                    }}
                    className="grid-list-button"
                  >
                    {HandleName(item)}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  } catch (error) { }
}

export default GridList;
