import {BaseResponse} from "../../../common/types/types";
import {DomainTask, ResponseTask, UpdateTask} from "./tasksApi.types";
import {baseApi} from "../../../app/baseApi";

export const tasksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getTasks: build.query<ResponseTask, string>({
            query: todolistId => `todo-lists/${todolistId}/tasks`,
            providesTags: ['Todolist']
        }),
        addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { title: string, todoListId: string }>({
            query: (params) => ({
                url: `todo-lists/${params.todoListId}/tasks`,
                method: "POST",
                body: {title: params.title},
            }),
            invalidatesTags: ['Todolist']
        }),
        removeTask: build.mutation<BaseResponse, { todoListId: string, taskId: string }>({
            query: (params) => ({
                url: `todo-lists/${params.todoListId}/tasks/${params.taskId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Todolist']
        }),
        updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, {
            todoListId: string,
            taskId: string,
            task: UpdateTask
        }>({
            query: (params) => ({
                url: `todo-lists/${params.todoListId}/tasks/${params.taskId}`,
                method: "PUT",
                body: params.task
            }),
            invalidatesTags: ['Todolist']
        })
    })
})

export const {useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation} = tasksApi