import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { IBanks } from "./banks.reducer";
import { ISubject } from "./subject.reducer";
import Question from "../../Apis/Question.api";
import { message } from "antd";

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

export const getQuestions = createAsyncThunk(
  "Questions/getQuestions",
  async ({ limit, subjectGroup, subject, level }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Question.getQuestions({
        limit,
        subjectGroup,
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

export interface IQuestion {
  id: string;
  quesCode?: string;
  quesName: string;
  user?: UserState;
  answers: string[];
  correct: number[];
  correctEssay: string;
  bank?: IBanks;
  subject?: ISubject;
  quesType: number;
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
      state.listQuestion = action.payload;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.listQuestion = [];
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.listQuestion = action.payload;
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
  },
});

const { reducer } = questionReducer;

export default reducer;
