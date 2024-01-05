import { useState, useEffect } from "react";

const Items = () => {
    return (
        <>
            <div className="flex ">
                <div className="border border-gray-300 rounded p-2 mr-4 flex-shrink-0 w-48 bg-white h-[28vh]">
                    <div className="w-16 h-16 mb-2"></div>
                    <p className="mb-2"></p>
                    <p className="mb-2"></p>
                    <p className="mb-2"></p>
                </div>
            </div>
        </>
    );
};
const OrderDetails = () => {
    return (
        <>
            <div className="bg-blue-200 p-2 rounded-t-lg">
                <h2 className="text-lg font-bold text-center">Order Details</h2>
            </div>
            <div className="p-4 ">
                <p className="mb-2 flex "></p>
                <p className="mb-2"></p>
                <p className="mb-2"></p>
            </div>
        </>
    );
};
const Order = () => {
    return (
        <>
             <div className="flex m-2 min-h-[40vh] ">
                <div className="border border-gray-300 rounded p-4 flex-shrink-0 mr-4 min-w-[51vh]">
                    <OrderDetails
                        
                    />
                </div>

                <div className="border border-gray-300 rounded p-4   overflow-x-auto w-full">
                    <div className="bg-blue-200 p-2 rounded-t-lg w-full ">
                        <h2 className="text-lg font-bold text-center ">Items</h2>
                    </div>
                    <div className="p-2   bg-gray-200 h-[30vh] w-full">
                        <div className="flex  w-full overflow-x-auto">
                            <Items />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ShimmerOrders = () => {
    return (
        <div className="px-20 ">
            <p className="text-center text-lg font-bold">orders</p>
            <div className="animate-pulse">
                        <Order key={Math.random()} />
        </div>
            
            
        </div>
    );
};

export default ShimmerOrders;
