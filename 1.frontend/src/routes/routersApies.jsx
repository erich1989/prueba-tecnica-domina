const LOGIN_URL = process.env.REACT_APP_BACKEND_AUTH_SERVICE || `http://localhost:5000/auth-service`;
const API_URL = process.env.REACT_APP_BACKEND_URL || `http://localhost:5000/http`;

export const LOGIN_ROUTER = `${LOGIN_URL}/login`;
export const REGISTER_ROUTER = `${LOGIN_URL}/register`;
export const COMPANY_IDENTITY_ROUTER = `${LOGIN_URL}/company`;

export const COMPANY_ROUTER = `${API_URL}/company`;
export const PAGES_ROUTER = `${API_URL}/pages`;
export const PAGES_SECTIONS = `${API_URL}/sections`;
export const CATEGORIES_ROUTER = `${API_URL}/categories`;
export const BRANDS_ROUTER = `${API_URL}/brands`;

export const USERS_ROUTER = `${API_URL}/users`;
export const PURCHASES_ROUTER = `${API_URL}/purchases`;
export const SALES_ROUTER = `${API_URL}/sales`;
export const PRODUCTS_ROUTER = `${API_URL}/products`;
