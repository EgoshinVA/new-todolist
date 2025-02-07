import {BaseResponse} from "../../../common/types/types";
import {baseApi} from "../../../app/baseApi";
import {DomainTodolist, Todolist} from "./todolistsApi.types";

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getTodos: build.query<DomainTodolist[], void>({
            query: () => "todo-lists",
            providesTags: ['Todolist'],
            transformResponse: (res: Todolist[]): DomainTodolist[] => {
                return res.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            }
        }),
        addTodo: build.mutation<BaseResponse<{ item: Todolist }>, string>({
            query: title => ({
                url: "todo-lists",
                method: "POST",
                body: {title}
            }),
            invalidatesTags: ['Todolist']
        }),
        removeTodo: build.mutation<BaseResponse, string>({
            query: todoListId => ({
                url: `todo-lists/${todoListId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Todolist']
        }),
        updateTodo: build.mutation<BaseResponse, { title: string, todoListId: string }>({
            query: params => ({
                url: `todo-lists/${params.todoListId}`,
                method: "PUT",
                body: {title: params.title}
            }),
            invalidatesTags: ['Todolist']
        })
    })
})

export const {useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation} = todolistsApi