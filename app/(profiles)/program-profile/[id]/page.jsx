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
import GetItemByJsonFieldName from "@/functions/student functions/GetItemByJsonFieldName";
import DataToUpdate from "@/functions/DataToUpdate";
import CreateNewFormWithData from "@/functions/CreateNewFormWithData";
import UpdateDeleteComponent from "@/functions/UpdateDeleteComponent";
import SuccessToast from "@/functions/SuccessToast";

//Services
import { fetchProgramById, updateProgramById, deleteProgramById } from "@/lib/features/program/programSlice";

//Thunks
import { useThunk } from "@/hooks/use-thunk";


const page = () => {
  const [formData, setFormData] = useState({});
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: formData });

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
  const [openModalProfile, setOpenModalProfile] = useState(false);


  // Notes
  const [openAddNoteMenu, setOpenAddNoteMenu] = useState(false);
  const [notes, setNotes] = useState([]);

  //
  const [formComponent, setFormComponent] = useState();
  const [programConfigData, setProgramConfigData] = useState();
  const [fields, setFields] = useState();
  const [componentsDelete, setComponentsDelete] = useState();

  /**
 * Resets form after submission
 */
  useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);


  useEffect(() => {
    doFetchProgram(id);
  }, [doFetchProgram, id, openModalProfile]);

  useEffect(() => {
    if (program) {
      setProgramConfigData(ProgramProfileCardConfig(program));
      setFields(ProgramConfig(program));
    }

  }, [program]);


  useEffect(() => {
    setFormComponent(CreateNewFormWithData(fieldData.form_data, register, control, errors));
  }, [fieldData])

  const onSubmit = async (data) => {
    const dataToUpdate = DataToUpdate(data, id, fieldData);
    let updateProgram = doUpdateProgram(fieldData ? dataToUpdate : {});
    SuccessToast(updateProgram, 'Successfully Updated Program');
    setOpenModal(false);
  };

  // let componentsDelete = UpdateDeleteComponent(program);

  const handleClickFunction = async () => {
    router.push('/programs/table');
    const programPromise = doDeleteProgram(id);
    SuccessToast(programPromise, 'Successfully Deleted Program');
  };

  /*
  This function is called when the user clicks the add note button:

  - For instance, when a user clicks the add note button, a pop up
    will display asking the user to add a note to a student.
*/
  const handleSaveNoteClick = async () => {
    const notesData = {
      id: id,
      updatedFields: { notes: notes },
    };
    const programPromise = doUpdateProgram(notesData);
    SuccessToast(programPromise, 'Successfully Added Note');
    setOpenAddNoteMenu(false);
  };

  let content;
  if (fetchingProgramError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <FullProfile
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        openModalProfile={openModalProfile}
        setOpenModalProfile={setOpenModalProfile}
        componentsDelete={componentsDelete}
        bgModalColor={Colors['color-saleforce-dash-blue']}
        buttonLabel={'Update'}
        handleClickFunction={handleClickFunction}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        components={formComponent}
        profileColor={Colors['color-green']}
        object={program}
        data={programConfigData}
        setFieldData={setFieldData}
        headings={headings}
        fields={fields}
        mainHeading={'Delete program'}
        subHeading={'This action will permanently remove program'}
        deleteButtonLabel={'Delete'}
        objectType={'programs'}
        //Notes
        handleSaveNoteClick={handleSaveNoteClick}
        setOpenAddNoteMenu={setOpenAddNoteMenu}
        openAddNoteMenu={openAddNoteMenu}
        notes={notes}
        setNotes={setNotes}
      />
    );
  }
  try {
    return <div className='primary-container'>{content}</div>;
  } catch (error) {
    //error);
  }
}

export default page