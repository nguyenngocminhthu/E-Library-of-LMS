import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
export interface UserState {
  email: string;
  role: string;
  password: string;
}

// Define the initial state using that type
const initialState: UserState = {
  role: "",
  email: "",
  password: "",
};

export const user = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = user.actions;

export default user.reducer;
