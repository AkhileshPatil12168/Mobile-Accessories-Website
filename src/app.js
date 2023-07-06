import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet  } from "react-router-dom";

import Header from "./components/Header/Header";

import Body from "./components/Body/Body"
import Orders from "./components/Body/Orders"
import Cart from "./components/Body/Cart"
import Product from "./components/Body/getProduct"
import Login from "./components/forms/Login"
import Signup from "./components/forms/SignupForm"
import User from "./components/Body/User"

import Footer from "./components/Footer/Footer"
import ConnectUs from "./components/Body/ConnectUs";

const AppLayout = () => { 
    return (
        <React.Fragment>
            <Header />
            <Outlet />
            <Footer />
        </React.Fragment>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            { path: "/", element: <Body /> },
            { path: "/orders", element: <Orders /> },
            { path: "/cart", element: <Cart /> },
            { path: "/products/:id", element: <Product /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/user/account", element: <User /> },
            {path: "/connect", element: <ConnectUs /> }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
