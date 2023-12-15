import React from "react";
import timeConverter from "../../../../util/timeConverter";
import PdfAndExcelConverter from "../../../PDF and Excel converter/PdfAndExcelConverter";

const UserTable = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Reviews</h1>
      
   <PdfAndExcelConverter/>

      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="border p-2">Product Id</th>
              <th className="border p-2">Review</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Review Date</th>
              <th className="border p-2">edited</th>
              <th className="border p-2">edited Date</th>


            </tr>
            </thead>
            <tbody>
            {data.map((review) => (
              <tr key={review.reviewId}>
                <td className="border p-2 text-center">{review.productId}</td>
                <td className="border p-2 text-center">{review.review}</td>
                <td className="border p-2 text-center">{review.rating}</td>
                <td className="border p-2 text-center">{review.reviewDate.slice(0, 10) +
                      " / " +
                      timeConverter(review.reviewDate.slice(11, 16))}</td>
                <td className="border p-2 text-center">{review.edited?"Yes":"No"}</td>
                <td className="border p-2 text-center">{review.edited?review.updatedAt.slice(0, 10) +
                      " / " +
                      timeConverter(review.updatedAt.slice(11, 16)):"NA"}</td>


              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    
    
    </div>
    
  );
};

const UserReviews = () => {
  const data =  [
    {
        "_id": "656603be7b4cd675afeaadf1",
        "productId": "6565e557b2f13996d87fdaac",
        "userId": "6550f2d6c2c327a7d85585ae",
        "rating": 4,
        "review": "review by vaibhav",
        "reviewDate": "2023-11-28T20:44:06.784Z",
        "edited": false,
        "isDeleted": false,
        "createdAt": "2023-11-28T15:14:06.797Z",
        "updatedAt": "2023-11-28T15:14:06.797Z"
    },
    {
        "_id": "6551dc16fbc7fe3103d228d9",
        "productId": "6551371727cea9db338a0dcc",
        "userId": "6550f2d6c2c327a7d85585ae",
        "rating": 4,
        "review": "review by vaibhav",
        "reviewDate": "2023-11-13T13:49:34.048Z",
        "edited": false,
        "isDeleted": false,
        "createdAt": "2023-11-13T08:19:34.061Z",
        "updatedAt": "2023-11-13T08:19:34.061Z"
    },
    {
        "_id": "6551d7ffbef800fe6565a5ac",
        "productId": "6551371727cea9db338a0dcc",
        "userId": "6550f2d6c2c327a7d85585ae",
        "rating": 5,
        "review": "check update",
        "reviewDate": "2023-11-13T13:46:43.594Z",
        "edited": true,
        "isDeleted": true,
        "createdAt": "2023-11-13T08:02:07.414Z",
        "updatedAt": "2023-11-13T08:19:01.521Z"
    },
    {
        "_id": "655137b3e0f31cb113275e73",
        "productId": "6551371727cea9db338a0dcc",
        "userId": "6550f2d6c2c327a7d85585ae",
        "rating": 4,
        "review": "got a replacement, happy now.",
        "reviewDate": "2023-11-13T11:44:18.782Z",
        "isDeleted": true,
        "createdAt": "2023-11-12T20:38:11.263Z",
        "updatedAt": "2023-11-13T07:14:53.726Z",
        "edited": true
    }
]

  return (
    <div>
      <UserTable data={data} />
    </div>
  );
};


export default UserReviews