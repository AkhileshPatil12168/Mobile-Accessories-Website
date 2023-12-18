import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Advertisement = () => {
  const navigate = useNavigate();
  const [advertisementData, setAdvertisementData] = useState("");

  const getAdvertisement = async () => {
    try {
      const responce = await axios.get(
        process.env.backendapi + "/advertisements/live?type=top banner",
        {
          withCredentials: true,
        }
      );
      setAdvertisementData(responce.data);
      console.log(responce.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCount = async () => {
    try {
      await axios.put(process.env.backendapi + "/ad/" + advertisementData?.data?._id);
      navigate(`/product/${advertisementData?.data?._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdvertisement();
  }, []);
  return (
    advertisementData.status?
    <div className="flex justify-center cursor-pointer mb-4" onClick={handleCount}>
      <img
        className="h-60 bg-gradient-to-r  from-cyan-500 to-blue-500 mx-7 rounded"
        src={advertisementData?.data?.advertisementImage}
      ></img>
    </div>:<></>
  );
};

export default Advertisement;
