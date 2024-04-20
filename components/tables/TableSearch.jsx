import React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SortableTable from '../tables/SortableTable';
import TableSearchBar from '../search_bar/TableSearchBar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function StudentTable({
  config,
  data,
  title,
  color,
  searchTitleColor,
  configFilterBar,
}) {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Enrolled');
  const keyFn = (fruit) => {
    return fruit.name;
  };

  useEffect(() => {
    //Set to default
    if (activeFilter === 'Enrolled' || activeFilter === 'Active') {
      //Active
      setFilteredData(data);

      //Search text
      let filtered;
      try {
        if (data && Array.isArray(data)) {
          filtered = data?.filter((obj) => {
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
      } catch (error) {
        console.log(error);
      }
    }

    //Look for filter label which is equal to activeFilter
    const configItem = configFilterBar.filter((elem) => {
      let filterLabel;
      if (elem.filter_label === 'Active') {
        filterLabel = 'Enrolled';
      } else {
        filterLabel = elem.filter_label;
      }
      return filterLabel === activeFilter;
    });

    //Now that we have our configItem filter the data based on the key_name_to_filter_by
    let filtered;
    if (configItem.length > 0 && Array.isArray(data)) {
      filtered = data?.filter(
        (elem) =>
          elem[`${configItem[configItem.length - 1].key_name_to_filter_by}`] ===
          configItem.desired_field_value,
      );
      setFilteredData(filtered);
    }
  }, [data, searchText, activeFilter, configFilterBar]);

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
          {(
            <TableSearchBar
              color={searchTitleColor}
              filteredData={filteredData}
              onChange={handleSearch}
              value={searchText}
              title={title}
            />
          ) || <Skeleton />}
          {/* <FilterBar
            config={configFilterBar}
            unfilteredData={data}
            setFiltered={setFilteredData}
            activeFilter={activeFilter}
            searchText={searchText}
            setActiveFilter={setActiveFilter}
          /> */}
          {
            <SortableTable
              key={uuidv4()}
              className="span2"
              color={color}
              data={filteredData}
              config={config}
              keyFn={keyFn}
            ></SortableTable>
          }
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default StudentTable;
