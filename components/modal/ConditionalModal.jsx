'use client'

//React
import { useState, useEffect } from 'react';

//Functions
import GenerateUpdateData from '@/functions/conditional modal/GenerateUpdateData';

//Components
import ModalClick from './ModalClick';
import ConditionalGridList from '../list/ConditionalGridList';
import LoadingToast from '@/functions/LoadingToast';
import SuccessToast from '@/functions/SuccessToast';

//Services
import { updateStudentById } from '@/lib/features/student/studentSlice';
import { updateParentById } from '@/lib/features/parent/parentSlice';
import { updateProgramById } from '@/lib/features/program/programSlice';
import { updateFamilyById } from '@/lib/features/family/familySlice';

//Thunks
import { useThunk } from '@/hooks/use-thunk';

//Data
import Colors from '@/data/Colors';

function ConditionalModal({
  objectTypeGrid,
  objectTypeToUpdate,
  objectId,
  loadingToastMessage,
  successToastMessage,
  modalLabel,
  setOpenModal,
  openModal,
}) {

  //Variables
  const [componentsForModal, setComponentsForModal] = useState();
  const [objectIdToAdd, setObjectIdToAdd] = useState();

  //Update Student
  const [doUpdateStudent, isUpdatingStudent, isUpdatingStudentError] = useThunk(
    updateStudentById,
  );

  //Update Parent
  const [doUpdateParent, isUpdatingParent, isUpdatingParentError] = useThunk(
    updateParentById,
  );

  //Update Program
  const [doUpdateProgram, isUpdatingProgram, isUpdatingProgramError] = useThunk(
    updateProgramById,
  );

  //Update Family
  const [doUpdateFamily, isUpdatingFamily, isUpdatingFamilyError] = useThunk(
    updateFamilyById,
  );

  const handleObjectId = (id) => {
    setObjectIdToAdd(id);
  };

  //Set GridList based on object Type
  useEffect(() => {
    let component = (
      <ConditionalGridList
        objectType={objectTypeGrid}
        handleObjectIdFunction={handleObjectId}
      />
    );
    setComponentsForModal(component);
  }, [objectTypeGrid]);

  LoadingToast(isUpdatingFamily, loadingToastMessage);

  /**
   * When Modal is submitted update the array using
   */
  const handleClickFunction = async () => {
    //Generate data to update
    const data = GenerateUpdateData(objectTypeGrid, objectId, objectIdToAdd);

    //Update and set the promise
    let promise;
    if (objectTypeToUpdate === 'Students') {
      promise = doUpdateStudent(data);
    } else if (objectTypeToUpdate === 'Programs') {
      promise = doUpdateProgram(data);
    } else if (objectTypeToUpdate === 'Families') {
      promise = doUpdateFamily(data);
    } else if (objectTypeToUpdate === 'Parents') {
      promise = doUpdateParent(data);
    }

    //If the promise is successful then send success message to user
    if (objectId) {
      SuccessToast(promise, successToastMessage);
      setOpenModal(false);
    }
  };

  return (
    <ModalClick
      label={modalLabel}
      open={openModal}
      onClose={() => setOpenModal(false)}
      components={componentsForModal}
      bgColor={Colors['color-saleforce-dash-blue']}
      buttonLabel={'Submit'}
      handleClick={handleClickFunction}
      height={'90%'}
      width={'80%'}
    />
  );
}

export default ConditionalModal;
