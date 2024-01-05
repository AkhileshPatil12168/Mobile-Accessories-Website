import React, { useEffect } from "react";

const SingleReview  = ({review})=>{
    return(
        <div className="">
      <div className="flex items-center ">
        {/* <img
          className="w-10 h-10 me-4 rounded-full object-cover"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._6kSqsTmX5o4yeSjGnw48AHaLH%26pid%3DApi&f=1&ipt=9f1127d1d114e5d2f8dcf666000e632c5af7d399463324f43a6f5b4778666792&ipo=images"
          alt=""
        /> */}
        <div className="font-medium dark:text-white">
          <p>
            {`${review?.userId?.fname} ${review?.userId?.lname}`}
            <p
              
              className="block text-sm text-gray-500 dark:text-gray-400"
            >
             review Date: {review?.reviewDate.slice(0,10)}
            </p>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
        <p>{review?.rating}</p>
        <svg
          className="w-4 h-4 text-yellow-300"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
          Thinking to buy another one!
        </h3> */}
      </div>
      <p className="mb-2 text-gray-500 dark:text-gray-400">
       {review?.review}
      </p>
      
      {/* <a
        href="#"
        className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
      >
        Read more
      </a> */}
    </div>
    )
}


const Reveiws = ({props})=>{
   
  
    return (<article className=" mx-auto my-5 p-5 border-gray-300 border-t-2 w-9/12 overflow-scroll scroll-smooth h-96">
    
    {props?.map(review=>{return <SingleReview key={review._id} review={...review}/>})}
    
    
  </article>)
}

export default Reveiws