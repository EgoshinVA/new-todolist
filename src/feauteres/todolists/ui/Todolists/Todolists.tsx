import React, {useEffect} from 'react';
import {Todolist} from "./Todolist/Todolist";
import {fetchTodosTC} from "../../model/todolistSlice";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {todolistsSelector} from "../../model/todolists-selector";

export const Todolists = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTodosTC())
    }, []);

    const todolists = useAppSelector(todolistsSelector)

    return (
        <div style={{display: 'flex', gap: '10px'}}>
            {todolists.length > 0 && todolists.map(tl => <Todolist key={tl.id} todoList={tl}/>)}

        </div>
    )
}