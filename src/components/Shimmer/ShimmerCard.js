const ShimmerCard = () => {
    return (

        <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md  hover:border-blue-500 hover:rounded hover:border-1 hover:duration-300 hover:ease-in-out">
          <img src="" className="object-cover"></img>
        <div className="mt-7 px-5 pb-5">
            <h5 className="text-xl tracking-tight text-slate-900">
            </h5>
          <div className="mt-4 mb-2 flex items-center justify-between">
          </div>
        </div>
      </div>
    )
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
