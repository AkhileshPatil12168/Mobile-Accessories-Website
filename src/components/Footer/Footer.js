import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <>
      {/* <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex space-x-4">
            <div>
              <Link to="/aboutus" className="hover:text-gray-500">
                About Us
              </Link>
            </div>
            <div className="pl-10 flex ">
              <Link to="https://www.facebook.com" className="mr-5">
                <p className="text-white hover:text-gray-500">Facebook</p>
              </Link>
              <Link to="https://www.twitter.com" className="mr-5">
                <p className="text-white hover:text-gray-500">Twitter</p>
              </Link>
              <Link to="https://www.instagram.com" className="mr-5">
                <p className="text-white hover:text-gray-500">Instagram</p>
              </Link>
            </div>
          </div>
        </div>
      </footer> */}

      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/" className="flex items-center mb-4 sm:mb-0">
              <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                E-Store
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="/VendorSignup" className="mr-4 hover:underline md:mr-6">
                  Vendor Signup
                </Link>
              </li>
              <li>
                <Link to="/aboutus" className="mr-4 hover:underline md:mr-6 ">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  className="mr-4 hover:underline md:mr-6 "
                >
                  Twitter
                </a>
              </li>
              <li>
                <Link to="/contactus" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link to="/" className="hover:underline">
              E-Store™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
