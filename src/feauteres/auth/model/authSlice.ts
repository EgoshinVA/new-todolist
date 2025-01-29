import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {Inputs} from "../ui/Login/Login";
import {authApi} from "../api/authApi";
import {ResultCode} from "../../../common/enums/enums";
import {changeStatus} from "../../../app/appSlice";
import {setNetworkError, setServerError} from "../../../common/utils/setServerError";

const createSliceWithThunks = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const authSlice = createSliceWithThunks({
    name: 'auth',
    initialState: {
        isAuth: false,
        isInitialized: false,
    },
    reducers: create => {
        const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            setAuth: (state, action: PayloadAction<boolean>) => {
                state.isAuth = action.payload;
            },
            setIsInitialized: (state, action: PayloadAction<boolean>) => {
                state.isInitialized = action.payload;
            }
        }
    },
    selectors: {
        selectIsAuth: state => state.isAuth,
        selectIsInitialized: state => state.isInitialized,
    }
})

export const {setAuth, setIsInitialized} = authSlice.actions;
export const {selectIsAuth, selectIsInitialized} = authSlice.selectors;

export const loginTC = (params: Inputs) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    authApi.login(params).then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAuth(true));
            localStorage.setItem('sn-token', res.data.data.token)
            dispatch(changeStatus('success'))
        } else {
            setServerError(dispatch, res.data)
        }
    }).catch((err) => {
        setNetworkError(dispatch, err.message)
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
        } else
            dispatch(changeStatus('error'))
    })
}

export default authSlice.reducer;