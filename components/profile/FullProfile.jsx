

//Components
import Modal from '../modal/Modal';
import Profile from './Profile';
import DeleteCard from '../card/DeleteCard';
import ProfileCard from './ProfileCard';
import profile_picture from './profile_picture.png';
import ModalClick from '../modal/ModalClick';
import Notes from './Notes';
import MapCard from '../map/MapCard';

import HandleName from '@/functions/HandleName';

function FullProfile({
  openModalDelete,
  setOpenModalDelete,
  componentsDelete,
  openModalProfile,
  setOpenModalProfile,
  componentsProfile,
  bgModalColor,
  buttonLabel,
  handleClickFunction,
  handleSubmit,
  onSubmit,
  openModal,
  setOpenModal,
  components,
  profileColor,
  object,
  data,
  setFieldData,
  headings,
  fields,
  mainHeading,
  subHeading,
  deleteButtonLabel,
  objectType,
  setClickedAddButton,
  setOpenModalAdd,
  setModalLabelAdd,
  handleSaveNoteClick,
  setOpenAddNoteMenu,
  openAddNoteMenu,
  setNotes,
}) {
  
  let fullName = HandleName(object);
  return (
    <>
      {/* Modal which handle delete */}
      <ModalClick
        label="Delete"
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        components={componentsDelete}
        bgColor={'#CA0B00'}
        buttonLabel={deleteButtonLabel}
        handleClick={handleClickFunction}
      />
      {/* Profile page */}
      <div className="profile-page">
        <ProfileCard
          openModal={openModalProfile}
          setOpenModal={setOpenModalProfile}
          objectType={objectType}
          id={object ? object._id : ''}
          img={object?.profile_image ? object.profile_image[0].url : 'https://res.cloudinary.com/dnmsdb199/image/upload/v1697860439/CasaApp/bx5xtnh4pqns9bar8q6g.jpg'}
          color={profileColor}
          name={object ? fullName : ''}
          data={data}
          setClickedAddButton={setClickedAddButton}
          setOpenModalAdd={setOpenModalAdd}
          setModalLabelAdd={setModalLabelAdd}
        />
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Modal
            label="Edit"
            open={openModal}
            onClose={() => setOpenModal(false)}
            components={components}
            bgColor={bgModalColor}
            buttonLabel={buttonLabel}
          />
          <Profile
            setOpenModal={setOpenModal}
            setNameOfJson={setFieldData}
            name={object?.name? object.name : ''}
            headings={headings ? headings : []}
            fields={fields ? fields : []}
            color={profileColor}
          />
        </form>

        <MapCard address={object?.address? object.address : {}} />
        <Notes
          handleSaveNoteClick={handleSaveNoteClick}
          object={object?.notes? object : {}}
          setOpenAddNoteMenu={setOpenAddNoteMenu}
          openAddNoteMenu={openAddNoteMenu}
          setNotes={setNotes}
        />

        {/* Section with delete */}
        {/* <DeleteCard
          color={profileColor}
          mainHeading={mainHeading}
          subHeading={subHeading}
          buttonLabel={deleteButtonLabel}
          setOpenModalDelete={setOpenModalDelete}
        /> */}
      </div>
    </>
  );
}

export default FullProfile;
