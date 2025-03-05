const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
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

}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
