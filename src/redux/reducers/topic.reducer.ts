import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import Topic from "../../Apis/Topic.api";
import { RootState } from "../store";
import { ILesson } from "./lesson.reducer";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";
import { INoti } from "./noti.reducer";
import { IQA } from "./QA.reducer";
import { ISubject } from "./subject.reducer";

export const createTopic = createAsyncThunk(
  "topic/createTopic",
  async (body: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Topic.createTopic(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Tạo chủ đề thành công");
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

export const getTopics = createAsyncThunk(
  "topic/getTopics",
  async ({ limit }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Topic.getTopics({ limit });
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

export const getTopic = createAsyncThunk(
  "topic/getTopic",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Topic.getTopic(id);
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

export const updateTopic = createAsyncThunk(
  "Topics/updateTopic",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Topic.updateTopic(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật chủ đề thành công");
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

export interface ITopic {
  id: string;
  key?: number;
  subjectId: ISubject;
  title: string;
  description: string;
  lesson: ILesson[];
  image: string;
  QA: IQA[];
  noti: INoti[];
  createdAt: string;
  updatedAt: string;
}

interface TopicState {
  listTopic: ITopic[];
}

const initialState: TopicState = {
  listTopic: [],
};

export const topicReducer = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTopic.fulfilled, (state, action) => {
      state.listTopic = action.payload;
    });
    builder.addCase(createTopic.rejected, (state) => {
      state.listTopic = [];
    });
    builder.addCase(getTopics.fulfilled, (state, action) => {
      state.listTopic = action.payload;
    });
    builder.addCase(getTopics.rejected, (state) => {
      state.listTopic = [];
    });
    builder.addCase(getTopic.fulfilled, (state, action) => {
      state.listTopic = action.payload;
    });
    builder.addCase(getTopic.rejected, (state) => {
      state.listTopic = [];
    });
    builder.addCase(updateTopic.fulfilled, (state, action) => {
      state.listTopic = action.payload;
    });
    builder.addCase(updateTopic.rejected, (state) => {
      state.listTopic = [];
    });
  },
});

const { reducer } = topicReducer;

export const listTopic = (state: RootState) => state.topic.listTopic;

export default reducer;
