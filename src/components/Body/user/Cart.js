import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../../animation/loading";

const Items = (props) => {
  const {
    title,
    quantity,
    price,
    productImage,
    productId,
    cUserId,
    setStatCode,
    index,
  } = props;

  const [errMessage, setErrMessage] = useState("");
  const [isNotWorking, setIsNotWorking] = useState(false);
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    if (index % 2 == 0) setBgColor("bg-white");
  });

  const addOrRemove = async (parameter) => {
    try {
      let data = {
        productId: productId,
      };
      if (parameter == "+") data["value"] = 1;
      if (parameter == "-") {
        data["value"] = -1;
        setErrMessage("");
        setIsNotWorking(false);
      }
      let response = await axios.put(
        process.env.backendapi + `/user/${cUserId}/cart`,
        data,
        {
          withCredentials: true,
        }
      );
      setStatCode(response.status);
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 400) {
        setErrMessage(error.response.data.message);
        setIsNotWorking(true);
      }
    }
  };

  return (
    <div
      className={`cart-item flex flex-col md:flex-row items-center mb-4 p-4 ${bgColor} border border-gray-300 rounded`}
    >
      <img
        src={productImage[0]}
        alt="Product Image"
        className="w-20 h-20 mr-0 md:mr-4 border-2 rounded mb-4 md:mb-0 "
      />

      <Link to={"/product/" + productId}>
        <div className="cart-item-details ">
          <p className="text-base font-semibold mb-2">{title}</p>
          <p className="text-gray-600 mb-1">
            Quantity:{" "}
            <span className="text-black font-semibold">{quantity}</span>
          </p>
          <p className="text-gray-600">
            Price: <span className="font-semibold text-black">₹{price}</span>
          </p>
        </div>
      </Link>
      <div className="px-40">
        <div className="text-red-600 text-xl">{errMessage}</div>
      </div>

      <div className="item-actions flex items-center ml-auto mt-4 md:mt-0">
        {/* <div className=" flex mx-20">{Loading()}</div> */}
        <button
          onClick={() => addOrRemove("-")}
          className="quantity-btn bg-gray-300 text-gray-600 hover:bg-slate-900 hover:text-white rounded-md w-7 h-7 flex items-center justify-center mr-2"
        >
          -
        </button>
        <span className="item-quantity">{quantity}</span>
        <button
          disabled={isNotWorking}
          onClick={() => addOrRemove("+")}
          className="quantity-btn bg-gray-300 hover:bg-slate-900 hover:text-white  text-gray-600 rounded-md w-7 h-7 flex items-center justify-center ml-2"
        >
          +
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const cUserId = cookies.get("User");

  const [cart, setCart] = useState(null);
  const [statCode, setStatCode] = useState(null);

  const getCart = async () => {
    try {
      let response = await axios.get(
        process.env.backendapi + `/user/${cUserId}/cart`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data);

      setCart(response.data.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };
  const emptyCart = async () => {
    try {
      const response = await axios.delete(
        process.env.backendapi + `/user/${cUserId}/cart`,
        {
          withCredentials: true,
        }
      );

      setStatCode(response.status);

      setCart(null);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const createOrder = () => {
    console.log(cart);
    if (cart.totalItems != 0) {
      navigate("/user/create/order");
    }
  };
  useEffect(() => {
    setStatCode(null);
    getCart();
  }, [statCode]);

  return !cUserId ? (
    navigate("/login")
  ) : (
    <div className="container py-4  px-[5vh] md:px-[15vh] min-h-[78.5vh] ">
      <div className="p-4 border-2 border-gray-300 rounded bg-white">
        <p className="mb-4 text-2xl text-center md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Cart</p>
        <div className="max-h-[420px] 	 overflow-auto ">
          {cart?.items.map((i, index) => {
            return (
              <Items
                {...{ ...i, cUserId: cUserId, index: index }}
                setStatCode={setStatCode}
                key={i.productId}
              />
            );
          })}
        </div>
        <div className=" flex  justify-between  total-price  mt-4">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Items:{""}
                  </th>
                  <td class="px-6 py-4">{cart?.totalItems}</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Total Quantity{""}
                  </th>
                  <td class="px-6 py-4">{cart?.totalQuantity}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pt-6 text-xl font-semibold text-gray-700">
            Total Price:{" "}
            <sapn className="font-semibold text-green-700">
              ₹{cart?.totalPrice}
            </sapn>
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-end mt-4">
          <button
            onClick={createOrder}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Process Order
          </button>
          <button
            onClick={emptyCart}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
