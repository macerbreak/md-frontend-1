import { configureStore } from '@reduxjs/toolkit'
import firstSlice from "./reducers/firstSlice";
import {firstApi} from "./reducers/firstApi";

export const store = configureStore({
    reducer: {
        firstReducer:firstSlice,
        [firstApi.reducerPath]: firstApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(firstApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch