import {createBrowserRouter, RouteObject} from "react-router";
import App from "../../app/App";
import {Login} from "../../feauteres/auth/ui/Login/Login";
import {Page404} from "../Page404/Page404";
import {Main} from "../../app/Main";
import {Faq} from "../Faq/Faq";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/hooks";
import {selectIsAuth} from "../../feauteres/auth/model/auth-selector";
import {useEffect} from "react";


export const Path = {
    Main: "/",
    Login: "login",
    NotFound: "*",
    Faq: "faq",
} as const

const publicRoutes: RouteObject[] = [
    {
        path: Path.Login,
        element: <Login/>,
    },
    {
        path: Path.NotFound,
        element: <Page404/>,
    },
]

const privateRoutes: RouteObject[] = [
    {
        path: Path.Main,
        element: <Main/>,
    },
    {
        path: Path.Faq,
        element: <Faq/>,
    },
]

export const PrivateRoutes = () => {
    const navigate = useNavigate();
    const isAuth = useAppSelector(selectIsAuth)

    useEffect(() => {
        if (!isAuth)
            navigate("/login")
    }, [isAuth])

    return <Outlet/>
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                element: <PrivateRoutes/>,
                children: privateRoutes,
            },
            ...publicRoutes,
        ],
    },
])




