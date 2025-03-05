const mongoose = require('mongoose');
const Page = require('./model');
const Section = require('../sections/model');

async function getAll() {
    try {
        const pages = await Page.find();
        if (!pages) {
            throw new Error('Page not found');
        };
        return pages;
    } catch (error) {
        throw new Error('Error retrieving pages: ' + error.message);
    }
}

async function getPageInformation(pageId) {
    try {
        const sections = await Section.find({ pageId: pageId })
        .populate('products');

    

        const productsWithBase64Images = sections.map(section => {
            const productsWithImages = section.products.map(product => { // Iterar sobre section.products
              const imagesBase64 = product.media.images.map(imageBuffer => {
                return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
              });
          
              return {
                ...product.toObject(), // Convertir el documento de Mongoose a un objeto plano
                media: {
                  ...product.media,
                  images: imagesBase64,
                },
              };
            });
          
            return {
              ...section.toObject(),
              products: productsWithImages, // Asignar el array de productos con imágenes en Base64
            };
          });

        return productsWithBase64Images;
        // return sections;
    } catch (error) {
        throw new Error('Error retrieving pages: ' + error.message);
    }
}

async function getByCompanyId(companyId) {
    try {
        // Asegurarse de que companyId sea un ObjectId
        const objectId = new mongoose.Types.ObjectId(companyId, options = {});
        const pages = await Page.find({ companyId: objectId });
        return pages;
    } catch (error) {
        throw new Error('Error retrieving pages: ' + error.message);
    }
};

async function getByPageId(pageId) {
    try {
        const page = await Page.findById(pageId);

        if (!page) {
            throw new Error('Page not found');
        };

        return page;
    } catch (error) {
        throw new Error('Error retrieving pages: ' + error.message);
    }
};

async function save(data) {
    try {
        const newPage = new Page(data);
        await newPage.save();
        return newPage;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

async function edit(data, options = {}) {
    try {
        const { session } = options;

        const updatedPage = await Page.findByIdAndUpdate(
            data._id,
            data,
            { new: true, session }
        );

        if (!updatedPage) {
            throw new Error('Page not found');
        }

        return updatedPage;
    } catch (error) {
        throw new Error('Error updating page: ' + error.message);
    }
};

async function deleteElement(pageId) {
    try {
      

        const deletePage = Page.findByIdAndDelete(pageId);

        if (!deletePage) {
            throw new Error('Page not found');
        }

        return deletePage;
    } catch (error) {
        throw new Error('Error delete page: ' + error.message);
    }
};

module.exports = {
    getAll,
    getPageInformation,
    getByCompanyId,
    getByPageId,
    save,
    edit,
    deleteElement
}