import React from 'react';
import {List} from "@mui/material";
import {Task} from "./Task/Task";
import {TaskStatus} from "../../../../../../common/enums/enums";
import {DomainTodolist} from "../../../../api/todolistsApi.types";
import {useGetTasksQuery} from "../../../../api/tasksApi";

type Props = {
    todoList: DomainTodolist
}

export const Tasks: React.FC<Props> = ({todoList}) => {
    const {data} = useGetTasksQuery(todoList.id)

    let tasksForTodolist = data?.items

    if (todoList.filter === "active") {
        tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
    }

    if (todoList.filter === "completed") {
        tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
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