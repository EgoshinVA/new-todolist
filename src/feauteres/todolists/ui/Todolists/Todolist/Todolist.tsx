import React from 'react';
import {Paper} from "@mui/material";
import {TodolistDomain} from "../../../model/todolistSlice";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {TodolistsFilter} from "./TodolistFilters/TodolistsFilter";
import {AddItemForm} from "../../../../../common/AddItemForm/AddItemForm";

type Props = {
    todoList: TodolistDomain
}

export const Todolist: React.FC<Props> = ({todoList}) => {
    return (
        <Paper sx={{width: 300, minHeight: 400, padding: '20px'}} elevation={1}>
            <TodolistTitle todolist={todoList}/>
            <AddItemForm addItem={() => {}}/>
            <Tasks todoList={todoList}/>
            <TodolistsFilter todoList={todoList}/>
        </Paper>
    )
}