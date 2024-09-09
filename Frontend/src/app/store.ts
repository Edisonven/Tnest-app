import { configureStore } from "@reduxjs/toolkit";
import { selectBackgroundImage } from "../features/boardBackgroundSlice";

export const store = configureStore({
  reducer: {
    background: selectBackgroundImage

  },
});


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']