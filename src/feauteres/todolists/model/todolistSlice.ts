import {createSlice} from "@reduxjs/toolkit";

export type Todolist = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}

type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomain = Todolist & {
    filter: FilterType
    entityStatus: 'idle' | 'loading' | 'success' | 'error'
}

const todolistSlice = createSlice({
    name: 'todolist',
    initialState: [] as TodolistDomain[],
    reducers: {}
})

export default todolistSlice.reducer