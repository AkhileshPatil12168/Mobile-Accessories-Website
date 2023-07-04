import { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = (props) => {
    const navigate = useNavigate();
    let { email } = props;
    const [data, setData] = useState({
        email: email || "",
        password: "",
        userType: "",
    });
    const [userData, setUserData] = useState("");

    const [token, setToken] = useState("");

    let name, value;
    const handleSubmit = (e) => {
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value });
        console.log(value);
    };
    const postData = async (e) => {
        try {
            e.preventDefault();

            let response = await axios.post(
                "https://mobileaccbackend.onrender.com/login/user/",
                data,
                {headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true }
            );
            setUserData(response.data.data.userId);
            setToken(response.data.data.token);
            navigate("/?user=" + response.data.data.userId);
        } catch (error) {
            console.log(error);
        }
    };

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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div onClick={handleSubmit}>
                            <input type="radio" value="user" name="userType" />
                            user
                            <input type="radio" value="admin" name="userType" />
                            admin
                        </div>

                        <div>
                            <button
                                type="submit"
                                name="login"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={postData}
                            >
                                login
                            </button>
                        </div>
                        <Link to="/signup">
                            <div className="text-sm">
                                <p className="font-semibold text-indigo-600 hover:text-indigo-500 ml-[340px]">
                                    signup
                                </p>
                            </div>
                        </Link>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Login;
