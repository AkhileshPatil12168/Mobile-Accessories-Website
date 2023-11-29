import { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  let { email } = props;
  const [data, setData] = useState({
    email: email || "",
    password: "",
  });

  const [userData, setUserData] = useState("");

  const [color, setColor] = useState("bg-white");
  const [res, setRes] = useState("");
  const [statCode, setStatCode] = useState(null);

  let name, value;
  const handleSubmit = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
    //console.log(value);
  };
  const postData = async (e) => {
    try {
      e.preventDefault();

      let response = await axios.post(process.env.backendapi + "/login/user/", data, {
        withCredentials: true,
      });
      setUserData(response.data.data);
      setRes(response.data.message);
      setColor("bg-green-300");
      setStatCode(response?.status);
      console.log(data.userType);
    } catch (error) {
      setRes(error?.response?.data.message);
      setColor("bg-red-300");
      setStatCode(error?.response?.status);
    }
  };

  useEffect(() => {
    if (userData.userType == "Admin" && userData) navigate("/admin");
    else if (userData.userType == "Vendor" && userData) navigate("/vendor");
    else if (userData.userType == "User" && userData) navigate("/");
  }, [userData]);

  useEffect(() => {
    setColor("bg-white");
    setRes("");
  }, [data]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={handleSubmit}
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={handleSubmit}
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div onClick={handleSubmit} className="space-x-3">
                            <input type="radio" value="user" name="userType" />
                            user
                            <input type="radio" value="admin" name="userType" />
                            admin
                        </div> */}

            <div>
              <button
                type="submit"
                name="login"
                className="flex w-full justify-center  px-3 py-1.5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center mb-2"
                onClick={postData}
              >
                login
              </button>
            </div>
            <Link to="/request/resetpassword">
              <div className="text-sm">
                <p className="font-semibold text-blue-600 hover:text-blue-500 p-2 text-right">
                  Forgot Password
                </p>
              </div>
            </Link>
          </form>
          <div
            className={` ${color} p-4 mb-4 text-center my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert`}
          >
            <span class="font-medium">{res}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
