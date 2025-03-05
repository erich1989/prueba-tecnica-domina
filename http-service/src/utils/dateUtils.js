const { addMonths } = require('date-fns');

const addMonthsToDate = (fecha, totalMeses) => {
    const fechaActualizada = addMonths(new Date(fecha), totalMeses);
    return fechaActualizada;
};

function convertirFechaParaSQLServer(fechaISO) {
    const fecha = new Date(fechaISO);

    const year = fecha.getUTCFullYear();
    const month = `0${fecha.getUTCMonth() + 1}`.slice(-2);
    const day = `0${fecha.getUTCDate()}`.slice(-2);
    const hours = `0${fecha.getUTCHours()}`.slice(-2);
    const minutes = `0${fecha.getUTCMinutes()}`.slice(-2);
    const seconds = `0${fecha.getUTCSeconds()}`.slice(-2);
    const milliseconds = `00${fecha.getUTCMilliseconds()}`.slice(-3);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

module.exports = {
    addMonthsToDate,
    convertirFechaParaSQLServer
};