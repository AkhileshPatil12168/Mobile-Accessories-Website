import axios from "axios";
import Cookies from "universal-cookie";

import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const VendorProductsPage = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cVendorId = cookies.get("Vendor");

  const [products, setProducts]=useState([])

  const getProducts = async () => {
    try {
      const responce = await axios.get(
        process.env.backendapi + `/vendor/${cVendorId}/products`,

        { withCredentials: true }
      );
      setProducts(responce?.data?.data)
      console.log(responce.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="max-w-7xl mx-auto bg-white p-8 my-8 rounded-md shadow-lg">
      <h2 className="text-3xl font-bold mb-6">My Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {products.map((product) => (
          // Single Product
          <div key={product._id} className="bg-gray-100 p-4 rounded-md border border-gray-100 hover:border-blue-500 hover:rounded hover:border-1 hover:duration-300 hover:ease-in-out">
            <img
              src={product.productImage[0]}
              alt={product.title}
              className="w-full h-60 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-bold mb-2">{product.title}</h3>
            <p className="text-green-500 mb-2 font-medium">₹{product.price}</p>
            <p className="text-gray-700 mb-2 font-medium">Available Quantity: <span className="text-violet-500">{product.available_Quantity}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorProductsPage;
