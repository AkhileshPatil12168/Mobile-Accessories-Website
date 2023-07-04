

const ShimmerCard = () => {
    return (
      <div className="resCard">
        <div id="sImg"></div>
        <h2></h2>
        <h3></h3>
        <h4></h4>
      </div>
    );
  };
  
  const ShimmerBody = () => {
    return (
      <>
        <div className="searchContainer">
          <input type="text" className="searchInput" placeholder="Search" />
          <button className="searchBtn" onClick={() => {}}>
            search
          </button>
        </div>
        <div className="resList">
          {Array(10)
            .fill("")
            .map((s) => (
              <ShimmerCard key={ Math.random()}/>
            ))}
        </div>
      </>
    );
  };
  export default ShimmerBody;
  