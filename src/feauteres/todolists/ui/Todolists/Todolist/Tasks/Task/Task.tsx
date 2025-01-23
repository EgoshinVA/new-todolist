import {Checkbox, ListItem} from '@mui/material';
import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import {EditableSpan} from '../../../../../../../common/EditableSpan/EditableSpan';
import {TaskType} from "../../../../../model/tasksSlice";
import {TodolistDomain} from "../../../../../model/todolistSlice";

type Props = {
    task: TaskType
    todolist: TodolistDomain
}

export const Task: React.FC<Props> = ({todolist, task}) => {
    return (
        <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
            <div>
                <Checkbox
                    checked={task.status === TaskStatus.Completed}
                    onChange={changeTaskStatusHandler}
                    disabled={disabled}
                />
                <EditableSpan title={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
            </div>
            <IconButton onClick={removeTaskHandler} disabled={disabled}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}