import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { SignIn,SignUp,Dashboard } from "..";
import { ErrorPage } from "../error";

export const Routes = () => {

    const router = createBrowserRouter([
        {
            path: "/signin",
            element: <SignIn />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/signup",
            element: <SignUp />,
            errorElement: <ErrorPage />,
        },
        {
            element: <PrivateRoute />,
            path: "/",
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />
                }

            ]
        },

    ]
    );

    return <RouterProvider router={router} />
}

function PrivateRoute({ component: Component, ...rest }) {
    const auth = localStorage.getItem("auth")
        return auth  ? <>
            <Outlet />
        </> : <Navigate to="/signin" />
    
}
