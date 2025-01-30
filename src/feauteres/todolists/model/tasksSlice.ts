import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {tasksApi} from "../api/tasksApi";
import {DomainTask, UpdateTask} from "../api/tasksApi.types";
import {RootState} from "../../../app/store";
import {addTodoListTC, changeTodoStatus, deleteTodoListTC, Todolist} from "./todolistSlice";
import {setAuth} from "../../auth/model/authSlice";
import {changeStatus, setError} from "../../../app/appSlice";
import {ResultCode} from "../../../common/enums/enums";
import {setNetworkError, setServerError} from "../../../common/utils/setServerError";

export type TasksType = {
    [id: string]: DomainTask[];
}

const createSliceWithThunks = buildCreateSlice({creators: {asyncThunk: asyncThunkCreator}})

const tasksSlice = createSliceWithThunks({
    name: "tasks",
    initialState: {} as TasksType,
    reducers: create => {
        const createAThunk = create.asyncThunk.withTypes<{ rejectValue: null }>()
        return {
            fetchTasks: createAThunk(async (todoListId: string, {dispatch, rejectWithValue}) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await tasksApi.getTasks(todoListId)
                        dispatch(changeStatus('success'))
                        return {todoListId, tasks: res.data.items}

                    } catch (error: any) {
                        setNetworkError(dispatch, error.message)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todoListId] = action.payload.tasks
                    }
                }),
            addTask: createAThunk(async (params: { title: string, todoListId: string }, {
                    dispatch,
                    rejectWithValue
                }) => {
                    try {
                        dispatch(changeStatus('loading'))
                        const res = await tasksApi.addTask(params)
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
                        state[action.payload.todoListId].unshift(action.payload)
                    }
                }),
            updateTask: createAThunk(async (params: {
                todoListId: string,
                taskId: string,
                task: UpdateTask
            }, {dispatch, rejectWithValue, getState}) => {
                try {
                    const tasks = (getState() as RootState).tasks
                    const tasksForTodo = tasks[params.todoListId]
                    const task = tasksForTodo.find(ts => ts.id === params.taskId)

                    if (!task) {
                        dispatch(setError('some error occurred'))
                        return rejectWithValue(null)
                    }

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

                    const res = await tasksApi.updateTask({
                        taskId: params.taskId,
                        todoListId: params.todoListId,
                        task: newTask
                    })

                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(changeStatus('success'))
                        dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'success'}))
                        return {todoListId: params.todoListId, task: res.data.data.item}
                    } else {
                        setServerError(dispatch, res.data)
                        dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    setNetworkError(dispatch, error.message)
                    dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
                    return rejectWithValue(null)
                }


            }, {
                fulfilled: (state, action) => {
                    state[action.payload.todoListId] = state[action.payload.todoListId]
                        .map(ts => ts.id === action.payload.task.id ? {...ts, ...action.payload.task} : ts)
                }
            }),
            deleteTask: createAThunk(async (params: { todoListId: string, taskId: string }, {
                    dispatch,
                    rejectWithValue
                }) => {
                try {
                    dispatch(changeStatus('loading'))
                    dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'loading'}))
                    const res = await tasksApi.deleteTask(params)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(changeStatus('success'))
                        dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'success'}))
                        return params
                    } else {
                        setServerError(dispatch, res.data)
                        dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
                        return rejectWithValue(null)
                    }
                }
                catch (error: any) {
                    setNetworkError(dispatch, error.message)
                    dispatch(changeTodoStatus({todoListId: params.todoListId, status: 'error'}))
                    return rejectWithValue(null)
                }
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todoListId] = state[action.payload.todoListId]
                            .filter(ts => ts.id !== action.payload.taskId)
                    }
                })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListTC.fulfilled, (state, action: PayloadAction<Todolist>) => {
            state[action.payload.id] = []
        })
        builder.addCase(deleteTodoListTC.fulfilled, (state, action: PayloadAction<string>) => {
            delete state[action.payload]
        })
        builder.addCase(setAuth, (state, action: PayloadAction<boolean>) => {
            if (!action.payload) return {}
        })
    },
    selectors: {
        tasksSelector: state => state
    }
})

export const {addTask, fetchTasks, deleteTask, updateTask} = tasksSlice.actions
export const {tasksSelector} = tasksSlice.selectors

export default tasksSlice.reducer