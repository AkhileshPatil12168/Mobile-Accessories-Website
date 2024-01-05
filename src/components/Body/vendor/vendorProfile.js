import React from 'react';

const VendorProfile = () => {
    let data = 
         {
            _id: "654e7c5d73c4f2d12f0747a6",
            storeName: "akkis electronics",
            fname: "akhilesh",
            mname: "sunil",
            lname: "patil",
            image: "https://electronic-store-bucket.s3.ap-south-1.amazonaws.com/vendor/logo.png",
            email: "akhileshpatil48@gamil.com",
            address: {
                "street": "shahu park",
                "city": "kolhapur",
                "state": "maharashtra",
                "pincode": "416004"
            },
            "phone": "9075888942",
            "isApproved": true,
            "isSuspended": false,
            "registrationDate": "2023-11-10T18:54:21.322Z"
        
    }
  const {
    storeName,
    fname,
    mname,
    lname,
    image,
    email,
    address,
    phone,
    isApproved,
    isSuspended,
    registrationDate,
  } = data; 

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 my-8 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-6">{storeName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <img src={image} alt={`${storeName} Logo`} className="w-full h-auto mb-4 rounded" />
        </div>
        <div className="col-span-2">
          <p className="mb-4">
            <strong>Name:</strong> {fname} {mname && `${mname} `}{lname}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {email}
          </p>
          <p className="mb-4">
            <strong>Address:</strong> {`${address.street}, ${address.city}, ${address.state} - ${address.pincode}`}
          </p>
          <p className="mb-4">
            <strong>Phone:</strong> {phone}
          </p>
          <p className="mb-4">
            <strong>Approval Status:</strong> {isApproved ? 'Approved' : 'Not Approved'}
          </p>
          <p className="mb-4">
            <strong>Suspension Status:</strong> {isSuspended ? 'Suspended' : 'Not Suspended'}
          </p>
          <p className="mb-4">
            <strong>Registration Date:</strong> {new Date(registrationDate).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
