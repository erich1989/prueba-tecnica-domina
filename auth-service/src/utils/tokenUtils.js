const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

function createToken(data) {
    return new Promise((resolve, reject) => {
        jwt.sign(data, jwtConfig.secretKey, jwtConfig.options, (err, token) => {
            if (err) {
                reject(`Error al generar el token: ${err}`);
            } else {
                resolve(token);
            }
        });
    });
}

function generateShippingTrackingNumber() {
    const prefix = 'TRK'; // Prefijo opcional para identificar los números de seguimiento
    const randomPart = Math.random().toString(36).substr(2, 9).toUpperCase(); // Parte aleatoria
    const timestamp = Date.now().toString(36).toUpperCase(); // Timestamp en base 36 para asegurar unicidad

    return `${prefix}-${randomPart}-${timestamp}`;
}

module.exports = {
    createToken,
    generateShippingTrackingNumber,
};
