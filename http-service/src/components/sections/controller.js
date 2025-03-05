const store = require('./store');
const storePage = require('../pages/store');
const mongoose = require('mongoose');

function returnAllSectionsByPageId(pageId) {
    return new Promise(async (resolve, reject) => {
        try {
            const sections = await store.getAllByPageId(pageId);
            resolve(sections);
        } catch (error) {
            reject(error);
        }
    })
};

function allSections(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const sections = await store.getSectionsByCompanyId(companyId);
            resolve(sections);
        } catch (error) {
            reject(error);
        }
    })
};

function createSection(data) {
    return new Promise(async (resolve, reject) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const newSection = await store.save(data, { session });
            if (newSection) {

                const page = await storePage.getByPageId(data.pageId);
                page.relatedSections.push(newSection._id);
                await storePage.edit(page, { session });

                const sections = await store.getAllByPageId(data.pageId, { session });
                resolve(sections);
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

function updateSection(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const newSection = await store.edit(data);
            if (newSection) {
                const sections = await returnAllSectionsByPageId(data.pageId);
                resolve(sections);
            }

        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    returnAllSectionsByPageId,
    allSections,
    createSection,
    updateSection
};