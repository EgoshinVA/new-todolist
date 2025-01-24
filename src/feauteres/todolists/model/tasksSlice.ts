import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {tasksApi} from "../api/tasksApi";
import {DomainTask, UpdateTask} from "../api/tasksApi.types";
import {RootState} from "../../../app/store";
import {TaskPriority, TaskStatus} from "../../../common/enums/enums";
import {addTodoList, deleteTodoList, Todolist} from "./todolistSlice";

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
    }
})

export const {addTask, setTasks, deleteTask, updateTask} = tasksSlice.actions;

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoListId).then(res => dispatch(setTasks({todoListId, tasks: res.data.items})))
}

export const addTaskTC = (params: { title: string, todoListId: string }) => (dispatch: Dispatch) => {
    tasksApi.addTask(params).then(res => dispatch(addTask(res.data.data.item)))
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

        tasksApi.updateTask({taskId: params.taskId, todoListId: params.todoListId, task: newTask}).then(res =>
            dispatch(updateTask({todoListId: params.todoListId, task: res.data.data.item})))
    }
}

export const deleteTaskTC = (params: { todoListId: string, taskId: string }) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(params).then(res => dispatch(deleteTask(params)))
}

export default tasksSlice.reducer