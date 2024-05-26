

//Components
import SortableTable from './SortableTable';
import TableSearchBar from '../search_bar/TableSearchBar';

function TableWithSearchBar({
  config,
  data,
  title,
  color,
  searchTitleColor,
  totalRecords,
  searchText,
  onSearchTextChange,
}) {

  const keyFn = (fruit) => {
    return fruit.name;
  };

  if (!data) {
    return <div>Loading...</div>;
  }


  return (
    <div className="student-search-container">
      {Array.isArray(data) ? (
        <>
          <TableSearchBar
            color={searchTitleColor}
            filteredData={data}
            value={""}
            title={title}
            totalRecords={totalRecords}
            setSearchText={onSearchTextChange}
            onSearchTextChange={onSearchTextChange}
          />
          <SortableTable
            className="span2"
            color={color}
            data={data}
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

export default TableWithSearchBar;
