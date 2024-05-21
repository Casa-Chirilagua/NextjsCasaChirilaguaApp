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
import ProgramConfig from '@/functions/table configurations/ProgramConfig';

//Hooks
import { useThunk } from '@/lib/hooks/use-thunk';

//Services
import { fetchPrograms } from '@/lib/features/programs/programsSlice';


const page = () => {

  const { programs } = useSelector((state) => state.programs);

  //Fetch Programs
  const [doFetchPrograms, isLoadingPrograms, loadingProgramError] =
    useThunk(fetchPrograms);

  let programsWithIds;

  try {
    if (programs) {
      programsWithIds = programs?.map((programs) => ({
        ...programs,
        id: uuidv4(),
      }));
    }
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    doFetchPrograms();
  }, [doFetchPrograms]);

  const config = ProgramConfig();

  let content;
  if (isLoadingPrograms) {
    content = <div>Loading...</div>;
  }
  else if (loadingProgramError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <TableSearch
        searchTitleColor={Colors['color-green']}
        config={config}
        data={programs}
        title={'Programs'}
        color={'green'}
      />
    );
  }

  return (
    <div className='table-with-searchbar'>{content}</div>
  )
}

export default page