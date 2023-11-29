import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../util/timeConverter";

const SessionTable = ({ sessions }) => {
  const [filterUserType, setFilterUserType] = useState("All");

  const filteredSessions =
    filterUserType === "All"
      ? sessions
      : sessions.filter((session) => session.userType === filterUserType);

  const userTypes = ["All", "Admin", "User", "Vendor"];

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
                <th className="py-2 px-4 border-b border-r text-center">Session ID</th>
                <th className="py-2 px-4 border-b border-r text-center">User Type</th>
                <th className="py-2 px-4 border-b border-r text-center">ID</th>
                <th className="py-2 px-4 border-b border-r text-center">Login Time</th>
                <th className="py-2 px-4 border-b border-r text-center">Logout Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.userType}</td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {session.userType == "User"
                      ? session.userId
                      : session.userType == "Admin"
                      ? session.adminId
                      : session.vendorId}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      );
    </>
  );
};

const Sessions = () => {
  // Assuming sessionsData is your array of session objects

  const [sessionsData, setSessionsData] = useState([]);

  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/report/sessions/", {
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

export default Sessions;
