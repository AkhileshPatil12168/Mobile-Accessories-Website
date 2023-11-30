import React from "react";
import timeConverter from "../../../../util/timeConverter";

const UserTable = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">OverAll Orders</h1>
      
      <div className="container mx-auto p-4">
       
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
            {data.map((user) => (
              <tr key={user.userId}>
                <td className="border p-2 text-center">{user._id}</td>
                <td className="border p-2 text-center">{user.advertisementId}</td>
              
                <td className="border p-2 text-center">{user.date.slice(0, 10) +
                      " / " +
                      timeConverter(user.date.slice(11, 16))}</td>
                

                <td className="border p-2 text-center">{user.clicks}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    
    
    </div>
    
  );
};

const ClicksPerAdsByDays = () => {
  const data =   [
    {
        "_id": "656602a540c5ef6a7f2168d2",
        "advertisementId": "65635ee8c5483535a5facb04",
        "date": "2023-11-28T00:00:00.000Z",
        "__v": 0,
        "clicks": 12,
        "createdAt": "2023-11-28T15:09:26.498Z",
        "updatedAt": "2023-11-28T17:03:42.564Z"
    },
    {
        "_id": "6566e7484ca7a3d75156856f",
        "advertisementId": "65635ee8c5483535a5facb04",
        "date": "2023-11-29T00:00:00.000Z",
        "__v": 0,
        "clicks": 23,
        "createdAt": "2023-11-29T07:24:58.111Z",
        "updatedAt": "2023-11-29T15:53:57.425Z"
    },
    {
        "_id": "6567ff184ca7a3d7515b7e16",
        "advertisementId": "65635ee8c5483535a5facb04",
        "date": "2023-11-30T00:00:00.000Z",
        "__v": 0,
        "clicks": 1,
        "createdAt": "2023-11-30T03:17:51.900Z",
        "updatedAt": "2023-11-30T03:17:51.900Z"
    }
]
console.log(data)

  return (
    <div>
      <UserTable data={data} />
    </div>
  );
};


export default ClicksPerAdsByDays