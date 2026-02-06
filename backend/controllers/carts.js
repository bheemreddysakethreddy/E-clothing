const Cart = require("../models/carts");
require("../models/products");

async function HandleGetAllCartItems(req, res) {
  let { user } = req.params;
  console.log(user);
  const userCart = await Cart.find({ user }).populate(
    "product",
    "name price description image quantity",
  );
  return res
    .status(200)
    .json({ status: true, message: "cart items fetched", data: userCart });
}

async function HandlenewCartItem(req, res) {
  const { product, quantity } = req.body;
  const user = req.user.id;
  console.log(quantity);
  // console.log("req.user:", req.user);
  // console.log("req.body:", req.body);

  const excistingCart = await Cart.findOneAndUpdate(
    { user, product },
    { $inc: { quantity: quantity } },
    { new: true },
  );

  if (excistingCart) {
    return res.status(200).json({
      status: true,
      data: excistingCart,
    });
  }

  const cartItem = await Cart.create({
    user,
    product,
    quantity,
  });

  return res.status(201).json({
    status: true,
    data: cartItem,
  });
}

async function HandleUpdateCartItem(req, res) {
  const { product, quantityIncrease } = req.body;
  const user = req.user.id;
  console.log(user, product, quantityIncrease);
  let updatedCartProduct;
  if (quantityIncrease) {
    updatedCartProduct = await Cart.findOneAndUpdate(
      { user, product },
      { $inc: { quantity: 1 } },
      { new: true },
    );
  } else {
    updatedCartProduct = await Cart.findOneAndUpdate(
      { user, product },
      { $inc: { quantity: -1 } },
      { new: true },
    );
  }
  return res.status(201).json({
    status: true,
    message: "updated quantity",
    data: updatedCartProduct,
  });
}

async function HandleDeleteCartItem(req, res) {
  const { product } = req.body;
  const user = req.user.id;
  console.log(user, product);
  const deleteCartProduct = await Cart.findOneAndDelete({ user, product });
  return res.status(201).json({
    status: true,
    message: "product deleted",
    data: deleteCartProduct,
  });
}

module.exports = {
  HandleGetAllCartItems,
  HandlenewCartItem,
  HandleUpdateCartItem,
  HandleDeleteCartItem,
};
