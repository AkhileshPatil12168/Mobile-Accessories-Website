import axios from "axios";
import { useEffect, useState } from "react";

import Card from "./components/Card";
import { Link } from "react-router-dom";

const Body = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProduct();
    }, []);
    async function getProduct() {
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
                return (
                    <Link to={"http://products/" + p._id} key={p._id}>
                        <Card {...p} />
                    </Link>
                );
            })}
        </div>
    );
};

export default Body;
