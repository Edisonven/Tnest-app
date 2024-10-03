import { createSlice } from "@reduxjs/toolkit";
import type { RootState, AppStore, AppDispatch } from '../app/store';
import { useDispatch, useSelector, useStore, } from 'react-redux'

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");


interface TaskInterface {
    id: string;
    title: string;
    comments: string;
    description: string;
    cover: string;
    taskListId: string;
}

const initialState: TaskInterface[] = storedTasks.length > 0 ? storedTasks.map((task: TaskInterface) => ({
    id: task.id,
    title: task.title,
    comments: task.comments,
    description: task.description,
    cover: task.cover,
    taskListId: task.taskListId
})) : [];

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTaskInfo: (state, action) => {
            state.push(action.payload);
        },
        setReOrderTaks: (_, action) => {
            return action.payload

        },
        moveTaskToColumn: (state, action) => {
            const { taskId, newColumnId } = action.payload;

            const taskIndex = state.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {

                state[taskIndex].taskListId = newColumnId;
            }
        },
    }
})

export const { setTaskInfo, setReOrderTaks, moveTaskToColumn } = tasksSlice.actions
export const tasksProps = tasksSlice.reducer

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()