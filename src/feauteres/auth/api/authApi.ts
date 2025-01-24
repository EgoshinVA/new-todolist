import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";
import {Inputs} from "../ui/Login/Login";

export const authApi = {
    login(params: Inputs) {
        return instance.post<BaseResponse<{userId: number, token: string}>>(`auth/login`, params)
    }
}