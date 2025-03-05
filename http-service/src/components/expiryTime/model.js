const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema para la información de caducidad
const ExpiryTimeSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Crear y exportar el modelo
const ExpiryTime = mongoose.model('ExpiryTime', ExpiryTimeSchema);
module.exports = ExpiryTime;
