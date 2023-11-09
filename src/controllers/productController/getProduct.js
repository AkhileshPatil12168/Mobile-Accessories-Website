const productModel = require("../../models/productModel");
const {
    emptyBody,
    isValidString,
    validTrim,
    isNotProvided,
    isValidObjectId,
} = require("../../utils/validators");

const getProductById = async function (req, res) {
    try {
        let productId = req.params.productId;

        if (!productId)
            return res.status(400).send({
                status: false,
                message: "provide Product Id",
            });

        if (!isValidObjectId(productId))
            return res.status(400).send({
                status: false,
                message: "provide a valid Product Id",
            });

        let productsDetails = await productModel
            .findOne({
                _id: productId,
                isDeleted: false,
            })
            .select({ deletedAt: 0, isDeleted: 0, updatedAt: 0, createdAt: 0 ,__v:0})
            .lean();
        if (!productsDetails)
            return res.status(404).send({
                status: false,
                message: "Product Not Found",
            });

        return res.status(200).send({
            status: true,
            message: "Success",
            data: productsDetails,
        });
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
};

const getProductByFilter = async function (req, res) {
    try {
        const filters = req.body;

        let { title, price, category, compatible_models, priceLessThan, priceGreaterThan } =
            filters;

        if (!emptyBody(filters)) {
            filters["isDeleted"] = false;

            //validating title
            if (title || title === "") {
                title = validTrim(title);
                if (!isNotProvided(title))
                    return res.status(400).send({
                        status: false,
                        message: "provide the title",
                    });
                if (!isValidString(title))
                    return res.status(400).send({
                        status: false,
                        message: "provide valid title",
                    });

                let regexxx = new RegExp(title);
                title = { $regex: regexxx };
                filters["title"] = title;
                filters["description"] = title;
            }

            //validating price
            if (price || price === "") {
                price = validTrim(price);
                if (!isNotProvided(price))
                    return res.status(400).send({
                        status: false,
                        message: "provide the price",
                    });
                if (!Number(price))
                    return res.status(400).send({
                        status: false,
                        message: "price must be in number",
                    });
                if (price <= 0)
                    return res.status(400).send({
                        status: false,
                        message: "there are no free products",
                    });
                filters["price"] = price;
            }

            if (compatible_models) {
                compatible_models = JSON.parse(compatible_models);
                for (let eachModel of compatible_models) {
                    let final = validTrim(eachModel);
                    if (final == "")
                        return res.status(400).send({
                            status: false,
                            message: "empty model name cannot be provided",
                        });
                }
                filters["compatible_models"] = {
                    $in: compatible_models,
                };
            }
            if (category) {
                category = JSON.parse(category);
                for (let eachModel of category) {
                    let final = validTrim(eachModel);
                    if (final == "")
                        return res.status(400).send({
                            status: false,
                            message: "empty model name cannot be provided",
                        });
                }
                filters["category"] = {
                    $in: category,
                };
            }

            //validating priceGreaterThan
            if (priceGreaterThan || priceGreaterThan === "") {
                priceGreaterThan = validTrim(priceGreaterThan);
                if (!isNotProvided(priceGreaterThan))
                    return res.status(400).send({
                        status: false,
                        message: "provide the price",
                    });

                if (!Number(priceGreaterThan))
                    return res.status(400).send({
                        status: false,
                        message: "price must be in number",
                    });
                filters["price"] = {
                    $gte: priceGreaterThan,
                };
            }

            //validating availableSizes
            if (priceLessThan || priceLessThan === "") {
                priceLessThan = validTrim(priceLessThan);
                if (!isNotProvided(priceLessThan))
                    return res.status(400).send({
                        status: false,
                        message: "provide the price",
                    });

                if (!Number(priceLessThan))
                    return res.status(400).send({
                        status: false,
                        message: "price must be in number",
                    });
                filters["price"] = {
                    $lte: priceLessThan,
                };
            }

            if (priceGreaterThan && priceLessThan) {
                filters["price"] = {
                    $gte: priceGreaterThan,
                    $lte: priceLessThan,
                };
            }

            const productData = await productModel
                .find(filters)
                .select({ title: 1, price: 1, productImage: 1, available_Quantity: 1 })
                .lean();
            if (productData.length == 0)
                return res.status(404).send({
                    status: false,
                    message: "no product found",
                });
            if (priceLessThan) {
                const sortedData = productData.sort((a, b) => b.price - a.price);
                return res.status(200).send({
                    status: true,
                    data: sortedData,
                });
            } else {
                const sortedData = productData.sort((a, b) => a.price - b.price);
                return res.status(200).send({
                    status: true,
                    data: sortedData,
                });
            }
        } else {
            const productData = await productModel
                .find({
                    isDeleted: false,
                })
                .select({ title: 1, price: 1, productImage: 1, available_Quantity: 1 })
                .lean();
            return res.status(200).send({
                status: true,
                data: productData,
            });
        }
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message,
        });
    }
};

module.exports = {
    getProductByFilter,
    getProductById,
};
