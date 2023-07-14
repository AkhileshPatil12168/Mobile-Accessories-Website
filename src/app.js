import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "./components/Header/Header";

import Body from "./components/Body/Body";
import Orders from "./components/Body/Orders";
import Cart from "./components/Body/Cart";
import Product from "./components/Body/getProduct";
import Login from "./components/forms/Login";
import Signup from "./components/forms/SignupForm";
import User from "./components/Body/User";
import ResetPassword from "./components/Body/ResetPassword";
import ForgotPassword from "./components/forms/ForgotPassword";

import Footer from "./components/Footer/Footer";
import ConnectUs from "./components/Body/ConnectUs";
import CreateOrder from "./components/Body/CreateOrder";
import Order from "./components/Body/Order";
import Admin from "./components/Body/Admin";
import AdminOrdersPage from "./components/Body/AdminOrders";


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
            { path: "/connect", element: <ConnectUs /> },
            { path: "/reset/:usertype/:userId/resetpassword/:token", element: <ResetPassword /> },
            { path: "/request/resetpassword", element: <ForgotPassword /> },
            { path: "/user/create/order/", element: <CreateOrder /> },
            { path: "/user/order/:orderId", element: <Order /> },

            {path: "/admin", element:<Admin />},
            {path : "/admin/orders/" ,element : <AdminOrdersPage/>} 
        

        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
