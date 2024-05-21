'use client'

//react
import { useEffect, useState } from 'react';

//redux
import { useSelector } from 'react-redux';

//unique id
import { v4 as uuidv4 } from 'uuid';

//components
import TableSearch from '@/components/tables/TableSearch';
import Pagination from '@/components/pagination/Pagination';

//data
import Colors from '@/data/Colors';

//functions
import StudentConfig from '@/functions/table configurations/StudentConfig';

//hooks
import { useThunk } from '@/lib/hooks/use-thunk';

//services
import { fetchStudents } from '@/lib/features/students/studentsSlice';



const page = () => {
  const { students } = useSelector((state) => state.students);

  //Fetch Students
  const [doFetchStudents, isLoadingStudents, loadingStudentError] =
    useThunk(fetchStudents);


  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  useEffect(() => {
    doFetchStudents({ page: page, pageSize: pageSize });
  }, [doFetchStudents, page, pageSize]);
  //students);
  const config = StudentConfig();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  }

  let content;
  if (isLoadingStudents) {
    content = <div>Loading...</div>;
  }
  else if (loadingStudentError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <>
        <TableSearch
          key={uuidv4()}
          searchTitleColor={Colors['color-purple-dark']}
          config={config}
          data={students?.students}
          totalRecords={students?.total}
          title={'Students'}
        />
        <Pagination page={page} pageSize={pageSize} totalItems={students?.total} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} itemName="Students" />

      </>
    );
  }
  try {
    return <div className="table-with-searchbar">{content}
    </div>;
  } catch (error) {
    //error);
  }
}

export default page