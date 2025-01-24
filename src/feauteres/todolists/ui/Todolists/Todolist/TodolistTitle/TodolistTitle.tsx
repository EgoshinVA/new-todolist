import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import React from 'react';
import {EditableSpan} from "../../../../../../common/EditableSpan/EditableSpan";
import {deleteTodoListTC, TodolistDomain, updateTodolistTitleTC} from "../../../../model/todolistSlice";
import {useAppDispatch} from "../../../../../../common/hooks/hooks";

type Props = {
    todolist: TodolistDomain
}

export const TodolistTitle: React.FC<Props> = ({todolist}) => {
    const {title, id, entityStatus} = todolist
    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => {
        dispatch(deleteTodoListTC(id))
    }

    const updateTodolistTitle = (title: string) => {
        dispatch(updateTodolistTitleTC({title, todoListId: todolist.id}))
    }

    return (
        <div style={{display: 'flex'}}>
            <EditableSpan title={title} onChange={updateTodolistTitle} disabled={entityStatus === "loading"}/>
            <IconButton onClick={deleteTodolistHandler} disabled={entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}