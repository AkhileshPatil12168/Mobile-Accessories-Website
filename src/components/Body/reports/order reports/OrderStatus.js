import axios from "axios";
import React, { useEffect, useState } from "react";


const SessionTable = ({ sessions }) => {
  const [filterUserType, setFilterUserType] = useState("All");

  const filteredSessions =
    filterUserType === "All"
      ? sessions
      : sessions.filter((session) => session.OrderStatus === filterUserType);

  const userTypes = ["All", "pending", "cancelled", "completed"];

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filter by User Type:</label>
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
                <th className="py-2 px-4 border-b border-r text-center">OrderId ID</th>
                <th className="py-2 px-4 border-b border-r text-center">User Id</th>
                <th className="py-2 px-4 border-b border-r text-center">quantity</th>
                <th className="py-2 px-4 border-b border-r text-center">Total Price</th>
                <th className="py-2 px-4 border-b border-r text-center">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.userId}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.quantity}</td>

                  <td className="py-2 px-4 border-b border-r text-center">{session.totalPrice}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.OrderStatus}</td>


                 
                  {/* <td className="py-2 px-4 border-b border-r text-center">
                    {session.loginTime.slice(0, 10) +
                      " / " +
                      timeConverter(session.loginTime.slice(11, 16))}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {session?.logOutTime
                      ? session?.logOutTime?.slice(0, 10) +
                        " / " +
                        timeConverter(session.logOutTime.slice(11, 16))
                      : "N/A"}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
  );
};

const OrderByStatus = () => {
  // Assuming sessionsData is your array of session objects

  const [sessionsData, setSessionsData] = useState([]);

  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/reports/orders/status/", {
        withCredentials: true,
      });
      setSessionsData(responce.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoginLogoutSessions();
  }, []);

  return (
    <div>
      <h1>Your Sessions</h1>
      <SessionTable sessions={sessionsData} />
    </div>
  );
};

export default OrderByStatus;
