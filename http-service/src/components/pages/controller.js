const store = require('./store');
const storeSections = require('../sections/store');
const storeProducts = require('../products/store');

function returnAllPages() {
    return new Promise(async (resolve, reject) => {
        try {
            const pages = await store.getAll();
            resolve(pages);
        } catch (error) {
            reject(error);
        }
    })
};

function returnPageInformation(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const pages = await store.getPageInformation(id);
            resolve(pages);
        } catch (error) {
            reject(error);
        }
    })
};

function returnAllPagesByCompanyId(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const pages = await store.getByCompanyId(companyId);
            const sections = await storeSections.getSectionsByCompanyId(companyId);
            const products = await storeProducts.getAllProductdById(companyId);
            resolve({ pages: pages, sections: sections, products: products });
        } catch (error) {
            reject(error);
        }
    })
};

function createPage(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newPage = await store.save(data);
            if (newPage) {
                const pages = await store.getAll();
                resolve(pages);
            }

        } catch (error) {
            reject(error);
        }
    })
};

function updatePage(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newPage = await store.edit(data);
            if (newPage) {
                const pages = await store.getAll();
                resolve(pages);
            }

        } catch (error) {
            reject(error);
        }
    })
};

function deletePage(pageId) {
    return new Promise(async (resolve, reject) => {
        try {
            const newPage = await store.deleteElement(pageId);
            if (newPage) {
                const pages = await store.getAll();
                resolve(pages);
            }

        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    returnAllPages,
    returnPageInformation,
    returnAllPagesByCompanyId,
    createPage,
    updatePage,
    deletePage
};