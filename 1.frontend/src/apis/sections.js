import { GET, POST, PUT } from "./";
import { PAGES_SECTIONS } from "../routes/routersApies";

const apiSetions = {
    getAll: (data) => GET(`${PAGES_SECTIONS}/${data.pageId}`),
    post: (data) => POST(`${PAGES_SECTIONS}`, data),
    put: (data) => PUT(`${PAGES_SECTIONS}`, data),
};

export {
    apiSetions,
};