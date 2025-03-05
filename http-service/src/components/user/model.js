const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    firstNames: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    lastNames: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    profile: {
        age: Number,
        gender: {
            type: String,
            enum: ['male', 'famale', 'other']
        },
        address: {
            country: String,
            state: String,
            city: String,
            address: String,
            addressLine2: String,
        },
        avatarUrl: String
    },
    preferences: {
        language: String,
        notificationSettings: {
            email: {
                type: Boolean,
                default: false
            },
            sms: {
                type: Boolean,
                default: false
            },
            push: {
                type: Boolean,
                default: false
            }
        }
    },
    state: {
        type: Boolean,
        default: true,
    },
    termsAccepted: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

// Crea el modelo de User
const User = mongoose.model('User', userSchema);

module.exports = User;
