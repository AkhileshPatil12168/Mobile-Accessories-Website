const ShimmerCard = () => {
    return (
        <div className="box-border  h-[420px] w-80 bg-blue-300  border-4 m-4 hover:scale-110 duration-1000">
           
                <div src="" className="h-72 w-72 bg-gray-200 m-2.5"></div>
           
            <div className="m-2 pb-4">
                
                <div className="flex ">
                    <p className="w-32 pt-2"></p>
                    
                </div>
            </div>
        </div>
    );
};

const ShimmerBody = () => {
    return (
        <>
            <div className="flex flex-wrap w-fit p-3  animate-pulse">
                {Array(4)
                    .fill("")
                    .map((s) => (
                        <ShimmerCard key={Math.random()} />
                    ))}
            </div>
        </>
    );
};
export default ShimmerBody;
