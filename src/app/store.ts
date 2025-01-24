import {configureStore} from "@reduxjs/toolkit";
import todolistSlice from "../feauteres/todolists/model/todolistSlice";
import tasksSlice from "../feauteres/todolists/model/tasksSlice";

const store = configureStore({
    reducer: {
        todolist: todolistSlice,
        tasks: tasksSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

// @ts-ignore
window.store = store