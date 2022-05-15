import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import banksReducer from "./reducers/banks.reducer";
import loadingReducer from "./reducers/loading.reducer";
import messageReducer from "./reducers/message.reducer";
import questionReducer from "./reducers/question.reducer";
import subjectReducer from "./reducers/subject.reducer";
import subjectgroupReducer from "./reducers/subjectgroup.reducer";
import userReducer from "./reducers/user.reducer";
// ...

const reducer = {
  auth: authReducer,
  user: userReducer,
  subject: subjectReducer,
  bank: banksReducer,
  question: questionReducer,
  message: messageReducer,
  loading: loadingReducer,
  subjectgroup: subjectgroupReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
