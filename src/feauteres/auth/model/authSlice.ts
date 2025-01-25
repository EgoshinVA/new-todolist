import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {Inputs} from "../ui/Login/Login";
import {authApi} from "../api/authApi";
import {ResultCode} from "../../../common/enums/enums";
import {changeStatus, setError} from "../../../app/appSlice";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        isInitialized: false,
    },
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        }
    }
})

export const {setAuth, setIsInitialized} = authSlice.actions;

export const loginTC = (params: Inputs) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    authApi.login(params).then((res) => {
        if(res.data.resultCode === ResultCode.Success) {
            dispatch(setAuth(true));
            localStorage.setItem('sn-token', res.data.data.token)
            dispatch(changeStatus('success'))
        }
        else {
            if(res.data.messages)
                dispatch(setError(res.data.messages[0]))
            else
                dispatch(setError('Something went wrong'))
            dispatch(changeStatus('error'))
        }
    }).catch((err) => {
        dispatch(setError(err.message));
        dispatch(changeStatus('error'))
    })
}

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    authApi.authMe().then((res) => {
        if (res.data.resultCode === ResultCode.Success)
            dispatch(setAuth(true));
        dispatch(changeStatus('success'))
    }).finally(() => {
        dispatch(setIsInitialized(true));
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    authApi.logout().then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAuth(false))
            localStorage.removeItem('sn-token')
            dispatch(changeStatus('success'))
        }
        else
            dispatch(changeStatus('error'))
    })
}

export default authSlice.reducer;