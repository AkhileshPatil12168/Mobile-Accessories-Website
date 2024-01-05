import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";
import PdfAndExcelConverter from "../../../PDF and Excel converter/PdfAndExcelConverter";


const SessionTable = ({ sessions }) => {
  const [filterUserType, setFilterUserType] = useState("All");
console.log(filterUserType)
  let filteredSessions =filterUserType == "All"
  ? sessions
  : sessions.filter((session) => !session.isApproved?"No"== filterUserType:"Yes" == filterUserType);
    

  const userTypes = ["All","Yes", "No"];

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Filter by Approved Status:</label>
          <select
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => {setFilterUserType(e.target.value)}}
            value={filterUserType}
          >
            {userTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
      <PdfAndExcelConverter />

        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b border-r text-center">Advertisement ID</th>
                <th className="py-2 px-4 border-b border-r text-center">Vendor Id</th>
                <th className="py-2 px-4 border-b border-r text-center">startDate</th>
                <th className="py-2 px-4 border-b border-r text-center">endDate</th>
                <th className="py-2 px-4 border-b border-r text-center">isApproved</th>
                <th className="py-2 px-4 border-b border-r text-center">cost</th>

              </tr>
            </thead>
            <tbody>
              {filteredSessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.vendorId}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.startDate.slice(0, 10) +
                      " / " +
                      timeConverter(session.startDate.slice(11, 16))}</td>

                  <td className="py-2 px-4 border-b border-r text-center">{session.endDate.slice(0, 10) +
                      " / " +
                      timeConverter(session.endDate.slice(11, 16))}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.isApproved?"Yes":"No"}</td>

                  <td className="py-2 px-4 border-b border-r text-center">{session.price}</td>


                 
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

const AdsByApproved = () => {
  // Assuming sessionsData is your array of session objects

  const [sessionsData, setSessionsData] = useState([]);

  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/reports/sellers/ads/", {
        withCredentials: true,
      });
      setSessionsData(responce?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoginLogoutSessions();
  }, []);

  return (
    <>
                 <h1 className="text-2xl font-bold mb-4 text-center">Advertisement by Status</h1>

      <SessionTable sessions={sessionsData} />
    </>
  );
};

export default AdsByApproved;
