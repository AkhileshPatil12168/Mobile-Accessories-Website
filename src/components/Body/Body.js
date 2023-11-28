import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShimmerBody from "../Shimmer/ShimmerCard";
import Cookies from "universal-cookie";
import Card from "./Card";
// import Vcard from "./vcard";

const Body = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const cToken = cookies.get("token")
    const cAdminId = cookies.get("Admin");
    const cUserId = cookies.get("User");
    const cVendorId = cookies.get("Vendor");
    console.log(process.env.backendapi)

    useEffect(() => {
      if (cAdminId && cToken) {
        navigate("/admin");
      } else if (cVendorId && cToken) {
        navigate("/vendor");
      } else {
        getProducts();
        getAdvertisement()
      }
    }, []);

    const [products, setProducts] = useState([]);
    const [advertisementBanner, setAdvertisementBanner]= useState("")
   
    async function getProducts() {
        try {
            const response = await axios.get(process.env.backendapi+"/products", {
                withCredentials: true,
            });
            setProducts(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAdvertisement = async ()=>{
        try {
            const responce =await axios.get(process.env.backendapi+"/advertisements/live?type=top banner", {
                withCredentials: true,
            })
            setAdvertisementBanner(responce.data.advertisementImage)
            console.log(responce.data)

        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(() => {}, []);

    return products?.length == 0 || !products ? (
        <ShimmerBody />
    ) : (
        <>
        <div className="flex justify-center">
        <img className="h-60 bg-gradient-to-r  from-cyan-500 to-blue-500 mx-7 rounded" src={advertisementBanner}></img>
        </div>
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
