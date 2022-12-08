import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message.reducer";
import { RootState } from "../store";
import { setLoading } from "./loading.reducer";
import { UserState } from "./user.reducer";
import { ISubject } from "./subject.reducer";
import Payment from "../../Apis/Payment.api";
import { message } from "antd";
import { IList } from "./interface";

export const createPayment = createAsyncThunk(
  "Payment/createPayment",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Payment.createPayment(body);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Tạo thanh toán thành công");
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

export const getPayments = createAsyncThunk(
  "Payment/getPayments",
  async ({ limit, user, subject, status }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Payment.getPayments({ limit, user, subject, status });
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

export const getPayment = createAsyncThunk(
  "Payment/getPayment",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Payment.getPayment(id);
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

export const updatePayment = createAsyncThunk(
  "user/updatePayment",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Payment.updatePayment(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Thanh toán thành công");
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

export interface IPayment {
  id: string;
  key?: string;
  feeCode: string;
  user: UserState;
  subject: ISubject;
  createdAt: string;
  updatedAt: string;
  status: number;
  cost: number;
}

interface IPaymentState {
  listPayment: IList;
}

const initialState: IPaymentState = {
  listPayment: {
    limit: 0,
    page: 0,
    results: [],
    totalPages: 0,
    totalResults: 0,
  },
};

export const PaymentReducer = createSlice({
  name: "Payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPayment.fulfilled, (state, action) => {
      state.listPayment = action.payload;
    });
    builder.addCase(createPayment.rejected, (state) => {
      state.listPayment = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getPayments.fulfilled, (state, action) => {
      state.listPayment = action.payload;
    });
    builder.addCase(getPayments.rejected, (state) => {
      state.listPayment = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(getPayment.fulfilled, (state, action) => {
      state.listPayment = action.payload;
    });
    builder.addCase(getPayment.rejected, (state) => {
      state.listPayment = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
    builder.addCase(updatePayment.fulfilled, (state, action) => {
      state.listPayment = action.payload;
    });
    builder.addCase(updatePayment.rejected, (state) => {
      state.listPayment = {
        limit: 0,
        page: 0,
        results: [],
        totalPages: 0,
        totalResults: 0,
      };
    });
  },
});

const { reducer } = PaymentReducer;

export const listPayment = (state: RootState) => state.payment.listPayment;

export default reducer;
