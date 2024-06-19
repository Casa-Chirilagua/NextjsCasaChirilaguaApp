'use client'

import { useRouter } from 'next/navigation';


//React
import { useRef, useState, useEffect } from 'react';

//Components
import Form from '@/components/form/Form';
import Button from '@/components/buttons/Button';

//Data
import Colors from '@/data/Colors';
import ProgramData from '@/data/Program Form Data/Program';


//Unique ID
import { v4 as uuidv4 } from 'uuid';

//React libraries
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

//Services
import { register_program } from '@/lib/features/program/programSlice';

//Thunk
import { useThunk } from '@/hooks/use-thunk';


//Functions
import GenerateNewProgramData from '@/functions/student functions/GenerateNewProgramData';
import LoadingToast from '@/functions/LoadingToast';
import SuccessToast from '@/functions/SuccessToast';


const page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();


  const [doCreateProgram, isCreatingProgram, creatingProgramError] =
    useThunk(register_program);

  const onSubmit = async (data) => {
    try {
      const programData = GenerateNewProgramData(data);
      const programPromise = doCreateProgram(programData);
      SuccessToast(programPromise, 'Successfully submitted application!');
      router.push('/programs');
    } catch (err) {
      toast.error('An error occurred while creating while creating program');
    }
  };
  LoadingToast(isCreatingProgram, 'Creating program...');
  let content = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      encType="multipart/form-data"
    >
      <div className='w-full h-full min-h-screen grid gap-10 grid-cols-[1fr] grid-rows-[1fr_8rem] primary-border'>
        <Form
          // color={Colors['color-green']}
          classN="form-container"
          key={uuidv4()}
          formData={ProgramData}
          register={register}
          control={control}
          errors={errors}
        />
        <div className="flex flex-col items-center mx-20">
          <Button
            bgColor={Colors['color-green']}
            color={'white'}
            label={'submit'}
          />
        </div>

      </div>
    </form>
  );
  return (
    <div className="primary-container" style={{ paddingTop: '3rem' }}>
      <div className="subtitle-container w-full  mx-[20%]">{content || <RegistrationSkeleton />}</div>
    </div>
  );
}

export default page