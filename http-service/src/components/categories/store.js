const mongoose = require('mongoose');
const Category = require('./model');

async function getAll() {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw new Error('Error retrieving sections: ' + error.message);
    }
}

// async function getAllByPageId(pageId,  options = {}) {
//     try {
//         // const sections = await Section.find({ pageId: pageId });
//         const sections = await Section.find({ pageId: pageId }, null, options);
//         return sections;
//     } catch (error) {
//         throw new Error('Error retrieving sections: ' + error.message);
//     }
// }

// async function getSectionsByCompanyId(companyId) {
//     try {
//         // Asegurarse de que companyId sea un ObjectId
//         const objectId = new mongoose.Types.ObjectId(companyId);
//         const sections = await Section.find({ companyId: objectId })
//         // .populate('pageId');
//         return sections;
//     } catch (error) {
//         throw new Error('Error retrieving pages: ' + error.message);
//     }
// }

async function save(data) {
    try {
        const newCategory = new Category(data);
        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw new Error('Error creating category: ' + error.message);
    }
};

// async function edit(data) {
//     try {
//         const updatedPage = await Section.findByIdAndUpdate(
//             data._id,
//             data,
//             { new: true }
//         );

//         if (!updatedPage) {
//             throw new Error('Section not found');
//         }

//         return updatedPage;
//     } catch (error) {
//         throw new Error('Error updating section: ' + error.message);
//     }
// };

module.exports = {
    getAll,
    // getAllByPageId,
    // getSectionsByCompanyId,
    save,
    // edit,
}