import { useState, useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import timeConverter from "../../util/timeConverter";
import ShimmerOrders from "../Shimmer/ShimmerOrders";

const Items = (props) => {
    const { title, quantity, productImage, price } = props;
    return (
        <>
            <div className="flex ">
                <div className="border border-gray-300 rounded p-2 mr-4 flex-shrink-0 w-48 bg-white h-[28vh]">
                    <img src={productImage[0]} alt="Product Image" className="w-16 h-16 mb-2" />
                    <p className="mb-2">
                        <strong>Title:</strong> {title.slice(0, 30) + "..."}
                    </p>
                    <p className="mb-2">
                        <strong>Quantity:</strong> {quantity}
                    </p>
                    <p className="mb-2">
                        <strong>Price:</strong> ₹{price}
                    </p>
                </div>
            </div>
        </>
    );
};
const OrderDetails = (props) => {
    const { status, orderdedDate, totalPrice } = props;
    const [color, setColor] = useState("");

    

    useEffect(() => {
        if (status == "pending") setColor("text-blue-500");
        else if (status == "completed") setColor("text-green-500");
        else if (status == "cancelled") setColor("text-red-500");
    }, [props]);

    return (
        <>
            <div className="bg-blue-200 p-2 rounded-t-lg">
                <h2 className="text-lg font-bold text-center">Order Details</h2>
            </div>
            <div className="p-4 ">
                <p className="mb-2 flex ">
                    <strong>Status:</strong> <p className={`${color} pl-1`}> {status}</p>
                </p>
                <p className="mb-2">
                    <strong>Total Price:</strong> ₹{totalPrice}
                </p>
                <p className="mb-2">
                    <strong>Ordered Date:</strong> {orderdedDate.slice(0, 10)}
                </p>
                <p className="mb-2">
                    <strong>Ordered Time:</strong> {timeConverter(orderdedDate.slice(11, 16))}
                </p>
            </div>
        </>
    );
};
const Order = (props) => {
    const { status, orderdedDate, totalPrice, items } = props;
    return (
        <>
            <div className="flex m-2 min-h-[40vh] ">
                <div className="border border-gray-300 rounded p-4 flex-shrink-0 mr-4 w-[51vh] ">
                    <OrderDetails
                        status={status}
                        orderdedDate={orderdedDate}
                        totalPrice={totalPrice}
                    />
                </div>

                <div className="border border-gray-300 rounded p-4   overflow-x-auto w-full ">
                    <div className="bg-blue-200 p-2 rounded-t-lg w-full ">
                        <h2 className="text-lg font-bold text-center ">Items</h2>
                    </div>
                    <div className="p-2   bg-gray-200">
                        <div className="flex  w-full overflow-x-auto">
                            {items.map((item) => {
                                return <Items {...item} key={item.productId} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Orders = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const cUserId = cookies.get("user");

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
    ) : !orders || orders.length == 0 ? (
        <ShimmerOrders />
    ) : (
        <div className="px-20">
            <p className="text-center text-lg font-bold">orders</p>
            {orders.map((order, index) => {
                return (
                    <Link to={"/user/order/" + order._id}>
                        <Order {...order} key={index} />
                    </Link>
                );
            })}
        </div>
    );
};

export default Orders;
