

//Components
import Modal from '../modal/Modal';
import Profile from './Profile';
import DeleteCard from '../card/DeleteCard';
import ProfileCard from './ProfileCard';
import profile_picture from './profile_picture.png';
import ModalClick from '../modal/ModalClick';
import Notes from './Notes';
import MapCard from '../map/MapCard';

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
  let fullName;
  if (object) {
    if (object.first_name && object.middle_name && object.last_name) {
      fullName =
        object.first_name + ' ' + object.middle_name + ' ' + object.last_name;
    } else if (object.first_name && object.last_name) {
      fullName = object.first_name + ' ' + object.last_name;
    } else if (object.name) {
      fullName = object.name;
    } else {
      fullName = object.family_name;
    }
  }

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
          img={object ? object.profile_image[0].url : profile_picture}
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
            name={object ? object.name : ''}
            headings={headings ? headings : []}
            fields={fields ? fields : []}
            color={profileColor}
          />
        </form>

        <MapCard address={object ? object.address : {}} />
        <Notes
          handleSaveNoteClick={handleSaveNoteClick}
          object={object}
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
