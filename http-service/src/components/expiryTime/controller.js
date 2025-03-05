const store = require('./store');

function allExpiryTime(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const expiryTimes = await store.getById(companyId);
            resolve(expiryTimes);
        } catch (error) {
            reject(error);
        }
    })
};

function createExpiryTime(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newExpiryTime = await store.save(data);
            if (newExpiryTime) {
                const expirytime = await store.getById(data.companyId);
                resolve(expirytime);
            }

        } catch (error) {
            reject(error);
        }
    })
};

function updateExpiryTime(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const upadteExpiryTime = await store.update(data);
            if (upadteExpiryTime) {
                const expiryTimes = await store.getById(data.companyId);
                resolve(expiryTimes);
            }
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    allExpiryTime,
    createExpiryTime,
    updateExpiryTime,
};