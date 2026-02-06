const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res
      .status(401)
      .json({ status: false, message: "Authentication required" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
}

module.exports = authMiddleware;
