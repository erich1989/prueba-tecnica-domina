const mongoose = require('mongoose');
const modelSale = require('./model');

async function getAllSalesById(companyId, options = {}) {
    try {
        const objectId = new mongoose.Types.ObjectId(companyId, options = {});
        const products = await modelSale.find({ companyId: objectId })
            .session(options.session)
            .populate('products', 'name price')
            .populate('employeeId', 'firstName lastName')
        return products;
    } catch (error) {
        throw new Error('Error retrieving all sales: ' + error.message);
    }
}

async function getSaleById(saleId, options = {}) {
    try {
        const sale = await modelSale.findById(saleId).session(options.session);
        // .populate('products', 'name price')
        return sale;
    } catch (error) {
        throw new Error('Error retrieving sale: ' + error.message);
    }
}

async function getSalesByCompanyAndStatusAndDate(companyId, options = {}) {
    try {
        const objectId = new mongoose.Types.ObjectId(companyId, options = {});
        const statuses = ['in_process', 'pending', 'ready_for_pickup', 'shipped', 'delivered']; // Estados de tracking a buscar
        const currentDate = new Date(); // Fecha actual

        const sales = await modelSale.find({
            companyId: objectId,
            trackingStatus: { $in: statuses },
            // createdAt: { $gte: currentDate }
        })
            .populate('products', 'name price')
            .populate('employeeId', 'firstName lastName')
            .populate('tableId', 'number')
            // .session(options); 

        return sales;
    } catch (error) {
        throw new Error('Error retrieving sales: ' + error.message);
    }
}

async function save(data, options = {}) {
    try {
        const newSale = new modelSale(data);
        await newSale.save(options);
        return newSale;
    } catch (error) {
        throw new Error('Error creating sale: ' + error.message);
    }
}

async function update(data, options = {}) {
    try {
        const sale = await modelSale.findById(data._id).session(options.session);

        if (!sale) {
            throw new Error('Sale not found');
        }

        Object.assign(sale, data);

        await sale.save(options);

        return sale;
    } catch (error) {
        throw new Error('Error updating sale: ' + error.message);
    }
}

// async function deleteElement(productId) {
//     try {
//         const product = await Product.findByIdAndDelete(productId);

//         if (!product) {
//             throw new Error('Product not found');
//         }

//         return product;
//     } catch (error) {
//         throw new Error('Error deleting product: ' + error.message);
//     }
// }

module.exports = {
    getAllSalesById,
    getSaleById,
    getSalesByCompanyAndStatusAndDate,
    save,
    update,
    // deleteElement,
}