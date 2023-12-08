import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import dotenv from "dotenv"
require("dotenv").config();

import TestComp from "./components/Test/TestJsx";

import Header from "./components/Header/Header";

import Search from "./components/Body/Search";

import Body from "./components/Body/Body";
import Orders from "./components/Body/Orders";
import Cart from "./components/Body/Cart";
import Product from "./components/Body/getProduct";
import Login from "./components/forms/Login";
import Signup from "./components/forms/SignupForm";
import VendorSignup from "./components/forms/VendorSignup";
import User from "./components/Body/User";
import ResetPassword from "./components/Body/ResetPassword";
import ForgotPassword from "./components/forms/ForgotPassword";
import Wishlist from "./components/Body/user/Wishlist";


import Footer from "./components/Footer/Footer";
import ConnectUs from "./components/Body/ConnectUs";
import CreateOrder from "./components/Body/CreateOrder";
import Order from "./components/Body/Order";
import Admin from "./components/Body/Admin";
import AdminOrders from "./components/Body/AdminOrders";
import AdminOrder from "./components/Body/AdminOrder";
import AdminProducts from "./components/Body/AdminProducts";
import CreateProduct from "./components/Body/vendor/VendorCreateProduct";
import ProductDetails from "./components/Body/AdminProduct";
import AboutUs from "./components/Body/AboutUs";
import TestCss from "./components/Test/TestCss";

import VendorHomePage from "./components/Body/vendor/VendorHomePage";
import VendorProfile from "./components/Body/vendor/vendorProfile";
import VendorOrdersPage from "./components/Body/vendor/VendorOrders";
import VendorOrder from "./components/Body/vendor/VendorOrder";
import VendorProductsPage from "./components/Body/vendor/VendorProducts";
import VendorProductDetailsPage from "./components/Body/vendor/VendorProduct";
import Advertisements from "./components/Body/vendor/Advertisements";
import Advertisement from "./components/Body/vendor/Advertisement";
import Userlist from "./components/Body/Admin/Userlist";

import Sessions from "./components/Body/reports/LoginLogoutSessions";
import UserSessions from "./components/Body/reports/user reports/userSessions";
import RegisteredUsers from "./components/Body/reports/user reports/registeredUsers";
import UsersSpendings from "./components/Body/reports/user reports/usersSpendings";
import UserOrders from "./components/Body/reports/user reports/userOrders";
import UserReviews from "./components/Body/reports/user reports/userReviews";

import VendorSessions from "./components/Body/reports/vendor/vendorSessions";
import VendorOrders from "./components/Body/reports/vendor/ordersVendor";
import ProductInventory from "./components/Body/reports/vendor/productInvenotory";

import TotalOrders from "./components/Body/reports/order reports/TotalOrders";
import OrderByStatus from "./components/Body/reports/order reports/OrderStatus";

import SellersTotalAds from "./components/Body/reports/advertisemet reports/SellerTotalAds";
import AdsByApproved from "./components/Body/reports/advertisemet reports/AdsByApproved";
import ClicksPerAdsByDays from "./components/Body/reports/advertisemet reports/ClicksPerAd";
import OrderedProducts from "./components/Body/reports/user reports/userOrderedProducts";

const AppLayout = () => {
    return (
        <React.Fragment>
            <Header />
            <Search/>
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
            { path: "/product/:id", element: <Product /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/vendorSignup", element: <VendorSignup /> },
            { path: "/user/account", element: <User /> },
            { path: "/contactus", element: <ConnectUs /> },
            { path: "/aboutus", element: <AboutUs /> },
            {path: "/wishlist", element: <Wishlist />},

            { path: "/reset/:usertype/:userId/resetpassword/:token", element: <ResetPassword /> },
            { path: "/request/resetpassword", element: <ForgotPassword /> },

            { path: "/user/create/order/", element: <CreateOrder /> },
            { path: "/user/order/:orderedProductId", element: <Order /> },

            { path: "/admin", element: <Admin /> },
            { path: "/admin/orders", element: <AdminOrders /> },
            { path: "/admin/order/:orderId", element: <AdminOrder /> },

            { path: "/vendor/create/product", element: <CreateProduct /> },
            { path: "/vendor/profile", element: <VendorProfile /> },
            { path: "/vendor/orders", element: <VendorOrdersPage /> },
            { path: "/vendor/order/:orderId", element: <VendorOrder /> },
            { path: "/vendor/products", element: <VendorProductsPage /> },
            { path: "/vendor/product/:productId", element: <VendorProductDetailsPage /> }, 
            { path: "/vendor/advertisements", element: <Advertisements /> }, 
            { path: "/vendor/advertisement", element: <Advertisement /> }, 



            { path: "/admin/products/summery", element: <AdminProducts /> },
            { path: "/admin/users", element: <Userlist /> },

            { path: "/admin/product/:productId", element: <ProductDetails /> },

            { path: "/vendor", element: <VendorHomePage /> },

            {path:"/sessions/every",element:<Sessions/>},

            {path:"/sessions/users",element:<UserSessions/>},
            {path:"/registered/users",element:<RegisteredUsers/>},
            {path:"/spendigns/users",element:<UsersSpendings/>},
            {path:"/users/orderes/",element:<UserOrders/>},
            {path:"/users/order/:orderId/products",element:<OrderedProducts/>},

            {path:"/reviews/user/:userId",element:<UserReviews/>},

            {path:"/sessions/vendors/",element:<VendorSessions/>},
            {path:"/orders/vendor/:vendorId/", element:<VendorOrders/>},
            {path:"/vendor/products/:vendorId",element:<ProductInventory/>},

            {path:"/orders/total",element:<TotalOrders/> },
            {path:"/orders/by/status", element:<OrderByStatus/>},

            {path:"/total/advertisements/",element:<SellersTotalAds/>,},
            {path:"/advertisement/byaprroved/", element:<AdsByApproved/>},
            {path:"/advertisement/:advertisementId/clicks",element:<ClicksPerAdsByDays/>},



            { path: "/testcss", element: <TestCss /> },

            {path: "/testcomp", element: <TestComp />} 
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
