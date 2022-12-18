import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Realtime from "../../Apis/Realtime.api";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";

export const getRealtime = createAsyncThunk(
  "Realtime/get",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Realtime.get();
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

export const join = createAsyncThunk(
  "Realtime/join",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Realtime.join({ id });
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

export const out = createAsyncThunk(
  "Realtime/out",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Realtime.out({ id });
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

const initialState: any = {
  listUser: [],
  statistical: {},
};

export const realtimeReducer = createSlice({
  name: "Realtime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRealtime.fulfilled, (state, action) => {
      const newState = { isConnected: action.payload }
      return newState;
    });
    builder.addCase(getRealtime.rejected, (state) => {
      state.isConnected = false;
    });
    builder.addCase(join.fulfilled, (state, action) => {
      const newState = { isConnected: action.payload }
      return newState;
    });
    builder.addCase(join.rejected, (state) => {
      state.isConnected = false;
    });
    builder.addCase(out.fulfilled, (state, action) => {
      const newState = { isConnected: action.payload }
      return newState;
    });
    builder.addCase(out.rejected, (state) => {
      state.isConnected = false;
    });
  },
});

const { reducer } = realtimeReducer;

export default reducer;
