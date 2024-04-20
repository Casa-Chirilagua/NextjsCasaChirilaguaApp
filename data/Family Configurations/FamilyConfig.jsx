import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';
import profile_picture from '../../components/profile/profile_picture.png';

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
                  : profile_picture
              }
            ></Avatar>
            <Link to={`/family-profile/${family._id}`}>
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
