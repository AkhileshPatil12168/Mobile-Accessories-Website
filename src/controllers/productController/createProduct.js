const bcrypt = require("bcrypt");

const productModel = require("../../models/productModel");
const vendorModel = require("../../models/vendorModel");

const uploadFile = require("../Amazom S3 Bucket/bucketController");
const {
  emptyBody,
  isValidString,
  validTrim,
  isValidImage,
  isValidObjectId,
} = require("../../utils/validators");

const createProduct = async function (req, res) {
  try {
    let userId = req.params.userId;
    const decodedToken = req.verifyed;

    if (!isValidObjectId(userId))
      return res
        .status(403)
        .send({ status: false, message: "please login again" });
    let isCorrectUser = await bcrypt.compare(userId, decodedToken.userId);

    if (!isCorrectUser)
      return res
        .status(403)
        .send({ status: false, message: "please login again" });

    if (emptyBody(req.body))
      return res
        .status(400)
        .send({ status: false, message: "provide some data" });

    const checkVendor = await vendorModel
      .findById(userId)
      .select({ isSuspended: 1, isApproved: 1 })
      .lean();
    if (!checkVendor)
      return res
        .status(401)
        .send({ status: false, message: "only vendors can add products" });
    if (checkVendor.isSuspended)
      return res
        .status(401)
        .send({
          status: false,
          message: "Your account is suspended. Plese connect the admin",
        });
    if (!checkVendor.isApproved)
      return res
        .status(401)
        .send({ status: false, message: "Your are still not approved." });
    let data = req.body;
    let {
      title,
      description,
      price,
      category,
      compatible_models,
      available_Quantity,
      isFreeShipping,
      productImage,
    } = data;
    let files = req.files;

    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "title must be present" });
    if (!isValidString(title))
      return res
        .status(400)
        .send({ status: false, message: "title is in incorrect format" });
    title = validTrim(title);
    let isUniqueTitle = await productModel.findOne({ title: title });
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

    category = category.split(", ");

    if (!category || category.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "categorys are requried" });
    for (let eachCategory of category) {
      let final = validTrim(eachCategory);
      if (final == "")
        return res.status(400).send({
          status: false,
          message: "empty category cannot be provided",
        });
    }

    if (!compatible_models)
      return res
        .status(400)
        .send({ status: false, message: "category is requried" });

    compatible_models = compatible_models.split(", ");
    for (let eachModel of compatible_models) {
      let final = validTrim(eachModel);
      if (final == "")
        return res.status(400).send({
          status: false,
          message: "empty model name cannot be provided",
        });
    }

    if (!price || price == 0)
      return res
        .status(400)
        .send({ status: false, message: "price is mandatory" });

    price = validTrim(price);
    if (!Number(price))
      return res.status(400).send({
        status: false,
        message: "price should be in valid number/decimal format",
      });
    price = Number(price).toFixed(2);

    if (isFreeShipping) {
      let a = ["true", "false"];
      isFreeShipping = validTrim(isFreeShipping);
      if (!a.includes(isFreeShipping))
        return res.status(400).send({
          status: false,
          message: "type should be Boolean or true/false",
        });
      isFreeShipping = validTrim(isFreeShipping);
    }

    if (!available_Quantity)
      return res.status(400).send({
        status: false,
        message: "quantity is mandatory",
      });

    available_Quantity = validTrim(available_Quantity);
    if (!Number(available_Quantity))
      return res.status(400).send({
        status: false,
        message: "quantity should be in valid number format",
      });
    if (Number(available_Quantity) < 1)
      return res.status(400).send({
        status: false,
        message: "should have at least one product",
      });

    if (files.length == 0)
      return res
        .status(400)
        .send({ status: false, message: "provide a product image" });
    if (!files.every((v) => isValidImage(v.originalname) == true))
      return res
        .status(400)
        .send({ status: false, message: "provide a valid image" });

    let productImagePromises = await files.map((img) =>
      uploadFile(img, "product/")
    );
    productImage = await Promise.all(productImagePromises);

    //await uploadFile(files[0]);

    const product = {
      vendorId: userId,
      title: title,
      description: description,
      price: price,
      category: category,
      compatible_models: compatible_models,
      isFreeShipping: isFreeShipping,
      productImage: productImage,
      available_Quantity: available_Quantity,
    };

    const createdProduct = await productModel.create(product);

    return res
      .status(201)
      .send({ status: true, message: "Success", data: createdProduct });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = createProduct;
