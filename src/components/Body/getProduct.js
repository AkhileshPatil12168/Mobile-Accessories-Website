import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../animation/loading";

const Product = (props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cUserId = cookies.get("User");
  const {ratings} = props;
  const { id } = useParams();
  

  const [product, setProduct] = useState();
  const [text, setText] = useState("Add to cart");
  const [color, setColor] = useState("bg-orange-600");
  const [cursor, setCursor] = useState("");
  const [lineThrough, setLineThrough] = useState("");
  const [res, setRes] = useState();

  async function getProduct() {
    try {
      const response = await axios.get(
        process.env.backendapi + "/products/" + `${id}`,
        {
          withCredentials: true,
        }
      );
      setProduct(response.data.data.productsDetails);
       console.log(response.data.data.productsDetails)
    } catch (error) {
      console.error(error);
    }
  }
  async function addToCart() {
    try {
      if (!cUserId) navigate("/login");
      else {
        setText(
          <div className="justify-center h-full w-full pt-1">{Loading()}</div>
        );
        let response = await axios.put(
          process.env.backendapi + `/user/${cUserId}/cart`,
          {
            productId: id,
            value: 1,
          },
          { withCredentials: true }
        );
        setRes(response.status);

        setProduct({
          ...product,
          available_Quantity: product.available_Quantity - 1,
        });
      }
    } catch (error) {
      console.log(error?.response?.status);
      setRes(error?.response?.status);
    }
  }
  useEffect(() => {
    if (res == 201) {
      setText("added");
      setColor("bg-green-500");

      setTimeout(() => {
        setText("Add to cart");
        setColor("bg-orange-600");

        setRes();
      }, 1000 - 300);
    } else if (res == 400) {
      setText("Add to cart");
      setLineThrough("line-through");
      setCursor("cursor-not-allowed");
      setColor("bg-gray-500");
      setProduct({ ...product, available_Quantity: 0 });
    }
  }, [res]);

  useEffect(() => {
    getProduct();
  }, []);

  return product ? (
    // <div className="mt-24">
    //     <img src={product?.productImage[0]}></img>
    //     <h1>{product?.title}</h1>
    // </div>
    <div className="m-0 p-0">
      <div className="w-full max-w-[1200px] bg-white flex mx-auto my-5 p-5">
        <div className="flex-[0_0_50%] mr-5">
          <img
            className="max-w-full h-auto"
            src={product?.productImage[0]}
            alt="Product Image"
          />
        </div>
        <div className="flex-1">
          {/* Title */}
          <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            {product?.title}
          </h1>
          {/* PRICE */}
          <h2 className="mt-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-green-500 md:text-3xl lg:text-4xl dark:text-white">
            Price: ₹{product?.price}
          </h2>

          <h2 className="mt-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
            Ratings: {product.ratings?.averageRating}⭐
          </h2>

          {/* Other Details */}
          <div className="relative overflow-x-auto my-4">
            <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Category
                  </th>
                  <td className="px-6 py-4">{product?.category.join(", ")}</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Compatible Models:
                  </th>
                  <td className="px-6 py-4">
                    {product?.compatible_models.join(", ")}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Free Shipping
                  </th>
                  <td className="px-6 py-4">
                    {product?.isFreeShipping ? "Yes" : "No"}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Available Quantity:
                  </th>
                  <td className="px-6 py-4">{product?.available_Quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add To Cart */}
          <div className="flex mb-4">
            <button
              onClick={addToCart}
              disabled={res == 400 ? true : false}
              className={
              `flex items-center justify-center ${lineThrough} ${cursor} text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-1 w-full`}
            >
              {text}
            </button>
          </div>

          {/* Description */}
          <p class="mb-6 text-lg font-normal text-gray-500 dark:text-gray-400">
            <span class="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              DESCRIPTION:
            </span>
            {product?.description}
          </p>

          {/* <a href="#" className="inline-block bg-[#ff5722] text-white no-underline rounded text-lg transition-[background-color] duration-[0.3s] px-5 py-2.5 hover:bg-[#f44336]">
                        Add to Cart
                    </a> */}

        </div>
      </div>
    </div>
  ) : (
    <h1>no data </h1>
  );
  z;
};

export default Product;
