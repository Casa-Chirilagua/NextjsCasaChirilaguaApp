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

//Data 
import Colors from "@/data/Colors";
import StudentInformation from "@/data/Student Form Data/StudentInformation";
import StudentProfileHeading from "@/data/StudentProfileHeading";

//Components
import FullProfile from "@/components/profile/FullProfile";
import ConditionalModal from "@/components/modal/ConditionalModal";

//Functions
import GetItemByJsonFieldName from "@/functions/student functions/GetItemByJsonFieldName";
import StudentConfig from "@/functions/profile configurations/StudentConfig";
import StudentProfileCardConfig from "@/functions/profile configurations/StudentProfileCardConfig";
import DataToUpdate from "@/functions/DataToUpdate";
import CreateNewFormWithData from "@/functions/CreateNewFormWithData";
import UpdateDeleteComponent from "@/functions/UpdateDeleteComponent";
import HandleName from "@/functions/HandleName";
import SuccessToast from "@/functions/SuccessToast";


//Services
import {
  updateStudentById,
  deleteStudentById,
  fetchStudentById,
} from "@/lib/features/student/studentSlice";

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

  const { student } = useSelector((state) => state.student);

  //Fetch Student
  const [doFetchStudent, isFetchingStudent, fetchingStudentError] =
    useThunk(fetchStudentById);

  //Update Student
  const [doUpdateStudent, isUpdatingStudent, updatingStudentError] =
    useThunk(updateStudentById);

  //Delete Student
  const [doDeleteStudent, isDeletingStudent, deletingStudentError] =
    useThunk(deleteStudentById);

  //Handle field data
  const [fieldData, setFieldData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  //Opens modal when editing
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [modalLabelAdd, setModalLabelAdd] = useState();

  //Opens moadl when Deleting
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [clickedAddButton, setClickedAddButton] = useState();

  // Notes
  const [openAddNoteMenu, setOpenAddNoteMenu] = useState(false);
  const [notes, setNotes] = useState([]);

  /* Fetch students*/
  useEffect(() => {
    doFetchStudent(id);
  }, [doFetchStudent, openModalProfile, id]);

  let fields;
  let studentConfigData;
  if (student) {
    try {
      studentConfigData = StudentProfileCardConfig(student);
      fields = StudentConfig(student);
    } catch (error) {
      console.log(error);
    }
  }

  const formData = GetItemByJsonFieldName(
    fieldData.name_of_json_field,
    StudentInformation,
  );


  /*
    This function is called when a form is submitted:

    - For instance, when a user opens up a modal to 
      update a student's information, the user will 
      fill out the form and submit it.
  */
  const onSubmit = async (data) => {
    const fieldName = fieldData.database_field_name;
    const objName = fieldData.objectName;
    let studentData;
    if (fieldData) {
      studentData = DataToUpdate(fieldData, fieldName, id, objName, data);
    }

    let updateStudent = doUpdateStudent(studentData);
    SuccessToast(updateStudent, 'Successfully Updated Student');
    setOpenModal(false);
    reset();
  };


  let formComponent = CreateNewFormWithData(fieldData.form_data, register, control, errors);
  console.log("Field Data",fieldData.form_data);
  let componentsDelete = UpdateDeleteComponent(student);
  
 

  /*
  This function is called when the user clicks the delete button:

  - For instance, when a user clicks the delete button, a modal
    will pop up asking the user to confirm the deletion of a student.
*/
  const handleDeleteClickFunction = async () => {
    router.push('/students/table');
    const studentPromise = doDeleteStudent(id);
    SuccessToast(studentPromise, 'Successfully Deleted Student');
  };

  /*
    This function is called when the user clicks the add note button:

    - For instance, when a user clicks the add note button, a pop up
      will display asking the user to add a note to a student.
  */
  const handleSaveNoteClick = async () => {
    const notesData = {
      id: id,
      updatedFields: { notes: notes},
    };
    const studentPromise = doUpdateStudent(notesData);
    SuccessToast(studentPromise, 'Successfully Added Note');
    setOpenAddNoteMenu(false);
  };

  let content;
  /**
   *  1. If we have an error display the error message
   *  2. Otherwise dispay the profile
   */
  if (fetchingStudentError) {
    content = <div>Error fetching data...</div>;
  } else {
    if (student) {
      content = (
        <>
          <ConditionalModal
            objectTypeGrid={clickedAddButton}
            objectTypeToUpdate={'Students'}
            objectId={id}
            loadingToastMessage={`Updating ${student.first_name ? HandleName(student) : ''
              } ...`}
            successToastMessage={`Successfully updated ${student.first_name ? HandleName(student) : ''
              }!`}
            modalLabel={modalLabelAdd}
            setOpenModal={setOpenModalAdd}
            openModal={openModalAdd}
          />
          <FullProfile
            openModalDelete={openModalDelete} //Delete modal
            setOpenModalDelete={setOpenModalDelete}
            componentsDelete={componentsDelete}
            openModalProfile={openModalProfile}
            setOpenModalProfile={setOpenModalProfile}
            bgModalColor={Colors['color-saleforce-dash-blue']}
            buttonLabel={'Update'}
            handleClickFunction={handleDeleteClickFunction}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            openModal={openModal}
            setOpenModal={setOpenModal}
            components={formComponent}
            profileColor={Colors['color-purple-dark']}
            object={student}
            data={studentConfigData}
            setFieldData={setFieldData}
            headings={StudentProfileHeading}
            fields={fields}
            mainHeading={'Delete student'}
            subHeading={'This action will permanently remove student'}
            deleteButtonLabel={'Delete'}
            objectType={'students'}
            setClickedAddButton={setClickedAddButton}
            setOpenModalAdd={setOpenModalAdd}
            setModalLabelAdd={setModalLabelAdd}

            //Notes
            handleSaveNoteClick={handleSaveNoteClick}
            setOpenAddNoteMenu={setOpenAddNoteMenu}
            openAddNoteMenu={openAddNoteMenu}
            notes={notes}
            setNotes={setNotes}
          />
        </>
      );
    } else {
      content = <></>;
    }
  }

  // Add more data for additional persons...
  try {
    return <div className='primary-container'> {content}</div>;
  } catch (error) {
    console.log(error);
  }
}

export default page