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
import LoadingToast from '@/functions/LoadingToast';

//Data
import Colors from '@/data/Colors';
import StudentInformation from '@/data/Student Form Data/StudentInformation';
import EmergencyContact from '@/data/Student Form Data/EmergencyContact';
import MedicalInsurance from '@/data/Student Form Data/MedicalInsurance';
import MedicalInformation from '@/data/Student Form Data/MedicalInformation';
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

    const [doCreateGuardian, isCreatingGuardian, creatingGuardianError] = useThunk(register_parent);
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


    const generatePayloadResultUpdate = async (idsArray, updateFunction, updatedFields) => {
        let payloadResult;
        for (const id in idsArray) {
            const promise = updateFunction({ id: idsArray[id], updatedFields: updatedFields });
            const [result] = await Promise.all([promise]);
            payloadResult = result?.payload;
            if (result?.payload?.status === 'fail') return result.payload;
        }
        return payloadResult;
    }

    const generatePayloadResultCreate = async (datasArray, createFunction) => {

        let parentIds = [];

        /**
         * Create Guardians:
         * - If the payload is a fail return the payload
         * - If the payload is a success return the parent ids
         */
        for (const index in datasArray) {
            const promise = createFunction(datasArray[index]);
            const [result] = await Promise.all([promise]);
            if (result?.payload?.status === 'fail') return result.payload; //If the payload is a fail return the payload
            parentIds.push(result?.payload?.parent_id); // If the payload is a success push the parent ids
        }
        return parentIds;
    }
    const AddStudentIdToParentAndProgram = async (guardianIds, studentId, programIds) => {

        /**
         * Update Guardians and return payload
         */
        const payloadParentResult = await generatePayloadResultUpdate(guardianIds, doUpdateParent, { students: studentId });
        if (payloadParentResult?.status === 'fail') return payloadParentResult;

        /**
         * Update Programs and return payload
         */
        const payloadProgramResult = await generatePayloadResultUpdate(programIds, doUpdateProgram, { students: studentId });
        return payloadProgramResult;
    }

    const displayError = (err) => {
        toast.error(err, {
            duration: 50000,
            theme: "colored",
        });
    };
    const createGuardians = async (data) => {

        /**
        * Handle Parent 1 and 2
        * - Create a new parent 1, 2 and return a promise
        */
        const parent1Data = GenerateNewGuardianOneData(data);
        const parent2Data = GenerateNewGuardianTwoData(data);
        const results = await generatePayloadResultCreate([parent1Data, parent2Data], doCreateGuardian);
        if (results?.status === 'fail') return results;
        return results;
    }
    const createStudent = async (data, parentIds, programIds) => {

        //Create Student
        const studentPromise = doCreateStudent(GenerateNewStudentData(
            data,
            parentIds.parent1Id,
            parentIds.parent2Id,
            programIds,
        ));

        return SuccessToast(studentPromise, 'Successfully registered student!');
    }

    const createFamily = async (data, parentIds, studentId) => {
        //Create Family
        const familyPromise = doCreateFamily(GenerateNewFamilyData(data, parentIds, studentId));
        const payload = await SuccessToast(familyPromise, 'Successfully registered family!');
        return payload;
    }


    /**
     * Submits the application which includes the student, parent, and family data
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

                const studentPayload = await createStudent(data, [ExistingGuardainOneId, ExistingGuardainTwoId], programIds ? programIds : []); //Update the student's family

                if (studentPayload?.status === 'fail') return displayError(studentPayload?.message);

                const payload = await AddStudentIdToParentAndProgram([ExistingGuardainOneId, ExistingGuardainTwoId], [studentPayload?._id], programIds ? programIds : []); //Update the student's programs and parents

                if (payload?.status === 'fail') return displayError(payload?.message);

                if (payload?.status === 'success') toast.success(payload?.message, { duration: 50000, theme: "colored" });

                router.push('/students'); //Update the student's family
            }
            else if (newGuardianOne && newGuardianTwo) {

                //Create Parent 1 and 2
                const parentPayloads = await createGuardians(data);
                if (parentPayloads?.status === 'fail') return displayError(parentPayloads?.message);

                //Create Student
                const studentPayload = await createStudent(data, parentPayloads, programIds);
                if (studentPayload?.status === 'fail') return displayError(studentPayload?.message);

                //Create Family Payload
                const familyPayload = await createFamily(data, parentPayloads, studentPayload._id);
                if (familyPayload?.status === 'fail') return displayError(familyPayload?.message);

                // Update the student's programs and parents
                const payload = await AddStudentIdToParentAndProgram(parentPayloads, [studentPayload._id], programIds);
                if (payload?.status === 'fail') return displayError(payload?.message);
                if (payload?.status === 'success') toast.success(payload?.message, { duration: 50000, theme: "colored" });

                router.push('/students');
            }
            else if (newGuardianOne || newGuardianTwo) {

            }

        } catch (error) {
            displayError(error);
        }
    };

    LoadingToast(isCreatingStudent, 'Creating Student...');
    LoadingToast(isCreatingGuardian, 'Creating Guardian...');
    LoadingToast(isCreatingFamily, 'Creating Family...');
    LoadingToast(isUpdatingParent, 'Adding student to parent...');
    LoadingToast(isUpdatingProgram, 'Adding student to program...');

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
            <div className='w-full h-full flex flex-col gap-10 '>
                <Form
                    classN="form-container"
                    key={uuidv4()}
                    formData={StudentInformation}
                    register={register}
                    control={control}
                    errors={errors}
                />
                <Form
                    classN="form-container"
                    key={uuidv4()}
                    formData={EmergencyContact}
                    register={register}
                    control={control}
                    errors={errors}
                />
                <Form
                    classN="form-container"
                    key={uuidv4()}
                    formData={MedicalInsurance}
                    register={register}
                    control={control}
                    errors={errors}
                />
                <Form
                    classN="form-container"
                    key={uuidv4()}
                    formData={MedicalInformation}
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
            </div>
        );
    }
    try {
        return (
            <div className="primary-container" style={{ paddingTop: '3rem' }}>
                <div className="subtitle-container w-full mx-[15%] ">
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