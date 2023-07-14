import { useState, useEffect, useContext } from "react";
import Title from "./Title";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import LoginContext from "../../util/loginContext";

const Header = () => {
    
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);

    const cToken = cookies.get("token");
    const cUserId = cookies.get("user");
    useEffect(() => {
        if (cToken && cUserId) {
            setUserId(cUserId);
        }
    }, []);

    const handleLogout = () => {
        cookies.remove("token", { path: "/" });
        cookies.remove("user", { path: "/" });
        navigate("/");
    };

    const userName = "hl";
    return (
        <div className="flex flex-col md:flex-row justify-between bg-blue-200 w-full h-full">
  <Title {...{ userId: userId }} />

  <ul className="flex py-7">
    <li className="px-2">
      <Link to="/">Home</Link>
    </li>
    <Link to={cToken && cUserId ? "/orders" : "/login"}>
      <li className="px-2">Orders</li>
    </Link>
    <Link to={cToken && cUserId ? "/cart" : "/login"}>
      <li className="px-2">Cart</li>
    </Link>
    <Link to="/connect">
      <li className="px-2">Connect Us</li>
    </Link>
    <Link to={cToken && cUserId ? "/user/account" : "/login"}>
      <li className="px-2">Your Account</li>
    </Link>
  </ul>

  {cToken && cUserId ? (
    <button
      className="m-2 mr-4 w-24 h-16 bg-blue-500 text-white rounded-md"
      onClick={() => {
        handleLogout();
      }}
    >
      Logout
    </button>
  ) : (
    <div className="pt-4">
      <Link to="/login">
        <button className="w-20 h-12 bg-blue-500 text-white">Login</button>
      </Link>
      <Link to="/signup">
        <button className="m-2 w-20 h-12 bg-blue-500 text-white">Signup</button>
      </Link>
    </div>
  )}
</div>

    );
};

export default Header;
