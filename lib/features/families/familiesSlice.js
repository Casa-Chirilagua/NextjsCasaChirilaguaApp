import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import familiesService from './familiesService';
import { generateAsyncReducerCases } from '../../functions/generateAsyncReducerCases';
import HandleMessage from '../../functions/HandleMessage';


const initialState = {
  list: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

/**
 * Fetch all families
 */
export const fetchFamilies = createAsyncThunk(
  'families/fetch',
  async (thunkAPI) => {
    try {
      return await familiesService.fetchFamilies();
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Generate action creators and action types for the reducers and state
 */
export const familiesSlice = createSlice({
  name: 'families',
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

    builder
      .addCase(fetchFamilies.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchFamilies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.families = action.payload;
      })
      .addCase(fetchFamilies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const { addFamily, reset } = familiesSlice.actions;
export default familiesSlice.reducer;
