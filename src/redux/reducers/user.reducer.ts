import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../Apis/User.api";
import { RootState } from "../store";
import { IClass } from "./classes.reducer";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ limit, role }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await User.getUsers({ limit, role });
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

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id: string, thunkAPI) => {
    try {
      const data = await User.getUser(id);
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

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await User.updateProfile(id, payload);
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

export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await User.createUser(payload);
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await User.deleteUser(id);
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

// Define a type for the slice state
export interface UserState {
  id: string;
  userCode: string;
  email: string;
  role: string;
  password: string;
  gender: number;
  userName: string;
  phone: string;
  address: string;
  recentSubject: any[];
  recentSubjectId: string[];
  avt: any;
  classes: IClass[];
}

interface IUser {
  listUser: UserState[];
}

// Define the initial state using that type
const initialState: IUser = {
  listUser: [],
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.listUser = [];
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.listUser = [];
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.listUser = [];
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.listUser = [];
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.listUser = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.listUser = [];
    });
  },
});

export const listUser = (state: RootState) => state.user.listUser;

const { reducer } = userReducer;

export default reducer;
