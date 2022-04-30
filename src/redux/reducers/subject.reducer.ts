import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import Subject from "../../Apis/Subject.api";
import { RootState } from "../store";
import { setLoading } from "./loading.reducer";

export const getSubjects = createAsyncThunk(
  "subject/getSubjects",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Subject.getSubjects();
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
  subCode: string;
  subName: string;
  teacher: string;
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
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.listSubject = action.payload;
    });
    builder.addCase(getSubjects.rejected, (state, action) => {
      state.listSubject = [];
    });
  },
});

const { reducer } = subjectReducer;

export const listSubject = (state: RootState) => state.subject.listSubject;

export default reducer;
