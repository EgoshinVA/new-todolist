import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import React from 'react';
import {EditableSpan} from "../../../../../../common/EditableSpan/EditableSpan";
import {TodolistDomain} from "../../../../model/todolistSlice";

type Props = {
    todolist: TodolistDomain
}

export const TodolistTitle: React.FC<Props> = ({todolist}) => {
    const {title, id, entityStatus} = todolist
    //dispatch update title
    //dispatch delete todolist

    return (
        <div style={{display: 'flex'}}>
            <EditableSpan title={title} onChange={() => {}} disabled={entityStatus === "loading"}/>
            <IconButton onClick={() => {}} disabled={entityStatus === "loading"}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}