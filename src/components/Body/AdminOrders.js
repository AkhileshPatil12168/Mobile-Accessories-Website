import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Cookies from "universal-cookie";

const Order = (props) => {
  const { orderId, _id, OrderStatus, cancelledDate, deliveredDate } = props;
  console.log(props.orderId);
  return (
    <>
      {OrderStatus == "pending" ? (
        <div className="order-item mb-4 bg-white border  border-gray-300 rounded p-4">
          <p className="order-id font-bold">Order ID: {_id}</p>

          <p className="order-date text-blue-500">
            Order Date:{" "}
            {orderId?.orderdedDate.slice(0, 10) +
              " time : " +
              orderId?.orderdedDate.slice(11, 16)}
          </p>
        </div>
      ) : (
        <></>
      )}
      {OrderStatus == "completed" ? (
        <div className="order-item mb-4 bg-white border  border-gray-300 rounded p-4">
          <p className="order-id font-bold">Order ID: {_id}</p>

          <p className="order-date text-gray-500">
            Order Date:{" "}
            {orderId?.orderdedDate.slice(0, 10) +
              " time : " +
              orderId?.orderdedDate.slice(11, 16)}
          </p>
          <p className="order-date text-green-500">
            Delivered Date:{" "}
            {deliveredDate.slice(0, 10) +
              " time : " +
              deliveredDate.slice(11, 16)}
          </p>
        </div>
      ) : (
        <></>
      )}
      {OrderStatus == "cancelled" ? (
        <div className="order-item mb-4 bg-white border  border-gray-300 rounded p-4">
          <p className="order-id font-bold">Order ID: {_id}</p>

          <p className="order-date text-gray-500">
            Order Date:{" "}
            {orderId?.orderdedDate.slice(0, 10) +
              " time: " +
              orderId?.orderdedDate.slice(11, 16)}
          </p>
          <p className="order-date text-red-500">
            Canceled Date:{" "}
            {cancelledDate.slice(0, 10) +
              " time: " +
              cancelledDate.slice(11, 16)}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

const AdminOrders = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const cAdminId = cookies.get("Admin");

  const [orders, setOrders] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [recentOrders, setRecentOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  const [filteredCompletedOrders, setFilteredCompletedOrders] = useState([]);
  const [filteredPendingOrders, setFilteredPendingOrders] = useState([]);
  const [filteredCanceledOrders, setFilteredCanceledOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        process.env.backendapi + `/admin/${cAdminId}/orders`,
        {
          withCredentials: true,
        }
      );
      const allOrders = response.data.data;
      setOrders(allOrders);
      console.log(allOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(fromDate, "formdate");
    // console.log(toDate, "todate");

    const pendingOrders = orders
      .filter((order) => order.OrderStatus === "pending")
      .sort((a, b) => new Date(a.orderdedDate) - new Date(b.orderdedDate));
    setPendingOrders(pendingOrders);
    setFilteredPendingOrders(pendingOrders);

    const completedOrders = orders.filter(
      (order) => order.OrderStatus === "completed"
    );
    setCompletedOrders(completedOrders);
    setFilteredCompletedOrders(completedOrders);

    const canceledOrders = orders.filter(
      (order) => order.OrderStatus === "cancelled"
    );
    setCanceledOrders(canceledOrders);
    setFilteredCanceledOrders(canceledOrders);

    setRecentOrders(orders.slice(0, 5));

    if (fromDate || toDate) {
      if (fromDate && toDate) {
        setFilteredPendingOrders(
          pendingOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) >= new Date(fromDate) &&
              new Date(order?.orderId?.orderdedDate) <= new Date(toDate)
          )
        );
        setFilteredCompletedOrders(
          completedOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) >= new Date(fromDate) &&
              new Date(order?.orderId?.orderdedDate) <= new Date(toDate)
          )
        );
        setFilteredCanceledOrders(
          canceledOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) >= new Date(fromDate) &&
              new Date(order?.orderId?.orderdedDate) <= new Date(toDate)
          )
        );
      } else if (fromDate) {
        setFilteredPendingOrders(
          pendingOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) >= new Date(fromDate)
          )
        );
        setFilteredCompletedOrders(
          completedOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) >= new Date(fromDate)
          )
        );
        setFilteredCanceledOrders(
          canceledOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) >= new Date(fromDate)
          )
        );
      } else if (toDate) {
        setFilteredPendingOrders(
          pendingOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) <= new Date(toDate)
          )
        );
        setFilteredCompletedOrders(
          completedOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) <= new Date(toDate)
          )
        );
        setFilteredCanceledOrders(
          canceledOrders.filter(
            (order) =>
              new Date(order?.orderId?.orderdedDate) <= new Date(toDate)
          )
        );
      }
    }
  }, [orders, fromDate, toDate]);

  useEffect(() => {
    fetchOrders();
    console.log("api call");
  }, []);

  return !cAdminId ? (
    navigate("/login")
  ) : (
    <div className="mx-auto mb-4 flex justify-center items-center flex-col">
      {/* Summary And Last 5 Order */}
      <div className="flex flex-wrap justify-center mb-10  py-4">
        <div className=" p-4 mx-7 mb-4 ">
          <h1 className="text-4xl font-bold mb-4 text-center">Summery</h1>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Pending Orders
                  </th>
                  <td class="px-6 py-4">{pendingOrders.length}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Completed Orders
                  </th>
                  <td class="px-6 py-4">{completedOrders.length}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Canceled Orders
                  </th>
                  <td class="px-6 py-4">{canceledOrders.length}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Orders
                  </th>
                  <td class="px-6 py-4">{orders.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Last 5 Order */}
        <div className=" mx-7">
          <div className="border border-gray-300 bg-sky-50 rounded p-4  min-h-[50px] max-h-[500px]  ">
            <p className="text-lg font-bold mb-4 text-center">
              Recent 5 Orders
            </p>
            <div className="border-2 p-2 rounded overflow-y-auto min-h-[50px] max-h-[400px] ">
              {recentOrders.map((order) => (
                <Link to={`/admin/order/${order._id}`} key={order._id}>
                  <Order {...order} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Completed Orders */}
      <div className="bg-gray-200 mx-4">
        {/* Search */}
        <div className="flex justify-center items-center bg-violet-100 mb-4 p-4">
          <div className="flex flex-wrap mx-2">
            <label className="text-black font-medium mx-2">From:</label>{" "}
            <DatePicker
            className=""
              onChange={(date) => setFromDate(new Date(date).getTime())}
              dateFormat="yyyy-MM-dd"
              todayButton="Select Today"
              placeholderText={
                fromDate
                  ? new Date(fromDate).toLocaleDateString("en-CA")
                  : "select date"
              }
            />
            <div className="mx-2">
              {" "}
              <button
                type="reset"
                name="remove"
                className="w-10 h-10 bg-violet-700 text-white"
                onClick={() => setFromDate(null)}
              >
                X
              </button>
            </div>
          </div>

          <div className="flex flex-wrap mx-2">
            <label className="text-black font-medium mx-2">To: </label>
            <DatePicker
            className=""
              onChange={(date) => setToDate(new Date(date).getTime())}
              dateFormat="yyyy-MM-dd"
              todayButton="Select Today"
              placeholderText={
                toDate
                  ? new Date(toDate).toLocaleDateString("en-CA")
                  : "select date"
              }
            />
            <div className="mx-2">
              {" "}
              <button
                type="reset"
                name="remove"
                className="w-10 h-10 bg-violet-700 text-white"
                onClick={() => setToDate(null)}
              >
                X
              </button>
            </div>
          </div>

        </div>




        {/* Pending Completed Orders  */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center p-4 ">
          <div className="mb-2 mx-2">
            <div className="border border-gray-300 rounded p-2  bg-white min-h-[50px] max-h-[500px] ">
              <p className="text-lg font-bold mb-4 text-center">
                Pending Orders ({filteredPendingOrders.length})
              </p>
              <div className=" p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-auto">
                {filteredPendingOrders.map((order) => (
                  <Link to={`/admin/order/${order._id}`} key={order._id}>
                    <Order {...order} key={order._id} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-2 mx-2">
            <div className="border border-gray-300 rounded p-2  bg-white min-h-[50px] max-h-[500px] ">
              <p className="text-lg font-bold mb-4 text-center">
                completed Orders ({filteredCompletedOrders.length})
              </p>
              <div className="p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-auto">
                {filteredCompletedOrders.map((order) => (
                  <Link to={`/admin/order/${order._id}`} key={order._id}>
                    <Order {...order} key={order._id} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-2 mx-2">
            <div className="border border-gray-300 rounded p-2  bg-white min-h-[50px] max-h-[500px] ">
              <p className="text-lg font-bold mb-4 text-center">
                canceled Orders ({filteredCanceledOrders.length})
              </p>
              <div className="p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-auto">
                {filteredCanceledOrders.map((order) => (
                  <Link to={`/admin/order/${order._id}`} key={order._id}>
                    <Order {...order} key={order._id} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
