import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'
export type AppStatus = 'idle' | 'loading' | 'error' | 'success'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: 'light' as ThemeMode,
        error: null as string | null,
        status: 'idle' as AppStatus
    },
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        changeStatus: (state, action: PayloadAction<AppStatus>) => {
            state.status = action.payload;
        }
    },
    selectors: {
        appThemeSelector: state => state.theme,
        selectAppError: state => state.error,
        selectAppStatus: state => state.status
    }
})

export const {setTheme, setError, changeStatus} = appSlice.actions;
export const {appThemeSelector, selectAppStatus, selectAppError} = appSlice.selectors

export default appSlice.reducer;