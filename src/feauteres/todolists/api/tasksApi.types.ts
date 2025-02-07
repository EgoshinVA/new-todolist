import {TaskPriority, TaskStatus} from "../../../common/enums/enums";

export type DomainTask = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTask = {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}

export type TasksType = {
    [id: string]: DomainTask[];
}
export type ResponseTask = {
    items: DomainTask[]
    totalCount: number
    error: string | null
}