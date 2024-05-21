import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileImageService from './profileImageService';
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
 * Update the profile image by the ID
 */
export const updateProfileImageById = createAsyncThunk(
  'profileImage/update',
  async (data, thunkAPI) => {
    try {
      //data);
      return await profileImageService.updateProfileImageById(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const profileImage = createSlice({
  name: 'profileImage',
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
    generateAsyncReducerCases(builder, updateProfileImageById, 'profileImage');
  },
});

export const { reset } = profileImage.actions;

export default profileImage.reducer;
