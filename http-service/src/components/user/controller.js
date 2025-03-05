const store = require('./store');
const { getRoleByName } = require('../roles/store');
const { encryptPassword, comparePasswords } = require('../../utils/passwordUtils');
const { convertirFechaParaSQLServer } = require('../../utils/dateUtils');
// const { getRoleByName } = require('../company/store');
const { create, searchUserByEmail } = require('./store');
const { createToken } = require('../../utils/tokenUtils');
const bcrypt = require('bcryptjs');

function getAllUser(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const info = await store.getAll(id);
            resolve(info);
        } catch (error) {
            reject(error);
        }
    })
}

function getInfoUser() {
    return new Promise(async (resolve, reject) => {
        const listUser = await store.listUser();
        const companies = listUser.companies;
        const users = listUser.users;

        const newCompanies = companies.map((company, index) => {
            const user = users.filter((user) => user.company_id === company.id);
            company.dataValues.users = user;
            return company
        })
        resolve(newCompanies);
    })
}

// function createUser(data) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const newData = {}
//             // const hash = await encryptPassword(data.inputFive);
//             newData.name = data.inputOne;
//             newData.lastname = data.inputTwo;
//             newData.phonenumber = data.inputThree;
//             newData.email = data.inputFour;
//             newData.company_id = data.idCompany;
//             newData.owner_ip = '0';
//             // newData.password = hash;
//             newData.active = data.inputSeven;
//             newData.created = convertirFechaParaSQLServer(new Date());
//             newData.user_type = data.inputSix;
//             newData.b2c = 0;

//             const info = await store.create(newData)
//             if (info) {
//                 const response = getAllUser(data.idCompany);
//                 resolve(response);
//             }
//         } catch (error) {
//             reject(error);
//         }
//     });
// }


function update(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const info = await store.update(data);
            if (info) {
                const response = getAllUser(data.idCompany);
                resolve(response);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function deleteElement(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const info = await store.delete(data.idUser);
            if (info) {
                const response = getAllUser(data.idCompany);
                resolve(response);
            }
        } catch (error) {
            reject(error);
        }
    });
}

async function generateUserToken(user) {
    const typeUser = user.roles[0].name;

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
            const user = await searchUserByEmail(data.email);

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
            const role = await getRoleByName(data.role);
            console.log('role:', role);
            const hash = await encryptPassword(data.password);

            const newData = {};
            newData.firstNames = data.firstNames;
            newData.lastNames = data.lastNames;
            newData.password = hash;
            newData.email = data.email;
            newData.phone = data.phone;
            newData.role = role._id;
            newData.companyId = data.companyId;
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

            const newUser = await create(newData);

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
    getAllUser,
    getInfoUser,
    // add,
    update,
    deleteElement,
};