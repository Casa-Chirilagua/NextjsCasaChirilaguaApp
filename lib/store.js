import { configureStore } from "@reduxjs/toolkit";
// import authReducer from 'features/auth/authSlice';
import parentReducer from "./features/parent/parentSlice";
import parentsReducer from "./features/parents/parentsSlice";
import studentsReducer from "./features/students/studentsSlice";
import studentReducer from "./features/student/studentSlice";
import familiesReducer from "./features/families/familiesSlice";
import programsReducer from "./features/programs/programsSlice";
import familyReducer from "./features/family/familySlice";
import programReducer from "./features/program/programSlice";
import profileImageReducer from "./features/profile image/profileImageSlice";

/**
 * Redux store
 *
 * - Keeps track of the state of the entire application
 *
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
        // auth: authReducer,
        student: studentReducer,
        students: studentsReducer,
        parent: parentReducer,
        parents: parentsReducer,
        family: familyReducer,
        families: familiesReducer,
        programs: programsReducer,
        program: programReducer,
        profileImage: profileImageReducer,
      },
  });
};
