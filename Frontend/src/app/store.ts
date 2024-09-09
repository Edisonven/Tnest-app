import { configureStore } from "@reduxjs/toolkit";
import { selectBackgroundProps } from "../features/boardBackgroundSlice";

export const store = configureStore({
  reducer: {
    background: selectBackgroundProps

  },
});


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']