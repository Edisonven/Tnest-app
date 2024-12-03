import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "../app/store";

interface ColumnInterface {
    taskListId: string
    taskListName: string
}

const initialState: ColumnInterface = {
    taskListName: "hola",
    taskListId: ""
}

export const taskColumnSlice = createSlice({
    name: "taskColumn",
    initialState,

    reducers: {
        setColumnTaskName: (state, action) => {
            state.taskListName = action.payload
        }
    }
})



export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()