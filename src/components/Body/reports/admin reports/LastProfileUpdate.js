import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";
import PdfAndExcelConverter from "../../../PDF and Excel converter/PdfAndExcelConverter";

const SessionTable = ({ data }) => {
  const [filterUserType, setFilterUserType] = useState("All");

  const filteredData =
    filterUserType === "All" ? data : data.filter((doc) => doc.accountOf === filterUserType);

  const userTypes = ["All", "user", "merchant"];

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Account Type :</label>
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
          <PdfAndExcelConverter />
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b border-r text-center">account Id</th>
                <th className="py-2 px-4 border-b border-r text-center">Account Of</th>
                <th className="py-2 px-4 border-b border-r text-center">Name</th>
                <th className="py-2 px-4 border-b border-r text-center">Account Created At</th>
                <th className="py-2 px-4 border-b border-r text-center">Account Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((doc) => (
                <tr key={doc._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{doc._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{doc.accountOf}</td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {doc.fname + " " + doc.lname}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {doc.createdAt.slice(0, 10) +
                      " / " +
                      timeConverter(doc.createdAt.slice(11, 16))}
                  </td>
                  <td className="py-2 px-4 border-b border-r text-center">
                    {doc?.updatedAt?.slice(0, 10) +
                      " / " +
                      timeConverter(doc.updatedAt.slice(11, 16))}
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

const LastProfileUpdate = () => {
  

  const [data, setData] = useState([]);

  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "/report/admin/accounts/lastupdate", {
        withCredentials: true,
      });
      setData(responce.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoginLogoutSessions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Accounts</h1>

      <SessionTable data={data} />
    </div>
  );
};

export default LastProfileUpdate;