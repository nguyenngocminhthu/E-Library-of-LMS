import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Socket from "../../Apis/Socket.api";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";

export const getSocket = createAsyncThunk(
  "Socket/get",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Socket.get();
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
  isConnected: false,
};

export const socketReducer = createSlice({
  name: "Socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSocket.fulfilled, (state, action) => {
      const newState = { isConnected: action.payload }
      return newState;
    });
    builder.addCase(getSocket.rejected, (state) => {
      state.isConnected = false;
    });
  },
});

const { reducer } = socketReducer;

export default reducer;
