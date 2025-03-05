const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    // country: String,
    state: String,
    city: String,
    address: String,
    additionalAddress: String,
});

const responsiblePersonSchema = new mongoose.Schema({
    firstNames: String,
    lastNames: String,
    phoneNumber: String,
    IDcard: String,
    email: String,
});

const saleSchema = new mongoose.Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    tableId: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
        // required: true
        default: null
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        // required: true
        default: null
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        default: null
    },
    dataEnterprise: {
        name: {
            type: String,
            // required: true,
            default: ''
        },
        nit: {
            type: String,
            // required: true,
            default: ''
        }
    },
    // products: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'Product',
    //     default: []
    // },
    products: [{
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        pricePerUnit: { type: Number, required: true },
        quantityOfProduct: { type: Number, required: true },
        total: { type: Number, required: true }
    }],
    saleType: {
        type: String,
        enum: ['online', 'admin'],
        required: true,
        default: 'online'
    },
    trackingStatus: {
        type: String,
        enum: ['confirmed', 'in_process', 'ready_for_pickup', 'shipped', 'delivered', 'completed', 'cancelled', 'no_tracking'],
        required: true,
        default: 'confirmed'
    },
    responsiblePerson: {
        type: responsiblePersonSchema,
        default: null
    },
    shippingAddress: {
        type: addressSchema,
        default: null
    },
    shippingMethod: {
        type: String,
        default: 'standard'
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    shippingTrackingNumber: {
        type: String,
        default: null
    },
    subtotal: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        active: {
            type: Boolean,
            default: false
        },
        discountValue: {
            type: Number,
            default: 0,
            min: [0, 'El valor del descuento no puede ser negativo']
        },
        discountConcept: {
            type: String,
            default: 'Sin concepto',
            trim: true,
        }
    },
    total: {
        type: Number,
        required: true,
        default: 0
    },
    payment: {
        status: {
            type: String,
            enum: ['pending', 'paid', 'cancelled'],
            required: true,
            default: 'pending'
        },
        method: {
            type: String,
            enum: ['pending', 'NEQUI', 'CARD', 'BANCOLOMBIA_QR', 'PSE', 'bank_transfer', 'cash_on_delivery', 'cash_admin'],
            required: true,
            default: 'pending'
        },
        transactionId: {
            type: String,
            default: null
        }
    },
    statusHistory: [{
        status: String,
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true // Agrega campos `createdAt` y `updatedAt` automáticamente
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
