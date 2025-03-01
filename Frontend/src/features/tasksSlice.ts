import { createSlice } from "@reduxjs/toolkit";
import type { RootState, AppStore, AppDispatch } from '../app/store';
import { useDispatch, useSelector, useStore, } from 'react-redux'

const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");


interface TaskInterface {
    id: string;
    title: string;
    comments: Array<{
        id: string;
        comment: string;
    }>;
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
        sendTaskDescription: (state, action) => {
            const { taskId, description } = action.payload;
            const taskFinded = state.find((task) => task.id === taskId);
            if (taskFinded) {
                taskFinded.description = description;
            }
        },
        sendTaskTitle: (state, action) => {
            const { title, taskId } = action.payload
            const taskFinded = state.find((task) => task.id === taskId);
            if (taskFinded) {
                taskFinded.title = title;
            }
        },
        sendTaskComments: (state, action) => {
            const { comments, id, taskId } = action.payload;
            const taskFinded = state.find((task) => task.id === taskId);
            if (taskFinded) {
                if (!taskFinded.comments) {

                    taskFinded.comments = [];
                }
                taskFinded.comments.push({
                    id: id,
                    comment: comments
                });
            }
        },
        deleteComment: (state, action) => {
            const { taskId, id } = action.payload;
            const taskFinded = state.find((task) => task.id === taskId);
            if (taskFinded) {
                taskFinded.comments = taskFinded.comments.filter((comment) => comment.id !== id);
            }
        },
        sendTaskCover: (state, action) => {
            const { taskId, cover } = action.payload;
            const taskFinded = state.find((task) => task.id === taskId);
            if (taskFinded) {
                taskFinded.cover = cover;
            }
        },
        removeTaskCover: (state, action) => {
            const { taskId } = action.payload;
            const taskFinded = state.find((task) => task.id === taskId);
            if (taskFinded) {
                taskFinded.cover = "";
            }
        },
        removeTask: (state, action) => {
            const { taskId } = action.payload;
            return state.filter((task) => task.id !== taskId);
        },
        editActivityComment: (state, action) => {
            const { commentID, newComment, taskID } = action.payload
            const taskActivityCommentFinded = state.find((task) => {
                return task.id === taskID
            })
            if (taskActivityCommentFinded) {
                const commentFinded = taskActivityCommentFinded.comments.find((comment) => comment.id === commentID)
                if (commentFinded) {
                    commentFinded.comment = newComment
                }
            }
        }
    }
})

export const { setTaskInfo, setReOrderTaks, moveTaskToColumn, sendTaskDescription, sendTaskTitle, sendTaskComments, deleteComment, sendTaskCover, removeTaskCover, removeTask, editActivityComment } = tasksSlice.actions
export const tasksProps = tasksSlice.reducer

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()