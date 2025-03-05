import { getLocalStorageToken } from "./../conf";

function validateToken(response) {
  if (response.status === 401 || response.status === 403) {
    //Token invalido, se borra el token del localStorage
    localStorage.removeItem("token");
    // Se redireje la pagina al login
    return (window.location.href = "/");
  }
  return response;
}

function request(url, options) {
  return fetch(url, options)
    .then(validateToken)
    .then((res) => res.json())
    .catch((err) => err);
}

function getOptions(method, data = null) {
  const options = {
    method,
    ...(data && { body: JSON.stringify(data) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLocalStorageToken()}`,
    },
  };
  return options;
}

export const GET = (url) => {
  const options = getOptions("GET");
  return request(url, options);
};

export const POST = (url, data) => {
  const options = getOptions("POST", data);
  return request(url, options);
};

export const PUT = (url, data) => {
  const options = getOptions("PUT", data);
  return request(url, options);
};

export const DELETE = (url, data) => {
  const options = getOptions("DELETE", data);
  return request(url, options);
};
