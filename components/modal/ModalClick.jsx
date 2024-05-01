import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { Tooltip, IconButton } from '@mui/material';

function ModalClick({
  open,
  label,
  onClose,
  components,
  bgColor,
  handleClick,
  buttonLabel,
  height,
  width,
}) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        style={{
          height: height,
          width: width,
        }}
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
              //   className="modal-title"
            >
              <RxCross1></RxCross1>
            </IconButton>
          </Tooltip>
        </div>
        <div className="modal-content-container">
          <div className="input-container">{components}</div>
        </div>
        <div
            style={{ padding: '2rem', color: 'white', borderTopColor:'black'}}
            className="button-container"
          >
            <input
              style={{ backgroundColor: bgColor, color: '#ffffff' }}
              className="login-button-purple"
              onClick={handleClick}
              placeholder={buttonLabel}
            ></input>
          </div>
      </div>
    </div>
  );
}

export default ModalClick;
