const _ECOREGISTRY_TOKEN_ADMIN = "token";

export const getLocalStorageToken = () => localStorage.getItem(_ECOREGISTRY_TOKEN_ADMIN);
export const setLocalStorageToken = token => localStorage.setItem(_ECOREGISTRY_TOKEN_ADMIN, token);
export const removeLocalStorageToken = () => localStorage.removeItem(_ECOREGISTRY_TOKEN_ADMIN);