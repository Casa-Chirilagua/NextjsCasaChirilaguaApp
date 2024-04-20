import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { BsFillCameraFill } from 'react-icons/bs';

import { toast } from 'react-toastify';

//Components
import Modal from '../modal/Modal';

//Data
import Colors from '../../data/Colors';

//Services
import { updateProfileImageById } from '../../features/profile image/profileImageSlice';

//thunks
import { useThunk } from '../../hooks/use-thunk';

//Icon
import { GrAdd } from 'react-icons/gr';

const PersonCard = ({
  name,
  data,
  color,
  img,
  id,
  objectType,
  setOpenModal,
  openModal,
  setClickedAddButton,
  setOpenModalAdd,
  setModalLabelAdd,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Update Student
  const [
    doUpdateProfilePicture,
    isUpdatingProfilePicture,
    updatingPrfoilePictureError,
  ] = useThunk(updateProfileImageById);

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      fd.append('profile_image', data.profile_image[0]);
      fd.append('id', id);
      fd.append('url', objectType);

      let updateProfilePicture = doUpdateProfilePicture(fd);
      const [updatStudentResult] = await Promise.all([updateProfilePicture]);

      if (updatStudentResult.payload.status === 'success') {
        toast.success('Successfully Updated Profile Picture');
        setOpenModal(false);
      }
    } catch (error) {}
  };



  let components = (
    <div className="form-item">
      <label id="avatar">Choose a profile picture:</label>
      <input
        name="profile_image"
        type="file"
        for="avatar"
        className="form-control"
        {...register('profile_image')}
      ></input>
    </div>
  );


  
  return (
    <div className="card-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="PATCH"
        encType="multipart/form-data"
      >
        {data
          ? data.map((item, index) => (
              <div key={index} className="card-item">
                <div
                  style={{
                    background: `linear-gradient(to top,      white 0%,
      white 50%,
      ${color} 50%,
      ${color} 100%)`,
                  }}
                  className="profile-card-title-container"
                >
                  <Modal
                    label="Update Profile Picture: "
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    components={components}
                    bgColor={Colors['color-saleforce-dash-blue']}
                    buttonLabel={'Update profile picture'}
                  />
                  <div className="profile-picture-container">
                    <div className="avatar-profile-container">
                      <Badge
                        style={{ position: 'relative' }}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        badgeContent={
                          <div
                            className="camera-button"
                            onClick={() => setOpenModal(true)}
                          >
                            <BsFillCameraFill />
                          </div>
                        }
                      >
                        <Avatar
                          alt="Travis Howard"
                          src={img}
                          style={{ height: '15rem', width: '15rem' }}
                        />
                      </Badge>
                      <h1>{name}</h1>
                    </div>
                    <div className="profile-card-buttons-container">
                      {item.map(({ icon, text, objectName }, i) => (
                        <button
                          onClick={() => {
                            setClickedAddButton(objectName + 's');
                            setModalLabelAdd(objectName);
                            setOpenModalAdd(true);
                          }}
                          className="profile-card-add-button"
                        >
                          <GrAdd /> Add {objectName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-content-container">
                  {item.map(({ icon, text }, i) => (
                    <div key={i} className="card-content">
                      <span className="card-icon">{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          : []}
      </form>
    </div>
  );
};

export default PersonCard;
