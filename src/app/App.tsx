import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../common/components/Header/Header";
import {CircularProgress, CssBaseline, ThemeProvider} from '@mui/material';
import {getTheme} from "../common/theme/theme";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {Outlet} from "react-router-dom";
import {authMeTC, selectIsInitialized} from "../feauteres/auth/model/authSlice";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {appThemeSelector} from "./appSlice";

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