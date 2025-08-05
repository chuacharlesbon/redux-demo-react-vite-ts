import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import toDoReducer from './todo/todoSlice'
import jobToDoReducer from './todo/jobToDoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: toDoReducer,
    jobToDo: jobToDoReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch