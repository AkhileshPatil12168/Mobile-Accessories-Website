import axios from "axios";
import { useState } from "react";

const Signup = () => {
    let [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        profileImage:null
        
    });
    const [img, setImg]= useState('')
    let name, value;
    const handleSubmit = (e) => {
        name = e.target.name;
       // console.log(e.target.files[0])
        if(name == "profileImage")value = e.target.files
        else value = e.target.value;


        setUser({ ...user, [name]: value });
        console.log(e.target.value);
        //console.log(e.target.files);
        //console.log(user)
    };
    const handleImg = (e)=>{
        const file = e.target.files[0];
        console.log(file)
        setImg(file);
        setUser({ ...user, profileImage: file });
        console.log(img)
    }

    const postData = async (e) => {
        try {
            e.preventDefault();
            //const { fname, lname, email, phone, password } = user;
            const response = await axios.post(" http://localhost:3000/create/user/", user);
            const res = await response.json();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="post">
                        <div>
                            <label
                                htmlFor="fname"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
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
                            <label
                                htmlFor="lname"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
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
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
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
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
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
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
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
                                htmlFor="address"
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
                            <label
                                htmlFor="profileImage"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
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
                        <a
                            href="/login"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 ml-[340px]"
                        >
                            login
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
