const store = require('./store');
const storeProduct = require('../products/store');
const { generateShippingTrackingNumber } = require('../../utils/tokenUtils');

function returnAllSalesById(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const sales = await store.getAllSalesById(companyId);
            resolve(sales);
        } catch (error) {
            reject(error);
        }
    })
};

function returnSaleById(saleId, session = null) {
    return new Promise(async (resolve, reject) => {
        try {
            const sale = await store.getSaleById(saleId, { session });
            resolve(sale);
        } catch (error) {
            reject(error);
        }
    })
};

function returnSalesInProcessById(companyId, session = null) {
    return new Promise(async (resolve, reject) => {
        try {
            const sales = await store.getSalesByCompanyAndStatusAndDate(companyId, { session });
            resolve(sales);
        } catch (error) {
            reject(error);
        }
    })
};

function createSale(data, returnType = 'all', session = null) {
    return new Promise(async (resolve, reject) => {
        try {

            const createDiscount = data.discount
                ? {
                    active: true,
                    discountValue: data.discountValue || 0,
                    discountConcept: data.discountConcept || 'Sin concepto',
                }
                : {
                    active: false,
                    discountValue: 0,
                    discountConcept: 'Sin concepto'
                };

            const createSubtotal = await sumPrices(data.products);
            const createShippingCost = data.shippingCost ? data.shippingCost : 0;

            const newSale = {
                companyId: data.companyId,
                tableId: data.number ? data._id : null,
                employeeId: data.employee ? data.employee._id : null,
                customerId: data.customerId ? data.customerId : null,
                products: data.products.map((product) => product.idProduct),
                saleType: data.saleType ? data.saleType : 'admin',
                trackingStatus: 'in_process',
                shippingAddress: data.shippingAddress ? data.shippingAddress : null,
                shippingMethod: 'standard',
                shippingCost: createShippingCost,
                shippingTrackingNumber: generateShippingTrackingNumber(),
                subtotal: createSubtotal,
                discount: createDiscount,
                total: (createSubtotal - createDiscount.discountValue) + createShippingCost,
                paymentStatus: 'pending',
                paymentMethod: 'pending',
                transactionId: data.transactionId ? data.transactionId : null,
                statusHistory: [{
                    status: 'in_process',
                    timestamp: Date.now()
                }],
                notes: data.notes ? data.notes : '',
            };

            const sale = await store.save(newSale, { session });

            if (sale) {
                if (returnType === 'all') {
                    const sales = await store.getAllSalesById(data.companyId);
                    resolve(sales);
                } else if (returnType === 'created') {
                    resolve(sale);
                }
            }
        } catch (error) {
            reject(new Error('Error creating sale: ' + error.message));
        }
    });
}

function updateSale(data, returnType = 'all', session = null) {
    return new Promise(async (resolve, reject) => {
        try {
            const upadteSale = await store.update(data, { session });

            if (upadteSale) {
                if (returnType === 'all') {
                    const sales = await store.getSalesByCompanyAndStatusAndDate(data.companyId);
                    resolve(sales);
                } else if (returnType === 'created') {
                    resolve(upadteSale);
                }
            }
        } catch (error) {
            reject(error);
        }
    })
};

// function deleteProduct(data) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const deleteProduct = await store.deleteElement(data.productId);
//             if (deleteProduct) {
//                 const products = await store.getById(data.companyId);
//                 resolve(products);
//             }
//         } catch (error) {
//             reject(error);
//         }
//     })
// };


const sumPrices = async (data) => {
    let total = 0;
    for (const product of data) {
        const newProduct = await storeProduct.getProductById(product.idProduct);
        total += newProduct.price;
    }
    console.log('total retornado: ' + total);
    return total;
};

module.exports = {
    returnAllSalesById,
    returnSaleById,
    returnSalesInProcessById,
    createSale,
    updateSale,
    // deleteProduct,
};