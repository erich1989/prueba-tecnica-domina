const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de Compañías
const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        country: String,
        state: String,
        city: String,
        address: String,
        addressLine2: String
    },
    phoneNumbers: [String],
    website: String,
    email: {
        type: String,
        required: true
    },
    industry: String,
    contact: {
        firstName: String,
        lastName: String,
        email: String
    },
    socialMedia: {
        linkedin: String,
        twitter: String,
        facebook: String,
        instagram: String,
        youtube: String
    },
    logoUrl: {
        type: String,
        default: '',
    },
    pages: [{
        type: Schema.Types.ObjectId,
        ref: 'Page',
        default: []
    }],
    state: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// Crea el modelo de Company
const Company = mongoose.model('Company', companySchema);

const pageSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    },
    name: {
        type: String,
        lowercase: true,
        required: true,
        required: true
    },
    link: {
        type: String,
        lowercase: true,
        required: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
    relatedSections: [{
        type: Schema.Types.ObjectId,
        ref: 'Section',
        default: []
    }],

}, { timestamps: true });

const Page = mongoose.model('Page', pageSchema);


const sectionSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: false,
        default: null
    },
    pageId: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        default: []
    }],
    state: {
        type: Boolean,
        required: true
    },

}, { timestamps: true });

const Section = mongoose.model('Section', sectionSchema);


module.exports = { Company, Page, Section };
