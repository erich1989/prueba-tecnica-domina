const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tables = await controller.allTables(id);
        response.success(req, res, tables, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.get('/myTables/:companyId/:employeeId', async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const employeeId = req.params.employeeId;
        const tables = await controller.returnMyTablesById(companyId, employeeId);
        response.success(req, res, tables, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.post('/save', async (req, res) => {
    try {
        // console.log(req.body);
        const tables = await controller.createTable(req.body);
        response.success(req, res, tables, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.post('/saveAllSales', async (req, res) => {
    try {
        console.log(req.body);
        const tables = await controller.createAllTableSales(req.body);
        response.success(req, res, tables, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/update', async (req, res) => {
    try {
        // console.log(req.body);
        const tables = await controller.updateTable(req.body);
        response.success(req, res, tables, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/updateInfo', async (req, res) => {
    try {
        // console.log(req.body);
        const tables = await controller.updateTableInfo(req.body);
        response.success(req, res, tables, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/updateEmpleyee', async (req, res) => {
    try {
        // console.log(req.body);
        const employees = await controller.updateTableEmployee(req.body);
        response.success(req, res, employees, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const tables = await controller.deleteTable(req.body);
        response.success(req, res, tables, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

module.exports = router;