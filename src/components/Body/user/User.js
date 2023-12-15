import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import noProfile from "../../../images/noProfile.svg";

const User = () => {
    const cookies = new Cookies();
    const cUserId = cookies.get("User");

    const [data, setData] = useState(null);

    const getData = async () => {
        try {
            let response = await axios.get(process.env.backendapi+`/user/${cUserId}/profile`, {
                withCredentials: true,
            });

            console.log(response.data.data);
            setData(response.data.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    console.log(data?.profileImage);
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow">
            <h1 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Account details </h1>

            <div className="cart-item mb-4 flex items-center p-4 bg-white border border-gray-300 rounded">
                <img
                    src={data?.profileImage ? data?.profileImage : noProfile}
                    alt="Profile Image"
                    className="w-20 h-20 mr-4 rounded"
                />
                <div className="cart-item-details">
                    <h3 className="text-xl font-bold mb-2">
                        {data?.fname} {data?.lname}
                    </h3>
                    <p className="text-gray-600 mb-1">Email: {data?.email}</p>
                    <p className="text-gray-600 mb-1">Phone: {data?.phone}</p>
                </div>
            </div>

            <div className="mb-4max-w-sm mx-auto mb-4">
                <label htmlFor="shippingAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Shipping Address
                </label>
                <textarea
                    id="shippingAddress"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    rows="4"
                    value={`${data?.address?.shipping?.street || ""}, ${
                        data?.address?.shipping?.city || ""
                    }, ${data?.address?.shipping?.pincode || ""}`}
                    readOnly
                ></textarea>
            </div>

            <div className="mb-4max-w-sm mx-auto mb-4">
                <label htmlFor="billingAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Billing Address
                </label>
                <textarea
                    id="billingAddress"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    rows="4"
                    value={`${data?.address?.billing?.street || ""}, ${
                        data?.address?.billing?.city || ""
                    }, ${data?.address?.billing?.pincode || ""}`}
                    readOnly
                ></textarea>
            </div>

            <div className="flex justify-end">
                <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Delete Account
                </button>
                <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Update Details
                </button>
            </div>
        </div>
    );
};

export default User;
