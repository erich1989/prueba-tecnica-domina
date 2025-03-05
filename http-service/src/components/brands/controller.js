const store = require('./store');
const storePage = require('../pages/store');
const mongoose = require('mongoose');

function returnAllBrands() {
    return new Promise(async (resolve, reject) => {
        try {
            const brands = await store.getAll();
            resolve(brands);
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

function createBrand(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newBrand = await store.save(data);
            if (newBrand) {
                const brands = await store.getAll();
                resolve(brands);
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
    returnAllBrands,
    // returnAllSectionsByPageId,
    // allSections,
    createBrand,
    // updateSection
};