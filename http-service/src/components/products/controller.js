const store = require('./store');
const storeSection = require('../sections/store');
const mongoose = require('mongoose');

function returnAllProducts() {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await store.getAllProducts();
            resolve(products);
        } catch (error) {
            reject(error);
        }
    })
};

function returnAllProductsById(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await store.getAllProductdById(companyId);
            resolve(products);
        } catch (error) {
            reject(error);
        }
    })
};

function returnProductById(productId, session = null) {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await store.getProductById(productId, { session });
            resolve(product);
        } catch (error) {
            reject(error);
        }
    })
}

function createProduct(data) {
    return new Promise(async (resolve, reject) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const imagesBuffer = data.media.images.map(imageBase64 => {
                const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
                return Buffer.from(base64Data, 'base64');  // Convertir a Buffer
            });

            data.media.images = imagesBuffer;

            const newProduct = await store.save(data, { session });

            if (newProduct) {

                const section = await storeSection.getSectionById(data.sectionId);
                section.products.push(newProduct._id);
                await storeSection.edit(section, { session })

                const products = await store.getAllProducts({ session });
                resolve(products);
            }
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            reject(error);
        } finally {
            session.endSession();
        }
    })
};

function updateProduct(data, returnType = 'all', session = null) {
    return new Promise(async (resolve, reject) => {
        try {
            const upadteProduct = await store.update(data, { session });
            if (upadteProduct) {
                if (returnType === 'all') {
                    const products = await store.getAllProductdById(data.companyId);
                    resolve(products);
                } else if (returnType === 'created') {
                    resolve(upadteProduct);
                }
            }
        } catch (error) {
            reject(error);
        }
    })
};

function deleteProduct(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteProduct = await store.deleteElement(data.productId);
            if (deleteProduct) {
                const products = await store.getAllProductdById(data.companyId);
                resolve(products);
            }
        } catch (error) {
            reject(error);
        }
    })
};

function createNewReview(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newProduct = await store.addReview(data);
            if (newProduct) {
                const products = await store.getAllProductdById(data.companyId);
                resolve(products);
            }
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    returnAllProducts,
    returnAllProductsById,
    returnProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createNewReview,
};