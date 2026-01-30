const Products = require("../models/products");

async function HandleGetAllProducts(req, res) {
  const { category, trending } = req.query;
  let products = await Products.find();
  let data;
  if (category) {
    data = products.filter((obj) => obj.category == req.query.category);
  } else {
    data = products.filter((obj) => obj.trending);
  }

  return res
    .status(200)
    .json({ status: true, message: "products fetched", data });
}
async function HandleGetOneProduct(req, res) {
  let id = req.params.id;
  console.log(req.params.id);
  let product = await Products.findById(id);
  if (!product) {
    return res.status(404).json({
      status: false,
      message: "product not found",
    });
  }
  return res.status(200).json({
    status: true,
    message: "fetched product details successfully",
    data: product,
  });
}
async function HandleNewProduct(req, res) {
  let img = req.file;
  console.log(img);
  const {
    name,
    description,
    price,
    sizes,
    stock,
    category,
    subcategory,
    trending,
  } = req.body;
  if (name.length < 4) {
    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "please enter name" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "name is too short,min length is 4" });
    }
  }
  if (description.length < 20) {
    if (!description) {
      return res
        .status(400)
        .json({ status: false, message: "please enter description" });
    } else {
      return res.status(400).json({
        status: false,
        message: "description is too short,min length is 20",
      });
    }
  }
  if (price <= 0) {
    return res
      .status(400)
      .json({ status: false, message: "price should be greater than 0" });
  }
  if (!sizes.length) {
    return res
      .status(400)
      .json({ status: false, message: "select sizes available to sell" });
  }
  if (stock <= 0) {
    return res
      .status(400)
      .json({ status: false, message: "Stock should not be 0" });
  }
  if (!category) {
    return res
      .status(400)
      .json({ status: false, message: "Select the category of the product" });
  }
  if (!subcategory) {
    return res.status(400).json({
      status: false,
      message: "Select the subCategory of the product",
    });
  }
  const products = await Products.create({
    ...req.body,
    sizes: req.body.sizes.split(","),
    image: img.filename,
  });
  return res.status(201).json({ status: true, data: products });
}

module.exports = {
  HandleGetAllProducts,
  HandleNewProduct,
  HandleGetOneProduct,
};
