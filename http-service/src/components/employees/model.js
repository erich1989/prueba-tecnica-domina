const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'Non-Binary', 'Other'],
        default: 'Other',
    },
    position: {
        type: String,
        trim: true,
        default: '',
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        default: null,
    },
    salary: {
        type: Number,
        default: 0,
    },
    hireDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'On Leave'],
        default: 'Active',
    },
    reportsTo: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        default: null,
    },
    emergencyContact: {
        type: String,
        trim: true,
        default: '',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = { Employee };