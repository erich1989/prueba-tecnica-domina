import { apiCategories } from "../apis/categories";

const actionCategories = {
    returnAllCategories: (data) => apiCategories.getAll(data).then((response) => response),
    createCategory: (data) => apiCategories.post(data).then((response) => response),
    // editSection: (data) => apiCategories.put(data).then((response) => response),
}

export default actionCategories;