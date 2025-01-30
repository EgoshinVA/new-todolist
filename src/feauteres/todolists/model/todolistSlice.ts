import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {todolistsApi} from "../api/todolistsApi";
import {setAuth} from "../../auth/model/authSlice";
import {AppStatus, changeStatus} from "../../../app/appSlice";
import {ResultCode} from "../../../common/enums/enums";
import {setNetworkError, setServerError} from "../../../common/utils/setServerError";

export type Todolist = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomain = Todolist & {
    filter: FilterType
    entityStatus: AppStatus
}

const createSliceWithThunks = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const todolistSlice = createSliceWithThunks({
    name: 'todolist',
    initialState: [] as TodolistDomain[],
    reducers: create => {
        const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            changeFilter: create.reducer<{ todoListId: string, filter: FilterType }>((state, action) => {
                return state.map(tl => tl.id === action.payload.todoListId ? {
                    ...tl,
                    filter: action.payload.filter
                } : tl)
            }),
            changeTodoStatus: create.reducer<{ todoListId: string, status: AppStatus }>((state, action) => {
                return state.map(tl => tl.id === action.payload.todoListId ? {
                    ...tl,
                    entityStatus: action.payload.status
                } : tl)
            }),
            fetchTodosTC: createAThunk(async (undefined, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await todolistsApi.getTodos()
                        dispatch(changeStatus('success'))
                        return res.data
                    } catch (error: any) {
                        setNetworkError(dispatch, error.message)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
                    }
                }),
            addTodoListTC: createAThunk(async (title: string, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await todolistsApi.addTodo(title)
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(changeStatus('success'))
                            return res.data.data.item
                        } else {
                            setServerError(dispatch, res.data)
                            return rejectWithValue(null)
                        }
                    } catch (error: any) {
                        setNetworkError(dispatch, error.message)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
                    }
                }),
            updateTodolistTitleTC: createAThunk(async (params: { title: string, todoListId: string }, {
                    dispatch,
                    rejectWithValue
                }) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await todolistsApi.updateTodo(params)
                        if (res.data.resultCode === ResultCode.Success) {
                            dispatch(changeStatus('success'))
                            return params
                        } else {
                            setServerError(dispatch, res.data)
                            return rejectWithValue(null)
                        }
                    } catch (error: any) {
                        setNetworkError(dispatch, error.message)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        return state.map(tl => tl.id === action.payload.todoListId ? {
                            ...tl,
                            title: action.payload.title
                        } : tl)
                    }
                }),
            deleteTodoListTC: createAThunk(async (todoListId: string, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(changeStatus('loading'))
                    dispatch(changeTodoStatus({todoListId, status: 'loading'}))
                    const res = await todolistsApi.deleteTodo(todoListId)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(changeStatus('success'))
                        dispatch(changeTodoStatus({todoListId, status: 'success'}))
                        return todoListId
                    } else {
                        setServerError(dispatch, res.data)
                        dispatch(changeTodoStatus({todoListId, status: 'error'}))
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    setNetworkError(dispatch, error.message)
                    dispatch(changeTodoStatus({todoListId, status: 'error'}))
                    return rejectWithValue(null)
                }
            }, {
                fulfilled: (state, action) => {
                    return state.filter(tl => tl.id !== action.payload)
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setAuth, (state, action: PayloadAction<boolean>) => {
            if (!action.payload) return []
        })
    },
    selectors: {
        todolistsSelector: state => state
    }
})

export const {
    changeFilter,
    changeTodoStatus,
    fetchTodosTC,
    addTodoListTC,
    deleteTodoListTC,
    updateTodolistTitleTC
} = todolistSlice.actions

export const {todolistsSelector} = todolistSlice.selectors

export default todolistSlice.reducer