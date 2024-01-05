import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateProduct = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cVendorId = cookies.get("Vendor");

  const [details, setDetails] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    compatible_models: "",
    available_Quantity: 0,
    isFreeShipping: false,
  });

  const [uploadedImage, setUploadedImage] = useState("  ");
  const [renderImage, setRenderImage] = useState(null);
  const [res, setRes] = useState("");
  const [statCode, setStatCode] = useState(null);

  const [newProductData,setNewProductData] =useState({})

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let id, value;
    id = e.target.id;
    value = e.target.value;

    setDetails({ ...details, [id]: value });
    console.log(e.target.id);
  };
  const handelFreeShipping = (e) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      isFreeShipping: !prevDetails.isFreeShipping,
    }));
    console.log(details);
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      if(uploadedImage||uploadedImage.length>0)formData.append("image", uploadedImage[0]);
      for (let key in details) {
        formData.append(key, details[key]);
      }

      let response = await axios.post(
        process.env.backendapi + `/authorized/${cVendorId}/create/product`,
        formData,
        { withCredentials: true }
      );
      console.log(response?.data?.data);
      setRes(response.data?.data?.message);
      setStatCode(response?.status);

      if (response) {setNewProductData(response?.data?.data);
        navigate("/vendor/product/"+response?.data?.data?._id)
      }
    } catch (error) {
      setRes(error?.response?.data.message);

      console.log(error);
    }
  };

  useEffect(() => {
    if (statCode == 201) {
    }
  }, [statCode]);

  return !cVendorId ? (
    navigate("/login")
  ) : (
    <div className="container mx-auto px-4 py-8  ">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Product</h2>
      <div className="flex justify-center">
        <div className="h-auto w-full bg-gray-100 rounded">
          <form className="max-w-4xl mx-auto m-4">
            <div className="flex p-4">
              {/*Product Image  */}
              <div className="w-1/2 pr-4">
                <label
                  htmlFor="productImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="productImage"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={handleImageUpload}
                  accept="image/*"
                  required
                />
                {uploadedImage && (
                  <div className="w-full bg-white border border-gray-300 rounded overflow-hidden my-4">
                    <img
                      src={renderImage}
                      alt="Product"
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
              {/* Title */}
              <div className="w-1/2 pl-4">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={details.title}
                    onChange={handleSubmit}
                    required
                  />
                </div>
                {/* Textarea */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={details.description}
                    onChange={handleSubmit}
                    required
                  />
                </div>
                {/* Price */}
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    min={0}
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={details.price}
                    onChange={handleSubmit}
                    required
                  />
                </div>
                {/* Category */}
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={details.category}
                    onChange={handleSubmit}
                    required
                  />
                  {/* Compatible Models */}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Compatible Models
                  </label>
                  <input
                    type="text"
                    id="compatible_models"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={details.compatible_models}
                    onChange={handleSubmit}
                    required
                  />
                </div>
                {/* Available Quantity */}
                <div className="mb-4">
                  <label
                    htmlFor="availableQuantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Available Quantity
                  </label>
                  <input
                    type="number"
                    id="available_Quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={details.available_Quantity}
                    onChange={handleSubmit}
                    required
                  />
                </div>
                {/* Free Shipping */}

                <div className="flex items-center mb-4">
                  <input
                    defaultChecked=""
                    id="isFreeShipping"
                    type="checkbox"
                    defaultValue=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={details.isFreeShipping}
                    onChange={handelFreeShipping}
                  />
                  <label
                    htmlFor="isFreeShipping"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Free Shipping{" "}
                  </label>
                </div>

                <div className="flex">
                  <button
                    type="submit"
                    onClick={postData}
                    className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
                  >
                    Create
                  </button>
                  
                </div>
                <p className="my-2 text-red-500 text-center">{res}</p>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
