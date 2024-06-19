'use client'
//Next
import { useRouter } from 'next/navigation';

//React
import { useRef, useState, useEffect } from 'react';

//Components
import Form from '@/components/form/Form';
import Button from '@/components/buttons/Button';

//Data
import Colors from '@/data/Colors';
import GuardianOne from '@/data/Student Form Data/GuardianOne';

//Unique ID
import { v4 as uuidv4 } from 'uuid';

//React libraries
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

//Functions
import GenerateNewGuardianOneData from '@/functions/student functions/GenerateNewGuardianOneData';
import SuccessToast from '@/functions/SuccessToast';


//Services
import { register_parent } from '@/lib/features/parent/parentSlice';

//Thunk
import { useThunk } from '@/hooks/use-thunk';

const page = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [doCreateParent, isCreatingParent, creatingParentError] =
    useThunk(register_parent);
  const loadingToastId = useRef(null);

  /**
   * Function handles the submission of the Guardian One form
   * 
   * @param {*} data 
   */
  const onSubmit = async (data) => {
    try {
      const parentData = GenerateNewGuardianOneData(true, data);
      const parentPromise = doCreateParent(parentData);
      SuccessToast(parentPromise, 'Successfully created parent');
      router.push('/parents');
    } catch (err) {
      toast.error('An error occurred while creating while creating parent');
    }
  };

  useEffect(() => {
    // Show the loading toast when isCreatingProgram becomes true
    if (isCreatingParent) {
      loadingToastId.current = toast.loading('Creating Parent...');
    } else {
      // Hide the loading toast when isCreatingProgram becomes false
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
      }
    }
  }, [isCreatingParent]);

  return (
    <div className="primary-container" style={{ paddingTop: '3rem' }}>
      <div className="subtitle-container w-full  mx-[20%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          encType="multipart/form-data"
        >
          <div className='w-full h-full min-h-screen grid gap-10 grid-cols-[1fr] grid-rows-[1fr_10rem] primary-border'>
            <Form
              // color={Colors['color-light-green']}
              classN="form-container"
              key={uuidv4()}
              formData={GuardianOne}
              register={register}
              control={control}
              errors={errors}
            />
            <div className="flex flex-col items-center mx-20">
              <Button
                bgColor={Colors['color-light-green']}
                color={'white'}
                label={'submit'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page