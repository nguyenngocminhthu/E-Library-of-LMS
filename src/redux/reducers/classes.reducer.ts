import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { RootState } from "../store";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { ISubject } from "./subject.reducer";
import Classes from "../../Apis/Classes.api";

export const createClass = createAsyncThunk(
  "classes/createClass",
  async (body: IClass, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Classes.createClass(body);
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

export const getClasses = createAsyncThunk(
  "classes/getClasses",
  async ({ limit, teacher, subject }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Classes.getClasses({ limit, teacher, subject });
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

export interface IClass {
  id: string;
  key?: number;
  classCode: string;
  className: string;
  teacher: UserState;
  student: UserState[];
  subject: ISubject;
  createdAt: string;
  updatedAt: string;
}

interface ClassState {
  listClass: IClass[];
}

const initialState: ClassState = {
  listClass: [],
};

export const classesReducer = createSlice({
  name: "classes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClass.fulfilled, (state, action) => {
      state.listClass = action.payload;
    });
    builder.addCase(createClass.rejected, (state) => {
      state.listClass = [];
    });
    builder.addCase(getClasses.fulfilled, (state, action) => {
      state.listClass = action.payload;
    });
    builder.addCase(getClasses.rejected, (state) => {
      state.listClass = [];
    });
  },
});

const { reducer } = classesReducer;

export const listClass = (state: RootState) => state.classes.listClass;

export default reducer;
