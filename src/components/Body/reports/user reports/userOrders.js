import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";
import axios from "axios";
import { Link } from "react-router-dom";

const UserTable = ({ data }) => {
  const [filterUserType, setFilterUserType] = useState("All");

  const filtereddata =
    filterUserType === "All" ? data : data.filter((user) => user.userId === filterUserType);

  const userTypes = ["All", ...new Set(data.map((user) => user.userId))];

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filter by Order Id:</label>
          <select
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setFilterUserType(e.target.value)}
            value={filterUserType}
          >
            {userTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b border-r text-center">User Id</th>
                <th className="py-2 px-4 border-b border-r text-center">Name</th>
                <th className="py-2 px-4 border-b border-r text-center">Order ID</th>
                <th className="py-2 px-4 border-b border-r text-center">Total Price</th>
                <th className="py-2 px-4 border-b border-r text-center">Total Items</th>
                <th className="py-2 px-4 border-b border-r text-center">Total Quantity</th>
                <th className="py-2 px-4 border-b border-r text-center">Order Date</th>
              </tr>
            </thead>

            <tbody>
              {filtereddata.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session.userId}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.name}</td>
                 
                    <td className="py-2 px-4 border-b border-r text-center text-purple-500 underline"> <Link to={`/users/order/${session._id}/products`}>{session._id} </Link></td>
                 
                  <td className="py-2 px-4 border-b border-r text-center">{session.totalPrice}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.totalItems}</td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {session.totalQuantity}
                  </td>

                  <td className="py-2 px-4 border-b border-r text-center">
                    {session.orderdedDate.slice(0, 10) +
                      " / " +
                      timeConverter(session.orderdedDate.slice(11, 16))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const UserOrders = () => {
  // const data =    [
  //   {
  //   _id: "655a6f907e99e60bb553b3fe",
  //   userId: "6550f2d6c2c327a7d85585ae",
  //   name: "vaibhav patil",
  //   totalPrice: 2388,
  //   totalItems: 2,
  //   totalQuantity: 2,
  //   orderdedDate: "2023-11-20T01:56:46.550Z"
  //   },
  //   {
  //   _id: "655ca4ef91427393bca7e453",
  //   userId: "655c54c1046eb0aa4db15696",
  //   name: "vijay patil",
  //   totalPrice: 1399,
  //   totalItems: 1,
  //   totalQuantity: 1,
  //   orderdedDate: "2023-11-21T18:09:11.432Z"
  //   },
  //   {
  //   _id: "655fb0f5aaa9f98b8c1b8cd4",
  //   userId: "6550f2d6c2c327a7d85585ae",
  //   name: "vaibhav patil",
  //   totalPrice: 2798,
  //   totalItems: 1,
  //   totalQuantity: 2,
  //   orderdedDate: "2023-11-24T01:35:22.245Z"
  //   },
  //   {
  //   _id: "655fbf36e119d6da6d0259e9",
  //   userId: "6550f2d6c2c327a7d85585ae",
  //   name: "vaibhav patil",
  //   totalPrice: 989,
  //   totalItems: 1,
  //   totalQuantity: 1,
  //   orderdedDate: "2023-11-24T02:37:27.348Z"
  //   },
  //   {
  //   _id: "6560a2d424ae2ea1bfd8fc05",
  //   userId: "6550f2d6c2c327a7d85585ae",
  //   name: "anil",
  //   totalPrice: 1399,
  //   totalItems: 1,
  //   totalQuantity: 1,
  //   orderdedDate: "2023-11-24T18:49:16.418Z"
  //   },
  //   {
  //   _id: "6560a3ec24ae2ea1bfd8fc55",
  //   userId: "6550f2d6c2c327a7d85585ae",
  //   name: "anil",
  //   totalPrice: 1399,
  //   totalItems: 1,
  //   totalQuantity: 1,
  //   orderdedDate: "2023-11-24T18:53:55.871Z"
  //   },
  //   {
  //   _id: "656a41539b2b60342a13c997",
  //   userId: "656a40f39b2b60342a13c973",
  //   name: "raj patil",
  //   totalPrice: 989,
  //   totalItems: 1,
  //   totalQuantity: 1,
  //   orderdedDate: "2023-12-02T01:55:55.404Z"
  //   }
  //   ]
  const [ordersData, setOrdersData] = useState([]);

  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/report/user/orders/", {
        withCredentials: true,
      });
      setOrdersData(responce.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoginLogoutSessions();
  }, []);

  return (
    <div>
      <UserTable data={ordersData} />
    </div>
  );
};

export default UserOrders;
