import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskPriority, TaskStatus} from "../../../common/enums/enums";
import {Dispatch} from "redux";
import {tasksApi} from "../api/tasksApi";

export type DomainTask = {
    description: string
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

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
        }
    }
})

export const {addTask, setTasks} = tasksSlice.actions;

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todoListId).then(res => dispatch(setTasks({todoListId, tasks: res.data.items})))
}

export default tasksSlice.reducer