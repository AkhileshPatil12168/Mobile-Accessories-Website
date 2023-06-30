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
        <div className="flex justify-between bg-blue-200   ">
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
                <Link to="/">
                <button
                    className=" m-2  mr-4 w-24 h-16 bg-blue-500 text-white   "
                    onClick={() => setLoggedIN(false)}
                >
                    Logout
                </button></Link>
            ) : (
                <Link to="/login">
                <button
                    className="m-2  mr-4 w-24 h-16 bg-blue-500 text-white  "
                    
                >
                    Login
                </button></Link>
            )}
        </div>
    );
};

export default Header;
