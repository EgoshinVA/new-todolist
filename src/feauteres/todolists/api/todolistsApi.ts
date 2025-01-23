import {instance} from "../../../common/instance/instance";
import {Todolist} from "../model/todolistSlice";

export const todolistsApi = {
    getTodos () {
        return instance.get<Todolist[]>('todo-lists')
}
}