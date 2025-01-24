import React from 'react';
import './App.css';
import {Header} from "../common/Header/Header";
import {ThemeProvider} from '@mui/material';
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "../common/hooks/hooks";
import {appThemeSelector} from "./app-selector";
import {Outlet} from "react-router-dom";

function App() {
    const theme = useAppSelector(appThemeSelector)

    return (
        <div>
            <ThemeProvider theme={getTheme(theme)}>
                <Header/>
                <Outlet/>
            </ThemeProvider>
        </div>
    );
}

export default App;