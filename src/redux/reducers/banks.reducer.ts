import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import Banks from "../../Apis/Banks.api";
import { setLoading } from "./loading.reducer";
import { ISubject } from "./subject.reducer";
import { UserState } from "./user.reducer";
import { IQuestion } from "./question.reducer";
import { message } from "antd";
import { RootState } from "../store";
import { IList } from "./interface";

export const createBank = createAsyncThunk(
  "Banks/createBank",
  async (body: IQuestion, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Banks.createBank(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Tạo đề thi thành công");
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

export const getBanks = createAsyncThunk(
  "Banks/getBanks",
  async (
    { limit, subjectGroup, subject, user, status, sortBy }: any,
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Banks.getBanks({
        limit,
        subjectGroup,
        subject,
        user,
        status,
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
      console.debug(payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else if (payload.submissions) {
        thunkAPI.dispatch(setLoading(false));
        message.success("Nộp bài thành công");
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật đề thi thành công");
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

export const deleteBank = createAsyncThunk(
  "banks/deleteBank",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Banks.deleteBank(id);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Xóa đề thi thành công");
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
  user: UserState;
  questions: IQuestion[];
  question: IQuestion[];
  submissions: any[];
  createdAt: string;
  updatedAt: string;
  time: number;
  releaseTime: string;
  isFinal: boolean;
}

interface banksState {
  listBanks: IList;
}

const initialState: banksState = {
  listBanks: {
    limit: 0,
    page: 0,
    results: [],
    totalPages: 0,
    totalResults: 0,
  },
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
      state.listBanks = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getBank.fulfilled, (state, action) => {
      state.listBanks = action.payload;
    });
    builder.addCase(getBank.rejected, (state, action) => {
      state.listBanks = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(updateBank.fulfilled, (state, action) => {
      state.listBanks = action.payload;
    });
    builder.addCase(updateBank.rejected, (state, action) => {
      state.listBanks = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(createBank.fulfilled, (state, action) => {
      state.listBanks = action.payload;
    });
    builder.addCase(createBank.rejected, (state, action) => {
      state.listBanks = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(deleteBank.fulfilled, (state, action) => {
      state.listBanks = action.payload;
    });
    builder.addCase(deleteBank.rejected, (state, action) => {
      state.listBanks = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
  },
});

export const listBank = (state: RootState) => state.bank.listBanks.results;
export const totalBank = (state: RootState) =>
  state.bank.listBanks.totalResults;

const { reducer } = banksReducer;

export default reducer;
