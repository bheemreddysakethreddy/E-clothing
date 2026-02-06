function roleMiddleware(requiredRole) {
  return (req, res, next) => {
    console.log("User role:", req.user.role);
    console.log("Required role:", requiredRole);
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        status: false,
        message: "Insufficient permissions",
      });
    }

    next();
  };
}

module.exports = roleMiddleware;
