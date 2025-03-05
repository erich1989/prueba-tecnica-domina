import { GET, POST } from "./";
import { COMPANY_IDENTITY_ROUTER, COMPANY_ROUTER } from "../routes/routersApies";

const apiCompany = {
    getIdentity: (data) => GET(`${COMPANY_IDENTITY_ROUTER}/${data.host}`),
    getAllcompanies: () => GET(`${COMPANY_ROUTER}`),
    create: (data) => POST(`${COMPANY_ROUTER}`, data),
};

export {
    apiCompany,
};