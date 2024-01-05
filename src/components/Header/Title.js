import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Title = () => {
    return (
        <Link to="/" className="flex items-center">
            <img className="w-10 h-10 mr-3" src={logo} alt="Mobile Accessorys"></img>
            <span className="self-center text-blue-700 text-2xl font-semibold whitespace-nowrap dark:text-blue-700">
            E-store
            </span>
        </Link>
    );
};

export default Title;
