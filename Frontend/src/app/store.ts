import { configureStore } from "@reduxjs/toolkit";
import { selectBackgroundProps } from "../features/boardBackgroundSlice";
import { tasksProps } from "../features/tasksSlice";

export const store = configureStore({
  reducer: {
    background: selectBackgroundProps,
    tasksProps: tasksProps
  },
});


export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']