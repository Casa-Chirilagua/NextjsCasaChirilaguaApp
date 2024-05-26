'use client'

import React from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";

//Debounce
import { useDebouncedCallback } from 'use-debounce';

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

function TableWithSearchBarBar({
  searchText,
  onChange,
  title,
  filteredData,
  color,
  idName,
  totalRecords,
  onSearchTextChange,
}) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  /**
   * If the search input is changes then we update the search 
   * params and send the value to the parent component using 
   * the onSearchTextChange function.
   * 
   * @param {*} event 
   */
  const handleSearch = useDebouncedCallback((event) => {
    const params = new URLSearchParams(searchParams);
    if (event.target.value) {
      params.set("search", event.target.value);
    }
    else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
    onSearchTextChange(event.target.value);

  }, 500);
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
            onChange={handleSearch}
            defaultValue={searchParams.get('search')?.toString()}
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

export default TableWithSearchBarBar;
