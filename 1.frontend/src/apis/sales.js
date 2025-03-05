import { GET } from ".";
import { SALES_ROUTER } from "../routes/routersApies";

const apiSales = {
    get: (data) => GET(`${SALES_ROUTER}/trackingStatus/${data}`),
    // login: (data) => POST(`${USERS_ROUTER}/login`, data),
};

export {
    apiSales,
};