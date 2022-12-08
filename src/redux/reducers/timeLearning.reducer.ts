import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { cloneDeep } from "lodash";
import TimeLearning from "../../Apis/TimeLearning.api";
import { RootState } from "../store";
import { IList } from "./interface";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";

export const createTimeLearning = createAsyncThunk(
  "time-learning/createTimeLearning",
  async (body: ITimeLearning, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await TimeLearning.createTimeLearning(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        // message.success("Tạo thời gian học thành công");
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

export const updateTimeLearning = createAsyncThunk(
  "time-learning/updateTimeLearning",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await TimeLearning.updateTimeLearning(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        // message.success("Cập nhật thời gian học thành công");
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

export const updateTimeLearningByStudentAndSubject = createAsyncThunk(
  "time-learning/updateTimeLearningByStudentAndSubject",
  async ({ param, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await TimeLearning.updateTimeLearningByStudentAndSubject(param, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        // message.success("Cập nhật thời gian học thành công");
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

export const getTimeLearnings = createAsyncThunk(
  "time-learning/getTimeLearnings",
  async ({ limit, student, subject, sortBy }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await TimeLearning.getTimeLearnings({
        limit,
        student,
        subject,
        sortBy,
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

export const getTimeLearning = createAsyncThunk(
  "time-learning/getTimeLearning",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await TimeLearning.getTimeLearning(id);
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

export interface ITimeLearning {
  id: string;
  student: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

interface TimeLearningState {
  listTimeLearning: IList;
}

const initialState: TimeLearningState = {
  listTimeLearning: {
    limit: 0,
    page: 0,
    results: [],
    totalPages: 0,
    totalResults: 0,
  },
};

export const timeLearningReducer = createSlice({
  name: "timeLearning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTimeLearning.fulfilled, (state, action) => {
      if (action.payload.code) return state;
      const newState = cloneDeep(state);
      newState.listTimeLearning.results.unshift(action.payload);
      return newState;
    });
    builder.addCase(createTimeLearning.rejected, (state) => {
      state.listTimeLearning = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getTimeLearnings.fulfilled, (state, action) => {
      state.listTimeLearning = action.payload;
    });
    builder.addCase(getTimeLearnings.rejected, (state) => {
      state.listTimeLearning = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getTimeLearning.fulfilled, (state, action) => {
      state.listTimeLearning = action.payload;
    });
    builder.addCase(getTimeLearning.rejected, (state) => {
      state.listTimeLearning = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(updateTimeLearning.fulfilled, (state, action) => {
      if (action.payload.code) return state;
      const newState = cloneDeep(state);
      const oldIndex = newState.listTimeLearning.results.findIndex((item: any) => {
        return item.id === action.payload.id;
      });
      newState.listTimeLearning.results.splice(oldIndex, 1, action.payload);
      return newState;
    });
    builder.addCase(updateTimeLearning.rejected, (state, action) => {
      return state;
    });
    builder.addCase(updateTimeLearningByStudentAndSubject.fulfilled, (state, action) => {
      if (action.payload.code) return state;
      const newState = cloneDeep(state);
      const oldIndex = newState.listTimeLearning.results.findIndex((item: any) => {
        return item.id === action.payload.id;
      });
      newState.listTimeLearning.results.splice(oldIndex, 1, action.payload);
      return newState;
    });
    builder.addCase(updateTimeLearningByStudentAndSubject.rejected, (state, action) => {
      return state;
    });
  },
});

const { reducer } = timeLearningReducer;

export const listTimeLearning = (state: RootState) => state.timeLearning.listTimeLearning;

export const totalTimeLearning = (state: RootState) =>
  state.timeLearning.listTimeLearning.totalResults;

export default reducer;
