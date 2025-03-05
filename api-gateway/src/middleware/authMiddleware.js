const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

 async function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, jwtConfig.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido', status: 403 });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};
