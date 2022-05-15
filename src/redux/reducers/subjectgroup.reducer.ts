import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SubjectGroup from "../../Apis/SubjectGroup.api";
import { RootState } from "../store";
import { IBanks } from "./banks.reducer";
import { setLoading } from "./loading.reducer";
import { setMessage } from "./message.reducer";
import { ISubject } from "./subject.reducer";

export const getSubjectGroups = createAsyncThunk(
  "subjectgroup/getSubjectGroups",
  async (limit: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const data = await SubjectGroup.getSubjectGroups(limit);
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

export interface ISubjectGroup {
  id: string;
  key?: number;
  groupCode: string;
  groupName: string;
  bank: IBanks;
  subject: ISubject;
  createdAt: string;
  updatedAt: string;
}

interface SubjectGroupState {
  listSubjectGroup: ISubjectGroup[];
}

const initialState: SubjectGroupState = {
  listSubjectGroup: [],
};

export const subjectgroupReducer = createSlice({
  name: "subjectgroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjectGroups.fulfilled, (state, action) => {
      state.listSubjectGroup = action.payload;
    });
    builder.addCase(getSubjectGroups.rejected, (state, action) => {
      state.listSubjectGroup = [];
    });
  },
});

const { reducer } = subjectgroupReducer;

export const listSubjectGroup = (state: RootState) =>
  state.subjectgroup.listSubjectGroup;

export default reducer;
