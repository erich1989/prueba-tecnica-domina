const mongoose = require('mongoose');
const { Employee } = require('./model');

async function getById(companyId, options = {}) {
    try {
        const objectId = new mongoose.Types.ObjectId(companyId, options = {});
        const employees = await Employee.find({ companyId: objectId }, null, options)
            .populate({
                path: 'userId',
                select: 'roles',
                populate: {
                    path: 'roles', // Aquí se hace populate de roles dentro de userId
                    model: 'Role', // El nombre del modelo de roles
                    select: 'name permissions', // Campos que quieres traer del rol
                }
            });
        // .populate('pageId')
        // .populate('stockInformation');
        return employees;
    } catch (error) {
        throw new Error('Error retrieving employees: ' + error.message);
    }
}

async function save(data, options = {}) {
    try {
        const newEmployee = new Employee(data);
        await newEmployee.save(options);
        return newEmployee;
    } catch (error) {
        throw new Error('Error creating employee: ' + error.message);
    }
}

async function update(data, options = {}) {
    try {
        // const employee = await Employee.findByIdAndUpdate(data._id);
        console.log(data._id)
        const employee = await Employee.findByIdAndUpdate(data._id, data,
            { new: true, runValidators: true, session: options.session });

        console.log(employee)
        if (!employee) {
            throw new Error('Employee not found');
        }

        // Object.assign(employee, data);
        // await employee.save(options);
        return employee;
    } catch (error) {
        throw new Error('Error updating employee: ' + error.message);
    }
}

async function deleteElement(employeeId) {
    try {
        const empleyee = await Employee.findByIdAndDelete(employeeId);

        if (!empleyee) {
            throw new Error('Employee not found');
        }

        return empleyee;
    } catch (error) {
        throw new Error('Error deleting employee: ' + error.message);
    }
}

module.exports = {
    getById,
    save,
    update,
    deleteElement,
}