import { useState, useEffect } from 'react';

//Functions
import HandleArrayUpdateData from '../../functions/HandleArrayUpdateData';

//Components
import ModalClick from './ModalClick';
import ConditionalGridList from '../list/ConditionalGridList';
import LoadingToast from '../../functions/LoadingToast';
import SuccessToast from '../../functions/SuccessToast';

//Services
import { addItemToArrayByStudentID } from '../../features/student/studentSlice';
import { addItemToArrayByParentID } from '../../features/parent/parentSlice';
import { addItemToArrayByProgramID } from '../../features/program/programSlice';
import { addItemToArrayByFamilyID } from '../../features/family/familySlice';

//Thunks
import { useThunk } from '../../hooks/use-thunk';

//Data
import Colors from '../../data/Colors';

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
    addItemToArrayByStudentID,
  );

  //Update Parent
  const [doUpdateParent, isUpdatingParent, isUpdatingParentError] = useThunk(
    addItemToArrayByParentID,
  );

  //Update Program
  const [doUpdateProgram, isUpdatingProgram, isUpdatingProgramError] = useThunk(
    addItemToArrayByProgramID,
  );

  //Update Family
  const [doUpdateFamily, isUpdatingFamily, isUpdatingFamilyError] = useThunk(
    addItemToArrayByFamilyID,
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
    const data = HandleArrayUpdateData(objectTypeGrid, objectId, objectIdToAdd);

    //Update and set the promise
    let promise;
    if (objectTypeToUpdate === 'Students') {
      promise = doUpdateStudent(data);
    } else if (objectTypeToUpdate === 'Programs') {
      promise = doUpdateProgram(data);
    } else if (objectTypeToUpdate === 'Familis') {
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
