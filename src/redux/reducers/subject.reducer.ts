import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import Subject from "../../Apis/Subject.api";
import { RootState } from "../store";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  async (body: ISubject, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Subject.createSubject(body);
      if (data) {
        thunkAPI.dispatch(setLoading(false));
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getSubjects = createAsyncThunk(
  "subject/getSubjects",
  async ({ limit, teacher }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Subject.getSubjects({ limit, teacher });
      if (data) {
        thunkAPI.dispatch(setLoading(false));
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const getSubject = createAsyncThunk(
  "subject/getSubject",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Subject.getSubject(id);
      if (data) {
        thunkAPI.dispatch(setLoading(false));
      }
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export interface ISubject {
  id: string;
  key?: number;
  subCode: string;
  subName: string;
  teacher: UserState;
  description: string;
  status: number;
  file: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface SubjectState {
  listSubject: ISubject[];
}

const initialState: SubjectState = {
  listSubject: [],
};

export const subjectReducer = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSubject.fulfilled, (state, action) => {
      state.listSubject = action.payload;
    });
    builder.addCase(createSubject.rejected, (state) => {
      state.listSubject = [];
    });
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.listSubject = action.payload;
    });
    builder.addCase(getSubjects.rejected, (state) => {
      state.listSubject = [];
    });
    builder.addCase(getSubject.fulfilled, (state, action) => {
      state.listSubject = action.payload;
    });
    builder.addCase(getSubject.rejected, (state) => {
      state.listSubject = [];
    });
  },
});

const { reducer } = subjectReducer;

export const listSubject = (state: RootState) => state.subject.listSubject;

export default reducer;
