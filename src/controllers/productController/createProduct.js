const productModel = require("../../models/productModel");
const uploadFile = require("../Amazom S3 Bucket/bucketController");
const {
  emptyBody,
  isValidString,
  validTrim,
  isValidImage,
} = require("../../utils/validators");

const createProduct = async function (req, res) {
  try {
    if (emptyBody(req.body))
      return res
        .status(400)
        .send({ status: false, message: "provide some data" });
    let data = req.body;
    let {
      title,
      description,
      price,
      category,
      compatibale_models,
      isFreeShipping,
      productImage,
    } = data;

    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "title must be present" });
    if (!isValidString(title))
      return res
        .status(400)
        .send({ status: false, message: "title is in incorrect format" });
   title = validTrim(title);
    let isUniqueTitle = await productModel.findOne({ title:title });
    if (isUniqueTitle) {
      return res
        .status(400)
        .send({ status: false, message: "This title is being used already" });
    }

    if (!description)
      return res
        .status(400)
        .send({ status: false, message: "description must be present" });
    if (!isValidString(description))
      return res
        .status(400)
        .send({ status: false, message: "description is in incorrect format" });
   description = validTrim(description);


   if (!category || category.length == 0)
   return res
     .status(400)
     .send({ status: false, message: "categorys are requried" });
    for(let eachCategory of category){
        let final = validTrim(eachCategory)
        if(final =="")return res
        .status(400)
        .send({ status: false, message: "empty category cannot be provided" });
    }
     
    if (!compatibale_models || compatibale_models.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "compatibale models are requried" });
        for(let eachModel of compatibale_models ){
            let final = validTrim(eachModel)
            if(final =="")return res
            .status(400)
            .send({ status: false, message: "empty model name cannot be provided" });
        }

    if (!price || price == 0)
      return res
        .status(400)
        .send({ status: false, message: "price is mandatory" });

    price = validTrim(price);
    if (!Number(price))
      return res
        .status(400)
        .send({
          status: false,
          message: "price should be in valid number/decimal format",
        });
   price = Number(price).toFixed(2);

    if (isFreeShipping) {
      let a = ["true", "false"];
      isFreeShipping = validTrim(isFreeShipping);
      if (!a.includes(isFreeShipping))
        return res
          .status(400)
          .send({
            status: false,
            message: "type should be Boolean or true/false",
          });
     isFreeShipping = validTrim(isFreeShipping);
    }

    if(!available_Quantity || available_Quantity==0)return res
    .status(400)
    .send({
      status: false,
      message: "quantity is mandatory",
    });

    available_Quantity = validTrim(available_Quantity)
    if (!Number(available_Quantity))
      return res
        .status(400)
        .send({
          status: false,
          message: "quantity should be in valid number format",
        });
    if(Number(available_Quantity)<1)return res
    .status(400)
    .send({
      status: false,
      message: "should have at least one product",
    });

    let files = req.files;

    if (files.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "provide a product image" });
    if (!files.every((v)=>isValidImage(v.originalname)==true))
      return res
        .status(400)
        .send({ status: false, message: "provide a valid image" });

      productImage =   files.map(async (img)=>await uploadFile(img,"product/") )

     //await uploadFile(files[0]);

    const product = {
      title: title,
      description: description,
      price: price,
      type: type,
      category: category,
      compatibale_models: compatibale_models,
      isFreeShipping: isFreeShipping,
      productImage: productImage,
      available_Quantity:available_Quantity
    };

    const createdProduct = await productModel.create(product);

    return res
      .status(201)
      .send({ status: true, message: "Success", data: createdProduct });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = createProduct;
