import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import banksReducer from "./reducers/banks.reducer";
import classesReducer from "./reducers/classes.reducer";
import fileReducer from "./reducers/file.reducer";
import lessonReducer from "./reducers/lesson.reducer";
import loadingReducer from "./reducers/loading.reducer";
import messageReducer from "./reducers/message.reducer";
import notiReducer from "./reducers/noti.reducer";
import QAReducer from "./reducers/QA.reducer";
import questionReducer from "./reducers/question.reducer";
import subjectReducer from "./reducers/subject.reducer";
import subjectgroupReducer from "./reducers/subjectgroup.reducer";
import topicReducer from "./reducers/topic.reducer";
import userReducer from "./reducers/user.reducer";
import submissionReducer from "./reducers/submission.reducer";
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
  classes: classesReducer,
  topic: topicReducer,
  lesson: lessonReducer,
  file: fileReducer,
  QA: QAReducer,
  noti: notiReducer,
  submission: submissionReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
