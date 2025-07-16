const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'super_secret';

function authMiddleware(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Missing token" });

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: Role" });
      }
      req.user = user;
      next();
    });
  }
}
module.exports = { authMiddleware, secret };
