import {Checkbox, ListItem} from '@mui/material';
import React, {ChangeEvent} from 'react';
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import {TodolistDomain} from "../../../../../model/todolistSlice";
import {TaskStatus} from '../../../../../../../common/enums/enums';
import {deleteTask, updateTask} from "../../../../../model/tasksSlice";
import {useAppDispatch} from "../../../../../../../common/hooks/hooks";
import {DomainTask} from "../../../../../api/tasksApi.types";

type Props = {
    task: DomainTask
    todolist: TodolistDomain
}

export const Task: React.FC<Props> = ({todolist, task}) => {
    const dispatch = useAppDispatch();

    const updateTaskTitle = (title: string) => {
        dispatch(updateTask({taskId: task.id, todoListId: todolist.id, task: {title}}))
    }

    const updateTaskStatus = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const status = checked ? TaskStatus.Completed : TaskStatus.New;
        dispatch(updateTask({taskId: task.id, todoListId: todolist.id, task: {status}}))
    }

    const deleteTaskHandler = () => {
        dispatch(deleteTask({todoListId: todolist.id, taskId: task.id}));
    }

    const disabled = todolist.entityStatus === 'loading'

    return (
        <ListItem key={task.id} sx={{padding: 0, height: '40px'}}>
            <div style={{display: 'flex'}}>
                <Checkbox
                    checked={task.status === TaskStatus.Completed}
                    disabled={disabled}
                    onChange={updateTaskStatus}
                />
                <EditableSpan title={task.title} onChange={updateTaskTitle} disabled={disabled}/>
            </div>
            <IconButton onClick={deleteTaskHandler} disabled={disabled}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}