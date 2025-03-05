import { POST } from "./";
import {  LOGIN_ROUTER, REGISTER_ROUTER } from "../routes/routersApies";

const apiUser = {
    login: (data) => POST(`${LOGIN_ROUTER}`, data),
    register: (data) => POST(`${REGISTER_ROUTER}`, data),
};

export {
    apiUser,
};