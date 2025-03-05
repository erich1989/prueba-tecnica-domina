const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    link: {
        type: String,
        lowercase: true,
        default: '',
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

module.exports = Page;
