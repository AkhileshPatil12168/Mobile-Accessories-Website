import axios from "axios";
axios.defaults.withCredentials = true;
import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import ShimmerBody from "./ShimmerCard";

import Card from "./Card";

const Body = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    async function getProducts() {
        try {
            const response = await axios.get("https://mobileaccbackend.onrender.com/products");
            //console.log(response);
            setProducts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (!products)?<ShimmerBody/>: (
        <div className="flex flex-wrap w-fit p-10 ">
            {products.map((p) => {
                const productId = p._id;
                return (
                    <Link to={"https://mobileaccbackend.onrender.com/products/" + productId} key={productId}>
                        <Card {...p} />
                    </Link>
                );
            })}
        </div>
    );
};

export default Body;
