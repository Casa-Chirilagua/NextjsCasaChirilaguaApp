'use client';

import { useState } from 'react';
//Next
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

//Redux
import { useSelector } from 'react-redux';

//Components
import CardGrid from '@/components/grids/CardGrid';

//Data
import Colors from '@/data/Colors';

//Icons
import { AiOutlineArrowLeft } from 'react-icons/ai';


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
  const router = useRouter();
  const objectId = searchParams.get("id");
  const objectToRetrieve = searchParams.get("objToRetrieve");
  const objectMakingRequest = searchParams.get("objMakingRequest");
  const objectName = searchParams.get("objName");

  const [cardGridParams, setCardGridParams] = useState({});

  //objectId, objectToRetrieve, objectMakingRequest, objectName);

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


  useEffect(() => {

    const params = GenerateCardGridParams(objectMakingRequest, objectToRetrieve, students, parents, programs);
    setCardGridParams(params);
  },
    [
      parents,
      students,
      programs]);

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
        <div className="back-button mx-24">
          <button
            onClick={() => router.push(`/${cardGridParams ? cardGridParams.urlParam : ''}/${objectId}`)}
            className="card-back-button flex flex-row items-center justify-center"
          >
            <AiOutlineArrowLeft></AiOutlineArrowLeft>
            <h4>
              {objectName} Profile
            </h4>
          </button>
        </div>
        <h1
          className="page-title mx-24"
        >
          {`${objectName}'s ${objectToRetrieve}`}

        </h1>
        <CardGrid
          urlParam={cardGridParams ? cardGridParams.urlParam : ''}
          urlParamForObject={cardGridParams ? cardGridParams.urlParamForObject : ''}
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

const GenerateCardGridParams = (objectMakingRequest, objectToRetrieve, students, parents, programs) => {
  let data;
  const urlParamForObject = objectToRetrieve === "students" ? 'student-profile' : objectToRetrieve === "parents" ? 'parent-profile' : 'program-profile';

  if (objectToRetrieve === "students") {
    data = students;
  }
  else if (objectToRetrieve === "parents") {
    data = parents;
  }
  else if (objectToRetrieve === "programs") {
    data = programs;
  }

  if (objectMakingRequest === "student") {
    return {
      urlParam: 'student-profile',
      data: data,
      color: Colors['color-purple-dark'],
      urlParamForObject
    }
  }
  else if (objectMakingRequest === "parent") {
    return {
      urlParam: 'parent-profile',
      data: data,
      color: Colors['color-orange'],
      urlParamForObject: urlParamForObject,
    }
  }
  else if (objectMakingRequest === "program") {
    return {
      urlParam: 'program-profile',
      data: data,
      color: Colors['color-green'],
      urlParamForObject: urlParamForObject,
    }
  }
  else {
    return null;
  }
}

export default page