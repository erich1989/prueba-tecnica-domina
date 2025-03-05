const store = require('./store');
const storePage = require('../pages/store');
const mongoose = require('mongoose');

function returnAllCategories() {
    return new Promise(async (resolve, reject) => {
        try {
            const categories = await store.getAll();
            resolve(categories);
        } catch (error) {
            reject(error);
        }
    })
};

// function returnAllSectionsByPageId(pageId) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const sections = await store.getAllByPageId(pageId);
//             resolve(sections);
//         } catch (error) {
//             reject(error);
//         }
//     })
// };

// function allSections(companyId) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const sections = await store.getSectionsByCompanyId(companyId);
//             resolve(sections);
//         } catch (error) {
//             reject(error);
//         }
//     })
// };

function createCategory(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newCategory = await store.save(data);
            if (newCategory) {
                const categories = await store.getAll();
                resolve(categories);
            }
        } catch (error) {
            reject(error);
        }
    })
};

// function updateSection(data) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const newSection = await store.edit(data);
//             if (newSection) {
//                 const sections = await returnAllSectionsByPageId(data.pageId);
//                 resolve(sections);
//             }

//         } catch (error) {
//             reject(error);
//         }
//     })
// };

module.exports = {
    returnAllCategories,
    // returnAllSectionsByPageId,
    // allSections,
    createCategory,
    // updateSection
};