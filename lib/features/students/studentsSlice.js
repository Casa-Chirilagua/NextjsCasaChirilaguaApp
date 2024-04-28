import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import studentsService from './studentsService';
import HandleMessage from '../../functions/HandleMessage';

//functions
const initialState = {
  list: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};


/**
 * Fetch all of the students
 */
export const fetchStudents = createAsyncThunk(
  'students/fetch',
  async (token, thunkAPI) => {
    try {
      const data = await studentsService.fetchStudents();
      return data;
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Fetch all of the students and return their names
 */
export const fetchStudentsWithName = createAsyncThunk(
  'studentsWithName/fetch',
  async (thunkAPI) => {
    try {
      return await studentsService.fetchStudentsWithName();
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Fetch all of the students by program id
 */
export const fetchStudentsByProgramId = createAsyncThunk(
  'studentsByProgramId/fetch',
  async (programId, thunkAPI) => {
    try {
      return await studentsService.fetchStudentsByProgramId(programId);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Fetch all of the students by family id
 */
export const fetchStudentsByFamilyId = createAsyncThunk(
  'studentsByFamilyId/fetch',
  async (familyId, thunkAPI) => {
    try {
      return await studentsService.fetchStudentsByFamilyId(familyId);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

/**
 * Fetch all of the students by parent id
 */
export const fetchStudentsByParentId = createAsyncThunk(
  'studentsByParentId/fetch',
  async (parentId, thunkAPI) => {
    try {
      return await studentsService.fetchStudentsByParentId(parentId);
    } catch (error) {
      const message = HandleMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const studentsSlice = createSlice({
  name: 'students',
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
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

    builder
      .addCase(fetchStudentsByProgramId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchStudentsByProgramId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByProgramId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

    builder
      .addCase(fetchStudentsByFamilyId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchStudentsByFamilyId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByFamilyId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

    builder
      .addCase(fetchStudentsByParentId.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchStudentsByParentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(fetchStudentsByParentId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });

    builder
      .addCase(fetchStudentsWithName.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchStudentsWithName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(fetchStudentsWithName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export const { addStudent, reset } = studentsSlice.actions;
export default studentsSlice.reducer;
