import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import timeConverter from "../../util/timeConverter";
import ShimmerOrders from "../Shimmer/ShimmerOrders";

// const OrderItemCard = ({ title, quantity, productImage, price }) => {
//     return (
//         <div className="bg-white rounded-md shadow-md p-4 mb-4">
//             <img
//                 src={productImage[0]}
//                 alt="Product"
//                 className="w-full h-32 object-cover mb-4 rounded-md shadow-md"
//             />
//             <p className="text-lg font-semibold mb-2">{title.slice(0, 30) + "..."}</p>
//             <p className="mb-2">
//                 <strong>Quantity:</strong> {quantity}
//             </p>
//             <p>
//                 <strong>Price:</strong> ₹{price}
//             </p>
//         </div>
//     );
// };

const OrderItemCard = ({ title, quantity, productImage, price }) => {
    return (
        <div className="border border-gray-100 bg-white shadow-md  hover:border-blue-500 hover:rounded hover:border-1 hover:duration-300 hover:ease-in-out rounded-md p-4 mb-4">
            <div className="aspect-w-3 aspect-h-4 mb-4">
                <img
                    src={productImage[0]}
                    alt="Product"
                    className="object-cover w-full h-full rounded-md "
                />
            </div>
            <p className="text-base font-semibold mb-2">{title.slice(0, 30) + "..."}</p>
            <p className="mb-2 text-gray-700 font-semibold">
                Qty: <span className="text-blue-700">{quantity}</span> 
            </p>
            <p>
                <span className="text-green-700 font-semibold">₹{price}</span>
            </p>
        </div>
    );
};


const OrderDetails = ({ status, orderdedDate, totalPrice }) => {
    const getStatusColor = () => {
        switch (status) {
            case "pending":
                return "text-blue-500";
            case "completed":
                return "text-green-500";
            case "cancelled":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="bg-indigo-50 text-gray-800 p-4 mb-4 border-white border-4">
            <h2 className="text-lg font-medium text-center mb-4 text-blue-700">Order Details</h2>
            <div className="grid grid-cols-2 gap-2">
                <p className="flex items-center">
                    <span className="font-medium  text-gray-700">Status:</span>{" "}
                    <span className={`ml-2 font-normal ${getStatusColor()}`}>{status}</span>
                </p>
                <p className="flex items-center">
                    <span className="font-medium  text-gray-700">Total Price:</span> <span className="ml-2 font-semibold text-green-700">₹{totalPrice}</span>
                </p>
                <p className="flex items-center">
                    <span className="font-medium  text-gray-700">Ordered Date:</span>{" "}
                    <span className="ml-2 font-semibold">{orderdedDate.slice(0, 10)}</span>
                </p>
                <p className="flex items-center">
                    <span className="font-medium  text-gray-700">Ordered Time:</span>{" "}
                    <span className="ml-2 font-semibold">{timeConverter(orderdedDate.slice(11, 16))}</span>
                </p>
            </div>
        </div>
    );
};

const Order = ({ status, orderdedDate, totalPrice, items }) => {
    return (
        <div className="max-w-3xl mx-auto my-8">
            <div className="bg-white border-white border-4 rounded-md overflow-hidden shadow-md">
                <OrderDetails status={status} orderdedDate={orderdedDate} totalPrice={totalPrice} />
                <div className="p-4 bg-indigo-100 border-white border-4">
                    <h2 className="text-lg font-medium text-center mb-4 text-slate-700">Items</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {items.map((item, index) => (
                            <OrderItemCard key={index} {...item.orderedProductId} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main
const Orders = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const cUserId = cookies.get("User");

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const response = await axios.get(process.env.backendapi + `/user/${cUserId}/orders`, {
                withCredentials: true,
            });
            setOrders(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return !cUserId ? (
        navigate("/login")
    ) : !orders || orders.length === 0 ? (
        <ShimmerOrders />
    ) : (
        <div className="sm:px-8 bg-gray-50 p-4">
            <p className="text-center text-2xl font-bold text-gray-800 mb-8">Your Orders</p>
            {orders.map((order, index) => (
                <Link to={"/user/order/" + order._id} key={index}>
                    <Order {...order} />
                </Link>
            ))}
        </div>
    );
};

export default Orders;
