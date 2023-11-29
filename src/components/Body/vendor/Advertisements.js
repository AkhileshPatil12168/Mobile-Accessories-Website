import React from 'react';

const AdvertisementCard = ({ advertisement }) => {
  const { productId, advertisementImage, advertisementType, startDate, endDate, isApproved, paymentStatus, isLive } = advertisement;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img src={advertisementImage} alt={productId.title} className="w-full h-64 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productId.title}</div>
        <p className="text-gray-700 text-base mb-2">Advertisement Type: {advertisementType}</p>
        <p className="text-gray-700 text-base mb-2">Start Date: {startDate}</p>
        <p className="text-gray-700 text-base mb-2">End Date: {endDate}</p>
        <p className={`text-${isApproved ? 'green' : 'red'}-700 text-base mb-2`}>
          Approval Status: {isApproved ? 'Approved' : 'Not Approved'}
        </p>
        <p className={`text-${paymentStatus === 'completed' ? 'green' : 'orange'}-700 text-base mb-2`}>
          Payment Status: {paymentStatus}
        </p>
        <p className={`text-${isLive ? 'green' : 'red'}-700 text-base mb-2`}>Live Status: {isLive ? 'Live' : 'Not Live'}</p>
      </div>
    </div>
  );
};

let data = [
    {
        "_id": "65635ee8c5483535a5facb04",
        "productId": {
            "_id": "655204354ea1c59f72668502",
            "title": "spigen back cover compatible for samsung galaxy a73 5g"
        },
        "advertisementImage": "https://electronic-store-bucket.s3.ap-south-1.amazonaws.com/advertisements/Spigen-Mobile-Phone-Cases-and-Covers.jpg",
        "advertisementType": "top banner",
        "startDate": "2023-11-27T00:00:00.000Z",
        "endDate": "2023-12-02T00:00:00.000Z",
        "isApproved": true,
        "paymentStatus": "completed",
        "isLive": true
    },
    {
        "_id": "65635f51c5483535a5facb08",
        "productId": {
            "_id": "656173b6b04d50dc6cd28bc1",
            "title": "iphone 15 (128gb)"
        },
        "advertisementImage": "https://electronic-store-bucket.s3.ap-south-1.amazonaws.com/advertisements/iphone15banner.jpg",
        "advertisementType": "top banner",
        "startDate": "2023-12-05T00:00:00.000Z",
        "endDate": "2023-12-10T00:00:00.000Z",
        "isApproved": false,
        "paymentStatus": "pending",
        "isLive": false
    },
    {
        "_id": "65637932d3d05f13699b5359",
        "productId": {
            "_id": "656173b6b04d50dc6cd28bc1",
            "title": "iphone 15 (128gb)"
        },
        "advertisementImage": "https://electronic-store-bucket.s3.ap-south-1.amazonaws.com/advertisements/iphone15banner.jpg",
        "advertisementType": "top banner",
        "startDate": "2023-12-11T00:00:00.000Z",
        "endDate": "2023-12-14T00:00:00.000Z",
        "isApproved": false,
        "paymentStatus": "pending",
        "isLive": false
    }
]

const Advertisements = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Advertisement Listings</h1>
      <div className="flex flex-wrap">
        {data?.map((advertisement) => (
          <AdvertisementCard key={advertisement._id} advertisement={advertisement} />
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
