import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const VendorSignup = () => {
  const navigate = useNavigate();
  let [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    city:"",
    state: "",
    pincode:"",
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
  const [color, setColor] = useState("bg-white");
  const [res, setRes] = useState("");
  const [statCode, setStatCode] = useState(null);

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
        formData.append("image", img[0]);
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
        process.env.backendapi + `/create/${userType}/`,
        formData,
        { withCredentials: true }
      );
      console.log(response, "hello");
      setRes(response.data.message);
      setColor("bg-green-300");
      setStatCode(response?.status);

      if (response) setSignupData(response?.data?.data);
    } catch (error) {
      setRes(error?.response?.data.message);
      setColor("bg-red-300");
      setStatCode(error?.response?.status);
      console.log(error);
    }
  };

  useEffect(() => {
    setColor("bg-white");
    setRes("");
  }, [user, admin]);

  return signupData ? (
    navigate("/login")
  ) : (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Vendor signup
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Street
                  </label>
                  <div className="mt-2">
                    <input
                      id="street"
                      name="street"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={user.street}
                      onChange={handleSubmit}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={user.city}
                      onChange={handleSubmit}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      id="state"
                      name="state"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={user.state}
                      onChange={handleSubmit}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Pin Code
                  </label>
                  <div className="mt-2">
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={user.pincode}
                      onChange={handleSubmit}
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                id="signup"
                name="signup"
                className="flex w-full justify-center  px-3 py-1.5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center mb-2"
                onClick={postData}
              >
                Signup
              </button>
            </div>
          </form>
          <div className="text-center">
            <pre className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Already have an Account?
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                login
              </Link>
            </pre>
          </div>
          <div className={`${color} h-14 mt-2 rounded-lg text-center pt-4`}>
            {res}
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorSignup;
