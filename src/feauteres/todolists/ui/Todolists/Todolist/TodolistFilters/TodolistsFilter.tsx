import {ButtonGroup} from '@mui/material';
import React from 'react';
import Button from "@mui/material/Button";
import {DomainTodolist, Filter} from "../../../../api/todolistsApi.types";

type Props = {
    todoList: DomainTodolist
}

export const TodolistsFilter: React.FC<Props> = ({todoList}) => {
    const changeFilterHandler = (filter: Filter) => {
        //dispatch(changeFilter({todoListId: todoList.id, filter}))
    }

    const getActiveButton = (filter: Filter) => {
        return todoList.filter === filter ? 'error' : 'primary'
    }

    return (
        <div>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button color={getActiveButton('all')} onClick={() => changeFilterHandler('all')}>All</Button>
                <Button color={getActiveButton('active')} onClick={() => changeFilterHandler('active')}>Active</Button>
                <Button color={getActiveButton('completed')} onClick={() => changeFilterHandler('completed')}>Completed</Button>
            </ButtonGroup>
        </div>
    )
}