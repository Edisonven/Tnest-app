import { createSlice } from "@reduxjs/toolkit";
import type { RootState, AppStore, AppDispatch } from '../app/store';
import { useDispatch, useSelector, useStore, } from 'react-redux'
import type { PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
    image: string
    title: string
}

const initialState: BackgroundState = {
    image: "",
    title: ""
}

export const backgroundSlice = createSlice({
    name: "background",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        resetBoardProps: (state) => {
            state.image = ""
            state.title = ""

        }

    },
});

export const { setImage, setTitle, resetBoardProps } = backgroundSlice.actions;
export const selectBackgroundProps = backgroundSlice.reducer;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()