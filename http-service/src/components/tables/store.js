const mongoose = require('mongoose');
const ModelTable = require('./model');
const ModelSale = require('../sales/model');
const { Product } = require('../products/model');

async function getAllTablesById(companyId) {
    try {
        const objectId = new mongoose.Types.ObjectId(companyId);
        const tables = await ModelTable.find({ companyId: objectId })
            .populate('employee', 'firstName lastName email')
            .populate({
                path: 'saleId',
                populate: {
                    path: 'products',
                    model: 'Product',
                    select: 'name price'
                }
            });
        return tables;
    } catch (error) {
        throw new Error('Error retrieving tables: ' + error.message);
    }
}

async function getMyTablesById(companyId, employeeId) {
    try {
        const objectCompanyId = new mongoose.Types.ObjectId(companyId, options = {});
        const objectEmployeeId = new mongoose.Types.ObjectId(employeeId, options = {});
        
        // Agregar la condición de `employeeId`
        const tables = await ModelTable.find({
            companyId: objectCompanyId,
            employee: objectEmployeeId
        })
        .populate('employee', 'firstName lastName email')
        .populate({
            path: 'saleId',
            populate: {
                path: 'products',
                model: 'Product',
                select: 'name price'
            }
        });

        return tables;
    } catch (error) {
        throw new Error('Error retrieving tables: ' + error.message);
    }
}

async function getTableById(tableId, options = {}) {
    try {
        const table = await ModelTable.findById(tableId, options);
        // .populate('products', 'name price')
        return table;
    } catch (error) {
        throw new Error('Error retrieving table: ' + error.message);
    }
}

async function save(data, options = {}) {
    try {
        const newTable = new ModelTable(data);
        await newTable.save(options);
        return newTable;
    } catch (error) {
        throw new Error('Error creating table: ' + error.message);
    }
}

async function saveAllSales(data) {

    const session = await ModelSale.startSession();
    session.startTransaction();

    try {

        // busca y guarda la venta
        const newSale = new ModelSale(data);
        const saveSale = await newSale.save({ session });

        if (!saveSale) {
            throw new Error('Failed to save sale.');
        }

        // busca cada uno de los productos y les baja el stock
        for (const productId of data.products) {
            const newProduct = await Product.findById(productId).session(session);
            if (!newProduct) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            newProduct.stock -= 1;
            await newProduct.save({ session });
        }

        // busca y guarda actualiza la info de la mesa
        const table = await ModelTable.findById(data.tableId).session(session);
        if (!table) {
            throw new Error('Table not found');
        }

        delete table.paymentMethod;
        delete table.activateOrder;
        table.active = false;
        table.sales = [];
        table.total = 0;

        await table.save({ session });

        await session.commitTransaction();
        session.endSession();

        return table;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error('Error creating sale and updating table: ' + error.message);
    }
}

async function update(data, options = {}) {
    try {
        const table = await ModelTable.findById(data._id).session(options.session);
        if (!table) {
            throw new Error('Table not found');
        }

        Object.assign(table, data);
        await table.save(options);
        return table;

    } catch (error) {
        throw new Error('Error updating table: ' + error.message);
    }
}

async function updateInfo(data, options = {}) {
    try {
        // Buscar el producto por su ID
        const table = await ModelTable.findById(data._id).session(options.session);

        // Si el producto no se encuentra, lanzar un error
        if (!table) {
            throw new Error('Table not found');
        }

        // Actualizar los campos del producto con los nuevos datos
        Object.assign(table, data);

        // Guardar los cambios en la base de datos
        await table.save(options);

        return table;
    } catch (error) {
        throw new Error('Error updating table: ' + error.message);
    }
}

async function updateEmployee(data, options = {}) {
    try {
        const table = await ModelTable.findById(data.tableId);

        if (!table) {
            throw new Error('Table not found');
        }

        table.employee = data.employeeActive ? data.employeeId : null;
        await table.save(options);

        return table;
    } catch (error) {
        throw new Error(`Error updating table: ${error.message}`);
    }
}

async function deleteElement(tableId, options = {}) {
    try {
        // Buscar y eliminar el producto por su ID
        const table = await ModelTable.findByIdAndDelete(tableId, options);

        // Si el producto no se encuentra, lanzar un error
        if (!table) {
            throw new Error('Product not found');
        }

        return table;
    } catch (error) {
        throw new Error('Error deleting table: ' + error.message);
    }
}

module.exports = {
    getAllTablesById,
    getMyTablesById,
    getTableById,
    save,
    saveAllSales,
    update,
    updateInfo,
    updateEmployee,
    deleteElement,
}