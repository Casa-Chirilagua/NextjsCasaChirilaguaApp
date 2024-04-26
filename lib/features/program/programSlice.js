import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import programService from './programService';
import { generateAsyncReducerCases } from '../functions/generateAsyncReducerCases';
import HandleMessage from '../functions/HandleMessage';


const initialState = {
  list: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

/**
 * Register a program
 * 
 * notes: Three fields get added automatically
 *         - register_program.pending (request just started)
 *         - register_program.fulfilled (request complete)
 *         - register_program.rejected  (something went wrong)
 */
export const register_program = createAsyncThunk(
  'program/register',
  async (program, thunkAPI) => {
    try {
      return await programService.registerProgram(program);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);


/**
 * Fetch a program by the ID
 */
export const fetchProgramById = createAsyncThunk(
  'programs/fetch',
  async (id, thunkAPI) => {
    try {
      return await programService.fetchProgramById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);


/**
 * Update the program by the ID
 */
export const updateProgramById = createAsyncThunk(
  'program/update',
  async (data, thunkAPI) => {
    try {
      return await programService.updateProgramById(data);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Delete the program by the ID
 */
export const deleteProgramById = createAsyncThunk(
  'program/delete',
  async (data, thunkAPI) => {
    try {
      return await programService.deleteProgramById(data);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);


/**
 * Generate action creators and action types for the reducers and state
 */
export const programsSlice = createSlice({
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
    generateAsyncReducerCases(builder, fetchProgramById, 'program');
    generateAsyncReducerCases(builder, updateProgramById, 'program');
    generateAsyncReducerCases(builder, deleteProgramById, 'program');
    generateAsyncReducerCases(builder, register_program, 'program');
  },
});

export const { addStudent, reset } = programsSlice.actions;
export default programsSlice.reducer;
