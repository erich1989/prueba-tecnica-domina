const { searchUserByEmail } = require("../components/user/store");

async function checkExistingEmail(req, res, next) {
    try {
        const email = req.body.email;

        const existingUser = await searchUserByEmail(email);

        if (existingUser) {
            return res.status(404).json({ error: 'El correo electrónico ya está en uso.', status: 404 });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor', status: 500 });
    }
}

module.exports = {
    checkExistingEmail,
};
