import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../animation/loading";

const Product = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const cUserId = cookies.get("user");
    const { id } = useParams();
    console.log(id);

    const [product, setProduct] = useState();
    const [text, setText] = useState("Add to cart");
    const [color, setColor] = useState("bg-orange-600");
    const [cursor, setCursor] = useState("");
    const [lineThrough, setLineThrough] = useState("");
    const [res, setRes] = useState();

    async function getProduct() {
        try {
            const response = await axios.get(process.env.backendapi + "/products/" + `${id}`, {
                withCredentials: true,
            });
            setProduct(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    async function addToCart() {
        try {
            if (!cUserId) navigate("/login");
            else {
                setText(<div className="justify-center h-full w-full pt-1">{Loading()}</div>);
                let response = await axios.put(
                    process.env.backendapi + `/user/${cUserId}/cart`,
                    {
                        productId: id,
                        value: 1,
                    },
                    { withCredentials: true }
                );
                setRes(response.status);

                setProduct({ ...product, available_Quantity: product.available_Quantity - 1 });
            }
        } catch (error) {
            console.log(error?.response?.status);
            setRes(error?.response?.status);
        }
    }
    useEffect(() => {
        if (res == 201) {
            setText("added");
            setColor("bg-green-500");

            setTimeout(() => {
                setText("Add to cart");
                setColor("bg-orange-600");

                setRes();
            }, 1000 - 300);
        } else if (res == 400) {
            setText("Add to cart");
            setLineThrough("line-through");
            setCursor("cursor-not-allowed");
            setColor("bg-gray-500");
            setProduct({ ...product, available_Quantity: 0 });
        }
    }, [res]);

    useEffect(() => {
        getProduct();
    }, []);

    return product ? (
        // <div className="mt-24">
        //     <img src={product?.productImage[0]}></img>
        //     <h1>{product?.title}</h1>
        // </div>
        <div className="m-0 p-0">
            <div className="w-full max-w-[1200px] bg-white flex mx-auto my-0 p-5">
                <div className="flex-[0_0_50%] mr-5">
                    <img
                        className="max-w-full h-auto"
                        src={product?.productImage[0]}
                        alt="Product Image"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-[28px] mb-2.5">{product?.title}</h1>
                    <p className="leading-[1.6] text-[#555] mb-5">
                        Description : {product?.description}
                    </p>
                    <p className="text-2xl text-orange-600 mb-2.5">Price: {product?.price}</p>
                    <p className="product-category">Category: {product?.category.join(", ")}</p>
                    <p className="product-compatible-models">
                        Compatible Models: {product?.compatible_models.join(", ")}
                    </p>
                    <p className="product-shipping">
                        Free Shipping: {product?.isFreeShipping ? "yes" : "no"}
                    </p>
                    <p className="product-quantity">
                        Available Quantity: {product?.available_Quantity}
                    </p>
                    {/* <a href="#" className="inline-block bg-[#ff5722] text-white no-underline rounded text-lg transition-[background-color] duration-[0.3s] px-5 py-2.5 hover:bg-[#f44336]">
                        Add to Cart
                    </a> */}
                    <div className="flex ">
                        
                            <button
                                onClick={addToCart}
                                disabled={res == 400 ? true : false}
                                className={`cursor-pointer h-10 w-28 ${color}  text-white mt-5  text-center ${lineThrough} ${cursor}`}
                            >
                                {text}
                            </button>
                        
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <h1>no data </h1>
    );
};

export default Product;
