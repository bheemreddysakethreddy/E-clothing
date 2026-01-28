const express = require("express");
const router = express.Router();

const {
  HandlenewCartItem,
  HandleGetAllCartItems,
  HandleUpdateCartItem,
  HandleDeleteCartItem,
} = require("../controllers/carts");

router
  .route("/")
  .post(HandlenewCartItem)
  .get(HandleGetAllCartItems)
  .patch(HandleUpdateCartItem)
  .delete(HandleDeleteCartItem);

module.exports = router;
