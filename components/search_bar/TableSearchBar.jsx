import React from 'react';

//csv
import { CSVLink } from 'react-csv';

//Icons
import { CiMenuFries } from 'react-icons/ci';

// Components
import Tooltip from '../tooltip/Tooltip.jsx';
import PopUpMenuMain from '../pop up menu/PopUpMenuMain.jsx';

//Icons
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoFilterOutline } from 'react-icons/io5';

function TableSearchBar({
  searchText,
  onChange,
  title,
  filteredData,
  color,
  idName,
  totalRecords,
}) {
  try {
    return (
      <div className="search-title-container" id={color}>
        <div className="table-header-container">
          {' '}
          <h1
            id={color}
            className="table-label table-heading"
          >
            {totalRecords} {title}{' '}
          </h1>
        </div>
        <div className="searchbar-table-container">
          <input
            className="list-searchbar"
            placeholder="Search..."
            variant="outlined"
            value={searchText}
            onChange={onChange}
          ></input>
        </div>

        <div className="search-right-container">
          <PopUpMenuMain
            data={[
              {
                icon: <MdOutlineFileDownload />,
                content: (
                  <CSVLink
                    data={Array.isArray(filteredData) ? filteredData : []}
                  >
                    <div>Download csv</div>{' '}
                  </CSVLink>
                ),
              },
              { icon: <IoFilterOutline />, content: 'Filter' },
            ]}
          >
            <Tooltip content="More options">
              <div className="tooltip-button">
                <CiMenuFries
                  className="table-menu-avatar"
                  style={{ fontSize: '2rem' }}
                />
              </div>
            </Tooltip>
          </PopUpMenuMain>
        </div>
      </div>
    );
  } catch (error) {
    //error);
  }
}

export default TableSearchBar;
