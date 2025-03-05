import { apiBrads } from "../apis/brands";

const actionBrands = {
    returnAllBrands: (data) => apiBrads.getAll(data).then((response) => response),
    createBrand: (data) => apiBrads.post(data).then((response) => response),
    // editSection: (data) => apiCategories.put(data).then((response) => response),
}

export default actionBrands;