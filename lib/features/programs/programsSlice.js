import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import programService from './programsService';
import HandleMessage from '../functions/HandleMessage';

const initialState = {
  list: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};


/**
 * fetch all programs
 */
export const fetchPrograms = createAsyncThunk(
  'program/fetch',
  async (thunkAPI) => {
    try {
      return await programService.fetchPrograms();
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Fetch the programs the student is in
 */
export const fetchProgramsByStudentId = createAsyncThunk(
  'programsByStudentId/fetch',
  async (studentId, thunkAPI) => {
    try {
      return await programService.fetchProgramsByStudentId(studentId);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Generate action creators and action types for the reducers and state
 */
export const studentsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {

    /*
      Fetching programs by ID
    */
    builder
      .addCase(fetchProgramsByStudentId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchProgramsByStudentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.programs = action.payload;
      })
      .addCase(fetchProgramsByStudentId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

    /*
    Fetch all programs
    */
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.programs = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

  },
});

export const { addStudent, reset } = studentsSlice.actions;
export default studentsSlice.reducer;
