'use client'

//React
import { useEffect } from 'react';

//Components
import GridList from './GridList';


//redux
import { useSelector } from 'react-redux';

//Thunk
import { useThunk } from '@/hooks/use-thunk';

/**
 * Services
 *
 */
import { fetchParentsWithName } from '@/lib/features/parents/parentsSlice';
import { fetchPrograms } from '@/lib/features/programs/programsSlice';
import { fetchFamilies } from '@/lib/features/families/familiesSlice';
import { fetchStudents } from '@/lib/features/students/studentsSlice';

function ConditionalGridList({ objectType, handleObjectIdFunction }) {
  //Objects
  const { parents } = useSelector((state) => state.parents);
  const { programs } = useSelector((state) => state.programs);
  const { families } = useSelector((state) => state.families);
  const { students } = useSelector((state) => state.students);

  //Fetch Programs
  const [doFetchPrograms, isLoadingPrograms, loadingProgramError] =
    useThunk(fetchPrograms);

  //Fetch Families
  const [doFetchFamilies, isLoadingFamilies, loadingFamiliesError] =
    useThunk(fetchFamilies);

  //Fetch Students
  const [doFetchStudents, isLoadingStudents, loadingStudentError] =
    useThunk(fetchStudents);

  //Fetch Parents
  const [
    doFetchParentsWithName,
    isLoadingParentsWithName,
    loadingParentsError,
  ] = useThunk(fetchParentsWithName);

  useEffect(() => {
    if (objectType === 'Students') {
      doFetchStudents();
    } else if (objectType === 'Parents') {
      doFetchParentsWithName();
    } else if (objectType === 'Programs') {
      doFetchPrograms();
    } else if (objectType === 'Families') {
      doFetchFamilies();
    }
  }, [
    doFetchParentsWithName,
    doFetchPrograms,
    doFetchStudents,
    doFetchFamilies,
    objectType,
  ]);

  if (objectType === 'Parents') {
    let component = (
      <GridList
        items={parents}
        label="Add Parent"
        handleItemId={handleObjectIdFunction}
        boxShadow={'none'}
      ></GridList>
    );
    return component;
  } else if (objectType === 'Programs') {
    let component = (
      <GridList
        items={programs}
        label="Add Program"
        handleItemId={handleObjectIdFunction}
        boxShadow={'none'}
      ></GridList>
    );
    return component;
  } else if (objectType === 'Families') {
    let component = (
      <GridList
        items={families}
        label="Add Familiy"
        handleItemId={handleObjectIdFunction}
        boxShadow={'none'}
      ></GridList>
    );
    return component;
  } else if (objectType === 'Students') {
    let component = (
      <GridList
        items={students}
        label="Add Student"
        handleItemId={handleObjectIdFunction}
        boxShadow={'none'}
      ></GridList>
    );
    return component;
  } else {
    return <div>Empty</div>;
  }
}

export default ConditionalGridList;
