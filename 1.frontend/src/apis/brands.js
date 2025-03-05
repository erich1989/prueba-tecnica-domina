import { GET, POST, PUT } from "./";
import { BRANDS_ROUTER } from "../routes/routersApies";

const apiBrads = {
    getAll: (data) => GET(`${BRANDS_ROUTER}`),
    post: (data) => POST(`${BRANDS_ROUTER}`, data),
    // put: (data) => PUT(`${CATEGORIES_ROUTER}`, data),
};

export {
    apiBrads,
};