import { GET, POST, PUT } from "./";
import { CATEGORIES_ROUTER } from "../routes/routersApies";

const apiCategories = {
    getAll: (data) => GET(`${CATEGORIES_ROUTER}`),
    post: (data) => POST(`${CATEGORIES_ROUTER}`, data),
    // put: (data) => PUT(`${CATEGORIES_ROUTER}`, data),
};

export {
    apiCategories,
};