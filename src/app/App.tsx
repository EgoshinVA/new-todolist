import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../common/Header/Header";
import {CircularProgress, CssBaseline, ThemeProvider} from '@mui/material';
import {getTheme} from "../common/theme/theme";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {appThemeSelector} from "./app-selector";
import {Outlet} from "react-router-dom";
import {authMeTC} from "../feauteres/auth/model/authSlice";
import {selectIsInitialized} from "../feauteres/auth/model/auth-selector";
import {ErrorSnackbar} from "../common/ErrorSnackbar/ErrorSnackbar";

function App() {
    const theme = useAppSelector(appThemeSelector)
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(selectIsInitialized)

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    if (!isInitialized)
        return <CircularProgress style={{height: "50%", width: "50%"}}/>

    return (
        <ThemeProvider theme={getTheme(theme)}>
            <CssBaseline/>
            <Header/>
            <Outlet/>
            <ErrorSnackbar/>
        </ThemeProvider>
    );
}

export default App;