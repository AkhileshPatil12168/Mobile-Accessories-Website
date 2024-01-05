import Cookies from "universal-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const VendorProductDetailsPage = () => {
  const cookies = new Cookies();
  const cVendorId = cookies.get("Vendor");
  const { productId } = useParams();


  const [product, setProduct] = useState({});

  const getProduct = async () => {
    try {
      const response = await axios.get(
        process.env.backendapi + `/vendor/${cVendorId}/product/${productId}`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 my-8 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-6">{product?.title}</h2>
      <p>Product Id: {product._id}</p>
      <img
        src={product?.productImage ? product?.productImage[0] : ""}
        alt={product?.title}
        className="w-full h-auto mb-6 rounded-md"
      />
      <p className="text-gray-700 mb-4">{product?.description}</p>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-bold">₹{product?.price}</p>
        {product?.isFreeShipping && <p className="text-green-500">Free Shipping</p>}
      </div>
      <div className="mb-4">
        <p className="text-gray-700">
          <strong>Category:</strong> {product?.category ? product?.category.join(", ") : ""}
        </p>
        <p className="text-gray-700">
          <strong>Compatible Models:</strong>{" "}
          {product?.compatible_models ? product?.compatible_models.join(", ") : ""}
        </p>
        <p className="text-gray-700">
          <strong>Available Quantity:</strong> {product?.available_Quantity}
        </p>
        <p className="text-gray-700">
          <strong>Created At:</strong> {new Date(product?.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-700">
          <strong>Last Updated At:</strong> {new Date(product?.updatedAt).toLocaleString()}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">
          <strong>Average Rating:</strong> {product?.ratings?.averageRating}
        </p>
        <p className="text-gray-700">
          <strong>Total Ratings:</strong> {product?.ratings?.totalRating}
        </p>
        <p className="text-gray-700">
          <strong>Total Users Rated:</strong> {product?.ratings?.totalUsersRated}
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
