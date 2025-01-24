import {configureStore} from "@reduxjs/toolkit";
import todolistSlice from "../feauteres/todolists/model/todolistSlice";
import tasksSlice from "../feauteres/todolists/model/tasksSlice";
import appSlice from "./appSlice";
import authSlice from "../feauteres/auth/model/authSlice";

const store = configureStore({
    reducer: {
        todolist: todolistSlice,
        tasks: tasksSlice,
        app: appSlice,
        auth: authSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

// @ts-ignore
window.store = store