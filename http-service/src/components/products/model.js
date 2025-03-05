const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define el esquema de Productos
const productSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    },
    typeProduct: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    model: {
        type: String,
        trim: true,
        required: true
    },
    pageId: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    },
    sectionId: {
        type: Schema.Types.ObjectId,
        ref: 'Section'
    },
    categoriId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
    },
    description: {
        type: String,
        required: true
    },
    prices: {
        regular_price: {
            type: Number,
            required: true
        },
        promotion_price: {
            type: Number,
            required: true
        },
        promotion_state: {
            type: Boolean,
            required: true
        },
    },
    inventory: {
        stock: {
            type: Number,
            required: true
        },
        sku: {
            type: String,
            required: true
        },
        max_stock: {
            type: Number,
            required: true
        },
    },
    shelfLifeDates: {
        start: {
            type: String,
            // required: true,
            default: ''
        },
        end: {
            type: String,
            // required: true,
            default: ''
        },
        state: {
            type: Boolean,
            // required: true,
            default: false
        },
        // default: { start: '', end: '', state: false }
    },
    media: {
        images: {
            type: [Buffer],
            required: true,
        },
        videos: {
            type: String,
            required: false,
        },
    },
    ratingsAverage: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [{
            user: String,
            comment: String,
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            createdAt: { type: Date, default: Date.now }
        }],
        default: []
    },
    state: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

// Crea el modelo de Product
const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
