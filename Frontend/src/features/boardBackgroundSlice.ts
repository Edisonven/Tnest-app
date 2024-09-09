import { createSlice } from "@reduxjs/toolkit";
import type { RootState, AppStore, AppDispatch } from '../app/store';
import { useDispatch, useSelector, useStore, } from 'react-redux'
import type { PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
    image: string
}

const initialState: BackgroundState = {
    image: ""
}

export const backgroundSlice = createSlice({
    name: "background",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        },

    },
});

export const { setImage } = backgroundSlice.actions;
export const selectBackgroundImage = backgroundSlice.reducer;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()