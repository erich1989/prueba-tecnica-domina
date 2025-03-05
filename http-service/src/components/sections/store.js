const mongoose = require('mongoose');
const Section = require('./model');

async function getAllByPageId(pageId, options = {}) {
    try {
        // const sections = await Section.find({ pageId: pageId });
        const sections = await Section.find({ pageId: pageId }, null, options);
        return sections;
    } catch (error) {
        throw new Error('Error retrieving sections: ' + error.message);
    }
}

async function getSectionById(sectionId) {
    try {
        const section = await Section.findById(sectionId);

        if (!section) {
            throw new Error('Section not found');
        }

        return section;
    } catch (error) {
        throw new Error('Error retrieving pages: ' + error.message);
    }
}

async function getSectionsByCompanyId(companyId) {
    try {
        // Asegurarse de que companyId sea un ObjectId
        const objectId = new mongoose.Types.ObjectId(companyId);
        const sections = await Section.find({ companyId: objectId })
        // .populate('pageId');
        return sections;
    } catch (error) {
        throw new Error('Error retrieving pages: ' + error.message);
    }
}

async function save(data, options = {}) {
    try {
        const newSection = new Section(data);
        await newSection.save(options);
        return newSection;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

async function edit(data, options = {}) {
    try {
        const { session } = options;

        const updatedPage = await Section.findByIdAndUpdate(
            data._id,
            data,
            { new: true, session }
        );

        if (!updatedPage) {
            throw new Error('Section not found');
        }

        return updatedPage;
    } catch (error) {
        throw new Error('Error updating section: ' + error.message);
    }
};

module.exports = {
    getAllByPageId,
    getSectionById,
    getSectionsByCompanyId,
    save,
    edit,
}