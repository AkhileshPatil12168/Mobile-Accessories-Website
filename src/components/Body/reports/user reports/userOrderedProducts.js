import React, { useEffect, useState } from "react";
import timeConverter from "../../../../util/timeConverter";
import axios from "axios";
import { useParams } from "react-router-dom";
import PdfAndExcelConverter from "../../../PDF and Excel converter/PdfAndExcelConverter";

const UserTable = ({ data }) => {
  
 
    const [filterUserType, setFilterUserType] = useState("All");

    const filtereddata =
      filterUserType === "All"
        ? data
        : data.filter((user) => user.userId === filterUserType);
  
    const userTypes = ["All",...new Set(data.map(user=>user.userId))];
  
    return (
      <>
        <div className="container mx-auto p-4">
          <div className="mb-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Order Information</h1>


           
            <label className="block text-center font-medium text-gray-700 text-xl">Order Id: 655a6f907e99e60bb553b3fe</label>
           <PdfAndExcelConverter/>
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
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-indigo-500 text-white">
                <tr>
                 
                  <th className="py-2 px-4 border-b border-r text-center">Product ID</th>
                  <th className="py-2 px-4 border-b border-r text-center">Product Name</th>
                  <th className="py-2 px-4 border-b border-r text-center">Total Price</th>
                  <th className="py-2 px-4 border-b border-r text-center">Order Status</th>
                  <th className="py-2 px-4 border-b border-r text-center">Total Quantity</th>
                  <th className="py-2 px-4 border-b border-r text-center">Payment Method</th>
                  <th className="py-2 px-4 border-b border-r text-center">Payment Status</th>
                  <th className="py-2 px-4 border-b border-r text-center">cancelled Date</th>




                </tr>
              </thead>
              <tbody>
                {filtereddata.map((session) => (
                  <tr key={session._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b border-r text-center">{session.productId}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{session.title.slice(0,60)}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{session.totalPrice}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{session.OrderStatus}</td>
                    {/* <td className="py-2 px-4 border-b border-r text-center">{session.totalItems}</td> */}
                    <td className="py-2 px-4 border-b border-r text-center">{session.quantity}</td>
                    <td className="py-2 px-4 border-b border-r text-center">{session.paymentMethod}</td>

                    <td className="py-2 px-4 border-b border-r text-center">{session.paymentStatus?session.paymentStatus:"NA"}</td>



                    <td className="py-2 px-4 border-b border-r text-center">
                      {session.cancelledDate?session.cancelledDate.slice(0, 10) +
                        " / " +
                        timeConverter(session.cancelledDate.slice(11, 16)):"NA"}
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

const   OrderedProducts = () => {
    const {orderId} = useParams()
    console.log(orderId)
    const ordersData =[
        {
        _id: "655a6ec3aec636aeba6850be",
        productId: "6551371727cea9db338a0dcc",
        quantity: 1,
        title: "boat airdopes 141 bluetooth truly wireless in ear headphones",
        totalPrice: 1399,
        OrderStatus: "cancelled",
        
        createdAt: "2023-11-19T20:26:57.277Z",
        cancelledDate: "2023-11-21T01:21:34.367Z",
        paymentMethod: "cash on delivery"
        },
        {
        _id: "655a6ec5aec636aeba6850c4",
        productId: "655204354ea1c59f72668502",
        quantity: 1,
        title: "spigen back cover compatible for samsung galaxy a73 5g",
        totalPrice: 989,
        OrderStatus: "completed",
       
        createdAt: "2023-11-19T20:26:57.509Z",
        deliveredDate: "2023-11-21T13:22:59.153Z",
        paymentMethod: "cash on delivery",
        paymentStatus: "completed"
        }
        ]

 
    // const [ordersData, setOrdersData] = useState([]);

    // const getLoginLogoutSessions = async () => {
    //   try {
    //     const responce = await axios.get(process.env.backendapi + `/report/user/orders/?orderId=${orderId}`, {
    //       withCredentials: true,
    //     });
    //     setOrdersData(responce.data.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // useEffect(() => {
    //   getLoginLogoutSessions();
    // }, []);

  return (
    <div>
      <UserTable data={ordersData} />
    </div>
  );
};


export default OrderedProducts