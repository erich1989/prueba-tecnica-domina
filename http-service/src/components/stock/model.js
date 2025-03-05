const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RangeSchema = new Schema({
    min: { type: Number, required: true },
    max: { type: Number, required: true }
});

const StockInfoSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    totalProduct: { type: Number, required: true },
    ranges: {
        low: { type: RangeSchema, required: true },
        medium: { type: RangeSchema, required: true },
        high: { type: RangeSchema, required: true },
        veryHigh: { type: RangeSchema, required: true }
    }
}, {
    timestamps: true,
});

const StockInfo = mongoose.model('StockInfo', StockInfoSchema);
module.exports = StockInfo;
