import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import parentService from "./parentsService";
import { generateAsyncReducerCases } from "../../functions/generateAsyncReducerCases";
import HandleMessage from "../../functions/HandleMessage";

/**
 * Fetch Parents
 */
export const fetchParents = createAsyncThunk(
  "parents/fetch",
  async (thunkAPI) => {
    try {
      return await parentService.fetchParents();
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Fetch Parents and return only their names
 */
export const fetchParentsWithName = createAsyncThunk(
  "parentsWithName/fetch",
  async (thunkAPI) => {
    try {
      return await parentService.fetchParentsWithName();
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Fetch Parents by student ID
 */
export const fetchParentsByStudentId = createAsyncThunk(
  "parentsbyStudentId/fetch",
  async (studentId, thunkAPI) => {
    try {
      return await parentService.fetchParentsByStudentId(studentId);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

/**
 * Fetch Parents by family ID
 */
export const fetchParentsByFamilyId = createAsyncThunk(
  "parentsbyFamilyId/fetch",
  async (studentId, thunkAPI) => {
    try {
      return await parentService.fetchParentsByFamilyId(studentId);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


/**
 * Generate action creators and action types for the reducers and state
 */
export const parentsSlice = createSlice({
  name: "parents",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    generateAsyncReducerCases(builder, fetchParents, "parents");
    generateAsyncReducerCases(builder, fetchParentsByStudentId, "parents");
    generateAsyncReducerCases(builder, fetchParentsWithName, "parents");
    generateAsyncReducerCases(builder, fetchParentsByFamilyId, "parents");
  },
});

export const { reset } = parentsSlice.actions;
export default parentsSlice.reducer;
