import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";
import PdfAndExcelConverter from "../../../PDF and Excel converter/PdfAndExcelConverter";

const Table = ({ sessions }) => {
//   const [filterUserType, setFilterUserType] = useState("All");
console.log(sessions)
//   const filteredSessions =
//     filterUserType === "All"
//       ? sessions
//       : sessions.filter((session) => session.userId === filterUserType);

//   const userTypes = ["All",...new Set(sessions.map(user=>user.userId))];
// return (<></>)
  return (
    <>
      <div >
        <div className="mb-4">
          {/* <label className="block text-sm font-medium text-gray-700">Filter by User user ID:</label> */}
          {/* <select
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setFilterUserType(e.target.value)}
            value={filterUserType}
          >
            {userTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select> */}
        </div>
      </div>
<PdfAndExcelConverter/>
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b border-r text-center">User ID</th>

                <th className="py-2 px-4 border-b border-r text-center">First Name</th>
                <th className="py-2 px-4 border-b border-r text-center">Last Name</th>
                
                <th className="py-2 px-4 border-b border-r text-center">Registration Date</th>
                <th className="py-2 px-4 border-b border-r text-center">Deleted</th>

              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.fname}</td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {session.lname}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {session.createdAt.slice(0, 10) +
                      " / " +
                      timeConverter(session.createdAt.slice(11, 16))}
                    
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.isDeleted?"Yes":"No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
    </>
  );
};

const RegisteredUsers = () => {
  // Assuming sessionsData is your array of session objects

  const [sessionsData, setSessionsData] = useState([]);

  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/report/users/registered", {
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
            <h1 className="text-2xl font-bold mb-4 text-center">Registered User</h1>

      <Table sessions={sessionsData} />
    </div>
  );
};

export default RegisteredUsers;
