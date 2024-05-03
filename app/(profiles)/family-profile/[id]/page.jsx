'use client'

//Next JS
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation"

//Redux
import { useSelector } from 'react-redux';

//React
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Data 
import Colors from "@/data/Colors";

//Components
import FullProfile from "@/components/profile/FullProfile";

//Functions
import FamilyConfig from '@/functions/profile configurations/FamilyConfig';
import FamilyProfileCardConfig from '@/functions/profile configurations/FamilyProfileCardConfig';
import GetFieldByJsonFieldName from "@/functions/student functions/GetFieldByJsonFieldName";
import DataToUpdate from "@/functions/DataToUpdate";
import UpdateComponentData from "@/functions/UpdateComponentData";
import UpdateDeleteComponent from "@/functions/UpdateDeleteComponent";


//Services
import { fetchFamilyById, updateFamilyById, deleteFamilyById } from '@/lib/features/family/familySlice';

//Thunks
import { useThunk } from "@/hooks/use-thunk";


const page = () => {

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const headings = ['Family Information', 'Address'];

  const { id } = useParams();

  const router = useRouter();

  const { family } = useSelector((state) => state.family);

  // Fetch Familiy
  const [doFetchFamily, isFetchingFamily, fetchingFamilyError] =
    useThunk(fetchFamilyById);

  //Update Family
  const [doUpdateFamily, isUpdatingFamily, updatingFamilyError] =
    useThunk(updateFamilyById);

  //Delete Family
  const [doDeleteFamily, isDeletingFamily, deletingFamilyError] =
    useThunk(deleteFamilyById);

  const [openModal, setOpenModal] = useState(false);
  const [fieldData, setFieldData] = useState({});

  const [openModalDelete, setOpenModalDelete] = useState(false);


  useEffect(() => {
    doFetchFamily(id);
  }, [doFetchFamily, id]);

 console.log(family);
  let fields;
  let data;
  try {
    if (family) {
      data = FamilyProfileCardConfig(family);
      fields = FamilyConfig(family);
    }
  } catch (error) {
    console.log(error);
  }


  let componentsDelete;
  if (family) {
    componentsDelete = UpdateDeleteComponent(family);
  }

  const handleDeleteClickFunction = async () => {
    router.push('/families/table');
    const familyPromise = doDeleteFamily(id);
    const [familyResult] = await Promise.all([familyPromise]);
    if (familyResult.payload.status === 'success') {
      toast.success('Successfully Deleted Student');
    }
  };

  let content;
  if (fetchingFamilyError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <FullProfile
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        componentsDelete={componentsDelete}
        bgModalColor={Colors['color-saleforce-dash-blue']}
        buttonLabel={'Update'}
        handleClickFunction={handleDeleteClickFunction}
        handleSubmit={handleSubmit}
        // onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        // components={components}
        profileColor={Colors['color-purple-dark']}
        object={family}
        data={data}
        setFieldData={setFieldData}
        headings={headings}
        fields={fields}
        mainHeading={'Delete Family'}
        subHeading={'This action will permanently remove Family'}
        deleteButtonLabel={'Delete'}
        objectType={'families'}
      />
    );
  }
  try {
    return <div className='primary-container'>{content}</div>;
  } catch (error) {
    console.log(error);
  }
}

export default page