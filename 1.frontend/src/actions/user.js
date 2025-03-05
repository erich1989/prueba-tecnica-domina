import { apiUser } from "./../apis/user";

const actionUser = {
    loginUser: (data) => apiUser.login(data).then((response) => response),
    registernUser: (data) => apiUser.register(data).then((response) => response),
    // getUser: (data) => apiUser.get(data).then((response) => response),
    // addUser: (data) => apiUser.add(data).then((response) => response),
    // updateUser: (data) => apiUser.update(data).then((response) => response),
    // deleteUser: (data) => apiUser.delete(data).then((response) => response),
}

export default actionUser;