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
        }
    }
})

export const {setTodos, changeFilter} = todolistSlice.actions

export const fetchTodosTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodos().then(res => dispatch(setTodos(res.data)))
}

export default todolistSlice.reducer