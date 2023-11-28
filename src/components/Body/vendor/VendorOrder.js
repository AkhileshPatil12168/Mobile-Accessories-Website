import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VendorOrder = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cVendorId = cookies.get("Vendor");
  const { orderId } = useParams();

  console.log(orderId);

  const [order, setOrder] = useState({});
  const [updateResponse, setUpdateResponse] = useState("");
  const orderDetails = async () => {
    try {
      const response = await axios.get(
        process.env.backendapi +
          `/vendor/${cVendorId}/orderedProduct/${orderId}`,
        { withCredentials: true }
      );
      const order = response.data.data;
      setOrder(order);
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  };
  const updateOrder = async (status) => {
    try {
      const response = await axios.put(
        process.env.backendapi +
          `/vendor/${cVendorId}/orderedProduct/${orderId}`,
        { status },
        { withCredentials: true }
      );

      const updatedOrder = response.data.data;
      const responseMessage = response.data.message;
      setOrder(updatedOrder);
      setUpdateResponse(responseMessage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orderDetails();
  }, [updateResponse]);

  // useEffect(() => {
  //     orderDetails();
  // }, []);
  console.log(order.cancellable);

  return !cVendorId ? (
    navigate("/login")
  ) : (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white border-gray-500">Order Details</h1>

      <div className="flex flex-wrap -mx-2">
        {order?.productImage ? (
          // Order Details
          <img
            className="w-80"
            src={order?.productImage[0]}
            alt={`Product Image ${order?.productImage[0]}`}
          ></img>
        ) : (
          <img></img>
        )}
        <div className="w-full  px-2 my-4">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Order Information
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Quantity
                  </th>
                  <td class="px-6 py-4">{order?.quantity}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Price
                  </th>
                  <td class="px-6 py-4">₹{order?.totalPrice}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Free Shipping
                  </th>
                  <td class="px-6 py-4">
                    {order?.isFreeShipping ? "Yes" : "No"}
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Order Date
                  </th>
                  <td class="px-6 py-4">{order?.orderId?.orderdedDate}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Cancellable
                  </th>
                  <td class="px-6 py-4">{order.cancellable ? "Yes" : "No"}</td>
                </tr>
                <tr class="bg-whiteborder-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Status
                  </th>
                  <td
                    class={`px-6 py-4 ${
                      order?.OrderStatus == "completed"
                        ? "text-green-400"
                        : order?.OrderStatus == "cancelled"
                        ? "text-red-400"
                        : "text-blue-400"
                    }`}
                  >
                    {order?.OrderStatus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Personal Information */}
        <div className="w-full  px-2 mb-4">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Personal Information
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Name
                  </th>
                  <td class="px-6 py-4">{order?.orderId?.name}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    E-Mail
                  </th>
                  <td class="px-6 py-4">{order?.orderId?.email}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Phone Number
                  </th>
                  <td class="px-6 py-4">{order?.orderId?.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Shipping Address
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Street
                  </th>
                  <td class="px-6 py-4">
                    {" "}
                    {order?.orderId?.address?.shipping?.street}
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    City
                  </th>
                  <td class="px-6 py-4">
                    {order?.orderId?.address?.shipping?.city}
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Pincode
                  </th>
                  <td class="px-6 py-4">
                    {order?.orderId?.address?.shipping?.pincode}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Billing Address */}
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Billing Address
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Street
                  </th>
                  <td class="px-6 py-4">
                    {" "}
                    {order?.orderId?.address?.billing?.street}
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    City
                  </th>
                  <td class="px-6 py-4">
                    {" "}
                    {order?.orderId?.address?.billing?.city}
                  </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Pincode
                  </th>
                  <td class="px-6 py-4">
                    {order?.orderId?.address?.shipping?.pincode}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end ">
        {order.OrderStatus == "pending" ? (
          <div className="pr-2">
            <button
              onClick={() => updateOrder("completed")}
              className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Complete Order
            </button>
          </div>
        ) : (
          <></>
        )}

        {order.cancellable && order.OrderStatus == "pending" ? (
          <div>
            <button
              onClick={() => updateOrder("cancelled")}
              className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-red-600 "
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
export default VendorOrder;
