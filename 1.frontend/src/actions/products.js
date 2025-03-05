import { apiProducts } from "./../apis/products";

const actionProducts = {
    returnAllProducts: (data) => apiProducts.getAll(data).then((response) => response),
    createProduct: (data) => apiProducts.post(data).then((response) => response),
    createReview: (data) => apiProducts.addReview(data).then((response) => response),
    // getUser: (data) => apiUser.get(data).then((response) => response)
}

export default actionProducts;