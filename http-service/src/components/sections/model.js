const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = Section;
