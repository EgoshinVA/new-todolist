import {Checkbox, ListItem} from '@mui/material';
import React, {ChangeEvent} from 'react';
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import {EditableSpan} from '../../../../../../../common/components/EditableSpan/EditableSpan';
import {TaskStatus} from '../../../../../../../common/enums/enums';
import {DomainTask, UpdateTask} from "../../../../../api/tasksApi.types";
import {DomainTodolist} from "../../../../../api/todolistsApi.types";
import {useRemoveTaskMutation, useUpdateTaskMutation} from "../../../../../api/tasksApi";

type Props = {
    task: DomainTask
    todolist: DomainTodolist
}

export const Task: React.FC<Props> = ({todolist, task}) => {
    const [removeTask] = useRemoveTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const updateTaskTitle = (title: string) => {

        const newTask: UpdateTask = {
            title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        updateTask({taskId: task.id, todoListId: todolist.id, task: newTask})
    }

    const updateTaskStatus = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const status = checked ? TaskStatus.Completed : TaskStatus.New;

        const newTask: UpdateTask = {
            title: task.title,
            description: task.description,
            status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
        }

        updateTask({taskId: task.id, todoListId: todolist.id, task: newTask})
    }

    const deleteTaskHandler = () => {
        removeTask({todoListId: todolist.id, taskId: task.id})
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