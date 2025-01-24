import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolistsApi";

export type Todolist = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomain = Todolist & {
    filter: FilterType
    entityStatus: 'idle' | 'loading' | 'success' | 'error'
}

const todolistSlice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistDomain[],
    reducers: {
        setTodos: (state, action: PayloadAction<Todolist[]>) => {
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeFilter: (state, action: PayloadAction<{ todoListId: string, filter: FilterType }>) => {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl)
        },
        addTodoList: (state, action: PayloadAction<Todolist>) => {
            state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
        },
        updateTodolist: (state, action: PayloadAction<{ title: string, todoListId: string }>) => {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
        },
        deleteTodoList: (state, action: PayloadAction<string>) => {
            return state.filter(tl => tl.id !== action.payload)
        }
    }
})

export const {setTodos, changeFilter, addTodoList, updateTodolist, deleteTodoList} = todolistSlice.actions

export const fetchTodosTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodos().then(res => dispatch(setTodos(res.data)))
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistsApi.addTodo(title).then(res => dispatch(addTodoList(res.data.data.item)))
}

export const updateTodolistTitleTC = (params: {title: string, todoListId: string}) => (dispatch: Dispatch) => {
    todolistsApi.updateTodo(params).then(res => dispatch(updateTodolist(params)))
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTodo(todoListId).then(res => dispatch(deleteTodoList(todoListId)))
}

export default todolistSlice.reducer