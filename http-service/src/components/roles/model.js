const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de Roles
const roleSchema = new Schema({
    type: {
        type: String,
        required: true,
        unique: true,
        enum: ['customer', 'employee', 'waiter', 'delivery', 'admin', 'superAdmin']
    },
    description: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        default: []
    }
}, { timestamps: true });


// Crea el modelo de Role
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
