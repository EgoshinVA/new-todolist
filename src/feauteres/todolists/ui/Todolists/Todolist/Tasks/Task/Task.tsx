import {Checkbox, ListItem} from '@mui/material';
import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import {EditableSpan} from '../../../../../../../common/EditableSpan/EditableSpan';
import {TodolistDomain} from "../../../../../model/todolistSlice";
import { TaskStatus } from '../../../../../../../common/enums/enums';
import {DomainTask} from "../../../../../model/tasksSlice";

type Props = {
    task: DomainTask
    todolist: TodolistDomain
}

export const Task: React.FC<Props> = ({todolist, task}) => {
    //dispatch change status
    //dispatch change title
    //dispatch remove task

    const disabled = todolist.entityStatus === 'loading'

    return (
        <ListItem key={task.id}>
            <div style={{ display: 'flex' }}>
                <Checkbox
                    checked={task.status === TaskStatus.Completed}
                    disabled={disabled}
                />
                <EditableSpan title={task.title} onChange={() => {}} disabled={disabled} />
            </div>
            <IconButton disabled={disabled}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}