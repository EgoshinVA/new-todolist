import React, {useEffect, useState} from 'react';
import './App.css';
import {Header} from "../common/components/Header/Header";
import {CircularProgress, CssBaseline, ThemeProvider} from '@mui/material';
import {getTheme} from "../common/theme/theme";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {Outlet} from "react-router-dom";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {appThemeSelector, setAuth} from "./appSlice";
import {useAuthMeQuery} from "../feauteres/auth/api/authApi";
import {ResultCode} from "../common/enums/enums";

function App() {
    const theme = useAppSelector(appThemeSelector)
    const dispatch = useAppDispatch();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    const {data, isLoading} = useAuthMeQuery()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.Success)
                dispatch(setAuth(true))
        }
    }, [data, isLoading])

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