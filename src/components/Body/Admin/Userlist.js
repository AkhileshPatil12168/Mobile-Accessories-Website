import React from "react";
import { useState } from "react";

data = [
  {
    _id: "654ff93fa099530dcf22e4f7",
    fname: "balu",
    lname: "patil",
    email: "balu@gmail.com",
    phone: "6699885522",
    address: {
      shipping: {
        street: "shahu park",
        city: "kolhapur",
        pincode: 416004,
      },
      billing: {
        street: "shahu park",
        city: "kolhapur",
        pincode: 416004,
      },
    },
  },
  {
    _id: "6550f2d6c2c327a7d85585ae",
    fname: "vaibhav",
    lname: "patil",
    email: "vaibhav@gmail.com",
    phone: "8956895689",
  },
  {
    _id: "655c54c1046eb0aa4db15696",
    fname: "vijay",
    lname: "patil",
    email: "vp9261@gmail.com",
    profileImage:
      "https://electronic-store-bucket.s3.ap-south-1.amazonaws.com/profile/WIN_20230126_05_29_01_Pro.jpg",
    phone: "8552819261",
  },
  {
    _id: "6565eb75b2f13996d87fdb02",
    fname: "anjum",
    lname: "ustad",
    email: "anjumustad0504@gmail.com",
    phone: "8888578595",
  },
];

const Userlist = () => {
  return (
    <>
      <div className="overflow-x-auto mx-4 my-7 rounded">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-slate-300">
            <tr>
              <th className="py-2 px-4 border-b border-r text-center">ID</th>
              <th className="py-2 px-4 border-b border-r text-center">
                Profile Image
              </th>
              <th className="py-2 px-4 border-b border-r text-center">
                First Name
              </th>
              <th className="py-2 px-4 border-b border-r text-center">
                Last Name
              </th>
              <th className="py-2 px-4 border-b border-r text-center">Email</th>
              <th className="py-2 px-4 border-b border-r text-center">Phone</th>
              <th className="py-2 px-4 border-b border-r text-center">
                Shipping Address
              </th>
              <th className="py-2 px-4 border-b text-center">
                Billing Address
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className="transition-all hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-r text-center">
                  {user._id}
                </td>
                <td className="py-2 px-4 border-b border-r text-center">
                  {user.profileImage && (
                    <img
                      src={user.profileImage}
                      alt={`${user.fname} ${user.lname}`}
                      className="w-12 h-12 object-cover rounded-full mx-auto"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b border-r text-center">
                  {user.fname}
                </td>
                <td className="py-2 px-4 border-b border-r text-center">
                  {user.lname}
                </td>
                <td className="py-2 px-4 border-b border-r text-center">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b border-r text-center">
                  {user.phone}
                </td>
                <td className="py-2 px-4 border-b border-r text-center">
                  {user.address && (
                    <div className="text-center">
                      <p>{user.address.shipping.street},</p>
                      <p>{user.address.shipping.city} </p>
                      <p>{user.address.shipping.pincode}</p>
                    </div>
                  )}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {user.address && (
                    <div className="text-center">
                      <p>{user.address.billing.street},</p>
                      <p>{user.address.billing.city} </p>
                      <p>{user.address.billing.pincode}</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Userlist;
