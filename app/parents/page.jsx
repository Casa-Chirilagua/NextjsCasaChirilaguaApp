'use client'

//React 
import { useEffect, useState } from 'react';

//Id
import { v4 as uuidv4 } from 'uuid';

//Components
import TableWithSearchBar from '@/components/tables/TableWithSearchBar';
import Pagination from '@/components/pagination/Pagination';

//Data
import Colors from '@/data/Colors';

//Redux
import { useSelector } from 'react-redux';

//Functions
import ParentConfig from '@/functions/table configurations/ParentConfig';

//Hooks
import { useThunk } from '@/lib/hooks/use-thunk';

//Services
import { fetchParents, searchParents } from '@/lib/features/parents/parentsSlice';

//next
import { useSearchParams } from 'next/navigation';


const page = () => {
  const searchParams = useSearchParams();

  const { parents } = useSelector((state) => state.parents);

  //Fetch Parents
  const [doFetchParents, isLoadingParents, loadingParentsError] =
    useThunk(fetchParents);


  //Search Parents
  const [doSearchParents, isLoadingSearchParents, loadingSearchParentsError] = useThunk(searchParents);

  //Handle Search 
  const [searchText, setSearchText] = useState('');
  const [isActive, setIsActive] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    if (searchParams.get('search') || searchParams.get('is_active')) {
      doSearchParents(`search=${searchParams.get('search')}&is_active=${searchParams.get('is_active')}`);
    } else {
      doFetchParents({ page: page, pageSize: pageSize });
    }
  }, [doSearchParents, searchParams, doFetchParents, page, pageSize]);

  const config = ParentConfig();// Table configuration

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  }

  const handleSearchTextChange = (val) => {
    setSearchText(val);
  };


  let content;
  if (isLoadingParents) {
    content = <div>Loading...</div>;
  }
  else if (loadingParentsError) {
    content = <div>Error fetching data...</div>;
  }
  else {
    content = (
      <>
        <TableWithSearchBar
          searchTitleColor={Colors['color-light-green']}
          color={'light-green'}
          config={config}
          data={parents?.parents}
          totalRecords={parents?.total ? parents.total : parents?.parents?.length}
          title={'Parents'}
          searchText={searchText}
          onSearchTextChange={handleSearchTextChange}
        />
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={parents?.total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          itemName="Parents" />
      </>
    );
  }
  return (
    <div className='table-with-searchbar'>{content}</div>
  )
}

export default page