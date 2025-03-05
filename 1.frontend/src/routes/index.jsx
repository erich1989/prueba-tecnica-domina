import { createBrowserRouter } from "react-router-dom";

import LayoutUser from "../layout/layoutUser";
import LayoutAdmin from "../layout/layoutAdmin";
import PagesAdmin from "../pages/admin/pages";
import FormLogin from "../pages/login";
import Register from "../pages/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutUser />,
        children: [
            {
                path: "/",
                element: <FormLogin />
            },
            {
                path: "/login",
                element: <FormLogin />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ]
    },

    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            {
                path: "/admin",
                element: <PagesAdmin />,
            },
        ]
    },

])

export default router;