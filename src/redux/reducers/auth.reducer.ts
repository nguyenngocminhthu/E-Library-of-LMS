import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "./user.reducer";
import Auth from "../../Apis/Auth.api";
import { setMessage } from "./message.reducer";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }: any, thunkAPI) => {
    try {
      const data = await Auth.login(email, password);
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
export const logout = createAsyncThunk("auth/logout", async () => {
  await Auth.logout();
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

export const removeProfile = createAction("authentication/removeProfile");
export const setToken = createAction<{ token: any; remember: boolean }>(
  "authentication/setToken"
);

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
