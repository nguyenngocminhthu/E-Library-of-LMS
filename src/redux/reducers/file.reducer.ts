import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { RootState } from "../store";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { ISubject } from "./subject.reducer";
import File from "../../Apis/File.api";
import { IClass } from "./classes.reducer";
import { message } from "antd";
import { IList } from "./interface";

export const createFile = createAsyncThunk(
  "File/createClass",
  async (body: IClass, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await File.createFile(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Đăng tải tài nguyên thành công");
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
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật tài nguyên thành công");
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
  key?: string;
  classes: [];
  fileName: string;
  user: UserState;
  file: [];
  subject: ISubject;
  createdAt: string;
  updatedAt: string;
  status: number;
  url: string;
}

interface FileState {
  listFile: IList;
}

const initialState: FileState = {
  listFile: {
    limit: 0,
    page: 0,
    results: [],
    totalPages: 0,
    totalResults: 0,
  },
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
      state.listFile = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.listFile = action.payload;
    });
    builder.addCase(getFiles.rejected, (state) => {
      state.listFile = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getFile.fulfilled, (state, action) => {
      state.listFile = action.payload;
    });
    builder.addCase(getFile.rejected, (state) => {
      state.listFile = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(updateFile.fulfilled, (state, action) => {
      state.listFile = action.payload;
    });
    builder.addCase(updateFile.rejected, (state) => {
      state.listFile = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
  },
});

const { reducer } = fileReducer;

export const listFile = (state: RootState) => state.file.listFile;

export const totalFile = (state: RootState) => state.file.listFile.totalResults;


export default reducer;
