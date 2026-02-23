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

// controllers
const {
  HandleNewProduct,
  HandleAdminProducts,
  handleDeleteProductById,
  handleEditProductById,
} = require("../controllers/products");
const { HandleAdminLogin } = require("../controllers/users");

//middlewares
const roleMiddleware = require("../middlewares/roleMiddleware");
const authMiddleware = require("../middlewares/authMiddlewares");

router
  .route("/auth/products")
  .post(
    authMiddleware,
    roleMiddleware("admin"),
    upload.single("image"),
    HandleNewProduct,
  )
  .get(authMiddleware, roleMiddleware("admin"), HandleAdminProducts);
router.route("/auth/login").post(HandleAdminLogin);
router
  .route("/product/delete/:id")
  .delete(authMiddleware, roleMiddleware("admin"), handleDeleteProductById);
router
  .route("/product/edit/:id")
  .patch(
    authMiddleware,
    roleMiddleware("admin"),
    upload.single("image"),
    handleEditProductById,
  );

module.exports = router;
