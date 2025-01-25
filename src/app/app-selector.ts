import {RootState} from "./store";

export const appThemeSelector = (state: RootState) => state.app.theme
export const selectAppError = (state: RootState) => state.app.error
export const selectAppStatus = (state: RootState) => state.app.status