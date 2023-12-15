import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";
import PdfAndExcelConverter from "../../../PDF and Excel converter/PdfAndExcelConverter";

const UserTable = ({ data }) => {
  const [filterAdId, setFilterAdId] = useState("All");
console.log(filterAdId)
  const filteredData =
    filterAdId === "All"
      ? data
      : data.filter((ad) => ad.advertisementId === filterAdId);

  const AdIds = ["All",...new Set(data.map(ad=>ad.advertisementId))];

  return (<>
   <div className="container mx-auto p-4">
          <label className="block text-sm font-medium text-gray-700">Filter by Advertisement ID:</label>
        <div className="mb-2 ">
          <select
            className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e) => setFilterAdId(e.target.value)}
            value={filterAdId}
          >
            {AdIds.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
          <PdfAndExcelConverter data={...data} />
      </div>
    <div className="container mx-auto p-4">
  

     
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Advertisement Id</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">clicks Per Day</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user) => (
                <tr key={user.userId}>
                  <td className="border p-2 text-center">{user._id}</td>
                  <td className="border p-2 text-center">{user.advertisementId}</td>

                  <td className="border p-2 text-center">{user.date.slice(0, 10)}</td>

                  <td className="border p-2 text-center">{user.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
      </div>
    </div></>
  );
};

const ClicksPerAdsByDays = () => {
 
  const [sessionsData, setSessionsData] = useState([]);

  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/ads/clicks/", {
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
console.log(sessionsData)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Advertisements Clicks</h1>

      <UserTable data={sessionsData} />
    </div>
  );
};

export default ClicksPerAdsByDays;
