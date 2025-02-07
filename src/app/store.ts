import {configureStore} from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import {baseApi} from "./baseApi";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        app: appSlice,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

setupListeners(store.dispatch)