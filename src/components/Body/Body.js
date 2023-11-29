import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShimmerBody from "../Shimmer/ShimmerCard";
import Cookies from "universal-cookie";
import Card from "./Card";
import Advertisement from "./advertisement/GetAdvertisement";
import Search from "./Search";
// import Vcard from "./vcard";

const Body = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const cToken = cookies.get("token");
  const cAdminId = cookies.get("Admin");
  const cUserId = cookies.get("User");
  const cVendorId = cookies.get("Vendor");

  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get(process.env.backendapi + "/products", {
        withCredentials: true,
      });
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    if (cAdminId && cToken) {
      navigate("/admin");
    } else if (cVendorId && cToken) {
      navigate("/vendor");
    } else {
      getProducts();
    }
  }, []);

  return products?.length == 0 || !products ? (
    <ShimmerBody />
  ) : (
    <>
    <Search/>
      <Advertisement/>
      {/* <Vcard/> */}
      <div className="flex flex-wrap w-full justify-center p-3  bg-slate-50">
        {products?.map((p) => {
          const productId = p?._id;
          return <Card {...p} cUserId={cUserId} key={productId} />;
        })}
      </div>
    </>
  );
};

export default Body;
