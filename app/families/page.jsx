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
import FamilyConfig from '@/functions/table configurations/FamilyConfig';

//Hooks
import { useThunk } from '@/lib/hooks/use-thunk';

//Services
import { fetchFamilies } from '@/lib/features/families/familiesSlice';

const page = () => {

  const { families } = useSelector((state) => state.families);

  const [doFetchFamilies, isLoadingFamilies, loadingFamiliesError] =
    useThunk(fetchFamilies);

  useEffect(() => {
    doFetchFamilies();
  }, [doFetchFamilies]);

  try {
    if (families !== null || families !== undefined) {
      // console.log(typeof families);
      families?.map((families) => ({
        ...families,
        id: uuidv4(),
      }));
    }
  } catch (error) {
    console.log(error);
  }

  const config = FamilyConfig();
  let content;

  if (loadingFamiliesError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <TableSearch
        searchTitleColor={Colors['color-purple-dark']}
        config={config}
        data={families}
        title={'Families'}
      />
    );
  }

  return (
    <div className='table-with-searchbar'>{content}</div>
  )
}

export default page