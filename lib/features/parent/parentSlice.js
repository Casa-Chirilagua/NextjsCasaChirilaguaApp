import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import parentService from './parentService';
import { toast } from 'react-toastify';
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
 * Register a parent
 */
export const register_parent = createAsyncThunk(
  'parent/register',
  async (parent, thunkAPI) => {
    try {
      return await parentService.registerParent(parent);
    } catch (error) {
      const response = error.response.data;
      if (response.code === 11000 && response.keyPattern.name) {
        toast.error(`The name ${response.keyValue.name} already exists`);
        return thunkAPI.rejectWithValue(
          `The name ${response.keyValue.name} already exists`,
        );
      }
      if (response.code === 11000 && response.keyPattern.email) {
        toast.error(`The name ${response.keyValue.name} already exists`);
        return thunkAPI.rejectWithValue(
          `The email ${response.keyValue.email} already exists`,
        );
      }
      toast.error('An error occurred while registering the student');
      return thunkAPI.rejectWithValue(
        'An error occurred while registering the student',
      );
    }
  },
);


/**
 * Fetch the parent by the ID
 */
export const fetchParentById = createAsyncThunk(
  'parents/fetchById',
  async (id, thunkAPI) => {
    try {
      return await parentService.fetchParentById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);


/**
 * Fetch the Parent Profile Image by ID
 */
export const fetchParentProfileById = createAsyncThunk(
  'parents/fetchParentProfileById',
  async (id, thunkAPI) => {
    try {
      return await parentService.fetchParentProfileImageById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Update the parent by ID
 */
export const updateParentById = createAsyncThunk(
  'parent/update',
  async (data, thunkAPI) => {
    try {
      return await parentService.updateParentById(data);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Delete the parent by ID
 */
export const deleteParentById = createAsyncThunk(
  'parent/delete',
  async (id, thunkAPI) => {
    try {
      return await parentService.deleteParentById(id);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Generate action creators and action types for the reducers and state
 */
export const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    generateAsyncReducerCases(builder, register_parent, 'parent');
    generateAsyncReducerCases(builder, fetchParentById, 'parent');
    generateAsyncReducerCases(builder, updateParentById, 'parent');
    generateAsyncReducerCases(builder, deleteParentById, 'parent');
  },
});

export const { addParent, reset } = parentSlice.actions;
export default parentSlice.reducer;
