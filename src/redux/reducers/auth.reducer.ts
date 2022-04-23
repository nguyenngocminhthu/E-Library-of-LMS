import {
  createAction,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserState } from "./user.reducer";
import lodash from "lodash";
import Auth from "../../Apis/Auth.api";

// Define a type for the slice state
interface AuthState {
  user?: UserState;
  isLogin?: boolean;
  token?: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: { role: "", email: "", password: "" },
  isLogin: false,
  token: "",
};

export const removeProfile = createAction("authentication/removeProfile");
export const setToken = createAction<{ token: any; remember: boolean }>(
  "authentication/setToken"
);

export const auth = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user?: UserState }>) =>
      Object.assign(state, {
        isLogin: action.payload.user != null,
        user: action.payload.user,
      }),
    updateProfile: (
      state,
      action: PayloadAction<{
        isLogin?: boolean;
      }>
    ) => Object.assign(state, action.payload),
    logOut: (state: any) => {
      return {
        ...state,
        statusLogin: false,
        user: null,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeProfile, (state: any) => {
        return {
          ...state,
          statusLogin: false,
          user: null,
          listPermissionCode: [],
          token: null,
          remember: false,
        };
      })
      .addCase(setToken, (state, action) =>
        Object.assign(state, action.payload, {
          isLogin: !lodash.isEmpty(action.payload.token),
        })
      );
  },
});

export const { login, updateProfile, logOut } = auth.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectToken = (state: RootState) => state.auth.token;

export default auth.reducer;
