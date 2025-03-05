// const { default: ModelManager } = require('sequelize/types/model-manager');
const Company = require('./model');

// async function getUsers() {
//   const listCompanies = await Model.Company.findAll();
//   const listUser = await ModelUser.User.findAll();
//   const listPlan = await ModelPlan.Plan.findAll();
//   const listPlanFeature = await MoedelPlanFeature.Plan_feature.findAll();

//   return {
//     companies: listCompanies,
//     users: listUser,
//     plans: listPlan,
//     listPlanFeature: listPlanFeature,
//   };
// }



// const update = async (data) => {
//   const info = await Model.Company.findOne({ where: { id: data.id } });
//   info.nit = data.nit;
//   info.name = data.name;
//   info.country = data.country;
//   info.region = data.region;
//   info.city = data.city;
//   info.address = data.address;
//   info.postal_code = data.postal_code;
//   info.status = data.status;
//   await info.save();
//   return info;
// };


// const deleteElement = async (id) => {
//   const users = await ModelUser.User.findAll({ where: { company_id: id } });

//   if (users) {
//     for (const user of users) {
//       await user.destroy();
//     }
//   }
//   const info = await Model.Company.findOne({ where: { id: id } });
//   await info.destroy();
//   return info;
// };

const getAllCompanies = async () => {
    try {
        const companies = await Company.find();
        if (!companies) {
            throw new Error('Company not found');
        }
        const productsWithBase64Logotype = companies.map(product => {
            let logotypeBase64 = null;

            if (product.logotype) {
                logotypeBase64 = `data:image/jpeg;base64,${product.logotype.toString('base64')}`;
            }

            return {
                ...product.toObject(),
                logotype: logotypeBase64,
            };
        });

        return productsWithBase64Logotype;
    } catch (error) {
        console.error('Error finding company:', error);
        throw error;
    }
};

const create = async (data) => {
    try {
        const company = await Company.create(data);
        if (!company) {
            throw new Error('Error creating company');
        }
        return company;
    } catch (error) {
        console.error('Error creating company:', error);
        throw error;
    }
};


module.exports = {
    getAllCompanies,
    create,
    // listUser: getUsers,
    // create: create,
    // update: update,
    // delete: deleteElement,
}