import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Cookies from "universal-cookie";

const Product = (props) => {
  const { productImage, title, available_Quantity, price, index } = props;
  console.log(available_Quantity);
  const [bgColor, setBgColor] = useState("bg-white");
  useEffect(() => {
    if (index % 2 == 0) setBgColor("bg-gray-200");
  });
  return (
    <div className={`flex mb-2 ${bgColor} border border-gray-500 `}>
      <img
        src={productImage[0]}
        alt={`Product Image ${productImage[0]}`}
        className="w-16 h-16 mr-2 m-4 "
      />
      <div>
        <p className="mb-2">
          <strong>Title:</strong> {title}
        </p>
        <p className="mb-2">
          <strong>Quantity left:</strong> {available_Quantity}
        </p>
        <p className="mb-2">
          <strong>Price:</strong> ₹{price}
        </p>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const cAdminId = cookies.get("Admin");

  const [products, setProducts] = useState([]);

  const [recentProducts, setRecentProducts] = useState([]);
  const [outOfStock, setOutOfstock] = useState([]);
  const [nearToOutOfStock, setNearToOutOfStock] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(process.env.backendapi + `/products`, {
        withCredentials: true,
      });
      const allProducts = response.data.data;
      console.log(allProducts);
      setProducts(allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRecentProducts(products.slice(0, 5));
    setOutOfstock(
      products.filter((product) => product.available_Quantity == 0)
    );
    setNearToOutOfStock(
      products.filter(
        (product) =>
          product.available_Quantity <= 10 && product.available_Quantity > 0
      )
    );
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return !cAdminId ? (
    navigate("/login")
  ) : (
    <div className="mx-20 ">
      {/* Product Summary And Last 5 Order */}
      <div className="border-b-2 border-blue-300 flex justify-center flex-wrap pb-8 py-4 my-8">
        {/* Summary */}
        <div className="p-4 mx-2 bg-white w-auto">
          <p className="text-lg font-bold mb-4 text-center">Summery</p>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3"></th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Out Of Stock Products
                  </th>
                  <td class="px-6 py-4">{outOfStock.length}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Near Out Of Stock Products
                  </th>
                  <td class="px-6 py-4">{nearToOutOfStock.length}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Products
                  </th>
                  <td class="px-6 py-4">{products.length}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add New Products */}
          {/* <div className="bg-white border border-gray-300 h-[100px] w-[300px] mt-2 ml-12 flex justify-evenly">
                        <Link to="/admin/create/product">
                            <div className="h-[70px] w-[270px]  mt-4 bg-green-300 hover:bg-green-500">
                                <p className="text-center pt-6 text-xl font-bold">
                                    ADD NEW PRODUCT
                                </p>
                            </div>
                        </Link>
                    </div> */}
        </div>

        {/* Last 5 Order */}
        <div className="lg:w-1/2 sm:w-full mx-2">
          <div className="border border-gray-300 rounded p-4  bg-white min-h-[50px] max-h-[500px] w-auto">
            <p className="text-lg font-bold mb-4 text-center">
              Recent 5 products
            </p>
            <div className="p-4 rounded overflow-y-auto min-h-[50px] max-h-[400px] ">
              {recentProducts.map((product, index) => (
                // <Link to={`/admin/product/${product._id}`} key={product._id}>
                <Product {...product} index={index} />
                /* </Link> */
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Stocks */}
      <div className=" pb-4 p-4">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-center">
            {/* Out oF Stock */}
          <div className="my-2 mx-2">
            <div className="border border-gray-300 rounded p-2 bg-white min-h-[50px] max-h-[500px] ">
              <p className="text-lg font-bold mb-4 text-center">
                out of stock products ({outOfStock.length})
              </p>
              <div className="flex justify-between mr-2 p-2 ">
                <div className=" p-2 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-auto">
                  {outOfStock.map((product, index) => (
                    // <Link
                    //     to={`/admin/product/${product._id}`}
                    //     key={product._id}
                    // >
                    <Product {...product} index={index} />
                    // </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Near Out Of Stock */}
          <div className="mx-2">
            <div className="border border-gray-300 rounded p-2  bg-white min-h-[50px] max-h-[500px]">
              <p className="text-lg font-bold mb-4 text-center">
                near to out of stock ({nearToOutOfStock.length})
              </p>
              <div className="flex justify-between mr-2 p-2 ">
                <div className="p-2 rounded overflow-y-auto min-h-[50px] max-h-[400px] w-auto">
                  {nearToOutOfStock.map((product, index) => (
                    // <Link
                    //     to={`/admin/product/${product._id}`}
                    //     key={product._id}
                    // >
                    <Product {...product} index={index} />
                    // </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
