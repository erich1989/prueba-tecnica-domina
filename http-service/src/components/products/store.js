const mongoose = require('mongoose');
const { Product } = require('./model');


async function getAllProducts(options = {}) {
    try {
        const products = await Product.find({}, null, options);

        const productsWithBase64Images = products.map(product => {
            const imagesBase64 = product.media.images.map(imageBuffer => {
                // Convertir Buffer a Base64
                return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
            });

            // Retornar el producto con las imágenes en Base64
            return {
                ...product.toObject(),  // Convierte el documento de Mongoose a un objeto plano
                media: {
                    ...product.media,
                    images: imagesBase64,  // Asignar las imágenes convertidas a Base64
                },
            };
        });

        return productsWithBase64Images;
    } catch (error) {
        console.log(error)
        throw new Error('Error retrieving products: ' + error.message);
    }
}

async function getAllProductdById(companyId) {
    try {
        // Asegurarse de que companyId sea un ObjectId
        // const modelos = mongoose.modelNames();
        // console.log("Modelos registrados:", modelos);

        const objectId = new mongoose.Types.ObjectId(companyId, options = {});
        const products = await Product.find({ companyId: objectId })
            // .populate('sectionId')
            // .populate('pageId')
            .populate('stockInformation');
        return products;
    } catch (error) {
        console.log(error)
        throw new Error('Error retrieving products: ' + error.message);
    }
}

async function getProductById(productId, options = {}) {
    try {
        const product = await Product.findById(productId)
            .session(options.session)
        // .populate('sectionId')
        // .populate('pageId')
        // .populate('stockInformation');
        return product;
    } catch (error) {
        throw new Error('Error retrieving product: ' + error.message);
    }
}

async function save(data, options = {}) {
    try {
        const newProduct = new Product(data);
        await newProduct.save(options);

        if (!newProduct) {
            throw new Error('Product not found');
        }

        return newProduct;
    } catch (error) {
        throw new Error('Error creating product: ' + error.message);
    }
}

async function update(data, options = {}) {
    try {
        // Buscar el producto por su ID
        const product = await Product.findById(data._id).session(options.session);

        // Si el producto no se encuentra, lanzar un error
        if (!product) {
            throw new Error('Product not found');
        }

        // Actualizar los campos del producto con los nuevos datos
        Object.assign(product, data);

        // Guardar los cambios en la base de datos
        await product.save(options);

        return product;
    } catch (error) {
        throw new Error('Error updating product: ' + error.message);
    }
}

async function deleteElement(productId) {
    try {
        // Buscar y eliminar el producto por su ID
        const product = await Product.findByIdAndDelete(productId);

        // Si el producto no se encuentra, lanzar un error
        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    } catch (error) {
        throw new Error('Error deleting product: ' + error.message);
    }
}

const addReview = async (data) => {
    try {
        // Buscar el producto
        const product = await Product.findById(data._id);

        if (!product) {
            throw new Error('Product not found');
        }

        // Calcular la nueva media y aumentar el conteo de calificaciones
        const { rating } = data;
        const totalRatings = product.ratingsAverage * product.ratingsCount;
        const newRatingsCount = product.ratingsCount + 1;
        const newRatingsAverage = (totalRatings + rating) / newRatingsCount;

        // Actualizar el producto
        product.reviews.push(data); // Añadir la nueva reseña
        product.ratingsCount = newRatingsCount; // Incrementar el conteo
        product.ratingsAverage = newRatingsAverage; // Actualizar la media

        // Guardar los cambios
        await product.save();

        return product;
    } catch (error) {
        console.error('Error al agregar la calificación:', error.message);
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getAllProductdById,
    getProductById,
    save,
    update,
    deleteElement,
    addReview,
}