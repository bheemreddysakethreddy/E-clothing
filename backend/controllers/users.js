const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function HandleLogin(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ status: false, message: "email should not be empty" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ status: false, message: "Password should not be empty" });
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "6d" },
    );

    return res.status(200).json({
      status: true,
      message: "user found Success fully",
      token,
      email: user.email,
      id: user._id,
      role: user.role,
    });
  } else {
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "email not found, please signin" });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "invalid Password" });
    }
  }
}

async function HandleSignin(req, res) {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter valid email" });
    }
    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ status: false, message: "Shorter password not allowed" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "passwords not matching..." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(404)
        .json({ status: false, message: "user already existed..." });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALTROUNDS),
    );
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "user",
    });
    const token = await jwt.sign(
      { email, id: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
    );
    return res.status(201).json({
      status: true,
      message: "new user Created",
      token,
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    console.log("error occurred", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
}

async function HandleAdminLogin(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ status: false, message: "email should not be empty" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ status: false, message: "Password should not be empty" });
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (user.role !== "admin") {
    return res.status(403).json({ status: false, message: "Access Denied" });
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "6d" },
    );

    return res.status(200).json({
      status: true,
      message: "user found Success fully",
      token,
      email: user.email,
      id: user._id,
      role: user.role,
    });
  } else {
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "email not found, please signin" });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "invalid Password" });
    }
  }
}


module.exports = { HandleLogin, HandleSignin, HandleAdminLogin };

// module.exports = {
//   HandleLogin,
//   HandleSignin,
//   HandleAdminLogin,
//   HandleSigninOtp,
//   handleVerifyOtp,
// };
