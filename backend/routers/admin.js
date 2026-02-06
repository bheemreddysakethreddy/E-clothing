const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "productimages/images");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + file.originalname;

    cb(null, suffix);
  },
});
const upload = multer({ storage });

const { HandleNewProduct, HandleAdminProducts } = require("../controllers/products");
const roleMiddleware = require("../middlewares/rolemiddleware");
const authMiddleware = require("../middlewares/authMiddlewares");
const { HandleAdminLogin } = require("../controllers/users");

router
  .route("/admin/products")
  .post(
    authMiddleware,
    roleMiddleware("admin"),
    upload.single("image"),
    HandleNewProduct,
  ).get(authMiddleware, roleMiddleware("admin"),HandleAdminProducts)
router.route("/auth/admin/login").post(HandleAdminLogin);

module.exports = router;
