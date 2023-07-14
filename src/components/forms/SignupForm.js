import axios from "axios";
import { useState } from "react";
import { redirect, Link } from "react-router-dom";
import Login from "./Login";

const Signup = () => {
    let [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
    });

    let [admin, setAdmin] = useState({
        userName: "",
        email: "",
        password: "",
        secretKey: "",
    });

    let [userType, setUserType] = useState("user");

    const [img, setImg] = useState("");
    const [signupData, setSignupData] = useState(null);

    const handleSubmit = (e) => {
        if (userType == "user") {
            let name, value;
            name = e.target.name;
            value = e.target.value;
            setUser({ ...user, [name]: value });
            console.log(e.target.value);
        }
        if (userType == "admin") {
            let name, value;
            name = e.target.name;
            value = e.target.value;
            setAdmin({ ...admin, [name]: value });
        }
    };

    const handleImg = (e) => {
        setImg(e.target.files);
    };

    const postData = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            if (userType == "user") {
                formData.append("profileImage", img[0]);
                for (let key in user) {
                    formData.append(key, user[key]);
                }
            }
            if (userType == "admin") {
                for (let key in admin) {
                    formData.append(key, admin[key]);
                }
            }

            let response = await axios.post(
                `http://localhost:3000/create/${userType}/`,
                formData
                // { headers: {
                //     'Content-Type': 'application/json'
                //   },
                //   withCredentials: true }
            );

            console.log(response);
            if (response) setSignupData(response?.data?.data);
        } catch (error) {
            console.log(error?.response?.data);
        }
    };
    return signupData ? (
        <Login {...signupData} />
    ) : (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {userType} signup
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="post">
                        {userType == "user" ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="fname"
                                            name="fname"
                                            type="text"
                                            autoComplete="given-name"
                                            required
                                            value={user.fname}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="lname"
                                            name="lname"
                                            type="text"
                                            autoComplete="family-name"
                                            required
                                            value={user.lname}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            autoComplete="tel"
                                            required
                                            value={user.phone}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={user.email}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={user.password}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                {/* {<div>
                            <label
                               
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    value={user.address}
                                    onChange={handleSubmit}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>} */}

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Profile Image
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name="profileImage"
                                            type="file"
                                            onChange={handleImg}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        UserName
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="userName"
                                            name="userName"
                                            type="text"
                                            autoComplete="given-name"
                                            required
                                            value={admin.userName}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={admin.email}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={admin.password}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        secretKey
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="secretKey"
                                            name="secretKey"
                                            type="password"
                                            autoComplete="secretKey"
                                            required
                                            value={admin.secretKey}
                                            onChange={handleSubmit}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="m-1 p-1 flex space-x-3">
                            <input
                                type="radio"
                                value="user"
                                name="userType"
                                onClick={() => setUserType("user")}
                            />
                            user
                            <input
                                type="radio"
                                value="admin"
                                name="userType"
                                onClick={() => setUserType("admin")}
                            />
                            admin
                        </div>

                        <div>
                            <button
                                type="submit"
                                id="signup"
                                name="signup"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={postData}
                            >
                                Signup
                            </button>
                        </div>
                    </form>
                    <div className="text-sm">
                        <Link
                            to="/login"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 ml-[340px]"
                        >
                            login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;