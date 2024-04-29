import Link from 'next/link';
import defaultProfilePicture from '@/public/profile_picture.png';
import { Avatar } from '@mui/material';


function MentorConfig() {
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
                <Link href={`/mentor-profile/${volunteer._id}`}>
                  {volunteer.first_name}
                </Link>
              </div>
            );
          },
          sortValue: (volunteers) => {
            return volunteers.first_name;
          },
        },
    
        {
          label: 'Last Name',
          render: (volunteers) => volunteers.last_name,
          sortValue: (volunteers) => volunteers.last_name,
        },
        {
          label: 'Phone',
          render: (volunteers) => volunteers.phone,
          sortValue: (volunteers) => volunteers.phone,
        },
      ];
      return config;
}

export default MentorConfig