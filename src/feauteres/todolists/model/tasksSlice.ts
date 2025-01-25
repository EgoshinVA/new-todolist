import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {tasksApi} from "../api/tasksApi";
import {DomainTask, UpdateTask} from "../api/tasksApi.types";
import {RootState} from "../../../app/store";
import {addTodoList, changeTodoStatus, deleteTodoList, Todolist} from "./todolistSlice";
import {setAuth} from "../../auth/model/authSlice";
import {changeStatus} from "../../../app/appSlice";
import {ResultCode} from "../../../common/enums/enums";
import {setNetworkError, setServerError} from "../../../common/utils/setServerError";

export type TasksType = {
    [id: string]: DomainTask[];
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: {
        addTask: (state, action: PayloadAction<DomainTask>) => {
            state[action.payload.todoListId].unshift(action.payload)
        },
        setTasks: (state, action: PayloadAction<{ tasks: DomainTask[], todoListId: string }>) => {
            state[action.payload.todoListId] = action.payload.tasks
        },
        updateTask: (state, action: PayloadAction<{ task: DomainTask, todoListId: string }>) => {
            state[action.payload.todoListId] = state[action.payload.todoListId]
                .map(ts => ts.id === action.payload.task.id ? {...ts, ...action.payload.task} : ts)
        },
        deleteTask: (state, action: PayloadAction<{ todoListId: string, taskId: string }>) => {
            state[action.payload.todoListId] = state[action.payload.todoListId]
                .filter(ts => ts.id !== action.payload.taskId)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoList, (state, action: PayloadAction<Todolist>) => {
            state[action.payload.id] = []
        })
        builder.addCase(deleteTodoList, (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        })
        builder.addCase(setAuth, (state, action: PayloadAction<boolean>) => {
            if (!action.payload) return {}
        })
    }
})

export const {addTask, setTasks, deleteTask, updateTask} = tasksSlice.actions;

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    tasksApi.getTasks(todoListId).then(res => {
        dispatch(setTasks({todoListId, tasks: res.data.items}))
        dispatch(changeStatus('success'))
    })
        .catch((err) => {
            setNetworkError(dispatch, err.message)
        })
}

export const addTaskTC = (params: { title: string, todoListId: string }) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    tasksApi.addTask(params).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(addTask(res.data.data.item))
            dispatch(changeStatus('success'))
        } else {
            setServerError(dispatch, res.data)
        }
    }).catch((err) => {
        setNetworkError(dispatch, err.message)
    })
}

export const updateTaskTC = (params: {
    todoListId: string,
    taskId: string,
    task: UpdateTask
}) => (dispatch: Dispatch, getState: () => RootState) => {
    const tasks = getState().tasks
    const tasksForTodo = tasks[params.todoListId]
    const task = tasksForTodo.find(ts => ts.id === params.taskId)

    if (task) {
        const newTask: UpdateTask = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...params.task
        }
        dispatch(changeStatus('loading'))
        dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'loading'}))
        tasksApi.updateTask({taskId: params.taskId, todoListId: params.todoListId, task: newTask}).then(res => {

            if (res.data.resultCode === ResultCode.Success) {
                dispatch(updateTask({todoListId: params.todoListId, task: res.data.data.item}))
                dispatch(changeStatus('success'))
                dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'success'}))
            } else {
                setServerError(dispatch, res.data)
                dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
            }
        }).catch((err) => {
            setNetworkError(dispatch, err.message)
            dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
        })
    }
}

export const deleteTaskTC = (params: { todoListId: string, taskId: string }) => (dispatch: Dispatch) => {
    dispatch(changeStatus('loading'))
    dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'loading'}))
    tasksApi.deleteTask(params).then(res => {
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(deleteTask(params))
            dispatch(changeStatus('success'))
            dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'success'}))
        } else {
            setServerError(dispatch, res.data)
            dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
        }
    }).catch((err) => {
        setNetworkError(dispatch, err.message)
        dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
    })
}

export default tasksSlice.reducer