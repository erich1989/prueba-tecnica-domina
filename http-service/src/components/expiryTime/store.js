const mongoose = require('mongoose');
const ModelExpiryTime = require('./model');

async function getById(companyId) {
    try {
        const objectId = new mongoose.Types.ObjectId(companyId);
        const expiryTime = await ModelExpiryTime.find({ companyId: objectId });
        return expiryTime;
    } catch (error) {
        throw new Error('Error retrieving expiryTime: ' + error.message);
    }
}

async function save(data) {
    try {
        const newExpiryTime = new ModelExpiryTime(data);
        await newExpiryTime.save();
        return newExpiryTime;
    } catch (error) {
        throw new Error('Error creating expiryTime: ' + error.message);
    }
}

async function update(data) {
    try {
        const expiryTime = await ModelExpiryTime.findById(data._id);

        if (!expiryTime) {
            throw new Error('ExpiryTime not found');
        }

        Object.assign(expiryTime, data);

        await expiryTime.save();

        return expiryTime;
    } catch (error) {
        throw new Error('Error updating expiryTime: ' + error.message);
    }
}

module.exports = {
    getById,
    save,
    update,
}