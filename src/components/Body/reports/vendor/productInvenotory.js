import axios from "axios";
import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";

import { saveAs } from 'file-saver';
import { exportToExcel, exportToPDF } from "../../../../util/pdfAndExcelConverterHook"; 

const SessionTable = ({ sessions }) => {
  const [filterUserType, setFilterUserType] = useState("All");

//   const filteredSessions =
//     filterUserType === "All"
//       ? sessions
//       : sessions.filter((session) => session.vendorId === filterUserType);

//   const userTypes = ["All",...new Set(sessions.map(user=>user.userId))];

  return (
    <>
      {/* <div className="container mx-auto p-4">
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
      </div> */}
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-2 px-4 border-b border-r text-center">PorudctId</th>

                <th className="py-2 px-4 border-b border-r text-center">title</th>
                <th className="py-2 px-4 border-b border-r text-center">price</th>
                <th className="py-2 px-4 border-b border-r text-center">category</th>
                <th className="py-2 px-4 border-b border-r text-center">isFreeShipping</th>
                <th className="py-2 px-4 border-b border-r text-center">available_Quantity</th>
                <th className="py-2 px-4 border-b border-r text-center">createdAt</th>



              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-r text-center">{session._id}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.title.slice(0,30)+"..."}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.price}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.category.join(", ")}</td>

                  <td className="py-2 px-4 border-b border-r text-center">{session.isFreeShipping?"Yes":"No"}</td>
                  <td className="py-2 px-4 border-b border-r text-center">{session.available_Quantity}</td>

                  <td className="py-2 px-4 border-b border-r text-center">
                    {session.createdAt?session.createdAt.slice(0, 10) +
                      " / " +
                      timeConverter(session.createdAt.slice(11, 16)):"NA"}
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

const ProductInventory = () => {
  // Assuming sessionsData is your array of session objects

//   const [sessionsData, setSessionsData] = useState([]);
const sessionsData = [
    {
        "_id": "6551371727cea9db338a0dcc",
        "title": "boat airdopes 141 bluetooth truly wireless in ear headphones",
        "price": 1399,
        "category": [
            "ear phones",
            "blutooth",
            "wireless"
        ],
        "isFreeShipping": true,
        "available_Quantity": 0,
        "createdAt": "2023-11-12T20:35:35.460Z"
    },
    {
        "_id": "655204354ea1c59f72668502",
        "title": "spigen back cover compatible for samsung galaxy a73 5g",
        "price": 989,
        "category": [
            "back cover"
        ],
        "isFreeShipping": true,
        "available_Quantity": 5,
        "createdAt": "2023-11-13T11:10:45.213Z"
    },
    {
        "_id": "6560e69e83c6126774e595b7",
        "title": "iphone 7 hard backcover",
        "price": 400,
        "category": [
            "back cover"
        ],
        "isFreeShipping": false,
        "available_Quantity": 20,
        "createdAt": "2023-11-24T18:08:30.678Z"
    },
    {
        "_id": "6560e9fdbbe01b4f5a49b3a2",
        "title": "boat type c a325/a320 tangle-free, sturdy type c cable with 3a rapid charging & 480mbps data transmission(black)",
        "price": 125,
        "category": [
            "type-c cable",
            "charging cable"
        ],
        "isFreeShipping": false,
        "available_Quantity": 30,
        "createdAt": "2023-11-24T18:22:53.248Z"
    },
    {
        "_id": "656173b6b04d50dc6cd28bc1",
        "title": "iphone 15 (128gb)",
        "price": 79998,
        "category": [
            "Smartphones"
        ],
        "isFreeShipping": true,
        "available_Quantity": 1000,
        "createdAt": "2023-11-25T04:10:30.468Z"
    },
    {
        "_id": "656567effa1963dc85183eb5",
        "title": "poco f5 5g",
        "price": 25000,
        "category": [
            "Smartphones"
        ],
        "isFreeShipping": true,
        "available_Quantity": 1000,
        "createdAt": "2023-11-28T04:09:19.525Z"
    },
    {
        "_id": "65659c9f164edec732dfe3df",
        "title": "usb",
        "price": 200,
        "category": [
            "USB"
        ],
        "isFreeShipping": true,
        "available_Quantity": 10,
        "createdAt": "2023-11-28T07:54:07.258Z"
    },
    {
        "_id": "65659cae164edec732dfe3ec",
        "title": "usbtype c",
        "price": 200,
        "category": [
            "USB"
        ],
        "isFreeShipping": true,
        "available_Quantity": 10,
        "createdAt": "2023-11-28T07:54:22.164Z"
    },
    {
        "_id": "65659cba164edec732dfe3f9",
        "title": "usbtype wekm",
        "price": 200,
        "category": [
            "USB"
        ],
        "isFreeShipping": true,
        "available_Quantity": 10,
        "createdAt": "2023-11-28T07:54:34.761Z"
    },
    {
        "_id": "6565c9adff221723b2a5e2ca",
        "title": "tp-link wifi 6 ax1500 mbps archer ax10,smart wifi,triple-core cpu, gigabit, dual-band ofdma, mu-mimo, compatible with alexa, wireless router,black",
        "price": 3499,
        "category": [
            "wifi",
            "router"
        ],
        "isFreeShipping": true,
        "available_Quantity": 20,
        "createdAt": "2023-11-28T11:06:21.088Z"
    },
    {
        "_id": "6565dc8a6b248975f09b8520",
        "title": "sandisk ultra dual drive go usb3.0 type c pendrive for mobile (black, 64 gb, 5y - sdddc3-064g-i35)",
        "price": 780,
        "category": [
            "pendrive",
            "storage"
        ],
        "isFreeShipping": true,
        "available_Quantity": 30,
        "createdAt": "2023-11-28T12:26:50.470Z"
    },
    {
        "_id": "6565de3d60ca336e7519a477",
        "title": "zebronics zeb-pgf150 120mm premium chassis fan with 43.5cfm airflow, multicolor leds, hydraulic bearing, 1200 rpm high speed and 4 pin (molex)",
        "price": 399,
        "category": [
            "pc fan",
            "fan",
            "cooler"
        ],
        "isFreeShipping": false,
        "available_Quantity": 10,
        "createdAt": "2023-11-28T12:34:05.296Z"
    },
    {
        "_id": "6565e413594bf9f5124e1fdb",
        "title": "ant esports ice- 300 mesh v2 mid-tower computer case/gaming cabinet - black | support atx, micro-atx, mini-itx | pre-installed 3 front fans and 1 rear fan",
        "price": 3480,
        "category": [
            "pc cabinet"
        ],
        "isFreeShipping": true,
        "available_Quantity": 10,
        "createdAt": "2023-11-28T12:58:59.089Z"
    },
    {
        "_id": "6565e557b2f13996d87fdaac",
        "title": "samsung 980 pro 1tb up to 7,000 mb/s pcie 4.0 nvme m.2 (2280) internal solid state drive (ssd) (mz-v8p1t0)",
        "price": 7999,
        "category": [
            "ssd",
            "m.2 ssd",
            "solid state drive"
        ],
        "isFreeShipping": true,
        "available_Quantity": 20,
        "createdAt": "2023-11-28T13:04:23.075Z"
    },
    {
        "_id": "6565e6eab2f13996d87fdab7",
        "title": "cimetech wireless keyboard and mouse, 2.4g usb portable ergonomic keyboard mouse combo with ultra-thin design, compact full size slim keyboard for mac, windows, laptop, computer - grey",
        "price": 2299,
        "category": [
            "Mouse",
            "Keyboard"
        ],
        "isFreeShipping": true,
        "available_Quantity": 50,
        "createdAt": "2023-11-28T13:11:06.051Z"
    }
]

const handleExportPDF = () => {
  exportToPDF(sessionsData);
};

const handleExportExcel = () => {
  exportToExcel(sessionsData);
};
  const getLoginLogoutSessions = async () => {
    try {
      const responce = await axios.get(process.env.backendapi + "", {
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
      <h1 className="text-2xl font-bold mb-4 text-center">My Products</h1>

      
      <div className="mb-4 text-center">
        <button
          className="bg-red-500 text-white p-2 px-4 mr-2"
          onClick={handleExportPDF}
        >
          Export to PDF 
        </button>
        <button
          className="bg-emerald-600 text-white p-2 px-4"
          onClick={handleExportExcel}
        >
          Export to Excel
        </button>
      </div>
      <SessionTable sessions={sessionsData} />
    </div>
  );
};

export default ProductInventory;
