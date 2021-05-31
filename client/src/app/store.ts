import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import hotdogReducer from "../features/hotdogs/hotdogsSlice";

export const store = configureStore({
  reducer: {
    hotdogs: hotdogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
