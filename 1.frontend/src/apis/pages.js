import { GET, POST, PUT, DELETE } from "./";
import { PAGES_ROUTER } from "../routes/routersApies";

const apiPages = {
    getAll: (data) => GET(`${PAGES_ROUTER}`),
    getPageInformation: (data) => GET(`${PAGES_ROUTER}/pageInformation/${data.pageId}`),
    post: (data) => POST(`${PAGES_ROUTER}`, data),
    put: (data) => PUT(`${PAGES_ROUTER}`, data),
    delete: (data) => DELETE(`${PAGES_ROUTER}`, data),
};

export {
    apiPages,
};