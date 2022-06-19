import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { RootState } from "../store";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { ISubject } from "./subject.reducer";
import File from "../../Apis/File.api";
import { IClass } from "./classes.reducer";
import { ITopic } from "./topic.reducer";

export const createFile = createAsyncThunk(
  "File/createClass",
  async (body: IClass, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await File.createFile(body);
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

export const getFiles = createAsyncThunk(
  "File/getFiles",
  async ({ limit, user, subject }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await File.getFiles({ limit, user, subject });
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

export const getFile = createAsyncThunk(
  "File/getFile",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await File.getFile(id);
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

export const updateFile = createAsyncThunk(
  "user/updateFile",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await File.updateFile(id, payload);
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

export interface IFile {
  id: string;
  key?: number;
  classes: [];
  fileName: string;
  user: UserState;
  file: [];
  subject: ISubject;
  createdAt: string;
  updatedAt: string;
  status: number;
}

interface FileState {
  listFile: IFile[];
}

const initialState: FileState = {
  listFile: [],
};

export const fileReducer = createSlice({
  name: "File",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createFile.fulfilled, (state, action) => {
      state.listFile = action.payload;
    });
    builder.addCase(createFile.rejected, (state) => {
      state.listFile = [];
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.listFile = action.payload;
    });
    builder.addCase(getFiles.rejected, (state) => {
      state.listFile = [];
    });
    builder.addCase(getFile.fulfilled, (state, action) => {
      state.listFile = action.payload;
    });
    builder.addCase(getFile.rejected, (state) => {
      state.listFile = [];
    });
    builder.addCase(updateFile.fulfilled, (state, action) => {
      state.listFile = action.payload;
    });
    builder.addCase(updateFile.rejected, (state) => {
      state.listFile = [];
    });
  },
});

const { reducer } = fileReducer;

export const listFile = (state: RootState) => state.file.listFile;

export default reducer;
