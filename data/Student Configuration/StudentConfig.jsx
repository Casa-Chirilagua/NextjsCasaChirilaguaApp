import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import defaultProfilePicture from '../../../../components/profile/profile_picture.png';
import HandleName from '../../../../functions/HandleName';
import { GrAdd } from 'react-icons/gr';


function StudentConfig(
  setId,
  setClickedAddButton,
  setOpenModal,
  setLabel,
) {
  const config = [
    {
      label: '',
      render: (student) => {
        // return <Avatar sx={{ bgcolor: "purple" }}>{abbrv}</Avatar>;
      },
    },
    {
      label: 'Name',
      render: (student) => {
        return (
          <div className="avatar-name">
            <Avatar
              src={
                student.profile_image[0]
                  ? student.profile_image[0].url
                  : defaultProfilePicture
              }
            ></Avatar>
            <Link to={`/student-profile/${student._id}`}>
              {HandleName(student)}
            </Link>
          </div>
        );
      },
      sortValue: (student) => {
        return student.first_name;
      },
    },

    {
      label: 'Grade',
      render: (student) => student.grade,
      sortValue: (student) => student.grade,
    },

    {
      label: 'Age',
      render: (d) => {
        var today = new Date();

        var birthDate = new Date(d.date_of_birth); // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age_now--;
        }
        return age_now;
      },
      sortValue: (d) => d.date_of_birth,
    },
    {
      label: 'Add Parent',
      render: (student) => {
        return (
          <button
            onClick={() => {
              setId(student._id);
              setClickedAddButton('Parents');
              setOpenModal(true);
              setLabel('Parent');
            }}
            className="table-add-button"
          >
            <GrAdd />
          </button>
        );
      },
    },
    {
      label: 'Add Program',
      render: (student) => {
        return (
          <button
            onClick={() => {
              setId(student._id);
              setClickedAddButton('Programs');
              setLabel('Program');
              setOpenModal(true);
            }}
            className="table-add-button"
          >
            <GrAdd />
          </button>
        );
      },
    },
    {
      label: 'Add to Family',
      render: (student) => {
        return (
          <button
            onClick={() => {
              setId(student._id);
              setClickedAddButton('Families');
              setLabel('Family');
              setOpenModal(true);
            }}
            className="table-add-button"
          >
            <GrAdd />
          </button>
        );
      },
    },
  ];
  return config;
}

export default StudentConfig;
