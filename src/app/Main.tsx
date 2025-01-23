import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid2"
import React from "react"
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {Todolists} from "../feauteres/todolists/ui/Todolists/Todolists";

export const Main = () => {
    return (
        <Container fixed>
            <Grid container sx={{ mb: "30px" }}>
                <AddItemForm addItem={() => {}} />
            </Grid>
            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    )
}
