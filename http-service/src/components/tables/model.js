const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new mongoose.Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        // required: true
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    saleId: {
        type: [Schema.Types.ObjectId],
        ref: 'Sale',
        default: []
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        default: null
    }
}, {
    timestamps: true
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
