import axios from "axios";
import { useEffect, useState } from "react";

import Card from "./components/Card";
import { Link } from "react-router-dom";

const Body = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);
    async function getProducts() {
        try {
            const response = await axios.get(" http://localhost:3000/products");

            setProducts(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-wrap w-fit p-10 ">
            {products.map((p) => {
                const productId = p._id
                return (
                    <Link to={"http://localhost:3001/products/" + productId} key={productId}>
                        <Card {...p} />
                    </Link>
                );
            })}
        </div>
    );
};

export default Body;
