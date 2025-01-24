import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {LinearProgress, Switch} from "@mui/material";
import {useAppDispatch} from "../hooks/hooks";
import {setTheme} from "../../app/appSlice";

export const Header = () => {
    const dispatch = useAppDispatch()

    const changeTheme = () => {
        dispatch(setTheme())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Logout</Button>
                    <Switch onClick={changeTheme}/>
                </Toolbar>
                {false && <LinearProgress/>}
            </AppBar>
        </Box>
    );
}
