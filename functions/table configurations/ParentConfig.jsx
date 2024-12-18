import { Avatar } from '@mui/material';
import Link from 'next/link';
import defaultProfilePicture from '@/public/profile_picture.png';

function ParentConfig() {
  const config = [
    {
      label: 'First Name',
      render: (parent) => {
        return (
          <div className="avatar-name">
            <Avatar
              className="avatar-table"
              src={parent ? parent.profile_image[0].url : defaultProfilePicture}
            ></Avatar>
            <Link href={`/parent-profile/${parent._id}`}>
              {parent.first_name}
            </Link>
          </div>
        );
      },
      sortValue: (parents) => {
        return parents.first_name;
      },
    },

    {
      label: 'Last Name',
      render: (parents) => parents.last_name,
      sortValue: (parents) => parents.last_name,
    },
    {
      label: 'Phone',
      render: (parents) => parents.phone,
      sortValue: (parents) => parents.phone,
    },
  ];
  return config;
}

export default ParentConfig;
