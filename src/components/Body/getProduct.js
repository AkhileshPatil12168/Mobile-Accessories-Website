import axios from "axios"; 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Product = () => {
    const { id } = useParams();
    console.log(id);

    const [product, setProduct] = useState();
    useEffect(() => {
        getProduct();
    }, []);
    async function getProduct() {
        try {
            const response = await axios.get(
                "https://mobileaccbackend.onrender.com/products/" + `${id}`,
                { withCredentials: true }
            );
            setProduct(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    return product ? (
        <div className="mt-24">
            <img src={product?.productImage[0]}></img>
            <h1>{product?.title}</h1>
        </div>
    ) : (
        <h1>no data </h1>
    );
};

export default Product;
