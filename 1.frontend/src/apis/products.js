import { PUT, POST, GET } from ".";
import { PRODUCTS_ROUTER } from "../routes/routersApies";

const apiProducts = {
    getAll: (data) => GET(`${PRODUCTS_ROUTER}`),
    post: (data) => POST(`${PRODUCTS_ROUTER}`, data),
    addReview: (data) => PUT(`${PRODUCTS_ROUTER}/createNewReview`, data),
    // login: (data) => POST(`${USERS_ROUTER}/login`, data),
};

export {
    apiProducts,
};