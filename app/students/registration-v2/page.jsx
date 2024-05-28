'use client'


//Next
import { useRouter } from 'next/navigation';
//React
import { useState, useEffect } from 'react';

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
import SuccessToast from '@/functions/SuccessToast';
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

    const router = useRouter();

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



    const AddStudentIdToParentAndProgram = (guardianOneId, guardianTwoId, studentId, programIds) => {

        doUpdateParent({
            id: guardianOneId,
            updatedFields: { students: studentId },
        });

        doUpdateParent({
            id: guardianTwoId,
            updatedFields: { students: studentId },
        });

        programIds.map((programs) => {
            doUpdateProgram({
                id: programs,
                updatedFields: { students: studentId },
            });
        });
    }
    const displayToast = async (objectPromise, message) => {
        const [result] = await Promise.all([objectPromise]);
        if (result.payload.status === 'success') {
            toast.success(message);
        }
    };


    /**
     * Submits the application which includes the student, parent, and family data
     * 
     * 
     * 
     * @param {*} data 
     */
    const onSubmit = async (data) => {
        try {

            /**
             *  Cases to handle when registering a student:
             *      1. If both parents already exist add the id's to the student and update the parents
             *      2. If both parents have to be created then create the parents and update the student and family
             *      3. If only one parent exist then create the parent that does not exist and update the student and family
             */
            if (ExistingGuardainOneId && ExistingGuardainTwoId) {

                //Create Student with existing parent id's
                const studentPromise = doCreateStudent(GenerateNewStudentData(
                    data,
                    ExistingGuardainOneId,
                    ExistingGuardainTwoId,
                    programIds,
                ));
                const [studentResult] = await Promise.all([studentPromise]);

                //Display Success Toast
                displayToast(studentPromise, 'Successfully registered student!');

                // Update the student's programs and parents
                AddStudentIdToParentAndProgram(ExistingGuardainOneId, ExistingGuardainTwoId, [studentResult.payload._id], programIds);

                //Update the student's family


            }
            else if (newGuardianOne && newGuardianTwo) {

                /**
                * Handle Parent 1 and 2
                * - Create a new parent 1, 2 and return a promise
                */
                const parent1Data = GenerateNewGuardianOneData(newGuardianOne, data);
                let parent1Promise = doCreateGuardianOne(parent1Data);
                const parent2Data = GenerateNewGuardianTwoData(newGuardianTwo, data);
                let parent2Promise = doCreateGuardianTwo(parent2Data);

                // Wait for both parent registrations to complete
                const [parent1Result, parent2Result] = await Promise.all([
                    parent1Promise,
                    parent2Promise,
                ]);

                const parentIds = [
                    parent1Result.payload.parent_id,
                    parent2Result.payload.parent_id,
                ];


                //Create Student
                const studentPromise = doCreateStudent(GenerateNewStudentData(
                    data,
                    parent1Result.payload.parent_id,
                    parent2Result.payload.parent_id,
                    programIds,
                ));


                const [studentResult] = await Promise.all([studentPromise]);

                console.log(studentResult)

                //Create Family
                doCreateFamily(GenerateNewFamilyData(data, parentIds, [studentResult.payload._id]));

                // Update the student's programs and parents
                AddStudentIdToParentAndProgram(parent1Result.payload.parent_id, parent2Result.payload.parent_id, [studentResult.payload._id], programIds);

            }
            else if (newGuardianOne || newGuardianTwo) {

            }

            router.push('/students');
        } catch (error) {
            toast.error(error, {
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
                    key={"GuardianOne"}
                    handleItemId={handleGuardianOneId}
                    title="Add Guardian 1 (Primary Contact):"
                    guardians={parents}
                    guardianComponent={GuardianOne}
                    selectGuardianLabel="Select or Search for Guardian"
                    form={
                        <Form
                            classN="form-container"
                            key={"GuardianOneForm"}
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
                    key={"GuardianTwo"}
                    handleItemId={handleGuardianTwoId}
                    title="Add Guardian 2:"
                    guardians={parents}
                    selectGuardianLabel="Select or Search for Guardian"
                    form={
                        <Form
                            classN="form-container"
                            key={'GuardianTwoForm'}
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
            <div className="primary-container" style={{ paddingTop: '3rem' }}>
                <div className="subtitle-container">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        method="POST"
                        encType="multipart/form-data"
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