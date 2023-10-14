import { useState } from "react";
import Title from "./Title";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Header = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  3;

  const [active, SetActive] = useState()

  const cToken = cookies.get("token");
  const cUserId = cookies.get("user");
  const cAdminId = cookies.get("admin");
  console.log(cUserId);
  const handleLogout = () => {
    cookies.remove("token", { path: "/", domain: process.env.domain });
    cookies.remove("user", { path: "/", domain: process.env.domain });
    cookies.remove("admin", { path: "/", domain: process.env.domain });
    navigate("/");
  };


  return (
    <>
      <nav className="bg-white  dark:bg-gray-900 w-full  border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Title />
          {cAdminId ? (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Link
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                to="/"
              >
                <li className="px-2">Home</li>
              </Link>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cAdminId ? "/admin/users" : "/login"}
              >
                <li className="px-2">Users</li>
              </Link>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cAdminId ? "/admin/orders" : "/login"}
              >
                <li className="px-2">Orders</li>
              </Link>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cAdminId ? "/admin/products/summery" : "/login"}
              >
                <li className="px-2">Products</li>
              </Link>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cAdminId ? "/user/account" : "/login"}
              >
                <li className="px-2">Your Account</li>
              </Link>
            </ul>
          ) : (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="px-2">
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cUserId ? "/orders" : "/login"}
              >
                <li className="px-2">Orders</li>
              </Link>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cUserId ? "/cart" : "/login"}
              >
                <li className="px-2">Cart</li>
              </Link>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cUserId ? "/contactus" : "/login"}
              >
                <li className="px-2">Contact Us</li>
              </Link>
              <Link
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                to={cToken && cUserId ? "/user/account" : "/login"}
              >
                <li className="px-2">Your Account</li>
              </Link>
            </ul>
          )}

          {cToken && (cUserId || cAdminId) ? (
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <div className="">
              <Link to="/login">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mx-3  md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mx-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
