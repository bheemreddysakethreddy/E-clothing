const express = require("express");
const router = express.Router();

const {
  HandleGetAllProducts,
  HandleGetOneProduct,
} = require("../controllers/products");

router.route("/").get(HandleGetAllProducts);
router.route("/:id").get(HandleGetOneProduct);

module.exports = router;
