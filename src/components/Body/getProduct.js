import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../animation/loading";

const Product = (props) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cUserId = cookies.get("User");
  const { ratings } = props;
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
      console.log(response.data.data.productsDetails);
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

          {/* Add To wishlist  and  Add to cart */}
          <div className="flex mb-4">
            <button
              className={`flex items-center justify-center ${lineThrough} ${cursor} text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-1 w-1/2`}
            >
              <svg
                className="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
              </svg>
            </button>

            {/* Add to cart */}
            <button
              onClick={addToCart}
              disabled={res == 400 ? true : false}
              className={`flex items-center justify-center ${lineThrough} ${cursor} text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-1 w-full`}
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

      {/* Review Form */}

      <form class="max-w-sm mx-auto">
        {/* Star Counter */}
        <form className="max-w-xs my-3">
          <label
            htmlFor="bedrooms-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ratings:
          </label>
          <div className="relative flex items-center max-w-[11rem]">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="bedrooms-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="text"
              id="bedrooms-input"
              data-input-counter=""
              data-input-counter-min={1}
              data-input-counter-max={5}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pb-6 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              defaultValue={3}
              required=""
            />
            <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
              <svg
                className="w-2.5 h-2.5 text-yellow-300 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span>Stars</span>
            </div>
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="bedrooms-input"
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Please select the number of Stars.
          </p>
        </form>

        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Leave a comment..."
        ></textarea>

        {/* Input type Image */}
        <div class="flex items-center justify-center w-full mt-2">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              class="hidden"
            />
          </label>
        </div>
      </form>

      {/* Review */}
      <article className=" mx-auto my-5 p-5 border-gray-300 border-t-2 w-9/12 overflow-scroll scroll-smooth h-96">
        <div className="">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 me-4 rounded-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._6kSqsTmX5o4yeSjGnw48AHaLH%26pid%3DApi&f=1&ipt=9f1127d1d114e5d2f8dcf666000e632c5af7d399463324f43a6f5b4778666792&ipo=images"
              alt=""
            />
            <div className="font-medium dark:text-white">
              <p>
                Jese Leos{" "}
                <time
                  dateTime="2014-08-16 19:00"
                  className="block text-sm text-gray-500 dark:text-gray-400"
                >
                  Joined on August 2014
                </time>
              </p>
            </div>
          </div>
          <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <p>4</p>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
              Thinking to buy another one!
            </h3>
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            This is my third Invicta Pro Diver. They are just fantastic value
            for money. This one arrived yesterday and the first thing I did was
            set the time, popped on an identical strap from another Invicta and
            went in the shower with it to test the waterproofing.... No
            problems.
          </p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            It is obviously not the same build quality as those very expensive
            watches. But that is like comparing a Citroën to a Ferrari. This
            watch was well under £100! An absolute bargain.
          </p>
          <a
            href="#"
            className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Read more
          </a>
        </div>
        <div className="">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 me-4 rounded-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._6kSqsTmX5o4yeSjGnw48AHaLH%26pid%3DApi&f=1&ipt=9f1127d1d114e5d2f8dcf666000e632c5af7d399463324f43a6f5b4778666792&ipo=images"
              alt=""
            />
            <div className="font-medium dark:text-white">
              <p>
                Jese Leos{" "}
                <time
                  dateTime="2014-08-16 19:00"
                  className="block text-sm text-gray-500 dark:text-gray-400"
                >
                  Joined on August 2014
                </time>
              </p>
            </div>
          </div>
          <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <p>4</p>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
              Thinking to buy another one!
            </h3>
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            This is my third Invicta Pro Diver. They are just fantastic value
            for money. This one arrived yesterday and the first thing I did was
            set the time, popped on an identical strap from another Invicta and
            went in the shower with it to test the waterproofing.... No
            problems.
          </p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            It is obviously not the same build quality as those very expensive
            watches. But that is like comparing a Citroën to a Ferrari. This
            watch was well under £100! An absolute bargain.
          </p>
          <a
            href="#"
            className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Read more
          </a>
        </div>
        <div className="">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 me-4 rounded-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._6kSqsTmX5o4yeSjGnw48AHaLH%26pid%3DApi&f=1&ipt=9f1127d1d114e5d2f8dcf666000e632c5af7d399463324f43a6f5b4778666792&ipo=images"
              alt=""
            />
            <div className="font-medium dark:text-white">
              <p>
                Jese Leos{" "}
                <time
                  dateTime="2014-08-16 19:00"
                  className="block text-sm text-gray-500 dark:text-gray-400"
                >
                  Joined on August 2014
                </time>
              </p>
            </div>
          </div>
          <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <p>4</p>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
              Thinking to buy another one!
            </h3>
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            This is my third Invicta Pro Diver. They are just fantastic value
            for money. This one arrived yesterday and the first thing I did was
            set the time, popped on an identical strap from another Invicta and
            went in the shower with it to test the waterproofing.... No
            problems.
          </p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            It is obviously not the same build quality as those very expensive
            watches. But that is like comparing a Citroën to a Ferrari. This
            watch was well under £100! An absolute bargain.
          </p>
          <a
            href="#"
            className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Read more
          </a>
        </div>
        <div className="">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 me-4 rounded-full object-cover"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._6kSqsTmX5o4yeSjGnw48AHaLH%26pid%3DApi&f=1&ipt=9f1127d1d114e5d2f8dcf666000e632c5af7d399463324f43a6f5b4778666792&ipo=images"
              alt=""
            />
            <div className="font-medium dark:text-white">
              <p>
                Jese Leos{" "}
                <time
                  dateTime="2014-08-16 19:00"
                  className="block text-sm text-gray-500 dark:text-gray-400"
                >
                  Joined on August 2014
                </time>
              </p>
            </div>
          </div>
          <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <p>4</p>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
              Thinking to buy another one!
            </h3>
          </div>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            This is my third Invicta Pro Diver. They are just fantastic value
            for money. This one arrived yesterday and the first thing I did was
            set the time, popped on an identical strap from another Invicta and
            went in the shower with it to test the waterproofing.... No
            problems.
          </p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            It is obviously not the same build quality as those very expensive
            watches. But that is like comparing a Citroën to a Ferrari. This
            watch was well under £100! An absolute bargain.
          </p>
          <a
            href="#"
            className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Read more
          </a>
        </div>
      </article>
    </div>
  ) : (
    <h1>no data </h1>
  );
  z;
};

export default Product;
