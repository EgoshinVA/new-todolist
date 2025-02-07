import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import React from "react"
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import {Todolists} from "../feauteres/todolists/ui/Todolists/Todolists";
import {useAppSelector} from "../common/hooks/hooks";
import {selectAppStatus} from "./appSlice";
import {useAddTodoMutation} from "../feauteres/todolists/api/todolistsApi";

export const Main = () => {
    const status = useAppSelector(selectAppStatus)

    const [addTodolist] = useAddTodoMutation()

    const addTodolistHandler = (title: string) => {
        addTodolist(title)
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: "30px" }}>
                <AddItemForm addItem={addTodolistHandler} disabled={status === 'loading'}/>
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}