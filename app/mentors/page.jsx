'use client'

//React
import { useEffect } from 'react';

//Redux
import { useSelector } from 'react-redux';

//Unique id
import { v4 as uuidv4 } from 'uuid';

//Components
import TableSearch from '@/components/tables/TableSearch';

//Data
import Colors from '@/data/Colors';

//Functions
import MentorConfig from '@/functions/table configurations/MentorConfig';

//Hooks
import { useThunk } from '@/hooks/use-thunk';

//Services
// import { fetchMentors } from '@/features/mentors/mentorsSlice';

const page = () => {
  const mentors = [];
  let studentsWithIds;

  try {
    if (volunteers !== null || volunteers !== undefined) {
      studentsWithIds = volunteers?.map((volunteers) => ({
        ...volunteers,
        id: uuidv4(),
      }));
    }
  } catch (error) {
    //error);
  }
  let config = MentorConfig();

  return (
    <div className='primary-page'>
      <TableSearch
        searchTitleColor={Colors['color-orange']}
        config={config}
        data={mentors}
        title={'Mentors'}
        color={'orange'}
      /></div>
  )
}

export default page