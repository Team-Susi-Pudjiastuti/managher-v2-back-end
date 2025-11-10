const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    try {
      // Ambil token langsung dari cookies
      const token = req.cookies?.token;

      if (!token) {
        return res.status(401).json({ message: "Login first to access this resource" });
      }

      // Langsung verifikasi token (tidak perlu split)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      console.error("Token verify failed:", error.message);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
  },
};
