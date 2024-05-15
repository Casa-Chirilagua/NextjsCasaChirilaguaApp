'use client'

//React 
import { useEffect, useState } from 'react';

//Id
import { v4 as uuidv4 } from 'uuid';

//Components
import TableSearch from '@/components/tables/TableSearch';
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
import { fetchParents } from '@/lib/features/parents/parentsSlice';



const page = () => {
  const { parents } = useSelector((state) => state.parents);
  const [doFetchParents, isLoadingParents, loadingParentsError] =
    useThunk(fetchParents);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    doFetchParents({ page: page, pageSize: pageSize });
  }, [doFetchParents, page, pageSize]);

  const config = ParentConfig();// Table configuration

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  }


  let content;
  if (loadingParentsError) {
    content = <div>Error fetching data...</div>;
  }
  else {
    content = (
      <>
        <TableSearch
          searchTitleColor={Colors['color-light-green']}
          color={'light-green'}
          config={config}
          data={parents?.parents}
          totalRecords={parents?.total}
          title={'Parents'}
        />
        <Pagination page={page} pageSize={pageSize} totalItems={parents?.total} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} itemName="Parents" />
      </>
    );
  }
  return (
    <div className='table-with-searchbar'>{content}</div>
  )
}

export default page