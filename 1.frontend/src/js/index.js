import { addMonths } from "date-fns";
import { jwtDecode } from 'jwt-decode';

function convertShortDate(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1;
  const anio = fecha.getUTCFullYear();

  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;

  return `${diaFormateado}/${mesFormateado}/${anio}`;
}

const addMonthsToDate = (fecha, totalMeses) => {
  const fechaActualizada = addMonths(new Date(fecha), totalMeses);
  return fechaActualizada;
};

function formatDateForDatetimeLocal(inputDate) {
  const date = new Date(inputDate);
  const isoDate = date.toISOString().slice(0, 16);
  return isoDate;
}


function validateEmailFormat(correo) {
  const regexCorreo = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regexCorreo.test(correo);
}

function validateNumbersFormat(input) {
  const regexNumbers = /^[0-9]+$/;

  if (!regexNumbers.test(input)) {
    return "Numbers only";
  } else if (input.length < 10) {
    return "Minimum 10 numbers";
  }

  return null;
}

function validateNitFormat(input) {
  const regexNumbers = /^[0-9]+$/;
  return regexNumbers.test(input);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMinMaxPrices(priceArray) {
  if (!priceArray || priceArray.length === 0) {
    return [];
  }

  let prices = priceArray.map(item => item.price);
  let minPrice = Math.min(...prices);
  let maxPrice = Math.max(...prices);

  return [minPrice, maxPrice];
}

function formatToColombianCurrency(number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

function decodeToken(token) {
  try {
      const decoded = jwtDecode(token);
      return decoded;
  } catch (error) {
      console.error('Invalid token:', error);
      return null;
  }
}


export {
  convertShortDate,
  formatDateForDatetimeLocal,
  validateEmailFormat,
  validateNumbersFormat,
  validateNitFormat,
  addMonthsToDate,
  capitalizeFirstLetter,
  formatToColombianCurrency,
  getMinMaxPrices,
  decodeToken
}