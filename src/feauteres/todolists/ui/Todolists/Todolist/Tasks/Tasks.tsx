import React from 'react';
import {TasksType} from "../../../../model/tasksSlice";
import {List} from "@mui/material";
import {Task} from "./Task/Task";
import {TodolistDomain} from "../../../../model/todolistSlice";

type Props = {
    todolist: TodolistDomain
}

export const Tasks: React.FC<Props> = ({todolist}) => {
    //tasks = select

    const tasks: TasksType = {
        ['1']: [
            {id: '1', title: 'Task 1', completed: false},
            {id: '2', title: 'Task 2', completed: true},
            {id: '3', title: 'Task 3', completed: false},
        ],
        ['2'] : [
            {id: '43', title: 'Ta2342 1', completed: false},
            {id: '23423', title: 'Ta4444k 2', completed: true},
        ]
    }

    return (
        <div>
            <List>
                {tasks[todolist.id].map(t => <Task task={t} todolist={todolist}/>)}
            </List>
        </div>
    )
}