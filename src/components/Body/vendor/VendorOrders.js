import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const VendorOrdersPage = () => {
  const cookies = new Cookies();
  const cToken = cookies.get("token");
  const cVendorId = cookies.get("Vendor");

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      let response = await axios.get(process.env.backendapi + `/vendor/${cVendorId}/orders`, {
        withCredentials: true,
      });
      setOrders(response?.data?.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return !cToken && !cVendorId ? (
    "/login"
  ) : (
    <div className="max-w-4xl mx-auto bg-white p-8 my-8 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Vendor Orders</h2>
      {orders.map((order) => (
        <Link to={`/vendor/order/${order._id}`} key={order._id}>
          <div className="border-b-2 border-gray-300 pb-6 mb-6">
            <h3 className="text-xl font-bold mb-2">Order ID: {order._id}</h3>
            <p>
              <strong>Customer Name:</strong> {order.orderId.name}
            </p>
            <p>
              <strong>Email:</strong> {order.orderId.email}
            </p>
            <p>
              <strong>Phone:</strong> {order.orderId.phone}
            </p>
            <p>
              <strong>Product:</strong> {order.title}
            </p>
            <p>
              <strong>Quantity:</strong> {order.quantity}
            </p>
            <p>
              <strong>Total Price:</strong> ${order.totalPrice}
            </p>
            <p>
              <strong>Order Status:</strong> {order.OrderStatus}
            </p>
            {order.OrderStatus === "completed" && (
              <p>
                <strong>Delivered Date:</strong> {new Date(order.deliveredDate).toLocaleString()}
              </p>
            )}
            {order.OrderStatus === "cancelled" && (
              <p>
                <strong>Cancelled Date:</strong> {new Date(order.cancelledDate).toLocaleString()}
              </p>
            )}
            <img src={order.productImage[0]} alt="Product" className="mt-4 w-full h-auto" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VendorOrdersPage;
