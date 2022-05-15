import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import Banks from "../../Apis/Banks.api";
import { setLoading } from "./loading.reducer";
import { ISubject } from "./subject.reducer";
import { UserState } from "./user.reducer";
import { IQuestion } from "./question.reducer";
import { ISubjectGroup } from "./subjectgroup.reducer";

export const getBanks = createAsyncThunk(
  "Banks/getBanks",
  async ({ limit, subjectGroup, subject, user }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Banks.getBanks({ limit, subjectGroup, subject, user });
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

export const getBank = createAsyncThunk(
  "Banks/getBank",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Banks.getBank(id);
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

export const updateBank = createAsyncThunk(
  "Banks/updateBank",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Banks.updateBank(id, payload);
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

export interface IBanks {
  id: string;
  key?: number;
  status: number;
  fileType: number;
  examName: string;
  subject: ISubject;
  subjectGroup: string;
  examType: number;
  user: UserState;
  question: IQuestion[];
  createdAt: string;
  updatedAt: string;
  time: number;
}

interface banksState {
  listBanks: IBanks[];
}

const initialState: banksState = {
  listBanks: [],
};

export const banksReducer = createSlice({
  name: "Banks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanks.fulfilled, (state, action) => {
      state.listBanks = action.payload;
    });
    builder.addCase(getBanks.rejected, (state, action) => {
      state.listBanks = [];
    });
    builder.addCase(getBank.fulfilled, (state, action) => {
      state.listBanks = action.payload;
    });
    builder.addCase(getBank.rejected, (state, action) => {
      state.listBanks = [];
    });
    builder.addCase(updateBank.fulfilled, (state, action) => {
      state.listBanks = action.payload;
    });
    builder.addCase(updateBank.rejected, (state, action) => {
      state.listBanks = [];
    });
  },
});

const { reducer } = banksReducer;

export default reducer;
