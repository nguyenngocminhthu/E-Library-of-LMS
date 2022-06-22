import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { RootState } from "../store";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { ISubject } from "./subject.reducer";
import Lesson from "../../Apis/Lesson.api";
import { IClass } from "./classes.reducer";
import { ITopic } from "./topic.reducer";
import { IQA } from "./QA.reducer";
import { message } from "antd";

export const createLesson = createAsyncThunk(
  "Lesson/createClass",
  async (body: IClass, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Lesson.createLesson(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Đăng tải bài giảng thành công");
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

export const getLessons = createAsyncThunk(
  "Lesson/getLessons",
  async ({ limit, user, subject }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Lesson.getLessons({ limit, user, subject });
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

export const getLesson = createAsyncThunk(
  "Lesson/getLesson",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Lesson.getLesson(id);
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

export const updateLesson = createAsyncThunk(
  "user/updateLesson",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Lesson.updateLesson(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật bài giảng thành công");
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

export interface ILesson {
  id: string;
  key?: number;
  classes: [];
  title: string;
  user: UserState;
  video: string;
  file: [];
  subject: ISubject;
  topic: ITopic;
  createdAt: string;
  updatedAt: string;
  status: number;
  QA: IQA[];
}

interface LessonState {
  listLesson: ILesson[];
}

const initialState: LessonState = {
  listLesson: [],
};

export const LessonReducer = createSlice({
  name: "Lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createLesson.fulfilled, (state, action) => {
      state.listLesson = action.payload;
    });
    builder.addCase(createLesson.rejected, (state) => {
      state.listLesson = [];
    });
    builder.addCase(getLessons.fulfilled, (state, action) => {
      state.listLesson = action.payload;
    });
    builder.addCase(getLessons.rejected, (state) => {
      state.listLesson = [];
    });
    builder.addCase(getLesson.fulfilled, (state, action) => {
      state.listLesson = action.payload;
    });
    builder.addCase(getLesson.rejected, (state) => {
      state.listLesson = [];
    });
    builder.addCase(updateLesson.fulfilled, (state, action) => {
      state.listLesson = action.payload;
    });
    builder.addCase(updateLesson.rejected, (state) => {
      state.listLesson = [];
    });
  },
});

const { reducer } = LessonReducer;

export const listLesson = (state: RootState) => state.lesson.listLesson;

export default reducer;
