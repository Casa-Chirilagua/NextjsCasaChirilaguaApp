'use client'

//React
import { useState, useEffect, useCallback } from 'react';

//Components
import Form from '@/components/form/Form';
import Button from '@/components/buttons/Button';
import GuardianHandler from '@/components/form/GuardianHandler';
import LookUpItemHandler from '@/components/search items/LookUpItemHandler';

//Unique ID
import { v4 as uuidv4 } from 'uuid';

//Functions
import GenerateNewGuardianOneData from '@/functions/student functions/GenerateNewGuardianOneData';
import GenerateNewGuardianTwoData from '@/functions/student functions/GenerateNewGuardianTwoData';
import GenerateNewStudentData from '@/functions/student functions/GenerateNewStudentData';
import GenerateNewFamilyData from '@/functions/student functions/GenerateNewFamilyData';

//Data
import Colors from '@/data/Colors';
import StudentInformation from '@/data/Student Form Data/StudentInformation';
import GuardianOne from '@/data/Student Form Data/GuardianOne';
import GuardianTwo from '@/data/Student Form Data/GuardianTwo';

//Redux
import { useSelector } from 'react-redux';

//React libraries
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';


//Services
import { register_Student } from '@/lib/features/student/studentSlice';
import { register_parent } from '@/lib/features/parent/parentSlice';
import { registerFamily } from '@/lib/features/family/familySlice';
import { fetchParentsWithName } from '@/lib/features/parents/parentsSlice';
import { fetchPrograms } from '@/lib/features/programs/programsSlice';
import { updateProgramById } from '@/lib/features/program/programSlice';
import { updateParentById } from '@/lib/features/parent/parentSlice';

//Thunk
import { useThunk } from '@/hooks/use-thunk';

