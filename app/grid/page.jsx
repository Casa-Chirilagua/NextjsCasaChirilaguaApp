'use client';

//Next
import { useSearchParams } from 'next/navigation'

//Redux
import { useSelector } from 'react-redux';

//Components
import CardGrid from '@/components/grids/CardGrid';

//Data
import Colors from '@/data/Colors';

//Services
import { fetchStudentsByFamilyId } from '@/lib/features/students/studentsSlice';
import { fetchStudentsByParentId } from '@/lib/features/students/studentsSlice';
import { fetchStudentsByProgramId } from '@/lib/features/students/studentsSlice';
import { fetchParentsByStudentId } from '@/lib/features/parents/parentsSlice';
import { fetchParentsByFamilyId } from '@/lib/features/parents/parentsSlice';
import { fetchProgramsByStudentId } from '@/lib/features/programs/programsSlice';

//React
import { useEffect } from 'react';

//Hooks
import { useThunk } from '@/lib/hooks/use-thunk';

const page = () => {
  const searchParams = useSearchParams();
  const objectId = searchParams.get("id");
  const objectToRetrieve = searchParams.get("objToRetrieve");
  const objectMakingRequest = searchParams.get("objMakingRequest");
  const objectName = searchParams.get("objName");

  console.log(objectId, objectToRetrieve, objectMakingRequest, objectName);

  //Objects
  const { students } = useSelector((state) => state.students);
  const { parents } = useSelector((state) => state.parents);
  const { programs } = useSelector((state) => state.programs);


  /**
   * Fetch students by specific object id
   */
  const [
    doFetchStudentsByProgram,
    isLoadingStudentsByProgram,
    loadingStudentByProgramError,
  ] = useThunk(fetchStudentsByProgramId);
  const [
    doFetchStudentByFamily,
    isLoadingStudentByFamily,
    loadingFamiliesByFamilyError,
  ] = useThunk(fetchStudentsByFamilyId);
  const [
    doFetchStudentByParent,
    isLoadingStudentByParent,
    loadingParentsByParentError,
  ] = useThunk(fetchStudentsByParentId);

  /**
   * Fetch parents by specific object id
   */
  const [
    doFetchParentsByStudent,
    isLoadingParentsByStudent,
    loadingParentsByStudentError,
  ] = useThunk(fetchParentsByStudentId);
  const [
    doFetchParentsByFamily,
    isLoadingParentsByFamily,
    loadingParentsByFamilyError,
  ] = useThunk(fetchParentsByFamilyId);

  /**
   * Fetch programs by specific object id
   */
  const [
    doFetchProgramByStudentId,
    isLoadingProgramByStudentId,
    loadingProgramByStudentIdError
  ] = useThunk(fetchProgramsByStudentId);

  useEffect(() => {
    if (objectToRetrieve === "students" && objectMakingRequest === "family") {
      doFetchStudentByFamily(objectId);
    } else if (objectToRetrieve === "students" && objectMakingRequest === "parent") {
      doFetchStudentByParent(objectId);
    } else if (objectToRetrieve === "parents" && objectMakingRequest === "student") {
      doFetchParentsByStudent(objectId);
    } else if (objectToRetrieve === "parents" && objectMakingRequest === "family") {
      doFetchParentsByFamily(objectId);
    } else if (objectToRetrieve === "students" && objectMakingRequest === "program") {
      doFetchStudentsByProgram(objectId);
    } else if (objectToRetrieve === "programs" && objectMakingRequest === "student") {
      doFetchProgramByStudentId(objectId);
    }
  },
    [
      doFetchStudentsByProgram,
      doFetchStudentByFamily,
      doFetchStudentByParent,
      doFetchParentsByStudent,
      doFetchParentsByFamily,
      doFetchProgramByStudentId
    ]);


  let cardGridParams = GenerateCardGridParams(objectToRetrieve, students, parents, programs);


    console.log(cardGridParams);

  let content;
  if (loadingStudentByProgramError
    || loadingFamiliesByFamilyError
    || loadingParentsByParentError
    || loadingParentsByStudentError
    || loadingParentsByFamilyError
    || loadingProgramByStudentIdError) {
    content = <div>Error fetching data...</div>;
  }
  else {
    content = (
      <>
        {' '}
        <h1
          className="page-title"
        >
          {`${objectName}'s ${objectToRetrieve}`}

        </h1>
        <CardGrid
          urlParam={cardGridParams ? cardGridParams.urlParam : ''}
          data={cardGridParams ? cardGridParams.data : ''}
          color={cardGridParams ? cardGridParams.color : ''}
        />
      </>
    );
  }

  return (
    <div className="table-with-param-container">{content}</div>
  )
}

const GenerateCardGridParams = (objectToRetrieve, students, parents, programs) => {

  if (objectToRetrieve === "students") {
    return {
      urlParam: 'student-profile',
      data: students,
      color: Colors['color-purple-dark']
    }
  }
  else if (objectToRetrieve === "parents") {
    return {
      urlParam: 'parent-profile',
      data: parents,
      color: Colors['color-orange']
    }
  }
  else if (objectToRetrieve === "programs") {
    return {
      urlParam: 'program-profile',
      data: programs,
      color: Colors['color-green']
    }
  }
  else {
    return null;
  }
}

export default page