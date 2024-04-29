import Link from 'next/link';
import defaultProfilePicture from '@/public/profile_picture.png';
import { Avatar } from '@mui/material';


function VolunteerConfig() {
    const config = [
        {
          label: 'First Name',
          render: (volunteer) => {
            return (
              <div className="avatar-name">
                <Avatar
                  className="avatar-table"
                  src={volunteer ? volunteer.profile_image[0].url : defaultProfilePicture}
                ></Avatar>
                <Link href={`/profile/${volunteer._id}`}>
                  {volunteer.first_name}
                </Link>
              </div>
            );
          },
          sortValue: (volunteer) => {
            return volunteer.first_name;
          },
        },
    
        {
          label: 'Last Name',
          render: (volunteer) => volunteer.last_name,
          sortValue: (volunteer) => volunteer.last_name,
        },
        {
          label: 'Phone',
          render: (volunteer) => volunteer.phone,
          sortValue: (volunteer) => volunteer.phone,
        },
      ];
      return config;
}

export default VolunteerConfig