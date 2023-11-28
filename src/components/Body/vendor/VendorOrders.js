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
      let response = await axios.get(
        process.env.backendapi + `/vendor/${cVendorId}/orders`,
        {
          withCredentials: true,
        }
      );
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
    <div className="max-w-4xl mx-auto bg-white p-8 my-8 rounded-md">
      <h2 className="mb-4 text-2xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white border-gray-500">
        Vendor Orders
      </h2>
      <div className="mb-4">
        {orders.map((order) => (
          <Link to={`/vendor/order/${order._id}`} key={order._id}>
            <div className="border-2 rounded shadow-lg border-gray-300 pb-6 mb-6">
              <img
                src={order.productImage[0]}
                alt="Product"
                className="mt-4 w-1/3 h-auto"
              />
              <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Order Id
                      </th>
                      <th scope="col" className="px-6 py-3">
                        {order._id}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Customer Name
                      </th>
                      <td className="px-6 py-4">{order.orderId.name}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        E-Mail
                      </th>
                      <td className="px-6 py-4">{order.orderId.email}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Phone No.
                      </th>
                      <td className="px-6 py-4">{order.orderId.phone}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Product
                      </th>
                      <td className="px-6 py-4">{order.title}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Quantity
                      </th>
                      <td className="px-6 py-4">{order.quantity}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Total Price
                      </th>
                      <td className="px-6 py-4">₹{order.totalPrice}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Order Status
                      </th>
                      <td
                        className={`px-6 py-4 ${
                          order.OrderStatus == "completed"
                            ? "text-green-400"
                            : order.OrderStatus == "cancelled"
                            ? "text-red-400"
                            : "text-blue-400"
                        }`}
                      >
                        {order.OrderStatus}
                      </td>
                    </tr>
                    {order.OrderStatus === "completed" && (
                      <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Delivered Date:
                        </th>
                        <td className="px-6 py-4 text-green-400">
                          {new Date(order.deliveredDate).toLocaleString()}
                        </td>
                      </tr>
                    )}
                    {order.OrderStatus === "cancelled" && (
                      <tr className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Cancelled Date:
                        </th>
                        <td className="px-6 py-4 text-red-400">
                          {new Date(order.cancelledDate).toLocaleString()}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorOrdersPage;
