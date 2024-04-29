import { Avatar } from '@mui/material';
import Link from 'next/link';
import defaultProfilePicture from '@/public/profile_picture.png';

function StudentConfig() {
  const config = [
  
    {
      label: 'First Name',
      render: (student) => {
        return (
          <div className="avatar-name">
            <Avatar
              className="avatar-table"

              src={
                student.profile_image[0]
                  ? student.profile_image[0].url
                  : defaultProfilePicture
              }
            ></Avatar>
            <Link href={`/profile/${student._id}`}>
              {student.first_name}
            </Link>
          </div>
        );
      },
      sortValue: (student) => {
        return student.first_name;
      },
    },
    {
      label: 'Last Name',
      render: (student) => student.last_name,
      sortValue: (student) => student.last_name,
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
      label: 'School',
      render: (d) => {
        return d.school;
      },
      sortValue: (d) => d.school,
    },
    {
      label: 'Enrolled',
      render: (d) => {
        return <>{d.enrolled ? 'yes' : 'no'}</>;
      },
      sortValue: (d) => d.enrolled,
    },
  ];
  return config;
}

export default StudentConfig;
