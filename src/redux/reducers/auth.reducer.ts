import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./user.reducer";
import Auth from "../../Apis/Auth.api";
import { setMessage } from "./message.reducer";
import { setLoading } from "./loading.reducer";
import { message } from "antd";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Auth.login(email, password);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Đăng nhập thành công");
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
      message.error(message);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  await Auth.logout();
  message.success("Đăng xuất thành công");
});

// Define a type for the slice state
interface AuthState {
  user?: UserState | null;
  isLogin?: boolean;
  token?: string;
}

// Define the initial state using that type
const initialState: AuthState = user
  ? { isLogin: true, user }
  : { isLogin: false, user: null };

export const authReducer = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLogin = true;
      state.user = action.payload.user;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLogin = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLogin = false;
      state.user = null;
    });
  },
});

const { reducer } = authReducer;

export default reducer;
