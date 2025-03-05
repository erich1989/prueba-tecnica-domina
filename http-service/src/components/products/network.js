const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const products = await controller.returnAllProductsById(id);
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await controller.returnAllProducts();
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.post('/', async (req, res) => {
    try {
        const products = await controller.createProduct(req.body);
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/update', async (req, res) => {
    try {
        // console.log(req.body)
        const products = await controller.updateProduct(req.body);
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.delete('/delete', async (req, res) => {
    try {
        // console.log(req.body);
        const products = await controller.deleteProduct(req.body);
        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/createNewReview', async (req, res) => {
    try {
        console.log(req.body);
        const product = await controller.createNewReview(req.body);
        response.success(req, res, product, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});



module.exports = router;