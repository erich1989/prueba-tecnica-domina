import { apiCompany } from "./../apis/company";

const actionCompany = {
    returnIdentity: (data) => apiCompany.getIdentity(data).then((response) => response),
    returnAllCompanies: () => apiCompany.getAllcompanies().then((response) => response),
    createCompany: (data) => apiCompany.create(data).then((response) => response),
}

export default actionCompany;