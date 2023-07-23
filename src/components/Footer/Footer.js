import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-center items-center">
                <div className="flex space-x-4">
                    <div>
                    <Link to="/aboutus" className="hover:text-gray-500">
                        About Us
                    </Link></div>
                    <div className="pl-10 ">

                        <Link to="https://www.facebook.com" className="mr-5">
                            <FontAwesomeIcon
                                icon={faFacebookF}
                                className="text-white hover:text-gray-500"
                            />
                        </Link>
                        <Link to="https://www.twitter.com" className="mr-5">
                            <FontAwesomeIcon
                                icon={faTwitter}
                                className="text-white hover:text-gray-500"
                            />
                        </Link>
                        <Link to="https://www.instagram.com" className="mr-5">
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className="text-white hover:text-gray-500"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
