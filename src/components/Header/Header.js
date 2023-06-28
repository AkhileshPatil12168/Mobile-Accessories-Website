import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/img/logo.png";

const Title = () => {
    return (
        <Link to="/">
            {" "}
            <img className="h-24  p-2 static " src={logo} alt="Mobile Accessorys"></img>
        </Link>
    );
};

const Header = () => {
    const [isLoggedIn, setLoggedIN] = useState(false);
    return (
        <div className="flex justify-between bg-blue-200 shadow-lg  fixed top-0 left-0 w-full h-[90px] z-50   ">
            <Title />

            <ul className="flex py-7 ">
                <li className="px-2">
                    <Link to="/">Home</Link>
                </li>
                <Link to="/orders">
                    <li className="px-2">Orders</li>
                </Link>
                <Link to="/cart">
                    <li className="px-2">Cart</li>
                </Link>   
            </ul>

            {isLoggedIn ? (
                <button
                    className=" m-2 p-2 mr-4 w-24 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={() => setLoggedIN(false)}
                >
                    Logout
                </button>
            ) : (
                <button
                    className="m-2 p-2 mr-4 w-24 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={() => setLoggedIN(true)}
                >
                    Login
                </button>
            )}
        </div>
    );
};

export default Header;
