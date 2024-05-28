import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import familyService from './familyService';
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
 * Register a family
 */
export const registerFamily = createAsyncThunk(
  'family/register',
  async (family, thunkAPI) => {
    try {
      return await familyService.registerFamily(family);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Fetch a family by id
 */
export const fetchFamilyById = createAsyncThunk(
  'families/fetchById',
  async (id, thunkAPI) => {
    try {
      return await familyService.fetchFamilyById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Update Family by id
 */
export const updateFamilyById = createAsyncThunk(
  'family/update',
  async (data, thunkAPI) => {
    try {
      return await familyService.updateFamilyById(data);
    } catch (error) {
      const message = HandleMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  },
);


/**
 * Delete Family by id
 */
export const deleteFamilyById = createAsyncThunk(
  'family/delete',
  async (id, thunkAPI) => {
    try {
      return await familyService.deleteFamilyById(id);
    } catch (error) {
      const message = HandleMessage(error);

      return thunkAPI.rejectWithValue(message);
    }
  },
);


export const familySlice = createSlice({
  name: 'family',
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
    generateAsyncReducerCases(builder, registerFamily, 'family');
    generateAsyncReducerCases(builder, fetchFamilyById, 'family');
    generateAsyncReducerCases(builder, updateFamilyById, 'family');
    generateAsyncReducerCases(builder, deleteFamilyById, 'family');

  },
});

export const { reset } = familySlice.actions;
export default familySlice.reducer;
