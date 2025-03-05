const mongoose = require('mongoose');
const store = require('./store');
const { findRolesByName } = require('../roles/store');
const { encryptPassword } = require('../../utils/passwordUtils');
const { create } = require('../user/store');

function allEmployees(companyId) {
    return new Promise(async (resolve, reject) => {
        try {
            const employees = await store.getById(companyId);
            resolve(employees);
        } catch (error) {
            reject(error);
        }
    })
};

function createEmployee(data) {
    return new Promise(async (resolve, reject) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            const newEmployee = await store.save(data, { session });
            if (!newEmployee) {
                throw new Error('Failed to save employee');
            }

            const roles = await findRolesByName('waiter');
            const hash = await encryptPassword('123456');

            const newData = {
                firstNames: data.firstName,
                lastNames: data.lastName,
                employeeId: newEmployee._id,
                password: hash,
                email: data.email,
                phone: data.phoneNumber,
                roles: roles.map(role => role._id),
                company: data.companyId,
                profile: {
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
                },
                preferences: {
                    language: 'es',
                    notificationSettings: {
                        email: false,
                        sms: false,
                        push: false,
                    }
                },
                status: 'active',
                termsAccepted: true,
            }

            const newUser = await create(newData, { session });
            if (!newUser) {
                throw new Error('Failed to save user');
            }


            newEmployee.userId = newUser._id;
            // console.log(newEmployee);

            const updateEmployee = await store.update(newEmployee, { session });
            if (!updateEmployee) {
                throw new Error('Failed to update employee');
            }

            await session.commitTransaction();
            // session.endSession();

            const employees = await store.getById(data.companyId);
            resolve(employees);

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            reject(error);
        }  finally {
            // Finalizar la sesión
            session.endSession();
        }
    })
};

function updateEmployee(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const upadteEmployee = await store.update(data);
            if (upadteEmployee) {
                const employees = await store.getById(data.companyId);
                resolve(employees);
            }
        } catch (error) {
            reject(error);
        }
    })
};

function deleteEmployee(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteEmployee = await store.deleteElement(data.employeeId);
            if (deleteEmployee) {
                const employees = await store.getById(data.companyId);
                resolve(employees);
            }
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    allEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};