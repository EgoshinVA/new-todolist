import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import React from "react"
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {Todolists} from "../feauteres/todolists/ui/Todolists/Todolists";
import {useAppDispatch} from "../common/hooks/hooks";
import {addTodoListTC} from "../feauteres/todolists/model/todolistSlice";

export const Main = () => {
    const dispatch = useAppDispatch()

    const addTodolistHandler = (title: string) => {
        dispatch(addTodoListTC(title))
    }

    return (
        <Container fixed>
            <Grid container sx={{ mb: "30px" }}>
                <AddItemForm addItem={addTodolistHandler} />
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}