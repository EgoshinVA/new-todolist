import {instance} from "../../../common/instance/instance";
import {DomainTask} from "../model/tasksSlice";

type ResponseTask = {
    items: DomainTask[]
    totalCount: number
    error: string | null
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTask>(`todo-lists/${todolistId}/tasks`)
    }
}