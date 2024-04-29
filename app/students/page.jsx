'use client'

//react
import { useEffect } from 'react';

//redux
import { useSelector } from 'react-redux';

//unique id
import { v4 as uuidv4 } from 'uuid';

//components
import TableSearch from '@/components/tables/TableSearch';

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
  useEffect(() => {
    doFetchStudents();
  }, [doFetchStudents]);

  const config = StudentConfig();

  let content;

 if (loadingStudentError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <>
        <TableSearch
          key={uuidv4()}
          searchTitleColor={Colors['color-purple-dark']}
          config={config}
          data={students}
          title={'Students'}
        />
      </>
    );
  }
  try {
    return <div className="table-with-searchbar">{content}</div>;
  } catch (error) {
    console.log(error);
  }
}

export default page