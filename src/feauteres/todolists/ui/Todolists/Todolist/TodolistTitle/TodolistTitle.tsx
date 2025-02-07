import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {useRemoveTodoMutation, useUpdateTodoMutation} from "../../../../api/todolistsApi";
import {DomainTodolist} from "../../../../api/todolistsApi.types";

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle: React.FC<Props> = ({todolist}) => {
    const {title, id, entityStatus} = todolist

    const [removeTodolist] = useRemoveTodoMutation()
    const [updateTodolist] = useUpdateTodoMutation()

    const deleteTodolistHandler = () => {
        removeTodolist(id)
    }

    const updateTodolistTitle = (title: string) => {
        updateTodolist({title, todoListId: todolist.id})
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