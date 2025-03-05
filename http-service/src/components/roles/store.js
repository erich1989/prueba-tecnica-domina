const Role = require('./model'); // Ajusta el path según la ubicación de tu archivo

// Función para buscar roles por nombre
async function getRoleByName(roleName) {
    try {
        const role = await Role.findOne({ type: roleName });
        if (!role) {
            throw new Error('Error finding role');
        }
        return role;
    } catch (error) {
        console.error('Error finding role:', error);
        throw error;
    }
};

async function create(data, options = {}) {
    try {
        const newRole = Role.create(data);

        if (!newRole) {
            throw new Error('Error creating role');
        }

        return newRole;
    } catch (error) {
        throw new Error('Error creating role: ' + error.message);
    }
}


module.exports = {
    getRoleByName,
    create,
};