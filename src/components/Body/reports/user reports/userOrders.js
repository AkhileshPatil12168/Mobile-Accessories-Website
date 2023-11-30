import React from "react";
import timeConverter from "../../../../util/timeConverter";

const UserTable = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Users Orders</h1>
      
      <div className="container mx-auto p-4">
       
      </div>

      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Oredered Date</th>
              <th className="border p-2">Payment Status</th>

            </tr>
            </thead>
            <tbody>
            {data.map((user) => (
              <tr key={user.userId}>
                <td className="border p-2 text-center">{user._id}</td>
                <td className="border p-2 text-center">{user.name}</td>
                <td className="border p-2 text-center">{user.totalPrice}</td>
                <td className="border p-2 text-center">{user.orderdedDate.slice(0, 10) +
                      " / " +
                      timeConverter(user.orderdedDate.slice(11, 16))}</td>
                <td className="border p-2 text-center">{user.paymentStatus}</td>

              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    
    
    </div>
    
  );
};

const UserOrders = () => {
  const data =   [
    {
        "_id": "655fb0f5aaa9f98b8c1b8cd4",
        "name": "vaibhav patil",
        "totalPrice": 2798,
        "orderdedDate": "2023-11-24T01:35:22.245Z",
        "paymentStatus": "pending"
    },
    {
        "_id": "655a6f907e99e60bb553b3fe",
        "name": "vaibhav patil",
        "totalPrice": 2388,
        "orderdedDate": "2023-11-20T01:56:46.550Z",
        "paymentStatus": "pending"
    },
    
    {
        "_id": "655fbf36e119d6da6d0259e9",
        "name": "vaibhav patil",
        "totalPrice": 989,
        "orderdedDate": "2023-11-24T02:37:27.348Z",
        "paymentStatus": "pending"
    }
]

  return (
    <div>
      <UserTable data={data} />
    </div>
  );
};


export default UserOrders