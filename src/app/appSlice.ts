import {createSlice} from "@reduxjs/toolkit";

export type ThemeMode = 'dark' | 'light'
export type AppStatus = 'idle' | 'loading' | 'error' | 'success'

const appSlice = createSlice({
    name: 'app',
    initialState: {
        theme: 'light' as ThemeMode,
        error: null as string | null,
        status: 'idle' as AppStatus,
        isAuth: false,
    },
    reducers: create => ({
        setTheme: create.reducer((state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }),
        setError: create.reducer<string | null>((state, action) => {
            state.error = action.payload;
        }),
        changeStatus: create.reducer<AppStatus>((state, action) => {
            state.status = action.payload;
        }),
        setAuth: create.reducer<boolean>((state, action) => {
            state.isAuth = action.payload;
        }),
    }),
    selectors: {
        appThemeSelector: state => state.theme,
        selectAppError: state => state.error,
        selectAppStatus: state => state.status,
        selectIsAuth: state => state.isAuth,
    }
})

export const {setTheme, setError, changeStatus, setAuth} = appSlice.actions;
export const {appThemeSelector, selectAppStatus, selectAppError, selectIsAuth} = appSlice.selectors

export default appSlice.reducer;