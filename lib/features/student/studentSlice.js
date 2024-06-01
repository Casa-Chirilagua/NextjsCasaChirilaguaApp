import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentService from './studentService';
import { generateAsyncReducerCases } from '../../functions/generateAsyncReducerCases';
import HandleMessage from '../../functions/HandleMessage';
const initialState = {
  list: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
/**
 * notes: Three fields get added automatically
 *         - register_Student.pending (request just started)
 *         - register_Student.fulfilled (request complete)
 *         - register_Student.rejected  (something went wrong)
 */
export const register_Student = createAsyncThunk(
  'student/register',
  async (student, thunkAPI) => {
    try {
      const response = await studentService.registerStudent(student);
      return response;
    } catch (error) {

      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Fetch a student by ID
 */
export const fetchStudentById = createAsyncThunk(
  'students/fetchById',
  async (id, thunkAPI) => {
    try {
      return await studentService.fetchStudentById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);


/**
 * Update the student by the ID
 */
export const updateStudentById = createAsyncThunk(
  'students/updateById',
  async (id, thunkAPI) => {
    try {
      return await studentService.updateStudentById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Delete the student by the ID
 */
export const deleteStudentById = createAsyncThunk(
  'students/deleteById',
  async (id, thunkAPI) => {
    try {
      return await studentService.deleteStudentById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Generate action creators and action types for the reducers and state
 */
export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    generateAsyncReducerCases(builder, fetchStudentById, 'student');
    builder
      .addCase(updateStudentById.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateStudentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state['student'] = action.payload.data;
      })
      .addCase(updateStudentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
    // generateAsyncReducerCases(builder, updateStudentById, 'student');
    generateAsyncReducerCases(builder, deleteStudentById, 'student');
    generateAsyncReducerCases(builder, register_Student, 'student');


  },
});

export const { reset } = studentSlice.actions;
export default studentSlice.reducer;
