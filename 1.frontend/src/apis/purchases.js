import { GET } from "./";
import { PURCHASES_ROUTER } from "../routes/routersApies";

const apiPurchases = {
    purchases: (data) => GET(`${PURCHASES_ROUTER}/${data}`),
    // login: (data) => POST(`${USERS_ROUTER}/login`, data),
    // register: (data) => POST(`${USERS_ROUTER}/register`, data),
};

export {
    apiPurchases,
};