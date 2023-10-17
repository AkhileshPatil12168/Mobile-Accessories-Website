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
    const cAdminId = cookies.get("admin");
    const cUserId = cookies.get("user");
    console.log(process.env.backendapi)

    useEffect(() => {
        if (cAdminId) {
            navigate("/admin");
        }
    }, []);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
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
    useEffect(() => {}, [products]);

    return products?.length == 0 || !products ? (
        <ShimmerBody />
    ) : (
        <>
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
