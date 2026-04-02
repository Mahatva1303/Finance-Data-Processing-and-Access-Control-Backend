exports.checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.headers.role; // temporary (later from auth)

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};