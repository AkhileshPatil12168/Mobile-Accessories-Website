const Card = (props)=>{
    const {productImage ,title, price}=props

    return(
        <div className="box-border  h-fit w-72 bg-blue-300  border-4 ml-2">
            <img src={productImage[0]} className="h-72 w-64 bg-white m-2.5"></img>
            <div className="m-2" >
                <h1>{title}</h1>
                <h3>price : {price + " ₹"}</h3>
            </div>

        </div>
    )
}
export default Card