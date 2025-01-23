import React from 'react';
import {Paper} from "@mui/material";
import {TodolistDomain} from "../../../model/todolistSlice";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";

type Props = {
    todolist: TodolistDomain
}

export const Todolist: React.FC<Props> = ({todolist}) => {
    //dispatch fetch tasks

    return (
        <Paper sx={{width: 300, minHeight: 400, padding: '20px'}} elevation={1}>
            <TodolistTitle todolist={todolist}/>
            <Tasks todoList={todolist}/>
        </Paper>
    )
}