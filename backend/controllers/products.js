const Products = require("../models/products");

async function HandleGetAllProducts(req, res) {
  const { category, trending, name, skip, limit } = req.query;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (trending) {
    filter.trending = trending;
  }
  if (name) {
    filter.name = {
      $regex: `^${name}`,
      $options: "i", // case-insensitive
    };
  }
  let data = await Products.find(filter).skip(skip).limit(limit);
  let length = await Products.countDocuments(filter);
  return res.status(200).json({
    status: true,
    message: "products fetched",
    data,
    length,
  });
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
  try {
    const img = req.file;
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

    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "please enter name" });
    }
    if (name.length < 4) {
      return res.status(400).json({
        status: false,
        message: "name is too short, min length is 4",
      });
    }

    if (!description) {
      return res
        .status(400)
        .json({ status: false, message: "please enter description" });
    }
    if (description.length < 20) {
      return res.status(400).json({
        status: false,
        message: "description is too short, min length is 20",
      });
    }

    if (!img) {
      return res
        .status(400)
        .json({ status: false, message: "product image is required" });
    }

    if (!price || price <= 0) {
      return res
        .status(400)
        .json({ status: false, message: "price should be greater than 0" });
    }

    const finalSizes = Array.isArray(sizes) ? sizes : [sizes];
    if (!finalSizes.length) {
      return res.status(400).json({
        status: false,
        message: "select sizes available to sell",
      });
    }

    if (!stock || stock <= 0) {
      return res
        .status(400)
        .json({ status: false, message: "Stock should not be 0" });
    }

    if (!category) {
      return res.status(400).json({
        status: false,
        message: "Select the category of the product",
      });
    }

    if (!subcategory) {
      return res.status(400).json({
        status: false,
        message: "Select the subCategory of the product",
      });
    }

    const product = await Products.create({
      name,
      description,
      price: Number(price),
      sizes: finalSizes,
      stock: Number(stock),
      category,
      subcategory,
      trending: trending === "true", // FormData boolean fix
      image: img.filename,
      createdBy: req.user.id,
    });

    return res.status(201).json({ status: true, data: product });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

async function HandleAdminProducts(req, res) {
  try {
    const adminId = req.user.id;
    const products = await Products.find({ createdBy: adminId });
    if (!products) {
      return res
        .status(200)
        .json({ status: true, message: "no products to fetch", data: [] });
    }
    return res
      .status(200)
      .json({ status: true, message: "products fetched", data: products });
  } catch (e) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
}

module.exports = {
  HandleGetAllProducts,
  HandleNewProduct,
  HandleGetOneProduct,
  HandleAdminProducts,
};
