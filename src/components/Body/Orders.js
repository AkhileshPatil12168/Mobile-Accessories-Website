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

const OrderItemCard = ({ title, quantity, productImage, price ,_id,OrderStatus}) => {
    return (
        <Link to={"/user/order/"+_id }>
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
            <p>Status: {OrderStatus}</p>
        </div>
        </Link>
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
                {/* <p className="flex items-center">
                    <span className="font-medium  text-gray-700">Status:</span>{" "}
                    <span className={`ml-2 font-normal ${getStatusColor()}`}>{status}</span>
                </p> */}
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

const Order = ({ status, orderdedDate, totalPrice,userId, items,setOrderResponse,_id}) => {
   
    // const [orderResponse, setOrderResponse] = useState();
    console.log(userId)
    const deleteOrder = async () => {
        try {
            const response = await axios.delete(
                process.env.backendapi+`/user/${userId}/order/deleteorder/${_id}`,
                { withCredentials: true }
            );
            const responseStatus = response.status;
            
            if(responseStatus==204)
            setOrderResponse(responseStatus);
        } catch (error) {
            console.log(error);
        }
    };

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
                    <div className="pr-2">
                        {console.log(items.every((product)=>product.orderedProductId.OrderStatus != "pending"))}
              {
                (items.every((product)=>product.orderedProductId.OrderStatus != "pending")? <button
                onClick={() => deleteOrder()}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
              >
                Delete Order
              </button>:<></>)
              }
              
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
    const [orderResponse, setOrderResponse] = useState();
   
    

    const getOrders = async () => {
        try {
            const response = await axios.get(process.env.backendapi + `/user/${cUserId}/orders`, {
                withCredentials: true,
            });
            setOrders(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    

    useEffect(() => {
        getOrders();
    }, [orderResponse]);

    return !cUserId ? (
        navigate("/login")
    ) : !orders || orders.length === 0 ? (
        <ShimmerOrders />
    ) : (
        <div className="sm:px-8 bg-gray-50 p-4">
            <p className="text-center text-2xl font-bold text-gray-800 mb-8">Your Orders</p>
            {orders.map((order, index) => (
                
                <>
                {console.log(order)}
                    <Order {...order}  userId={cUserId} setOrderResponse={setOrderResponse} key={index}/></>
                
            ))}
        </div>
    );
};

export default Orders;
