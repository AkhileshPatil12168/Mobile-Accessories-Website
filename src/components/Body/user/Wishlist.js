import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../../animation/loading";

const Item = ({item,cUserId,setWishlistData , wishlistId})=>{
console.log(item.productId._id)
    const [res, setRes] = useState();
    const [text, setText] = useState("Add to cart");
    const [color, setColor] = useState("bg-blue-500");
    console.log(cUserId)
    const handleRemoveFromWishlist = async (itemId) => { try {
        let response = await axios.delete(
          process.env.backendapi + `/user/${cUserId}/wishlist/${wishlistId}/item/${itemId}`,
          { withCredentials: true }
        );
        setWishlistData(response.data.data)
      } catch (error) {
        console.log(error);
      }};

      const handleAddToCart = async (productId) => {
        try {
            if (!cUserId) navigate("/login");
            else {
              setText(
                <div className=" flex justify-center h-full w-full pt-1">
                  {Loading()}
                </div>
              );
              let response = await axios.put(
                process.env.backendapi + `/user/${cUserId}/cart`,
                {
                  productId,
                  value: 1,
                },
                { withCredentials: true }
              );
              setRes(response.status);
            }
          } catch (error) {
            console.log(error);
            setRes(error.response.status);
          }
      };
      useEffect(() => {
        if (res == 201) {
          setText("added");
          setColor("bg-green-500");
    
          setTimeout(() => {
            setText("Add to cart");
            setColor("bg-blue-500");
    
            setRes();
          }, 1000 - 300);
        } else if (res == 400) {
          setText("Add to cart");
          setLineThrough("line-through");
          setCursor("cursor-not-allowed");
          setColor("bg-gray-500");
        }
      }, [res]);


    return(
        <div  className="flex flex-wrap items-center border p-4 mb-4 mx-2">
          <img
            src={item?.productId?.productImage[0]}
            alt={item?.productId?.title}
            className="w-24 h-24 mr-4"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item?.productId?.title}</h3>
            <p className="text-gray-700 dark:text-gray-400">Price: <span className="text-green-500">₹{item?.productId?.price}</span></p>
            <p className="text-gray-700 dark:text-gray-400">Average Rating: <span className="text-yellow-300">{item?.productId?.ratings?.averageRating}</span>⭐</p>
            <p className="text-gray-700 dark:text-gray-400">Added on: {new Date(item.addedDate).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col mx-auto justify-between my-2">
          
            <button
              onClick={() => handleAddToCart(item?.productId?._id)}
              className={`${color} text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2`}
            >
              {text}
            </button>
            <button
              onClick={() => handleRemoveFromWishlist(item?._id)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
            >
              Remove
            </button>
          </div>
        </div>
    )
}

const Wishlist = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cUserId = cookies.get("User");
console.log(cUserId)

  const [wishlistData, setWishlistData] = useState([]);

  const getWishList = async () => {
    try {
      const response = await axios.get(process.env.backendapi + `/user/${cUserId}/wishlist`, {
        withCredentials: true,
      });
      setWishlistData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWishList();
  }, []);
  useEffect(() => {
    
  }, [wishlistData]);
  
  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-2xl mx-2 font-bold mb-4">Wishlist</h2>
      {wishlistData?.items?.map((item) => (
        <Item key={item?._id} item={...item} setWishlistData={setWishlistData} cUserId={cUserId} wishlistId={wishlistData?._id}/>
      ))}
    </div>
  );
};

export default Wishlist;
