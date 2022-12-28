import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import Submissions from "../../Apis/Submission.api";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { message } from "antd";
import { RootState } from "../store";
import { IList } from "./interface";
import { IBanks } from "./banks.reducer";
import { IAns } from "../../Views/Student/Subject/ExamDetails";

export const createSubmission = createAsyncThunk(
  "Submissions/createSubmission",
  async (body: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Submissions.createSubmission(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Nộp bài thành công");
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

export const getSubmissions = createAsyncThunk(
  "Submissions/getSubmissions",
  async (
    { limit, bank, sortBy, user }: any,
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Submissions.getSubmissions({
        limit,
        bank,
        sortBy,
        user,
      });
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

export const getSubmission = createAsyncThunk(
  "Submissions/getSubmission",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Submissions.getSubmission(id);
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

export const updateSubmission = createAsyncThunk(
  "Submissions/updateSubmission",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Submissions.updateSubmission(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật bài nộp thành công");
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

export const deleteSubmission = createAsyncThunk(
  "Submissions/deleteSubmission",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Submissions.deleteSubmission(id);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Xóa bài nộp thành công");
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

export interface ISubmissions {
  id: string;
  key?: number;
  submit: IAns[];
  correctNum: number;
  score: number;
  user: UserState;
  bank: IBanks;
  createdAt: string;
  updatedAt: string;
}

interface SubmissionsState {
  listSubmissions: IList;
}

const initialState: SubmissionsState = {
  listSubmissions: {
    limit: 0,
    page: 0,
    results: [],
    totalPages: 0,
    totalResults: 0,
  },
};

export const SubmissionsReducer = createSlice({
  name: "Submissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubmissions.fulfilled, (state, action) => {
      state.listSubmissions = action.payload;
    });
    builder.addCase(getSubmissions.rejected, (state, action) => {
      state.listSubmissions = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getSubmission.fulfilled, (state, action) => {
      state.listSubmissions = action.payload;
    });
    builder.addCase(getSubmission.rejected, (state, action) => {
      state.listSubmissions = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(updateSubmission.fulfilled, (state, action) => {
      state.listSubmissions = action.payload;
    });
    builder.addCase(updateSubmission.rejected, (state, action) => {
      state.listSubmissions = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(createSubmission.fulfilled, (state, action) => {
      state.listSubmissions = action.payload;
    });
    builder.addCase(createSubmission.rejected, (state, action) => {
      state.listSubmissions = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(deleteSubmission.fulfilled, (state, action) => {
      state.listSubmissions = action.payload;
    });
    builder.addCase(deleteSubmission.rejected, (state, action) => {
      state.listSubmissions = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
  },
});

export const listSubmission = (state: RootState) => state.submission.listSubmissions.results;
export const totalSubmission = (state: RootState) =>
  state.submission.listSubmissions.totalResults;

const { reducer } = SubmissionsReducer;

export default reducer;
