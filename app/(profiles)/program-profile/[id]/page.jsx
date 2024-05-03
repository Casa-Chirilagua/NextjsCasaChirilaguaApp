'use client'
//Next JS
import { useRouter } from 'next/navigation';

//Nav
import { useParams } from "next/navigation";

//Redux
import { useSelector } from 'react-redux';

//React
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Components
import FullProfile from "@/components/profile/FullProfile";

//Data
import Program from "@/data/Program Form Data/Program";
import Colors from "@/data/Colors";

//Functions
import ProgramConfig from '@/functions/profile configurations/ProgramConfig';
import ProgramProfileCardConfig from '@/functions/profile configurations/ProgramProfileCardConfig';
import GetFieldByJsonFieldName from "@/functions/student functions/GetFieldByJsonFieldName";
import DataToUpdate from "@/functions/DataToUpdate";
import UpdateComponentData from "@/functions/UpdateComponentData";
import UpdateDeleteComponent from "@/functions/UpdateDeleteComponent";

//Services
import { fetchProgramById, updateProgramById, deleteProgramById } from "@/lib/features/program/programSlice";

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

  const { id } = useParams();

  const router = useRouter();

  const headings = [
    'Program Information',
    'Capacity',
    'Additional Information',
  ];

  const { program } = useSelector((state) => state.program);

  // Fetch Program
  const [doFetchProgram, isFetchingProgram, fetchingProgramError] =
    useThunk(fetchProgramById);

  //Update Program
  const [doUpdateProgram, isUpdatingProgram, updatingProgramError] =
    useThunk(updateProgramById);

  //Delete Program
  const [doDeleteProgram, isDeletingProgram, deletingProgramError] =
    useThunk(deleteProgramById);

  const [fieldData, setFieldData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  useEffect(() => {
    doFetchProgram(id);
  }, [doFetchProgram, id]);

  let fields;
  let data;
  try {
    data = ProgramProfileCardConfig(program);
    fields = ProgramConfig(program);
  } catch (error) {
    console.log(error);
  }

  const formData = GetFieldByJsonFieldName(
    fieldData.name_of_json_field,
    Program,
  );
  const onSubmit = async (data) => {
    const fieldName = fieldData.database_field_name;
    const objName = fieldData.objectName;
    let programData = DataToUpdate(fieldData, fieldName, id, objName, data);
    let updateProgram = doUpdateProgram(programData);
    const [updateProgramResult] = await Promise.all([updateProgram]);

    if (updateProgramResult.payload.status === 'success') {
      toast.success('Successfully Updated Program');
      setOpenModal(false);
    }
    reset();
  };

  let components = UpdateComponentData(formData, register, control, errors);
  let componentsDelete = UpdateDeleteComponent(program);

  const handleClickFunction = async () => {
    navigate('/programs/table');

    const studentPromise = doDeleteProgram(id);
    const [studentResult] = await Promise.all([studentPromise]);
    if (studentResult.payload.status === 'success') {
      toast.success('Successfully Deleted Program');
    }
  };
  let content;
  if (fetchingProgramError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <FullProfile
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        componentsDelete={componentsDelete}
        bgModalColor={Colors['color-saleforce-dash-blue']}
        buttonLabel={'Update'}
        handleClickFunction={handleClickFunction}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        components={components}
        profileColor={Colors['color-green']}
        object={program}
        data={data}
        setFieldData={setFieldData}
        headings={headings}
        fields={fields}
        mainHeading={'Delete program'}
        subHeading={'This action will permanently remove program'}
        deleteButtonLabel={'Delete'}
        objectType={'programs'}
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