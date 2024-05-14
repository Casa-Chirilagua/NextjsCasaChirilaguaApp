'use client'

//React
import { useEffect, useState } from 'react';

//Unique ID
import { v4 as uuidv4 } from 'uuid';

//Components
import SortableTable from '../tables/SortableTable';
import TableSearchBar from '@/components/search_bar/TableSearchBar';

function StudentTable({
  config,
  data,
  title,
  color,
  searchTitleColor,
  totalRecords,
}) {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const keyFn = (fruit) => {
    return fruit.name;
  };

  useEffect(() => {

    //Search text
    let filtered;

    if (data && Array.isArray(data)) {
      filtered = data?.filter((obj) => {

        /**
         * 1. Check if the object has a first_name, name, or family_name property
         * 2. If it does, check if the value of the property includes the search text
         * 3. If it does, return true
         */
        if (obj.first_name) {
          return obj.first_name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        } else if (obj.name) {
          return obj.name.toLowerCase().includes(searchText.toLowerCase());
        } else {
          return obj.family_name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        }
      });
    }
    setFilteredData(filtered);
    return;


  }, [data, searchText]);

  if (!data) {
    return <div>Loading...</div>;
  }
  let dataWithIds;

  try {
    if (data && Array.isArray(data)) {
      // console.log(typeof data);
      dataWithIds = data?.map((data) => ({
        ...data,
        id: uuidv4(),
      }));
    }
  } catch (error) {
    console.log(error);
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="student-search-container">
      {Array.isArray(data) ? (
        <>
          <TableSearchBar
            color={searchTitleColor}
            filteredData={filteredData}
            onChange={handleSearch}
            value={searchText}
            title={title}
            totalRecords={totalRecords}
          />
          {/* <FilterBar
            config={configFilterBar}
            unfilteredData={data}
            setFiltered={setFilteredData}
            activeFilter={activeFilter}
            searchText={searchText}
            setActiveFilter={setActiveFilter}
          /> */}
          <SortableTable
            key={uuidv4()}
            className="span2"
            color={color}
            data={filteredData}
            config={config}
            keyFn={keyFn}
          ></SortableTable>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default StudentTable;
