const mongoose = require('mongoose');
const ModelStockInfo = require('./model');


async function getById(companyId) {
    try {
        const objectId = new mongoose.Types.ObjectId(companyId, options = {});
        const stockInfo = await ModelStockInfo.find({ companyId: objectId });
        return stockInfo;
    } catch (error) {
        throw new Error('Error retrieving StockInfo: ' + error.message);
    }
}

async function save(data) {
    try {
        const newInfoStock = new ModelStockInfo(data);
        await newInfoStock.save();
        return newInfoStock;
    } catch (error) {
        throw new Error('Error creating infoStock: ' + error.message);
    }
}

// async function update(data) {
//     try {
//         // Buscar el producto por su ID
//         const product = await ModelProduct.findById(data._id);

//         // Si el producto no se encuentra, lanzar un error
//         if (!product) {
//             throw new Error('Product not found');
//         }

//         // Actualizar los campos del producto con los nuevos datos
//         Object.assign(product, data);

//         // Guardar los cambios en la base de datos
//         await product.save();

//         return product;
//     } catch (error) {
//         throw new Error('Error updating product: ' + error.message);
//     }
// }


module.exports = {
    getById,
    save,
    // update,
}