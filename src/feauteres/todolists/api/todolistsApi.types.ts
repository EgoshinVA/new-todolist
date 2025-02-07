import {AppStatus} from "../../../app/appSlice";

export type Filter = 'all' | 'completed' | 'active'

export type Todolist = {
    title: string,
    id: string,
    addedDate: string,
    order: number
}

export type DomainTodolist = Todolist & {
    entityStatus: AppStatus,
    filter: Filter
}