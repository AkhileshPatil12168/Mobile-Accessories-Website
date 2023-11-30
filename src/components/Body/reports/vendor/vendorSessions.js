import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";

const SessionTable = ({ sessions }) => {
  const [filterUserType, setFilterUserType] = useState("All");

  const filteredSessions =
    filterUserType === "All"
      ? sessions
      : sessions.filter((session) => session.vendorId === filterUserType);

  const userTypes = ["All",...new Set(sessions.map(user=>user.vendorId))];

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filter by Vendor ID:</label>
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

                <th className="py-2 px-4 border-b border-r text-center">ID</th>
                <th className="py-2 px-4 border-b border-r text-center">Login Time</th>
                <th className="py-2 px-4 border-b border-r text-center">Logout Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.vendorId}</td>
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
   
    </>
  );
};

const VendorSessions = () => {
  // Assuming sessionsData is your array of session objects

//   const [sessionsData, setSessionsData] = useState([]);
const sessionsData =[
    {
        "_id": "6567352a2f6aefdf639f1e74",
        "userType": "Vendor",
        "vendorId": "654e7c5d73c4f2d12f0747a6",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIkMmIkMDgkMEMxYjVUc2lJdDB0U2traTQzbFA2ZUwuS3dpLm1CL0FjSUwvMS52cXJMYVNkZklqaTJVeW0iLCJpYXQiOjE3MDEyNjI2MzQsImV4cCI6MTcwMTM0OTAzNH0.-R_TcsnzGldfp64L9H02rik_KQWuet6OccW9G0k4wgg",
        "loginTime": "2023-11-29T18:27:14.942Z",
        "__v": 0,
        "logOutTime": "2023-11-29T18:27:19.877Z"
    },
    {
        "_id": "65672487c9e2bb245a861da6",
        "userType": "Vendor",
        "vendorId": "654e7c5d73c4f2d12f0747a6",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIkMmIkMDgkQ2lwcTdTUW5vRjhUN1lna0FNMjdsdVZOT0E4aDFQdlI4bENmTmlxWDRua2xoNEhPR1NFZUsiLCJpYXQiOjE3MDEyNTgzNzUsImV4cCI6MTcwMTM0NDc3NX0.niWQdm6Karuu2Nx2WUxEOXuwyrLt4j1rfEQ-mTQ9L1k",
        "loginTime": "2023-11-29T17:16:15.998Z",
        "__v": 0,
        "logOutTime": "2023-11-29T19:18:41.400Z"
    },
    {
        "_id": "656722e9b2e2a09d701c6f39",
        "userType": "Vendor",
        "vendorId": "654e7c5d73c4f2d12f0747a6",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIkMmIkMDgkY01MbkdOWkJ6eFJheE5vRGptR0tNLkg0cVBsUTFnbDVlS2JXZElPeFY3ejFFSUZzc0xpY3EiLCJpYXQiOjE3MDEyNTc5NjEsImV4cCI6MTcwMTM0NDM2MX0.CNhTZ9Ngs3QrGi6EbXlgEh0uU_a-zVRHzhOBkRB_jak",
        "loginTime": "2023-11-29T17:09:21.181Z",
        "__v": 0,
        "logOutTime": "2023-11-29T17:09:52.047Z"
    },
    {
        "_id": "656722b2b2e2a09d701c6f1e",
        "userType": "Vendor",
        "vendorId": "654e7c5d73c4f2d12f0747a6",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIkMmIkMDgkNWhldG9LMTJ4cmx3eEwyUjlXUGszT2FUc3FKSEIvZ3Z6Z2VhM29LaWVmRnF1YkFTcVZuZG0iLCJpYXQiOjE3MDEyNTc5MDYsImV4cCI6MTcwMTM0NDMwNn0.C4W2Yt3atRceJXsr0Z8LT696bNtWg4F1-1HyB4ZjhRU",
        "loginTime": "2023-11-29T17:08:26.266Z",
        "__v": 0,
        "logOutTime": "2023-11-29T17:08:36.231Z"
    },
    {
        "_id": "656720ebb2e2a09d701c6ef7",
        "userType": "Vendor",
        "vendorId": "654e7c5d73c4f2d12f0747a6",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIkMmIkMDgkOThOY0xmek1MbGxDMWs4eWhHN2hyZS54anVzeEIuUm1nQ2ZFNkQ5dlhmUW9SQXlQajRFZnkiLCJpYXQiOjE3MDEyNTc0NTEsImV4cCI6MTcwMTM0Mzg1MX0.w6el0Jo2I3lqA9Ip0QLktCahivuPCqUEcuM4_f6nkEU",
        "loginTime": "2023-11-29T17:00:51.919Z",
        "__v": 0,
        "logOutTime": "2023-11-29T17:06:30.133Z"
    },
    {
        "_id": "656718df82d85301e9b05219",
        "userType": "Vendor",
        "vendorId": "654e7c5d73c4f2d12f0747a6",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIkMmIkMDgkZXRQMWt5aGtCYVNZdXBwbWtMTTBTZVIvVXA1UmYwcHFzek5PUEI5TXMuRXdvdDlPa2MvMmkiLCJpYXQiOjE3MDEyNTUzOTEsImV4cCI6MTcwMTM0MTc5MX0.S8PZX7X9sMgi8BevRFsNC8NSVHU1IE-v749vdcebp_M",
        "loginTime": "2023-11-29T16:26:31.058Z",
        "__v": 0,
        "logOutTime": "2023-11-29T16:46:01.415Z"
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

export default VendorSessions;
