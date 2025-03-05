require('dotenv').config();
const jwt = require('jsonwebtoken');


const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY || 'mi_clave_secreta',// Cambia a tu variable de entorno correspondiente
  options: {
    expiresIn: process.env.JWT_EXPIRATION || '1h' // Cambia a tu variable de entorno correspondiente o utiliza 1 hora por defecto
  }
};

module.exports = jwtConfig;
