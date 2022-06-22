import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import Noti from "../../Apis/Noti.api";
import { RootState } from "../store";
import { ILesson } from "./lesson.reducer";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";
import { ITopic } from "./topic.reducer";
import { UserState } from "./user.reducer";

export const getNotis = createAsyncThunk(
  "Noti/getNotis",
  async ({ limit, role }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Noti.getNotis({ limit, role });
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

export const getNoti = createAsyncThunk(
  "Noti/getNoti",
  async (id: string, thunkAPI) => {
    try {
      const data = await Noti.getNoti(id);
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

export const updateNoti = createAsyncThunk(
  "Noti/updateNoti",
  async ({ id, payload }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Noti.updateNoti(id, payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Cập nhật thông báo thành công");
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

export const createNoti = createAsyncThunk(
  "Noti/createNoti",
  async (payload: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Noti.createNoti(payload);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Tạo thông báo thành công");
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

export const deleteNoti = createAsyncThunk(
  "Noti/deleteNoti",
  async (id: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await Noti.deleteNoti(id);
      if (data.code) {
        thunkAPI.dispatch(setLoading(false));
        message.error(data.message);
      } else {
        thunkAPI.dispatch(setLoading(false));
        message.success("Xóa thông báo thành công");
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
export interface INoti {
  id: string;
  key?: number;
  title: string;
  content: string;
  from: UserState;
  to: UserState[];
  topic: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NotiState {
  listNoti: INoti[];
}

// Define the initial state using that type
const initialState: NotiState = {
  listNoti: [],
};

export const NotiReducer = createSlice({
  name: "Noti",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateNoti.fulfilled, (state, action) => {
      state.listNoti = action.payload;
    });
    builder.addCase(updateNoti.rejected, (state, action) => {
      state.listNoti = [];
    });
    builder.addCase(getNotis.fulfilled, (state, action) => {
      state.listNoti = action.payload;
    });
    builder.addCase(getNotis.rejected, (state, action) => {
      state.listNoti = [];
    });
    builder.addCase(createNoti.fulfilled, (state, action) => {
      state.listNoti = action.payload;
    });
    builder.addCase(createNoti.rejected, (state, action) => {
      state.listNoti = [];
    });
    builder.addCase(deleteNoti.fulfilled, (state, action) => {
      state.listNoti = action.payload;
    });
    builder.addCase(deleteNoti.rejected, (state, action) => {
      state.listNoti = [];
    });
    builder.addCase(getNoti.fulfilled, (state, action) => {
      state.listNoti = action.payload;
    });
    builder.addCase(getNoti.rejected, (state, action) => {
      state.listNoti = [];
    });
  },
});

export const listNoti = (state: RootState) => state.noti.listNoti;

const { reducer } = NotiReducer;

export default reducer;
