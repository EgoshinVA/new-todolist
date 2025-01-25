import {RootState} from "../../../app/store";

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized;