import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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
        },
        changeTodoStatus: (state, action: PayloadAction<{ todoListId: string, status: AppStatus }>) => {
            return state.map(tl => tl.id === action.payload.todoListId ? {
                ...tl,
                entityStatus: action.payload.status
            } : tl)
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
    setTodos,
    changeFilter,
    addTodoList,
    updateTodolist,
    deleteTodoList,
    changeTodoStatus
} = todolistSlice.actions

export const {todolistsSelector} = todolistSlice.selectors

export const fetchTodosTC = () => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    todolistsApi.getTodos().then(res => {
        dispatch(setTodos(res.data))
        dispatch(changeStatus('success'))
    })
        .catch((err) => {
            setNetworkError(dispatch, err.message)
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    todolistsApi.addTodo(title).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(addTodoList(res.data.data.item))
            dispatch(changeStatus('success'))
        } else {
            setServerError(dispatch, res.data)
        }
    }).catch((err) => {
        setNetworkError(dispatch, err.message)
    })
}

export const updateTodolistTitleTC = (params: { title: string, todoListId: string }) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    todolistsApi.updateTodo(params).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(updateTodolist(params))
            dispatch(changeStatus('success'))
        } else {
            setServerError(dispatch, res.data)
        }
    }).catch((err) => {
        setNetworkError(dispatch, err.message)
    })
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    dispatch(changeTodoStatus({todoListId, status: 'loading'}))
    todolistsApi.deleteTodo(todoListId).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(deleteTodoList(todoListId))
            dispatch(changeStatus('success'))
            dispatch(changeTodoStatus({todoListId, status: 'success'}))
        } else {
            setServerError(dispatch, res.data)
            dispatch(changeTodoStatus({todoListId, status: 'error'}))
        }
    }).catch((err) => {
        setNetworkError(dispatch, err.message)
        dispatch(changeTodoStatus({todoListId, status: 'error'}))
    })
}

export default todolistSlice.reducer