'use client'

//react
import { use, useEffect, useState } from 'react';

//redux
import { useSelector } from 'react-redux';

//unique id
import { v4 as uuidv4 } from 'uuid';

//components
import TableWithSearchBar from '@/components/tables/TableWithSearchBar';

import Pagination from '@/components/pagination/Pagination';

//data
import Colors from '@/data/Colors';

//functions
import StudentConfig from '@/functions/table configurations/StudentConfig';

//hooks
import { useThunk } from '@/lib/hooks/use-thunk';

//services
import { fetchStudents, searchStudents } from '@/lib/features/students/studentsSlice';

//next
import { useSearchParams } from 'next/navigation';

const page = () => {

  const searchParams = useSearchParams();
  const { students } = useSelector((state) => state.students);

  //Fetch Students
  const [doFetchStudents, isLoadingStudents, loadingStudentError] =
    useThunk(fetchStudents);

  //Search Students
  const [doSearchStudents, isLoadingSearchStudents, loadingSearchStudentError] = useThunk(searchStudents);

  //Handle pages
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  //Handle Search 
  const [searchText, setSearchText] = useState('');
  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    if (searchParams.get('search') || searchParams.get('is_active')) {
      doSearchStudents(`search=${searchParams.get('search')}&is_active=${searchParams.get('is_active')}`);
    }
    else {
      doFetchStudents({ page: page, pageSize: pageSize });
    }
  }, [doSearchStudents, searchParams, doFetchStudents, page, pageSize]);

  const config = StudentConfig();

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
  if (isLoadingStudents) {
    content = <div>Loading...</div>;
  }
  else if (loadingStudentError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <>
        <TableWithSearchBar
          searchTitleColor={Colors['color-purple-dark']}
          config={config}
          data={students?.students}
          totalRecords={students?.total ? students.total : students?.students?.length}
          title={'Students'}
          searchText={searchText}
          onSearchTextChange={handleSearchTextChange}
        />
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={students?.total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          itemName="Students" />
      </>
    );
  }
  try {
    return <div className="table-with-searchbar">{content}
    </div>;
  } catch (error) {

  }
}

export default page