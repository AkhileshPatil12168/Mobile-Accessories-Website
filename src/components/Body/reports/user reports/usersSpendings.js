import React from "react";

const UserTable = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Users Spendings Information</h1>
      
      <div className="container mx-auto p-4">
       
      </div>

      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Total Spendings</th>
              <th className="border p-2">Total Orders</th>
            </tr>
            </thead>
            <tbody>
            {data.map((user) => (
              <tr key={user.userId}>
                <td className="border p-2 text-center">{user.userId}</td>
                <td className="border p-2 text-center">{user.name}</td>
                <td className="border p-2 text-center">{user.totalSpendings}</td>
                <td className="border p-2 text-center">{user.totalOrders}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    
    
    </div>
    
  );
};

const UsersSpendings = () => {
  const data = [
    {
      name: "vaibhav patil",
      totalSpendings: 8973,
      totalOrders: 5,
      userId: "6550f2d6c2c327a7d85585ae",
    },
    {
      name: "vijay patil",
      totalSpendings: 1399,
      totalOrders: 1,
      userId: "655c54c1046eb0aa4db15696",
    },
  ];

  return (
    <div>
      <UserTable data={data} />
    </div>
  );
};


export default UsersSpendings