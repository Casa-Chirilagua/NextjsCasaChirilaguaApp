import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Colors from '../../data/Colors';
function DeleteCard({
  mainHeading,
  subHeading,
  buttonLabel,
  setOpenModalDelete,
  color,
}) {
  return (
    <div className="profile-container delete-container">
      <h3>{mainHeading}</h3>
      <h6>{subHeading}</h6>
      <div
        className="delete-button"
        onClick={() => setOpenModalDelete(true)}
        style={{
          color: 'white',
          backgroundColor: color,
          width: '100%',
          height: '4rem',
        }}
      >
        <div className="delete-button-content">
          <FaTrashAlt style={{ color: 'white' }} className="trash-icon" />
          <h5 style={{ color: 'white' }}>{buttonLabel}</h5>
        </div>
      </div>
    </div>
  );
}

export default DeleteCard;
