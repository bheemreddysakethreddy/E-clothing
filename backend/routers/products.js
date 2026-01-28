const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productimages");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + file.originalname;
    cb(null, suffix);
  },
});

const upload = multer({ storage });

const {
  HandleGetAllProducts,
  HandleNewProduct,
  HandleGetOneProduct
} = require("../controllers/products");

router
  .route("/")
  .get(HandleGetAllProducts)
  .post(upload.single("image"), HandleNewProduct);
router.route("/:id").get(HandleGetOneProduct)

module.exports = router;
