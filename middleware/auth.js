const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: async (req, res, next) => {
        // Get token from request header
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Login first to access this resource' });
        }

        // Remove 'Bearer' prefix from token
        const jwtToken = token.split(' ')[1];
        if (!jwtToken) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
    },
}