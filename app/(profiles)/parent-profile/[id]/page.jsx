'use client'
//Next JS
import { useRouter } from 'next/navigation';

//Nav
import { useParams } from "next/navigation";

//Redux
import { useSelector } from 'react-redux';

//React
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

//Components
import FullProfile from "@/components/profile/FullProfile";
import ConditionalModal from "@/components/modal/ConditionalModal";

//Data
import Colors from "@/data/Colors";

//Functions
import ParentConfig from '@/functions/profile configurations/ParentConfig';
import ParentProfileCardConfig from '@/functions/profile configurations/ParentProfileCardConfig';
import CreateNewFormWithData from '@/functions/CreateNewFormWithData';
import UpdateDeleteComponent from '@/functions/UpdateDeleteComponent';
import DataToUpdate from '@/functions/DataToUpdate';
import SuccessToast from '@/functions/SuccessToast';
import HandleName from '@/functions/HandleName';


//Services
import { fetchParentById, updateParentById, deleteParentById } from "@/lib/features/parent/parentSlice";

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

  const headings = ['Personal Information', 'Address'];

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

  const [fieldData, setFieldData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);


  const [formComponent, setFormComponent] = useState();
  const [parentConfigData, setParentConfigData] = useState();
  const [fields, setFields] = useState();
  const [componentsDelete, setComponentsDelete] = useState();


  //Opens modal when editing
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [modalLabelAdd, setModalLabelAdd] = useState();
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [clickedAddButton, setClickedAddButton] = useState();


  /**
   * Resets form after submission
   */
  useEffect(() => {
    reset({});
  }, [isSubmitSuccessful, reset]);


  useEffect(() => {
    doFetchParent(id);
  }, [doFetchParent, openModalProfile, id]);

  useEffect(() => {
    if (parent) {
      setParentConfigData(ParentProfileCardConfig(parent));
      setFields(ParentConfig(parent));
    }
  }, [parent]);

  useEffect(() => {
    setFormComponent(CreateNewFormWithData(fieldData.form_data, register, control, errors));
  }, [fieldData])

  /**
   * 
   * Update the field values
   * 
   */
  const onSubmit = async (data) => {
    const dataToUpdate = DataToUpdate(data, id, fieldData);

    console.log('dataToUpdate', dataToUpdate);
    let updateParent = doUpdateParent(fieldData ? dataToUpdate : {});
    SuccessToast(updateParent, 'Successfully Updated Parent');
    setOpenModal(false);
  };

  // let componentsDelete = UpdateDeleteComponent(parent);

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
      <>
        <ConditionalModal
          objectTypeGrid={clickedAddButton}
          objectTypeToUpdate={'Parents'}
          objectId={id}
          loadingToastMessage={`Updating ${parent?.first_name ? HandleName(parent) : ''
            } ...`}
          successToastMessage={`Successfully updated ${parent?.first_name ? HandleName(parent) : ''
            }!`}
          modalLabel={modalLabelAdd}
          setOpenModal={setOpenModalAdd}
          openModal={openModalAdd} />
        <FullProfile
          openModalDelete={openModalDelete}
          setOpenModalDelete={setOpenModalDelete}
          openModalProfile={openModalProfile}
          setOpenModalProfile={setOpenModalProfile}
          componentsDelete={componentsDelete}
          bgModalColor={Colors['color-saleforce-dash-blue']}
          buttonLabel={'Update'}
          handleClickFunction={handleDeleteClickFunction}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          openModal={openModal}
          setOpenModal={setOpenModal}
          components={formComponent}
          profileColor={Colors['color-light-green']}
          object={parent}
          data={parentConfigData}
          setFieldData={setFieldData}
          headings={headings}
          fields={fields}
          mainHeading={'Delete Parent'}
          subHeading={'This action will permanently remove parent'}
          deleteButtonLabel={'Delete'}
          objectType={'parents'}
          setClickedAddButton={setClickedAddButton}

          //Notes
          handleSaveNoteClick={handleSaveNoteClick}
          setOpenAddNoteMenu={setOpenAddNoteMenu}
          openAddNoteMenu={openAddNoteMenu}
          notes={notes}
          setNotes={setNotes}
        />
      </>
    );
  }
  try {
    return <div className='primary-container'>{content}</div>;
  } catch (error) {
    //error);
  }
}

export default page