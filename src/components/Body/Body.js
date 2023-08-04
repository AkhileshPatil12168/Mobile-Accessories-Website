import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShimmerBody from "./ShimmerCard";
import Cookies from "universal-cookie";
import Card from "./Card";

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
        <div className="flex flex-wrap w-fit p-3   ">
            {products?.map((p) => {
                const productId = p?._id;
                return <Card {...p} cUserId={cUserId} key={productId} />;
            })}
        </div>
    );
};

export default Body;
