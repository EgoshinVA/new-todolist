import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {Paper} from '@mui/material';
import {useGetTodosQuery} from "../../api/todolistsApi";

export const Todolists = () => {
    const {data} = useGetTodosQuery()

    return (
        <>
            {data?.map((tl) => {
                return (
                    <Paper key={tl.id} sx={{p: "0 20px 20px 20px"}}>
                        <Todolist key={tl.id} todoList={tl}/>
                    </Paper>
                )
            })}
        </>
    )
}