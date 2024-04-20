import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import profile_picture from '../../components/profile/profile_picture.png';
import HandleName from '../../functions/HandleName';
import { GrAdd } from 'react-icons/gr';

function ProgramConfig(setId, setClickedAddButton, setOpenModal, setLabel) {
  const config = [

    {
      label: 'Name',
      render: (program) => {
        return (
          <div className="avatar-name">
            <Avatar
            className="avatar-table"
              src={
                program.profile_image[0]
                  ? program.profile_image[0].url
                  : profile_picture
              }
            ></Avatar>
            <Link to={`/program-profile/${program._id}`}>
              {HandleName(program)}
            </Link>
          </div>
        );
      },
    },
    {
      label: 'Students Enrolled',
      render: (program) => program.students.length,
      sortValue: (program) => program.student_enrolled,
    },
    {
      label: 'Program Capacity',
      render: (program) => program.program_capacity,
      sortValue: (program) => program.program_capacity,
    },
    {
      label: 'Volunteer Capacity',
      render: (program) => program.volunteer_capacity,
      sortValue: (program) => program.volunteer_capacity,
    },
    {
      label: 'Number of Volunteers',
      render: (program) => program.volunteer_capacity,
      sortValue: (program) => program.volunteer_capacity,
    },
  ];
  return config;
}

export default ProgramConfig;
