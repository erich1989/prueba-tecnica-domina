const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employees = await controller.allEmployees(id);
        response.success(req, res, employees, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.post('/save', async (req, res) => {
    try {
        console.log(req.body);
        const employees = await controller.createEmployee(req.body);
        response.success(req, res, employees, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/update', async (req, res) => {
    try {
        // console.log(req.body)
        const employees = await controller.updateEmployee(req.body);
        response.success(req, res, employees, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.delete('/delete', async (req, res) => {
    try {
        // console.log(req.body);
        const employees = await controller.deleteEmployee(req.body);
        response.success(req, res, employees, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

module.exports = router;