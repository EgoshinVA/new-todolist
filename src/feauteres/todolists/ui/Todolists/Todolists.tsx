import React, {useEffect} from 'react';
import {Todolist} from "./Todolist/Todolist";
import {fetchTodosTC, todolistsSelector} from "../../model/todolistSlice";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {Paper} from '@mui/material';

export const Todolists = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodosTC())
    }, []);

    const todolists = useAppSelector(todolistsSelector)

    return (
        <>
            {todolists.map((tl) => {
                return (
                    <Paper key={tl.id} sx={{p: "0 20px 20px 20px"}}>
                        <Todolist key={tl.id} todoList={tl}/>
                    </Paper>
                )
            })}
        </>
    )
}