import {createSlice} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {Inputs} from "../ui/Login/Login";
import {authApi} from "../api/authApi";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false
    },
    reducers: {
        login: (state) => {
            state.isAuth = true;
        }
    }
})

export const {login} = authSlice.actions;

export const loginTC = (params: Inputs) => (dispatch: Dispatch) => {
    authApi.login(params).then((res) => {
        dispatch(login());
        localStorage.setItem('sn-token', JSON.stringify(res.data.data.token));
    })
}

export default authSlice.reducer;