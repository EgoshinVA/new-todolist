import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: 'light' as ThemeMode
    },
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})

export const {setTheme} = appSlice.actions;

export default appSlice.reducer;