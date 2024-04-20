import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { Tooltip, IconButton } from '@mui/material';

function Modal({
  open,
  label,
  onClose,
  components,
  bgColor,
  handleClick,
  buttonLabel,
}) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modal-title profile-heading-container">
          <div style={{ border: 'none' }} className="modal-title">
            {label}
          </div>
          <Tooltip>
            <IconButton
              style={{ border: 'none' }}
              onClick={onClose}
            >
              <RxCross1></RxCross1>
            </IconButton>
          </Tooltip>
        </div>
        <div className="modal-content-container">
          <div className="input-container">{components}</div>
        </div>
        <div style={{ padding: '2rem' }} className="button-container">
          <input
            style={{ backgroundColor: bgColor, color: 'white' }}
            className="login-button-purple"
            type="submit"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Modal;