const page = () => {

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { parents } = useSelector((state) => state.parents);
  const { programs } = useSelector((state) => state.programs);
  const { students } = useSelector((state) => state.students);
  const { families } = useSelector((state) => state.families);
  const [newGuardianOne, setNewGuardianOne] = useState(false);
  const [lookUpGuardianOne, setLookUpGuardianOne] = useState(false);
  const [newGuardianTwo, setNewGuardianTwo] = useState(false);
  const [lookUpGuardianTwo, setLookUpGuardianTwo] = useState(false);
  const [ExistingGuardainOneId, setGuardianOneId] = useState();
  const [ExistingGuardainTwoId, setGuardianTwoId] = useState();
  const [programIds, setProgramIds] = useState([]);

  //Fetch Parents
  const [
    doFetchParentsWithName,
    isLoadingParentsWithName,
    loadingParentsError,
  ] = useThunk(fetchParentsWithName);

  //Fetch Programs
  const [doFetchPrograms, isLoadingPrograms, loadingProgramError] =
    useThunk(fetchPrograms);

  // Create Guardian One
  const [doCreateGuardianOne, isCreatingGuardianOne, creatingGuardianOneError] =
    useThunk(register_parent);

  // Create Guardian Two
  const [doCreateGuardianTwo, isCreatingGuardianTwo, creatingGuardianTwoError] =
    useThunk(register_parent);

  //Create Student
  const [doCreateStudent, isCreatingStudent, creatingStudentError] =
    useThunk(register_Student);

  //Create Family
  const [doCreateFamily, isCreatingFamily, creatingFamilyError] =
    useThunk(registerFamily);

  //Update Parent
  const [doUpdateParent, isUpdatingParent, updatingParentError] = useThunk(
    updateParentById,
  );

  //Update Program
  const [doUpdateProgram, isUpdatingProgram, updatingProgramError] = useThunk(
    updateProgramById,
  );

  useEffect(() => {
    doFetchParentsWithName();
    doFetchPrograms();
  }, [doFetchParentsWithName, doFetchPrograms]);

  const onSubmit = async (data) => {
    try {
      /**
       * Handle Parent 1
       * - Create a new parent 1 and return a promise
       */
      const parent1Data = GenerateNewGuardianOneData(newGuardianOne, data);
      let parent1Promise;
      if (!ExistingGuardainOneId) {
        parent1Promise = doCreateGuardianOne(parent1Data);
      }

      /**
       * Generate Parent 2
       * - Create a new parent 2 and return a promise
       */
      const parent2Data = GenerateNewGuardianTwoData(newGuardianTwo, data);

      let parent2Promise;
      if (!ExistingGuardainTwoId) {
        parent2Promise = doCreateGuardianTwo(parent2Data);
      }

      let studentId;

      // Wait for both parent registrations to complete
      const [parent1Result, parent2Result] = await Promise.all([
        parent1Promise,
        parent2Promise,
      ]);

      /**
       * If both parents were created then use their id's to create students and family
       */
      try {
        if (parent1Result && parent2Result) {
          const parentIds = [
            parent1Result.payload.parent_id,
            parent2Result.payload.parent_id,
          ];

          const studentData = GenerateNewStudentData(
            data,
            parent1Result.payload.parent_id,
            parent2Result.payload.parent_id,
            programIds,
          );

          //Create Student
          const studentPromise = doCreateStudent(studentData);
          const [studentResult] = await Promise.all([studentPromise]);

          studentId = [studentResult.payload.id];

          const family = GenerateNewFamilyData(data, parentIds, studentId);

          //Update the students programs and parents
          doUpdateParent({
            id: parent1Result.payload.parent_id,
            updatedFields: { students: studentId },
          });
          doUpdateParent({
            id: parent2Result.payload.parent_id,
            updatedFields: { students: studentId },
          });

          programIds.map((programs) => {
            return doUpdateProgram({
              id: programs,
              updatedFields: { students: studentId },
            });
          });

          //Create Family
          if (studentResult.payload.status === 'success') {
            const familyPromise = doCreateFamily(family);
            if (isCreatingFamily) {
              toast.loading('Creating Family');
            } else if (creatingFamilyError) {
              toast.error('An error occurred while creating family');
            }
            const [familyResult] = await Promise.all([familyPromise]);

            if (familyResult.payload.status === 'success') {
              toast.success('Successfully submitted application!');
            }
          }
        } else {
          const studentData = GenerateNewStudentData(
            data,
            ExistingGuardainOneId,
            ExistingGuardainTwoId,
            programIds,
          );

          //Create Student
          const studentPromise = doCreateStudent(studentData);
          const [studentResult] = await Promise.all([studentPromise]);

          studentId = [studentResult.payload.id];

          //Update the students programs and parens
          doUpdateParent({
            id: ExistingGuardainOneId,
            updatedFields: { students: studentId },
          });
          doUpdateParent({
            id: ExistingGuardainTwoId,
            updatedFields: { students: studentId },
          });

          programIds.map((programs) => {
            return doUpdateProgram({
              id: programs,
              updatedFields: { students: studentId },
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      toast.error('An error occurred while registering student', {
        duration: 10000,
      });
    }
  };

  const handleGuardianOneId = (id) => {
    setGuardianOneId(id);
  };

  const handleGuardianTwoId = (id) => {
    setGuardianTwoId(id);
  };

  const handleProgramIds = (ids) => {
    setProgramIds(ids);
  };

  let content;
  if (loadingParentsError || loadingProgramError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <>
        <Form
          classN="form-container"
          key={uuidv4()}
          formData={StudentInformation}
          register={register}
          control={control}
          errors={errors}
        /> 
        <GuardianHandler
          handleItemId={handleGuardianOneId}
          title="Add Guardian 1 (Primary Contact):"
          guardians={parents} 
          guardianComponent={GuardianOne} 
          selectGuardianLabel="Select or Search for Guardian"
          form={
            <Form
              classN="form-container"
              key={uuidv4()}
              formData={GuardianOne}
              register={register}
              control={control}
              errors={errors}
            />
          }
          setNewGuardian={setNewGuardianOne}
          setLookUpGuardian={setLookUpGuardianOne}
          newGuardian={newGuardianOne}
          lookUpGuardian={lookUpGuardianOne}
          canSelectMultiple={false}
        />
        <GuardianHandler
          handleItemId={handleGuardianTwoId}
          title="Add Guardian 2:"
          guardians={parents} 
          selectGuardianLabel="Select or Search for Guardian"
          form={
            <Form
              classN="form-container"
              key={uuidv4()}
              formData={GuardianTwo}
              register={register}
              control={control}
              errors={errors}
            />
          }
          setNewGuardian={setNewGuardianTwo}
          setLookUpGuardian={setLookUpGuardianTwo}
          newGuardian={newGuardianTwo}
          lookUpGuardian={lookUpGuardianTwo}
          canSelectMultiple={false}
        />
        <LookUpItemHandler
          buttonLabel="Look Up Program"
          title="Add programs:"
          items={programs}
          handleItemId={handleProgramIds}
          selectItemLabel="Select Programs"
          canSelectMultiple={true}
        />{' '}
        <Button
          loading={isCreatingStudent}
          bgColor={Colors['color-purple-dark']}
          color={'white'}
          label={'submit'}
        />
      </>
    );
  }
  try {
    return (
      <div className="student-form-box" style={{ paddingTop: '3rem' }}>
        <div className="subtitle-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            enctype="multipart/form-data"
          >
            {content}
          </form>
        </div>
      </div>
    );
  } catch (error) {
    throw new Error('ERROR SUBMITING STUDENT DATA');
  }
}

export default page