const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "NOT AUTHORIZED" });
    }
  } else {
    res.status(401).json({ message: "NOT AUTHORIZED" });
  }
}

module.exports = { authMiddleware };
