

const ShimmerCard = () => {
    return (
      <div className="box-border  h-fit w-72 bg-blue-300  border-4 ml-14">
            <img src="" className="h-72 w-64 bg-white m-2.5"></img>
            <div  >
                <h1></h1>
                <h3></h3>
            </div>

        </div>
    );
  };
  
  const ShimmerBody = () => {
    return (
      <>
       
        <div className="flex flex-wrap w-fit p-10  ">
          {Array(4)
            .fill("")
            .map((s) => (
              <ShimmerCard key={ Math.random()}/>
            ))}
        </div>
      </>
    );
  };
  export default ShimmerBody;
  