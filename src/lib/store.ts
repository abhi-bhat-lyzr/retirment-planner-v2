import { configureStore } from "@reduxjs/toolkit";
import api from "./features/api/api";
import userReducer from "./features/user/userSlice";
import insightsReducer from "./features/insights/insightsSlice";
import messageReducer from "./features/messages/messageSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      message: messageReducer,
      [api.reducerPath]: api.reducer,
      insights: insightsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
