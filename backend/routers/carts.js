const express = require("express");
const router = express.Router();

const {
  HandlenewCartItem,
  HandleGetAllCartItems,
  HandleUpdateCartItem,
  HandleDeleteCartItem,
} = require("../controllers/carts");
const authMiddleware = require("../middlewares/authMiddlewares");

router
  .route("/")
  .post(authMiddleware, HandlenewCartItem)
  .patch(authMiddleware, HandleUpdateCartItem)
  .delete(authMiddleware, HandleDeleteCartItem);
router.route("/:user").get(authMiddleware, HandleGetAllCartItems);

module.exports = router;
