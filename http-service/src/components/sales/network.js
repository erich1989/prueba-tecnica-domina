const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sales = await controller.returnAllSalesById(id);
        response.success(req, res, sales, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.get('/trackingStatus/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sales = await controller.returnSaleById(id);
        response.success(req, res, sales, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.get('/inProcess/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sales = await controller.returnSalesInProcessById(id);
        response.success(req, res, sales, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.post('/save', async (req, res) => {
    try {
        console.log(req.body);
        const products = await controller.createSale(req.body);
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/update', async (req, res) => {
    try {
        // console.log(req.body)
        const products = await controller.updateSale(req.body);
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.delete('/delete', async (req, res) => {
    try {
        console.log(req.body);
        const products = await controller.deleteProduct(req.body);
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});


module.exports = router;