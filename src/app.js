import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Orders from "./components/Header/components/Orders";
import Cart from "./components/Header/components/Cart";
import Error from "./components/ErrorHandler";
import Product from "./components/Body/components/product/getProduct";
import Login from "./components/Body/Login";
import Signup from "./components/Body/components/SignupForm";

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
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
