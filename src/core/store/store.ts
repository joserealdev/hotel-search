import { isDevMode } from "@/types/environments";
import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
  },
  devTools: isDevMode(),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     immutableCheck: { warnAfter: 128 },
  //     serializableCheck: { warnAfter: 128 },
  //   }),
});

export const makeStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: {
      global: globalSlice,
    },
    devTools: isDevMode(),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
