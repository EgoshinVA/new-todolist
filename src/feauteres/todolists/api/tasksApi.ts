import {instance} from "../../../common/instance/instance";
import {BaseResponse} from "../../../common/types/types";
import {DomainTask, UpdateTask} from "./tasksApi.types";

type ResponseTask = {
    items: DomainTask[]
    totalCount: number
    error: string | null
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTask>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(params: { title: string, todoListId: string }) {
        return instance.post<BaseResponse<{
            item: DomainTask
        }>>(`todo-lists/${params.todoListId}/tasks`, {title: params.title})
    },
    updateTask(params: { todoListId: string, taskId: string, task: UpdateTask},) {
        return instance.put<BaseResponse<{
            item: DomainTask
        }>>(`todo-lists/${params.todoListId}/tasks/${params.taskId}`, params.task)
    },
    deleteTask(params: { todoListId: string, taskId: string }) {
        return instance.delete<BaseResponse>(`todo-lists/${params.todoListId}/tasks/${params.taskId}`)
    }
}