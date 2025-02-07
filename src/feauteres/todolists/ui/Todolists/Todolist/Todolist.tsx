import React from 'react';
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";
import {TodolistsFilter} from "./TodolistFilters/TodolistsFilter";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {DomainTodolist} from "../../../api/todolistsApi.types";
import {useAddTaskMutation} from "../../../api/tasksApi";

type Props = {
    todoList: DomainTodolist
}

export const Todolist: React.FC<Props> = ({todoList}) => {
    const [addTask] = useAddTaskMutation()

    const addTaskHandler = (title: string) => {
        addTask({title, todoListId: todoList.id})
    }

    return (
        <>
            <TodolistTitle todolist={todoList}/>
            <AddItemForm addItem={addTaskHandler} disabled={todoList.entityStatus === 'loading'}/>
            <Tasks todoList={todoList}/>
            <TodolistsFilter todoList={todoList}/>
        </>
    )
}