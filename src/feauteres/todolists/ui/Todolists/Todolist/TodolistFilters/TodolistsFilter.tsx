import {ButtonGroup} from '@mui/material';
import React from 'react';
import Button from "@mui/material/Button";
import {changeFilter, FilterType, TodolistDomain} from "../../../../model/todolistSlice";
import {useAppDispatch} from "../../../../../../common/hooks/hooks";

type Props = {
    todoList: TodolistDomain
}

export const TodolistsFilter: React.FC<Props> = ({todoList}) => {
    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterType) => {
        dispatch(changeFilter({todoListId: todoList.id, filter}))
    }


    const getActiveButton = (filter: FilterType) => {
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