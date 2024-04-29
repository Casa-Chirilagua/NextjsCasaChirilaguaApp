'use client'

//React 
import { useEffect } from 'react';

//Id
import { v4 as uuidv4 } from 'uuid';

//Components
import TableSearch from '@/components/tables/TableSearch';

//Data
import Colors from '@/data/Colors';

//Redux
import { useSelector } from 'react-redux';

//Functions
import ParentConfig from '@/functions/table configurations/ParentConfig';

//Hooks
import { useThunk } from '@/lib/hooks/use-thunk';

//Services
import {fetchParents} from '@/lib/features/parents/parentsSlice';



const page = () => {
  const { parents } = useSelector((state) => state.parents);
  const [doFetchParents, isLoadingParents, loadingParentsError] =
    useThunk(fetchParents);

  useEffect(() => {
    doFetchParents();
  }, [doFetchParents]);

  const config = ParentConfig();// Table configuration
  let content;

  if (loadingParentsError) {
    content = <div>Error fetching data...</div>;
  }
  else {
    content = (
      <TableSearch
        searchTitleColor={Colors['color-light-green']}
        color={'light-green'}
        config={config}
        data={parents}
        title={'Parents'}
      />
    );
  }
  return (
    <div className='table-with-searchbar'>{content}</div>
  )
}

export default page