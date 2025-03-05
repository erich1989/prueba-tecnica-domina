const { searchUserByEmail } = require("../components/user/store");

async function checkAdminUser(req, res, next) {
    try {
        const { typeUser, email } = req.body;

        if (isRegularUser(typeUser)) {
            next();
            return;
        }

        if (isAdminUser(typeUser)) {
            await handleAdminUser(email, res, next);
            return;
        }

        res.status(400).json({ error: 'Tipo de usuario no válido', status: 400 });

    } catch (error) {
        console.error('Error in checkAdminUser middleware:', error);
        res.status(500).json({ error: 'Error interno del servidor', status: 500 });
    }
}

function isRegularUser(tyUser) {
    return tyUser === 'user';
}

function isAdminUser(tyUser) {
    return tyUser === 'admin';
}

async function handleAdminUser(email, res, next) {
    const user = await searchUserByEmail(email);
    console.log(user);

    if (user && user.roles[0].name === 'admin') {
        next();
    } else {
        res.status(409).json({ error: 'No se puede crear un usuario "admin" adicional.', status: 409 });
    }
}

module.exports = {
    checkAdminUser,
};
