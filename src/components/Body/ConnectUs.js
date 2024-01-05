import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ConnectUs = () => {
  const cookies = new Cookies();
  const cUserId = cookies.get("User");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");
  const [color, setColor] = useState("bg-white");

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        process.env.backendapi + `/user/${cUserId}/profile`,
        {
          withCredentials: true,
        }
      );
      const userData = response.data.data;
      setUserName(userData.fname + " " + userData.lname);
      setUserEmail(userData.email);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        process.env.backendapi + `/user/${cUserId}/contactus`,
        {
          name: userName,
          email: userEmail,
          message: message,
        },
        { withCredentials: true }
      );
      console.log(response.data.data.message);

      if (response.status == 200) setIsMessageSent(true);
    } catch (error) {
      console.log(error);
      setErrorResponse(error.response.data.message);
      setColor("bg-red-300");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    setErrorResponse("");
    setColor("bg-white");
  }, [userName, userEmail, message]);

  return (
    <section className="bg-white dark:bg-gray-900 m-5">
      <div class="container px-6 py-12 mx-auto">
        <div class="text-center">
            <h3 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-blue-700 dark:text-white">Contact us</h3>

            <h1 class="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Get in touch</h1>

            <p class="mt-3 text-gray-500 dark:text-gray-400">Our friendly team is always here to chat.</p>
        </div>

        <div class="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
            <div class="flex flex-col items-center justify-center text-center">
                <span class="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </span>

                <h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Email</h2>
                <p class="mt-2 text-gray-500 dark:text-gray-400">Our friendly team is here to help.</p>
                <p class="mt-2 text-blue-500 dark:text-blue-400">hello@E-Strore.com</p>
            </div>

            <div class="flex flex-col items-center justify-center text-center">
                <span class="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                </span>
                
                <h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Office</h2>
                <p class="mt-2 text-gray-500 dark:text-gray-400">Come say hello at our office HQ.</p>
                <p class="mt-2 text-blue-500 dark:text-blue-400">KIT IMER, Kolhapur</p>
            </div>

            <div class="flex flex-col items-center justify-center text-center">
                <span class="p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                </span>
                
                <h2 class="mt-4 text-lg font-medium text-gray-800 dark:text-white">Phone</h2>
                <p class="mt-2 text-gray-500 dark:text-gray-400">Mon-Fri from 8am to 5pm.</p>
                <p class="mt-2 text-blue-500 dark:text-blue-400">+91 9970242340</p>
            </div>
        </div>
    </div>

      <div className="container mx-auto p-4">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h3 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Send us a Message</h3>
          {!isMessageSent ? (
            <form className="space-y-8">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  name="submit"
                  className=" w-full flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-1"
                  onClick={sendMessage}
                >
                  submit
                </button>
              </div>
              <div className={`${color} h-10 w-full rounded-md`}>
                  <p className="pt-2 pl-2 text-center">{errorResponse}</p>
                </div>
            </form>
          ) : (
            <div className="bg-green-100 border  border-green-500 text-green-700 px-4 py-2 rounded">
              Message sent successfully!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConnectUs;
