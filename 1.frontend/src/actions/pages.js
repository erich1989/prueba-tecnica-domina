import { apiPages } from "./../apis/pages";

const actionPages = {
    returnAllPages: (data) => apiPages.getAll(data).then((response) => response),
    returnPagesInformation: (data) => apiPages.getPageInformation(data).then((response) => response),
    createPage: (data) => apiPages.post(data).then((response) => response),
    editPage: (data) => apiPages.put(data).then((response) => response),
    deletePage: (data) => apiPages.delete(data).then((response) => response),
}

export default actionPages;