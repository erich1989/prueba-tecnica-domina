const store = require('./store');

// function get() {
//     return new Promise(async (resolve, reject) => {
//         const listUser = await store.listUser();
//         const companies = listUser.companies;
//         const users = listUser.users;
//         const plans = listUser.plans;
//         const planFeature = listUser.listPlanFeature;

//         const newCompanies = companies.map((company, index) => {
//             const user = users.filter((user) => user.company_id === company.id);
//             company.dataValues.users = user;
//             return company
//         })

//         const definitiveCompany = newCompanies.map((company) => {
//             const result = plans.filter((plan) => plan.company_id === company.id);
//             const plansWithFeatures = result.map((info) => {
//                 const features = planFeature.filter((feature) => feature.plan_id === info.dataValues.id);
//                 info.dataValues.features = features;
//                 return info;
//             });
//             company.dataValues.plans = plansWithFeatures;
//             return company;
//         });

//         resolve(definitiveCompany);
//     })
// }

function returnAllCompanies(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const companies = await store.getAllCompanies()
            if (companies) {
                resolve(companies);
            }
        } catch (error) {
            reject(error);
        }
    });
};

function createCompany(data) {
    return new Promise(async (resolve, reject) => {
        try {

            let imageBuffer = null; // Inicializar como null en caso de que no haya imagen

            if (data.logotype) {
                const base64Data = data.logotype.replace(/^data:image\/\w+;base64,/, "");
                imageBuffer = Buffer.from(base64Data, 'base64'); // Convertir a Buffer
            }
            data.logotype = imageBuffer;

            const company = await store.create(data)
            if (company) {
                const companies = store.getAllCompanies();
                resolve(companies);
            }
        } catch (error) {
            reject(error);
        }
    });
};

// function update(data) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const info = await store.update(data);
//             if (info) {
//                 const companies = get();
//                 resolve(companies);
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

// function deleteElement(id) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const info = await store.delete(id);
//             if (info) {
//                 const companies = get();
//                 resolve(companies);
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }

module.exports = {
    // get,
    returnAllCompanies,
    createCompany,
    // update,
    // deleteElement,
};