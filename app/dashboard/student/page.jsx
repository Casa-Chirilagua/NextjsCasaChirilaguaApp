'use client'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Components
// import GridCardsSkeleton from '@/components/skeletons/GridCardsSkeleton';
import LineGraphCard from '@/components/dashboard_components/LineGraphCard';
import PieChartCard from '@/components/dashboard_components/PieChartCard';
import DashboardTable from '@/components/tables/DashboardTable';
import NumberCard from '@/components/dashboard_components/NumberCard';

//Icons
import { MdOutlineLunchDining } from 'react-icons/md';

//Data
import Colors from '@/data/Colors';
import MainNavigationItems from '@/data/MainNavigationItems';

//Services
import { fetchFamilies } from '@/lib/features/families/familiesSlice';
import { fetchParents } from '@/lib/features/parents/parentsSlice';
import { fetchPrograms } from '@/lib/features/programs/programsSlice';
import { fetchStudents } from '@/lib/features/students/studentsSlice';

//thunk
import { useThunk } from '@/lib/hooks/use-thunk';

function StudentDash() {
  const { students } = useSelector((state) => state.students);
  const { programs } = useSelector((state) => state.programs);
  const { families } = useSelector((state) => state.families);
  const { parents } = useSelector((state) => state.parents);

  //Fetch Programs
  const [doFetchPrograms, isLoadingPrograms, loadingProgramError] =
    useThunk(fetchPrograms);

  //Fetch Families
  const [doFetchFamilies, isLoadingFamilies, loadingFamiliesError] =
    useThunk(fetchFamilies);

  //Fetch Students
  const [doFetchStudents, isLoadingStudents, loadingStudentError] =
    useThunk(fetchStudents);

  //Fetch Parents
  const [doFetchParents, isLoadingParents, loadingParentsError] =
    useThunk(fetchParents);

  useEffect(() => {
    doFetchStudents({page:1});
    doFetchParents({ page: 1});
    doFetchPrograms();
    doFetchFamilies();
    console.log('fetching data');
  }, [doFetchParents, doFetchPrograms, doFetchStudents, doFetchFamilies]);

  // if (!students) {
  //   return <div>Loading...</div>;
  // }
  let studentsWithIds;
  let percentage;
  let programWithIds;
  try {
    studentsWithIds = students?.students?.map((students) => ({
      ...students,
      id: uuidv4(),
    }));

    programWithIds = programs?.map((item) => ({
      ...item,
      id: uuidv4(),
      number_of_students: item.students.length,
    }));

    let totalStudents = students.total;
    let freeReducedStudents = students?.students?.filter(
      (student) => student.free_and_reduced_lunch,
    ).length;
    percentage = (freeReducedStudents / totalStudents) * 100;
  } catch (error) {
    console.log(error);
  }

  // const programData = GenerateProgramData(programs);
  const COLORS = [Colors['color-green'], '#D0F0C0', '#00853E', '#71BC78'];

  let content;
  if (
    loadingFamiliesError ||
    loadingParentsError ||
    loadingProgramError ||
    loadingStudentError
  ) {
    console.log("loadingFamiliesError", loadingFamiliesError);
    console.log("loadingParentsError", loadingParentsError);
    console.log("loadingProgramError", loadingProgramError);
    console.log("isLoadingStudents", loadingStudentError);
    content = <div>Error fetching data...</div>;
  } else {
    content = (
      <>
        <div className="dashboard-page-header"><h1>Student Dashboard</h1><div className="dashboard-subheading">Welcome to the student Dashboard</div></div>
        <NumberCard
          labelColor={'black'}
          numberColor={'black'}
          backgroundColor={'white'}
          name={'Students Enrolled'}
          number={students?.total}
          icon={MainNavigationItems.students.icon}
          linkLabel={'Students table'}
          urlLink={'/students/table'}
        />
        <NumberCard
          labelColor={'white'}
          numberColor={'white'}
          backgroundColor={Colors['color-saleforce-dash-blue']}
          col="3"
          name={'Free/Reduced Lunch'}
          number={Math.round(percentage) + '%'}
          icon={<MdOutlineLunchDining />}
        />
        <NumberCard
          labelColor={'white'}
          numberColor={'white'}
          backgroundColor={Colors['color-green']}
          col="3"
          name={'Active Parents'}
          number={parents?.total? parents.total : 0}
          linkLabel={'Parent table'}
          urlLink={'/parents'}
          icon={MainNavigationItems.parents.icon}
          classN="item--6"
        />
        <PieChartCard
          labelName={'Programs'}
          data={programWithIds}
          bgColor={'white'}
          textColor={'black'}
          dataKey={'number_of_students'}
          color={Colors['color-green']}
          linkLabel={'Program table'}
          urlLink={'/programs'}
          colors={COLORS}
        />
        <LineGraphCard
          label={'Enrollment Over Time'}
          data={students?.students ? students.students : []}
          lineKey={'enrollment_date'}
          bgColor={'blue'}
          labelColor={'black'}
        />
        <NumberCard
          labelColor={'black'}
          numberColor={'black'}
          backgroundColor={'white'}
          col="3"
          name={'Active Families'}
          linkLabel={'Families table'}
          urlLink={'/families'}
          number={families?.length}
          icon={MainNavigationItems.families.icon}
          classN="item--7"
        />
      </>
    );
  }

  return <div className="dash-container">{content}</div>;
}

export default StudentDash;
