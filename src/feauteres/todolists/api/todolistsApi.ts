import {instance} from "../../../common/instance/instance";
import {Todolist} from "../model/todolistSlice";
import {BaseResponse} from "../../../common/types/types";

export const todolistsApi = {
    getTodos() {
        return instance.get<Todolist[]>('todo-lists')
    },
    addTodo(title: string) {
        return instance.post<BaseResponse<{ item: Todolist }>>('todo-lists', {title})
    },
    updateTodo(params: {title: string, todoListId: string}) {
        return instance.put<BaseResponse>(`todo-lists/${params.todoListId}`, {title: params.title})
    },
    deleteTodo(todoListId: string) {
        return instance.delete<BaseResponse>(`todo-lists/${todoListId}`)
    }
}