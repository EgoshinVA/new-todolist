import {configureStore} from "@reduxjs/toolkit";
import todolistSlice from "../feauteres/todolists/model/todolistSlice";

const store = configureStore({
    reducer: {
        todolist: todolistSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store