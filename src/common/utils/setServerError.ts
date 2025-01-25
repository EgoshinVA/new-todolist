import {Dispatch} from "redux";
import {BaseResponse} from "../types/types";
import {changeStatus, setError} from "../../app/appSlice";

export const setServerError = (dispatch: Dispatch, data: BaseResponse) => {
    if (data.messages)
        dispatch(setError(data.messages[0]))
    else
        dispatch(setError('Something went wrong'))
    dispatch(changeStatus('error'))
}

export const setNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setError(message));
    dispatch(changeStatus('error'))
}