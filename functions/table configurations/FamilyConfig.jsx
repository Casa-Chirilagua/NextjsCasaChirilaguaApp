import { Avatar } from '@mui/material';
import Link from 'next/link';
import defaultProfilePicture from '@/public/profile_picture.png';

function FamilyConfig() {
  const config = [
    {
      label: 'Name',
      render: (family) => {
        return (
          <div className="avatar-name">
            <Avatar
            className="avatar-table"
              src={
                family.profile_image[0]
                  ? family.profile_image[0].url
                  : defaultProfilePicture
              }
            ></Avatar>
            <Link href={`/profile/${family._id}`}>
              {family?.family_name}
            </Link>
          </div>
        );
        
      },
      sortValue: (family) => family?.family_name,

    },
    {
      label: 'Phone',
      render: (family) => family?.primary_phone,
      sortValue: (family) => family?.primary_phone,
    },

    {
      label: 'Street',
      render: (family) => family.address?.street,
      sortValue: (family) => family.address?.street,
    },
  ];
  return config;
}

export default FamilyConfig;
