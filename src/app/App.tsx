import React from 'react';
import './App.css';
import {Header} from "../common/Header/Header";
import {Main} from "./Main";
import {ThemeProvider} from '@mui/material';
import {getTheme} from "../common/theme/theme";
import {useAppSelector} from "../common/hooks/hooks";
import {appThemeSelector} from "./app-selector";

function App() {
    const theme = useAppSelector(appThemeSelector)

    return (
        <div>
            <ThemeProvider theme={getTheme(theme)}>
                <Header/>
                <Main/>
            </ThemeProvider>
        </div>
    );
}

export default App;