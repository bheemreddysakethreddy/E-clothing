const express = require("express");

const router = express.Router();

const { HandleLogin, HandleSignin } = require("../controllers/users");

router.post("/signin", HandleSignin);
router.post("/login", HandleLogin);


module.exports = router;
