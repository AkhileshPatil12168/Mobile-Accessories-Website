import { useState, useEffect } from "react";
import Title from "./Title";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";

const Header = (props) => {
    const [params] = useSearchParams();
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [isLogedIn, setLogedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const cToken = cookies.get("token");
    const cUserId = cookies.get("user");
    useEffect(() => {
        if (cToken && cUserId) {
            setToken(cToken);
            setLogedIn(true);
            setUserId(cUserId);
        }
    }, []);
    console.log("cookie call");

    const handleLogout = () => {
        cookies.remove("token", { path: "/" });
        cookies.remove("user", { path: "/" });
        setToken(null);
        setUserId(null);
        setLogedIn(false);
        setUserId(null);
        navigate("/");
    };

    const userName = "hl";
    return (
        <div className="flex justify-between bg-blue-200   ">
            <Title {...{ userId: userId }} />

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
                <Link to="/connect">
                    <li className="px-2">connect us</li>
                </Link>
            </ul>

            <Link to="/user/account">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{userName}</span>
                </div>
            </Link>

            {cToken && cUserId ? (
                <button
                    className=" m-2  mr-4 w-24 h-16 bg-blue-500 text-white   "
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    logout
                </button>
            ) : (
                <Link to="/login">
                    <button className="m-2  mr-4 w-24 h-16 bg-blue-500 text-white">login</button>
                </Link>
            )}
        </div>
    );
};

export default Header;
