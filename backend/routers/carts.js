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
  .patch(HandleUpdateCartItem)
  .delete(HandleDeleteCartItem);
router.route("/:user").get(HandleGetAllCartItems)

module.exports = router;
