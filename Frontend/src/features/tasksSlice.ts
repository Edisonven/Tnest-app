import { createSlice } from "@reduxjs/toolkit";
import type { RootState, AppStore, AppDispatch } from '../app/store';
import { useDispatch, useSelector, useStore, } from 'react-redux'

interface InitialStateInterface {
    title: string,
    comments: string
    description: string
    cover: string
    taskListId: string;
}

const initialState: InitialStateInterface = {
    title: "",
    comments: "",
    description: "",
    cover: "",
    taskListId: ""
}

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTaskInfo: (state, action) => {
            state.title = action.payload
            state.comments = action.payload
            state.description = action.payload
            state.cover = action.payload
        }
    }
})

export const { setTaskInfo } = tasksSlice.actions
export const tasksProps = tasksSlice.reducer

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()