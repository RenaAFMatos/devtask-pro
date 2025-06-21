import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/home",
        element: 
            <PrivateRoute>
                <App />
            </PrivateRoute>,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
