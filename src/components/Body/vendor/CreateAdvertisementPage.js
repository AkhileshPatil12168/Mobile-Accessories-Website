import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdvertisementForm = () => {

  const navigate = useNavigate();
  const cookies = new Cookies();
  const cVendorId = cookies.get("Vendor");
  const [data, setData] = useState({});

  const [uploadedImage, setUploadedImage] = useState("  ");
  const [renderImage, setRenderImage] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };
  useEffect(() => {
    if (startDate && endDate) {
      const difference = (new Date(endDate) - new Date(startDate)) / (60 * 60 * 24 * 1000);
      if (difference > 0) setDays(difference);
    }
  }, [startDate, endDate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setRenderImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setUploadedImage(e.target.files);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      if (uploadedImage || uploadedImage.length > 0) formData.append("image", uploadedImage[0]);
      for (let key in data) {
        formData.append(key, data[key]);
      }
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      console.log(formData);

      const responce = await axios.post(
        process.env.backendapi + `/vendor/${cVendorId}/create/advertisement`,
        formData,
        { withCredentials: true })

        console.log(responce.data.data)

      // const responce = await axios.post();
    } catch (error) {
      console.log(error.responce);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Advertisement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-medium text-gray-600">
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={data.productId}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="advertisementImage" className="block text-sm font-medium text-gray-600">
            Advertisement Image
          </label>
          <input
            type="file"
            id="advertisementImage"
            name="advertisementImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />

          <img
            src={renderImage}
            alt="Advertisement Preview"
            className="mt-2 max-h-36 object-cover"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="advertisementType" className="block text-sm font-medium text-gray-600">
            Advertisement Type
          </label>
          <select
            id="advertisementType"
            name="advertisementType"
            value={data.advertisementType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="">Select Type</option>
            {[
              "top banner",
              "left side box",
              "right side box",
              "1st priority",
              "2nd priority",
              "3rd priority",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">
            Start Date
          </label>
          <div className="flex p-4">
            <DatePicker
              onChange={(date) => setStartDate(new Date(date).getTime())}
              dateFormat="yyyy-MM-dd"
              todayButton="Select Today"
              placeholderText={
                startDate ? new Date(startDate).toLocaleDateString("en-CA") : "select date"
              }
            />
            <div className="ml-2">
              {" "}
              <button
                name="remove"
                className="      w-10 bg-gray-600 text-white"
                onClick={() => setStartDate(null)}
              >
                X
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
            End Date
          </label>
          <div className="flex p-4">
            <DatePicker
              onChange={(date) => setEndDate(new Date(date).getTime())}
              dateFormat="yyyy-MM-dd"
              todayButton="Select Today"
              placeholderText={
                endDate ? new Date(endDate).toLocaleDateString("en-CA") : "select date"
              }
            />
            <div className="ml-2">
              {" "}
              <button
                name="remove"
                className="      w-10 bg-gray-600 text-white"
                onClick={() => setEndDate(null)}
              >
                X
              </button>
            </div>
          </div>
        </div>
        <p>Days : {days}</p>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvertisementForm;
