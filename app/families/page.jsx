'use client'

//React
import { useEffect, useState } from 'react';

//Redux
import { useSelector } from 'react-redux';

//Unique id
import { v4 as uuidv4 } from 'uuid';

//Components
import TableWithSearchBar from '@/components/tables/TableWithSearchBar';

//Data
import Colors from '@/data/Colors';

//Functions
import FamilyConfig from '@/functions/table configurations/FamilyConfig';

//Hooks
import { useThunk } from '@/lib/hooks/use-thunk';

//Services
import { fetchFamilies, searchFamilies } from '@/lib/features/families/familiesSlice';

//Next
import { useSearchParams } from 'next/navigation';

const page = () => {
  const searchParams = useSearchParams();

  const { families } = useSelector((state) => state.families);

  const [doFetchFamilies, isLoadingFamilies, loadingFamiliesError] =
    useThunk(fetchFamilies);

  const [doSearchFamilies, isLoadingSearchFamilies, loadingSearchFamiliesError] = useThunk(searchFamilies);

  //Handle Search 
  const [searchText, setSearchText] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (searchParams.get('search') || searchParams.get('is_active')) {
      console.log("here");
      doSearchFamilies(`search=${searchParams.get('search')}`);
    } else {
      doFetchFamilies();
    }
  }, [doFetchFamilies, doSearchFamilies, searchParams]);

  const config = FamilyConfig();

  const handleSearchTextChange = (val) => {
    setSearchText(val);
  };



  let content;
  if (isLoadingFamilies) {
    content = <div>Loading...</div>;
  }
  else if (loadingFamiliesError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <TableWithSearchBar
        searchTitleColor={Colors['color-purple-dark']}
        config={config}
        data={families?.families}
        totalRecords={families?.families?.length}
        title={'Families'}
        searchText={searchText}
        onSearchTextChange={handleSearchTextChange}
      />
    );
  }

  return (
    <div className='table-with-searchbar'>{content}</div>
  )
}

export default page