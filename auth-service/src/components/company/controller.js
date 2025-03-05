const store = require('./store');

function returnCompanyIndentity(host) {
    return new Promise(async (resolve, reject) => {
        try {
            const company = await store.getCompanyByHost(host);
            resolve(company);
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    returnCompanyIndentity,
};