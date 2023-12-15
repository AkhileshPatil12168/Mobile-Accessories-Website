import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import timeConverter from "../../../util/timeConverter"; 

const Items = (props) => {
    const { productImage, title, quantity, price, index } = props.orderedProductId;
    const [bgColor, setBgColor] = useState("");
    useEffect(() => {
        if (index % 2 == 0) setBgColor("bg-gray-200");
    });
    return (
        <div className={`flex mb-2 ${bgColor}  `}>
            <img
                src={productImage[0]}
                alt={`Product Image ${productImage[0]}`}
                className="w-16 h-16 mr-2 m-4 "
            />
            <div>
                <p className="mb-2">
                    <strong>Title:</strong> {title}
                </p>
                <p className="mb-2">
                    <strong>Quantity:</strong> {quantity}
                </p>
                <p className="mb-2">
                    <strong>Price:</strong> ₹{price}
                </p>
            </div>
        </div>
    );
};
const Order = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const cUserId = cookies.get("User");
    const { orderedProductId } = useParams();

    const [order, setOrder] = useState({});
    const [orderResponse, setOrderResponse] = useState();

    const orderDetails = async () => {
        try {
            const response = await axios.get(
                process.env.backendapi+`/user/${cUserId}/order/${orderedProductId}`,
                { withCredentials: true }
            );
            setOrder(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const cancelOrder = async () => {
        try {
            const response = await axios.put(
                process.env.backendapi+`/user/${cUserId}/order/cancleOrderedProduct/${orderedProductId}`,
                { cancle: true },
                { withCredentials: true }   
            );

            const updatedOrder = response.data.data;
            const responseStatus = response.status;
            setOrder(updatedOrder);
            setOrderResponse(responseStatus);
        } catch (error) {
            console.log(error);
        }
    };
 

    useEffect(() => {
        if (orderResponse == 204) {
            setOrderResponse(null);
            navigate("/orders");
        } else {
            setOrderResponse(null);
            orderDetails();
        }
    }, [orderResponse]);


    return !cUserId ? (
      navigate("/login")
    ) : (
      <div className="container  py-4 px-20">
        <p className="text-2xl font-bold mb-4">Order Details</p>

        <div className="flex flex-wrap -mx-2">
          {
            /* <div className="w-full px-2 mb-4">
                    <div className="border border-gray-300 rounded p-4 overflow-auto">
                        <h2 className="text-lg font-bold mb-4">Items</h2>
                        <div className="border max-h-52	 border-gray-300 rounded p-4 overflow-auto">
                            {order?.items?.map((item, index) => (
                                <Link to={"/product/" + item.productId}>
                                    <Items {...{ ...item, index: index }} key={index} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div> */
            // console.log(order?.productImage[0])
          }

          <div className="w-full  px-2 mb-4">
            <div className="border border-gray-300 rounded p-4">
              {(order?.productImage)? (
                <img
                  src={order?.productImage[0]}
                  alt={`Product Image ${order?.productImage[0]}`}
                ></img>
              ) : (
                <img></img>
              )}
              <h2 className="text-lg font-bold mb-4">Order Information</h2>

              <p className="mb-2">
                <strong>Total Quantity:</strong> {order?.quantity}
              </p>
              <p className="mb-2">
                <strong>Total Price:</strong> ₹{order?.totalPrice}
              </p>
              <p className="mb-2">
                <strong>Free Shipping:</strong> {order?.orderId?.isFreeShipping ? "Yes" : "No"}
              </p>
              <p className="mb-2">
                {console.log(order?.orderId?.orderdedDate)}
                <strong>Ordered Date:</strong>{" "}
                {order?.orderId?.orderdedDate ? order?.orderId?.orderdedDate?.slice(0, 10) : ""}
              </p>
              <p className="mb-2">
                <strong>Ordered time:</strong>{" "}
                {order?.orderId?.orderdedDate
                  ? timeConverter(order?.orderId?.orderdedDate?.slice(11, 16))
                  : ""}
              </p>
              <p className="mb-2">
                <strong>Cancellable:</strong> {order?.cancellable ? "Yes" : "No"}
              </p>
              <p className="mb-2">
                <strong>Status:</strong> {order?.OrderStatus}
              </p>
            </div>
          </div>

          <div className="w-full  px-2 mb-4">
            <div className="border border-gray-300 rounded p-4">
              <h2 className="text-lg font-bold mb-4">Personal Information</h2>
              <p className="mb-2">
                <strong>Name:</strong> {order?.orderId?.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {order?.orderId?.email}
              </p>
              <p className="mb-2">
                <strong>Phone Number:</strong> {order?.orderId?.phone}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="border border-gray-300 rounded p-4">
              <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
              <p className="mb-2">
                <strong>Street:</strong> {order?.orderId?.address?.shipping?.street}
              </p>
              <p className="mb-2">
                <strong>City:</strong> {order?.orderId?.address?.shipping?.city}
              </p>
              <p className="mb-2">
                <strong>Pincode:</strong> {order?.orderId?.address?.shipping?.pincode}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-2 mb-4">
            <div className="border border-gray-300 rounded p-4">
              <h2 className="text-lg font-bold mb-4">Billing Address</h2>
              <p className="mb-2">
                <strong>Street:</strong> {order?.orderId?.address?.billing?.street}
              </p>
              <p className="mb-2">
                <strong>City:</strong> {order?.orderId?.address?.billing?.city}
              </p>
              <p className="mb-2">
                <strong>Pincode:</strong> {order?.orderId?.address?.billing?.pincode}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">

          {order?.cancellable && order?.OrderStatus == "pending" ? (
            <div>
              <button
                onClick={() => cancelOrder()}
                className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Cancel Order
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
};
export default Order;
