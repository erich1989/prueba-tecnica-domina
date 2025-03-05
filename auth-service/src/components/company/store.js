const { Company, Page } = require('./model');

const getCompanyByHost = async (host) => {
    try {
        const company = await Company.findOne({ website: host })
        .populate('pages');

        if (!company) {
            throw new Error('Company not found');
        }

        // const newCompany = { ...company }; // Copia profunda

        // const companyPages = await Page.find({ companyId: company._id });

        // company.pages = companyPages; // Asignamos las páginas a la nueva variable
        console.log(company);

        return company;
    } catch (error) {
        throw new Error('Error finding company by host: ' + error.message);
    }
};


module.exports = {
    getCompanyByHost,
}