import { apiSales } from "./../apis/sales";

const actionSales = {
    getSale: (data) => apiSales.get(data).then((response) => response),
    // getUser: (data) => apiUser.get(data).then((response) => response)
}

export default actionSales;