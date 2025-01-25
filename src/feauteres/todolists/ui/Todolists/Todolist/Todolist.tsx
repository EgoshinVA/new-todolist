import React from 'react';
import {LinearProgress} from "@mui/material";
import {TodolistDomain} from "../../../model/todolistSlice";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {TodolistsFilter} from "./TodolistFilters/TodolistsFilter";
import {AddItemForm} from "../../../../../common/AddItemForm/AddItemForm";
import {useAppDispatch} from "../../../../../common/hooks/hooks";
import {addTaskTC} from "../../../model/tasksSlice";

type Props = {
    todoList: TodolistDomain
}

export const Todolist: React.FC<Props> = ({todoList}) => {
    const dispatch = useAppDispatch();

    const addTaskHandler = (title: string) => {
        dispatch(addTaskTC({title, todoListId: todoList.id}));
    }

    return (
        <>
            {todoList.entityStatus === 'loading' && <LinearProgress/>}
            <TodolistTitle todolist={todoList}/>
            <AddItemForm addItem={addTaskHandler} disabled={todoList.entityStatus === 'loading'}/>
            <Tasks todoList={todoList}/>
            <TodolistsFilter todoList={todoList}/>
        </>
    )
}