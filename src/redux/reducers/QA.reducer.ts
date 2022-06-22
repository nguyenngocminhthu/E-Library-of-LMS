import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import QA from "../../Apis/QA.api";
import { RootState } from "../store";
import { ILesson } from "./lesson.reducer";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";
import { UserState } from "./user.reducer";

export const getQAs = createAsyncThunk(
  "QA/getQAs",
  async ({ limit, role }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await QA.getQAs({ limit, role });
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

export const getQA = createAsyncThunk(
  "QA/getQA",
  async (id: string, thunkAPI) => {
    try {
      const data = await QA.getQA(id);
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

export const updateQA = createAsyncThunk(
  "QA/updateQA",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await QA.updateQA(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật QA thành công");
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

export const createQA = createAsyncThunk(
  "QA/createQA",
  async (payload: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await QA.createQA(payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Tạo QA thành công");
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

export const deleteQA = createAsyncThunk(
  "QA/deleteQA",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await QA.deleteQA(id);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Xóa QA thành công");
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

// Define a type for the slice state
export interface IQA {
  id: string;
  key?: number;
  title: string;
  content: string;
  lesson: ILesson;
  user: UserState;
  likes: string[];
  answers: [];
  createdAt: Date;
  updatedAt: Date;
}

interface QAState {
  listQA: IQA[];
}

// Define the initial state using that type
const initialState: QAState = {
  listQA: [],
};

export const QAReducer = createSlice({
  name: "QA",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateQA.fulfilled, (state, action) => {
      state.listQA = action.payload;
    });
    builder.addCase(updateQA.rejected, (state, action) => {
      state.listQA = [];
    });
    builder.addCase(getQAs.fulfilled, (state, action) => {
      state.listQA = action.payload;
    });
    builder.addCase(getQAs.rejected, (state, action) => {
      state.listQA = [];
    });
    builder.addCase(createQA.fulfilled, (state, action) => {
      state.listQA = action.payload;
    });
    builder.addCase(createQA.rejected, (state, action) => {
      state.listQA = [];
    });
    builder.addCase(deleteQA.fulfilled, (state, action) => {
      state.listQA = action.payload;
    });
    builder.addCase(deleteQA.rejected, (state, action) => {
      state.listQA = [];
    });
    builder.addCase(getQA.fulfilled, (state, action) => {
      state.listQA = action.payload;
    });
    builder.addCase(getQA.rejected, (state, action) => {
      state.listQA = [];
    });
  },
});

export const listQA = (state: RootState) => state.QA.listQA;

const { reducer } = QAReducer;

export default reducer;
