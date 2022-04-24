import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import messageReducer from "./reducers/message.reducer";
import userReducer from "./reducers/user.reducer";
// ...

const reducer = {
  auth: authReducer,
  user: userReducer,
  message: messageReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
