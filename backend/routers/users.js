const express = require("express");

const router = express.Router();

const { HandleLogin, HandleSignin, HandleSigninOtp, handleVerifyOtp} = require("../controllers/users");
// const emailMiddleware = require("../middlewares/emailMiddleware");

router.post("/signin", HandleSignin);
router.post("/signin/otp", HandleSigninOtp);
router.post("/signin/otp/verify", handleVerifyOtp);
router.post("/login", HandleLogin);


module.exports = router;
