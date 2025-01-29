import * as React from 'react';
import {useEffect, useState} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useAppSelector} from "../../hooks/hooks";
import {selectAppError} from "../../../app/appSlice";

export const ErrorSnackbar = () => {
    const [open, setOpen] = useState(false);
    const error = useAppSelector(selectAppError)

    useEffect(() => {
        if (error) setOpen(true);
    }, [error])

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={error}
                action={action}

            />
        </div>
    );
}
