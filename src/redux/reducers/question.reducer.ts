import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { IBanks } from "./banks.reducer";
import { ISubject } from "./subject.reducer";
import Question from "../../Apis/Question.api";

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
  quesCode: string;
  quesName: string;
  user: UserState;
  answers: string[];
  correct: number[];
  bank: IBanks;
  subject: ISubject;
  quesType: number;
  level: number;
  createdAt: string;
  updatedAt: string;
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
