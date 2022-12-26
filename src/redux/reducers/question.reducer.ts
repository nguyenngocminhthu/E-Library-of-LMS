import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { IBanks } from "./banks.reducer";
import { ISubject } from "./subject.reducer";
import Question from "../../Apis/Question.api";
import { message } from "antd";
import { cloneDeep } from "lodash";

export const createQuestion = createAsyncThunk(
  "Question/createQuestion",
  async (body: IQuestion, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Question.createQuestion(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Tạo câu hỏi thành công");
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

export const createQuestions = createAsyncThunk(
  "Question/createQuestions",
  async (body: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Question.createQuestions(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Tạo câu hỏi thành công");
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

export const getQuestions = createAsyncThunk(
  "Questions/getQuestions",
  async ({ limit, subjectgroup, subject, level }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Question.getQuestions({
        limit,
        subjectgroup,
        subject,
        level,
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

export const getQuestion = createAsyncThunk(
  "Question/getQuestion",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Question.getQuestion(id);
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

export const updateQuestion = createAsyncThunk(
  "question/updateQuestion",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Question.updateQuestion(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else if (!payload.recentSubjectId) {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật câu hỏi thành công");
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

export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Question.deleteQuestion(id);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Xóa câu hỏi thành công");
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

export interface IQuestion {
  key?: number;
  id: string;
  _id: string;
  quesCode?: string;
  quesName: string;
  user?: UserState;
  answers: string[];
  correct: number[];
  correctEssay: string;
  bank?: IBanks;
  subject?: ISubject;
  quesType: number;
  examType: number;
  level: number;
  createdAt?: string;
  updatedAt?: string;
}

interface QuestionState {
  listQuestion: IQuestion[];
}

const initialState: QuestionState = {
  listQuestion: [],
};

export const questionReducer = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      if (action.payload.code) return state;
      const newState = cloneDeep(state);
      newState.listQuestion.unshift(action.payload);
      return newState;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.listQuestion = [];
    });
    builder.addCase(createQuestions.fulfilled, (state, action) => {
      if (action.payload.code) return state;
      const newState = cloneDeep(state);
      newState.listQuestion.unshift(...action.payload);
      return newState;
    });
    builder.addCase(createQuestions.rejected, (state, action) => {
      state.listQuestion = [];
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.listQuestion = action.payload.results;
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.listQuestion = [];
    });
    builder.addCase(getQuestion.fulfilled, (state, action) => {
      state.listQuestion = action.payload;
    });
    builder.addCase(getQuestion.rejected, (state, action) => {
      state.listQuestion = [];
    });
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      state.listQuestion = action.payload;
    });
    builder.addCase(updateQuestion.rejected, (state, action) => {
      state.listQuestion = [];
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.listQuestion = action.payload;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.listQuestion = [];
    });
  },
});

const { reducer } = questionReducer;

export default reducer;
