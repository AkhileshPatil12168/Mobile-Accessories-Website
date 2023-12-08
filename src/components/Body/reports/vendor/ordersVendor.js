import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";

const SessionTable = ({ sessions }) => {
  const [filterUserType, setFilterUserType] = useState("All");

  const filteredSessions =
    filterUserType === "All"
      ? sessions
      : sessions.filter((session) => session.vendorId === filterUserType);

  const userTypes = ["All",...new Set(sessions.map(user=>user.userId))];

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filter by user ID:</label>
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
                <th className="py-2 px-4 border-b border-r text-center">OrderId</th>

                <th className="py-2 px-4 border-b border-r text-center">User ID</th>
                <th className="py-2 px-4 border-b border-r text-center">Quantity</th>
                <th className="py-2 px-4 border-b border-r text-center">totalPrice</th>
                <th className="py-2 px-4 border-b border-r text-center">Delivered Date</th>

              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.userId}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.quantity}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.totalPrice}</td>

                  <td className="py-2 px-4 border-b border-r text-center">
                    {session.deliveredDate?session.deliveredDate.slice(0, 10) +
                      " / " +
                      timeConverter(session.deliveredDate.slice(11, 16)):"NA"}
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

const VendorOrders = () => {
  // Assuming sessionsData is your array of session objects

//   const [sessionsData, setSessionsData] = useState([]);
const sessionsData =[
  {
      "_id": "655a6ec3aec636aeba6850be",
      "userId": "6550f2d6c2c327a7d85585ae",
      "quantity": 1,
      "totalPrice": 1399,
      "OrderStatus": "cancelled"
  },
  {
      "_id": "655a6ec5aec636aeba6850c4",
      "userId": "6550f2d6c2c327a7d85585ae",
      "quantity": 1,
      "totalPrice": 989,
      "OrderStatus": "completed",
      "deliveredDate": "2023-11-21T13:22:59.153Z"
  },
  {
      "_id": "655c54da046eb0aa4db156a1",
      "userId": "655c54c1046eb0aa4db15696",
      "quantity": 1,
      "totalPrice": 1399,
      "OrderStatus": "pending"
  },
  {
      "_id": "655fb066aaa9f98b8c1b8cc5",
      "userId": "6550f2d6c2c327a7d85585ae",
      "quantity": 2,
      "totalPrice": 2798,
      "OrderStatus": "cancelled"
  },
  {
      "_id": "655fbeffe119d6da6d0259de",
      "userId": "6550f2d6c2c327a7d85585ae",
      "quantity": 1,
      "totalPrice": 989,
      "OrderStatus": "cancelled"
  },
  {
      "_id": "6560a27b24ae2ea1bfd8fbf5",
      "userId": "6550f2d6c2c327a7d85585ae",
      "quantity": 1,
      "totalPrice": 1399,
      "OrderStatus": "cancelled"
  },
  {
      "_id": "6560a3c524ae2ea1bfd8fc4c",
      "userId": "6550f2d6c2c327a7d85585ae",
      "quantity": 1,
      "totalPrice": 1399,
      "OrderStatus": "completed",
      "deliveredDate": "2023-11-28T01:52:12.583Z"
  }
]
  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/report/sessions/?userType=Vendor", {
        withCredentials: true,
      });
    //   setSessionsData(responce);
      console.log(sessionsData)
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getLoginLogoutSessions();
  // }, []);
console.log(sessionsData)
  return (
    <div>
      <h1 className="text-center">Orders</h1>
      <SessionTable sessions={sessionsData} />
    </div>
  );
};

export default VendorOrders;