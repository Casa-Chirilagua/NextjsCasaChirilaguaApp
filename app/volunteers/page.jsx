'use client'

//React
import { useEffect } from 'react';

//Redux
import { useSelector } from 'react-redux';

//Unique id
import { v4 as uuidv4 } from 'uuid';

//Components
import TableWithSearchBar from '@/components/tables/TableWithSearchBar';

//Data
import Colors from '@/data/Colors';

//Functions
import VolunteerConfig from '@/functions/table configurations/VolunteerConfig';

//Hooks
import { useThunk } from '@/hooks/use-thunk';

//Services
// import { fetchVolunteers } from '@/features/volunteers/volunteersSlice';


const page = () => {
  const volunteers = [];
  const config = VolunteerConfig();
  return (
    <div className='table-with-searchbar'>      <TableWithSearchBar
      searchTitleColor={Colors['color-green']}
      color={'green'}
      config={config}
      data={volunteers}
      title={'Volunteers'}
    /></div>
  )
}

export default page