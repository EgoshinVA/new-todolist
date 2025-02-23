import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Checkbox, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "../../../../common/hooks/hooks";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../api/authApi";
import {ResultCode} from "../../../../common/enums/enums";
import {selectIsAuth, setAuth} from "../../../../app/appSlice";

export type Inputs = {
    email: string,
    password: string,
    rememberMe?: boolean,
}

export const Login = () => {
    const {
        register, handleSubmit, reset,
        formState: {errors},
    } = useForm<Inputs>()

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectIsAuth)
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth)
            navigate('/')
    }, [isAuth])

    const [login] = useLoginMutation()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        login(data).then((res) => {
            if (res.data?.resultCode === ResultCode.Success) {
                localStorage.setItem('sn-token', res.data.data.token)
                dispatch(setAuth(true))
            }
        }).finally(() => {
            reset()
        })
    }

    return (
        <div>
            <form style={{display: "flex", flexDirection: 'column', width: 300, margin: '0 auto'}}
                  onSubmit={handleSubmit(onSubmit)}>
                <TextField variant="outlined" {...register('email', {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Incorrect email address",
                    },
                })}/>
                {errors.email && <div className="error">{errors.email.message}</div>}
                <TextField variant="outlined" type={'password'} {...register('password', {
                    required: "Password is required",
                    minLength: {
                        value: 3,
                        message: "Password must be at least 3 characters long",
                    },
                })}/>
                {errors.password && <div className="error">{errors.password.message}</div>}
                <Checkbox {...register('rememberMe')}/>
                <Button type={"submit"} variant="contained">Submit</Button>
            </form>
        </div>
    )
}