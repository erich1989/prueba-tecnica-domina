const store = require('./store');

function allStockInfo(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await store.getById(companyId);
            resolve(products);
        } catch (error) {
            reject(error);
        }
    })
};

function createStockInfo(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newStockInfo = await store.save(data);
            if (newStockInfo) {
                const stockInfo = await store.getById(data.companyId);
                resolve(stockInfo);
            }

        } catch (error) {
            reject(error);
        }
    })
};

// function updateProduct(data) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const upadteProduct = await store.update(data);
//             if (upadteProduct) {
//                 const products = await store.getById(data.companyId);
//                 resolve(products);
//             }
//         } catch (error) {
//             reject(error);
//         }
//     })
// };

module.exports = {
    allStockInfo,
    createStockInfo,
    // updateProduct,
};