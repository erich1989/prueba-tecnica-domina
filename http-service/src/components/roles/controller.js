const store = require('./store');

function createRole(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await store.create(data);
            if (role) {
                resolve(role);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createRole,
};