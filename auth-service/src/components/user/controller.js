const store = require('./store');
const { comparePasswords, encryptPassword } = require('../../utils/passwordUtils');
const { createToken } = require('../../utils/tokenUtils');
const bcrypt = require('bcryptjs');

async function generateUserToken(user) {
    const typeUser = user.role.type;

    if (typeUser === 'user') {
        const { password, company, ...userWithoutPassword } = user.toObject();
        const userPayload = {
            ...userWithoutPassword,
            id: user._id.toString(),
        };
        return await createToken(userPayload);
    }

    const { password, ...userWithoutPassword } = user.toObject();
    const userPayload = {
        ...userWithoutPassword,
        id: user._id.toString(),
    };
    return await createToken(userPayload);
}

function loginUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await store.searchUserByEmail(data.email);

            if (!user) {
                return reject(new Error('El correo electrónico proporcionado es inválido'));
            }

            const isPasswordValid = await comparePasswords(data.password, user.password);
            if (!isPasswordValid) {
                return reject(new Error('La contraseña proporcionada es incorrecta'));
            }

            const token = await generateUserToken(user);
            resolve({ token });

        } catch (error) {
            console.error('Error in loginUser:', error);
            reject(error);
        }
    })
};

function createUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await  store.getRoleByName(data.role);
            console.log('role:', role);
            const hash = await encryptPassword(data.password);

            const newData = {};
            newData.companyId = data.companyId;
            newData.firstNames = data.firstNames;
            newData.lastNames = data.lastNames;
            newData.password = hash;
            newData.email = data.email;
            newData.phone = data.phone;
            newData.role = role._id;
            newData.profile = {
                age: 0,
                gender: data.gender,
                address: {
                    country: '',
                    state: '',
                    city: '',
                    address: '',
                    addressLine2: '',
                },
                avatarUrl: '',
            };
            newData.preferences = {
                language: 'es',
                notificationSettings: {
                    email: false,
                    sms: false,
                    push: false,
                }
            };
            newData.termsAccepted = data.termsAccepted;

            const newUser = await store.create(newData);

            if (!newUser) {
                return reject(new Error('Error creating user: User creation failed'));
            }

            const { password, ...userWithoutPassword } = newUser.toObject();
            const userPayload = {
                ...userWithoutPassword,
                id: newUser._id.toString(),
            };

            const token = await createToken(userPayload);

            resolve({ token: token });

        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    loginUser,
    createUser,
};