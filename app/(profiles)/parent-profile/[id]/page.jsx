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
import Colors from "@/data/Colors";
import GuardianOne from '@/data/Student Form Data/GuardianOne';

//Functions
import ParentConfig from '@/functions/profile configurations/ParentConfig';
import ParentProfileCardConfig from '@/functions/profile configurations/ParentProfileCardConfig';
import GetItemByJsonFieldName from '@/functions/student functions/GetItemByJsonFieldName';
import CreateNewFormWithData from '@/functions/CreateNewFormWithData';
import UpdateDeleteComponent from '@/functions/UpdateDeleteComponent';
import DataToUpdate from '@/functions/DataToUpdate';
import SuccessToast from '@/functions/SuccessToast';


//Services
import { fetchParentById, updateParentById, deleteParentById } from "@/lib/features/parent/parentSlice";

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

  const headings = ['Personal Information', 'Address'];

  const router = useRouter();

  const { parent } = useSelector((state) => state.parent);


  //fetch Parent
  const [doFetchParent, isFetchingParent, fetchingParentError] =
    useThunk(fetchParentById);

  //Update Student
  const [doUpdateParent, isUpdatingParent, updatingParentError] =
    useThunk(updateParentById);

  //Delete Student
  const [doDeleteParent, isDeletingParent, deletingParentError] =
    useThunk(deleteParentById);

  // Notes
  const [openAddNoteMenu, setOpenAddNoteMenu] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    doFetchParent(id);
  }, [doFetchParent, id]);


  const [fieldData, setFieldData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  let fields;
  let data;
  try {
    if (parent) {
      data = ParentProfileCardConfig(parent);
      fields = ParentConfig(parent);
    }
  } catch (error) {
    console.log(error);
  }

  const formData = GetItemByJsonFieldName(
    fieldData.name_of_json_field,
    GuardianOne,
  );

  /**
   * 
   * Update the field values
   * 
   */
  const onSubmit = async (data) => {
    const fieldName = fieldData.database_field_name;
    const objName = fieldData.objectName;
    let studentData = DataToUpdate(fieldData, fieldName, id, objName, data);
    let updateParent = doUpdateParent(studentData);
    SuccessToast(updateParent, 'Successfully Updated Parent');
    reset();
  };

  let components = CreateNewFormWithData(formData, register, control, errors);
  let componentsDelete = UpdateDeleteComponent(parent);


  /*
  This function is called when the user clicks the delete button:

  - For instance, when a user clicks the delete button, a modal
    will pop up asking the user to confirm the deletion of a student.
*/
  const handleDeleteClickFunction = async () => {
    router.push('/parents/table');
    const parentPromise = doDeleteParent(id);
    SuccessToast(parentPromise, 'Successfully Deleted Parent');
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
    const parentPromise = doUpdateParent(notesData);
    SuccessToast(parentPromise, 'Successfully Added Note');
    setOpenAddNoteMenu(false);
  };

  let content;
  if (fetchingParentError) {
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
        onSubmit={onSubmit}
        openModal={openModal}
        setOpenModal={setOpenModal}
        components={components}
        profileColor={Colors['color-light-green']}
        object={parent}
        data={data}
        setFieldData={setFieldData}
        headings={headings}
        fields={fields}
        mainHeading={'Delete Parent'}
        subHeading={'This action will permanently remove parent'}
        deleteButtonLabel={'Delete'}
        objectType={'parents'}

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
    console.log(error);
  }
}

export default page