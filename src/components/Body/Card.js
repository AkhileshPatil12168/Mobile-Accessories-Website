import { Profiler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../animation/loading";

const Card = (props) => {
  const navigate = useNavigate();
  const { _id, productImage, title, price, cUserId, ratings } = props;
  const [text, setText] = useState("Add to cart");
  const [color, setColor] = useState("bg-blue-500");
  const [cursor, setCursor] = useState("");
  const [lineThrough, setLineThrough] = useState("");
  const [res, setRes] = useState();
  console.log(_id);

  async function addToCart() {
    try {
      if (!cUserId) navigate("/login");
      else {
        setText(
          <div className=" flex justify-center h-full w-full pt-1">
            {Loading()}
          </div>
        );
        let response = await axios.put(
          process.env.backendapi + `/user/${cUserId}/cart`,
          {
            productId: _id,
            value: 1,
          },
          { withCredentials: true }
        );
        setRes(response.status);
      }
    } catch (error) {
      console.log(error);
      setRes(error.response.status);
    }
  }
  useEffect(() => {
    if (res == 201) {
      setText("added");
      setColor("bg-green-500");

      setTimeout(() => {
        setText("Add to cart");
        setColor("bg-blue-500");

        setRes();
      }, 1000 - 300);
    } else if (res == 400) {
      setText("Add to cart");
      setLineThrough("line-through");
      setCursor("cursor-not-allowed");
      setColor("bg-gray-500");
    }
  }, [res]);

  return (
    <div className="relative m-10 flex justify-between w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md  hover:border-blue-500 hover:rounded hover:border-1 hover:duration-300 hover:ease-in-out">
      <Link
        to={"/product/" + _id}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl self-center"
      >
        <img src={productImage[0]} className="object-cover"></img>
      </Link>
      <div className="mt-7 px-5 pb-5 inset-x-0 bottom-0">
        <Link to={"/product/" + _id}>
          <h5 className="text-xl tracking-tight text-slate-900">
            {title.length >= 70 ? title.slice(0, 70) + "..." : title}
          </h5>
        </Link>
        <div className="mt-4 mb-2 flex flex-wrap items-center justify-between pt-3 border-t-2 sm:justify-items-center">
          <p className="text-xl font-bold text-slate-900">₹{price}</p>
          <p>{ratings.averageRating}⭐</p>
          {cUserId ? (
            <button
              onClick={addToCart}
              disabled={res == 400 ? true : false}
              // className={`flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300${color} ${lineThrough} ${cursor}`}

              className="flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {text}
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
