const mongoose = require('mongoose');
const store = require('./store');
const storeSales = require('../sales/store');
const storeProduct = require('../products/store');
const controllerSale = require('../sales/controller');
const controllerProduct = require('../products/controller');
const { generateShippingTrackingNumber } = require('../../utils/tokenUtils');

function allTables(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const tables = await store.getAllTablesById(companyId);
            const sales = await storeSales.getSalesByCompanyAndStatusAndDate(companyId);
            resolve({ tables, sales });
        } catch (error) {
            reject(error);
        }
    })
};

function returnMyTablesById(companyId, employeeId) {
    return new Promise(async (resolve, reject) => {
        try {
            const table = await store.getMyTablesById(companyId, employeeId);
            resolve(table);
        } catch (error) {
            reject(error);
        }
    })
};

function returnTableById(tableId) {
    return new Promise(async (resolve, reject) => {
        try {
            const table = await store.getTableById(tableId);
            resolve(table);
        } catch (error) {
            reject(error);
        }
    })
};

function createTable(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newTable = await store.save(data);
            if (newTable) {
                const tables = await store.getAllTablesById(data.companyId);
                resolve(tables);
            }
        } catch (error) {
            reject(error);
        }
    })
};

function createAllTableSales(data) {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.updateType === 'completed') await typeUpdateCompleted(data);

            const tables = await store.getAllTablesById(data.companyId);
            resolve(tables);
        } catch (error) {
            reject(error);
        }
    })
};

function updateTable(data) {
    return new Promise(async (resolve, reject) => {
        try {
            await handleSale(data); // Ahora solo hay una función para manejar las ventas
            const tables = await store.getAllTablesById(data.companyId);
            resolve(tables);
        } catch (error) {
            reject(error);
        }
    });
}

function updateTableInfo(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const updateTable = await store.updateInfo(data);
            if (updateTable) {
                const tables = await store.getAllTablesById(data.companyId);
                resolve(tables);
            }
        } catch (error) {
            reject(error);
        }
    })
};

function updateTableEmployee(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const upadteTable = await store.updateEmployee(data);
            if (upadteTable) {
                const tables = await store.getAllTablesById(data.companyId);
                resolve(tables);
            }
        } catch (error) {
            reject(error);
        }
    })
};

function deleteTable(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteTable = await store.deleteElement(data.tableId);
            if (deleteTable) {
                const tables = await store.getAllTablesById(data.companyId);
                resolve(tables);
            }
        } catch (error) {
            reject(error);
        }
    })
};

async function handleSale(data) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const sale = await controllerSale.createSale(data, 'created', session);
        if (!sale) {
            throw new Error('Error creating sale');
        }

        let combinedSaleIds = [];
        let total = 0;

        if (data.saleId && data.saleId.length > 0) {
            combinedSaleIds = [sale._id, ...data.saleId.map(s => s._id)];

            const sales = await Promise.all(
                combinedSaleIds.map(id => {
                    if (mongoose.Types.ObjectId.isValid(id)) {
                        return controllerSale.returnSaleById(id, session);
                    } else {
                        return controllerSale.returnSaleById(id);
                    }
                })
            );

            total = sales.reduce((acc, sale) => {
                if (!sale || sale.total == null) {
                    throw new Error(`Sale with ID ${sale ? sale._id : id} not found or missing total.`);
                }
                return acc + sale.total;
            }, 0);

        } else {
            combinedSaleIds = [sale._id];
            const saleResult = await controllerSale.returnSaleById(sale._id, session);
            total = saleResult?.total || 0;
        }

        data.active = true;
        data.saleId = combinedSaleIds;
        data.total = total;
        delete data.products;
        delete data.discount;
        delete data.discountValue;
        delete data.discountConcept;

        const updateTable = await store.update(data, { session });
        if (!updateTable) {
            throw new Error('Error updating table');
        }

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw new Error('Transaction error: ' + error.message);
    } finally {
        session.endSession();
    }
};

async function typeUpdateCompleted(data) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //-----------update sale------------
        const newSales = data.saleId;

        for (const sale of newSales) {
            sale.trackingStatus = 'completed';
            sale.paymentStatus = 'paid';
            sale.paymentMethod = data.paymentMethod;

            const newStatusHistory = {
                status: 'completed',
                timestamp: new Date(),
            }
            sale.statusHistory.push(newStatusHistory);

            const updateSale = await controllerSale.updateSale(sale, 'created', session);
            if (!updateSale) {
                throw new Error('Error updating sale');
            }

            for (const product of sale.products) {
                const myProduct = await controllerProduct.returnProductById(product._id, session);

                if (myProduct && myProduct.stock > 0) {
                    myProduct.stock = myProduct.stock - 1;
                    const updateProduct = await controllerProduct.updateProduct(myProduct, 'created', session);

                    if (!updateProduct) {
                        throw new Error(`Failed to update stock for product with ID ${id}`);
                    }

                } else {
                    throw new Error(`Product with ID ${id} not found or out of stock.`);
                }
            }
        }

        //-----------update table------------
        const newTable = data;

        newTable.total = 0;
        newTable.active = false;
        newTable.saleId = null;

        const updateTable = await store.update(newTable, { session });
        if (!updateTable) {
            throw new Error('Error updating table');
        }

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw new Error('Transaction failed: ' + error.message);
    } finally {
        session.endSession();
    }
}

module.exports = {
    allTables,
    returnMyTablesById,
    returnTableById,
    createTable,
    createAllTableSales,
    updateTable,
    updateTableInfo,
    updateTableEmployee,
    deleteTable,
};