import {asyncThunkCreator, buildCreateSlice} from "@reduxjs/toolkit";
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
            setAuth: create.reducer<boolean>((state, action) => {
                state.isAuth = action.payload;
            }),
            loginTC: createAThunk(async (params: Inputs, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await authApi.login(params)
                        if (res.data.resultCode === ResultCode.Success) {
                            localStorage.setItem('sn-token', res.data.data.token)
                            dispatch(changeStatus('success'))
                            return true
                        } else {
                            setServerError(dispatch, res.data)
                            return rejectWithValue(null)
                        }
                    } catch (error: any) {
                        setNetworkError(dispatch, error.message)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.isAuth = action.payload;
                    }
                }),
            logoutTC: createAThunk(async (undefined, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await authApi.logout()
                        if (res.data.resultCode === ResultCode.Success) {
                            localStorage.removeItem('sn-token')
                            dispatch(changeStatus('success'))
                            return false
                        } else {
                            dispatch(changeStatus('error'))
                            return rejectWithValue(null)
                        }

                    } catch (error: any) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.isAuth = action.payload;
                    }
                }),
            authMeTC: createAThunk(async (undefined, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await authApi.authMe()
                        dispatch(changeStatus('success'))
                        return res.data.resultCode === ResultCode.Success;
                    } catch (error: any) {
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.isAuth = action.payload;
                        state.isInitialized = true
                    }
                })
        }
    },
    selectors: {
        selectIsAuth: state => state.isAuth,
        selectIsInitialized: state => state.isInitialized,
    }
})

export const {setAuth, loginTC, authMeTC, logoutTC} = authSlice.actions;
export const {selectIsAuth, selectIsInitialized} = authSlice.selectors;

export default authSlice.reducer;