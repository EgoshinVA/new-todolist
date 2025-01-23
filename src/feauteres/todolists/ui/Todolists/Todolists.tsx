import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {TodolistDomain} from "../../model/todolistSlice";

export const Todolists = () => {
    //dispatch(fetch todolists)
    //todolists = select
    //map todolists

    const todolists: TodolistDomain[] = [
        {id: '1', title: 'first', addedDate: '', entityStatus: 'idle', filter: 'all', order: 0},
        {id: '2', title: 'second', addedDate: '', entityStatus: 'idle', filter: 'all', order: 0},
    ]

    return (
        <div style={{display: 'flex', gap: '10px'}}>
            {todolists.map(tl => <Todolist todolist={tl}/>)}

        </div>
    )
}