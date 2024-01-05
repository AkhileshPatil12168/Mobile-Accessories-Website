import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const VendorHomePage = ()=>{
    const cookies = new Cookies();
    const cToken = cookies.get("token");
    const cVendorId = cookies.get("Vendor");

    return (
        <div className="flex flex-wrap justify-center">
            {/* <Link to={cToken && cVendorId ? "/admin/users/" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Users</h2>
                </div>
            </Link> */}

            <Link to={cToken && cVendorId ? "/vendor/orders/" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Orders</h2>
                </div>
            </Link>

            <Link to={cToken && cVendorId ? "/vendor/products/" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Products</h2>
                </div>
            </Link>
            <Link to={cToken && cVendorId ? "/vendor/create/product" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Add Product</h2>
                </div>
            </Link>
            <Link to={cToken && cVendorId ? "/vendor/advertisement/create" : "/login"}>
                <div className="bg-blue-200 p-4 m-2 rounded-lg w-64">
                    <h2 className="text-lg font-bold text-center">Create Advertisement</h2>
                </div>
            </Link>
        </div>
    )
}

export default VendorHomePage