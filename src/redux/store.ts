import { configureStore } from "@reduxjs/toolkit";
import firstSlice from "./reducers/firstSlice";
import { firstApi } from "./reducers/firstApi";
import airQualitySlice from "./reducers/airQualitySlice";
import { forecastApi } from "./reducers/forecastApi";
export const store = configureStore({
  reducer: {
    airQualitySlice,
    firstReducer: firstSlice,
    [firstApi.reducerPath]: firstApi.reducer,
    [forecastApi.reducerPath]: forecastApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firstApi.middleware, forecastApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
