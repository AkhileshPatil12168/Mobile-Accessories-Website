import React from 'react';
const product = {
    "_id": "6551371727cea9db338a0dcc",
    "vendorId": "654e7c5d73c4f2d12f0747a6",
    "title": "boat airdopes 141 bluetooth truly wireless in ear headphones",
    "description": "playback- enjoy an extended break on weekends with your favourite episodes on stream, virtue of a playback time of up to 42 hours including the 6 hours nonstop playtime for earbuds. frequency 20hz-20khz, charging time - 1hr earbuds, 2hr case hours\nlow latency- our beast mode makes airdopes 141 a partner in entertainment with real-time audio and low latency experience. driver size: 8mm x 2 drivers\nclear voice calls- it dons built-in mic on each earbud along with our enx environmental noise cancellation tech that ensures a smooth delivery of your voice via voice calls\nboat signature sound- delve into your cherished boat immersive auditory time with airdopes 141\nasap charge- the earbuds are equipped with our asap charge feature that offers up to 75 min of playtime in just 5 min of charge; while the carry case comes along with the type c interface\ninstant connect- connect to your morning playlists without any hiccup via the insta wake n’ pair technology that powers on the earbuds as soon as you open the case cover\nip rating- the earbuds’ body comes protected with ipx4 rating for water and sweat resistance\nvoice assistant- you can summon your default voice assistant(s) with ease via its one touch voice assistant",
    "price": 1399,
    "category": [
        "ear phones",
        "blutooth",
        "wireless"
    ],
    "compatible_models": [
        "any with bluethooth",
        "jsut"
    ],
    "isFreeShipping": true,
    "productImage": [
        "https://electronic-store-bucket.s3.ap-south-1.amazonaws.com/product/619gHpSiOXL._SX522_.jpg"
    ],
    "available_Quantity": 0,
    "isDeleted": false,
    "createdAt": "2023-11-12T20:35:35.460Z",
    "updatedAt": "2023-11-27T20:25:43.561Z",
    "__v": 0,
    "ratings": {
        "_id": "6551371727cea9db338a0dce",
        "averageRating": 4,
        "totalRating": 8,
        "totalUsersRated": 2
    }
}
const VendorProductDetailsPage = () => {
    const {
        _id,
        title,
        description,
        price,
        category,
        compatible_models,
        isFreeShipping,
        productImage,
        available_Quantity,
        createdAt,
        updatedAt,
        ratings,
      } = product;
    
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 my-8 rounded-md shadow-lg">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          <img src={productImage[0]} alt={title} className="w-full h-auto mb-6 rounded-md" />
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-bold">${price}</p>
            {isFreeShipping && <p className="text-green-500">Free Shipping</p>}
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Category:</strong> {category.join(', ')}
            </p>
            <p className="text-gray-700">
              <strong>Compatible Models:</strong> {compatible_models.join(', ')}
            </p>
            <p className="text-gray-700">
              <strong>Available Quantity:</strong> {available_Quantity}
            </p>
            <p className="text-gray-700">
              <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <strong>Last Updated At:</strong> {new Date(updatedAt).toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Average Rating:</strong> {ratings?.averageRating}
            </p>
            <p className="text-gray-700">
              <strong>Total Ratings:</strong> {ratings?.totalRating}
            </p>
            <p className="text-gray-700">
              <strong>Total Users Rated:</strong> {ratings?.totalUsersRated}
            </p>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Update</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
          </div> 
        </div>
      );
};

export default VendorProductDetailsPage;
