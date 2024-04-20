import { Link } from 'react-router-dom';
import HandleName from '../functions/HandleName';
import { Avatar } from '@mui/material';
const StudentColumns = [
  {
    field: 'Full Name',
    headerName: 'Full Name',
    headerAlign: 'left',
    width: 300,
    valueGetter: (params) => HandleName(params.row),
    renderCell: (params) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap:'1rem',
          alignItems:'center'
        }}
      >
        <Avatar src={params.row.profile_image[0].url} />
        <Link to={`/student-profile/${params.row._id}`}>{params.value}</Link>
      </div>
    ),
  },

  {
    field: 'First Name',
    headerName: 'First Name',
    headerAlign: 'left',
    width: 200,
    valueGetter: (params) => params.row.first_name,
    renderCell: (params) => params.value,
  },
  {
    field: 'grade',
    headerName: 'Grade',
    headerAlign: 'left',
  },
  {
    field: 'school',
    headerName: 'School',
    headerAlign: 'left',
  },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   headerAlign: "left",
  // },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    align: 'left',
    width: 300,
    headerAlign: 'left',
  },
  {
    field: 'phone',
    headerName: 'Phone',
    type: 'phone',
    width: 200,
    headerAlign: 'left',
  },
];

export default StudentColumns;
