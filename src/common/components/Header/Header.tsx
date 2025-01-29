import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {LinearProgress, Switch} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {selectAppStatus, setTheme} from "../../../app/appSlice";
import {logoutTC} from "../../../feauteres/auth/model/authSlice";

export const Header = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectAppStatus)

    const changeTheme = () => {
        dispatch(setTheme())
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button onClick={logoutHandler} color="inherit">Logout</Button>
                    <Switch onClick={changeTheme}/>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
        </Box>
    );
}
