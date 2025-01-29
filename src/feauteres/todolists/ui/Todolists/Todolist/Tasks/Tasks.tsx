import React, {useEffect} from 'react';
import {List} from "@mui/material";
import {Task} from "./Task/Task";
import {TodolistDomain} from "../../../../model/todolistSlice";
import {useAppDispatch, useAppSelector} from "../../../../../../common/hooks/hooks";
import {fetchTasks, tasksSelector} from "../../../../model/tasksSlice";
import {TaskStatus} from "../../../../../../common/enums/enums";

type Props = {
    todoList: TodolistDomain
}

export const Tasks: React.FC<Props> = ({todoList}) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(tasksSelector)

    useEffect(() => {
        dispatch(fetchTasks(todoList.id))
    }, []);

    const allTodolistTasks = tasks[todoList.id]

    let tasksForTodolist = allTodolistTasks

    if (todoList.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
    }

    if (todoList.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
    }
    return (
        <>
            {tasksForTodolist?.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List sx={{ minHeight: 200 }}>
                    {tasksForTodolist?.map((task) => {
                        return <Task key={task.id} task={task} todolist={todoList} />
                    })}
                </List>
            )}
        </>
    )
}