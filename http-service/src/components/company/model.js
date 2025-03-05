const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de Compañías
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    industry: {
        type: String,
        required: true
    },
    companyType: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    logotype: {
        type: Buffer,
        default: null,
    },
    address: {
        country: String,
        state: String,
        city: String,
        address: String,
        adicionalAddress: String,
        latitude: String,
        longitude: String,
    },
    phoneNumbers: [String],
    website: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    contact: {
        firstName: String,
        lastName: String,
        position: String,
        phoneNumbers: String,
        email: String
    },
    // socialMedia: {
    //     linkedin: String,
    //     twitter: String,
    //     facebook: String,
    //     instagram: String,
    //     youtube: String
    // },
    pages: [{
        type: Schema.Types.ObjectId,
        ref: 'Page',
        default: []
    }],
    state: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

// Crea el modelo de Company
const Company = mongoose.model('Company', companySchema);

module.exports = Company;

