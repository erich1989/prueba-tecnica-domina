const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();


router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        console.log(id);

        const products = await controller.allStockInfo(id);

        response.success(req, res, products, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});


router.post('/save', async (req, res) => {
    try {
        console.log(req.body);
        const stockInfo = await controller.createStockInfo(req.body);
        response.success(req, res, stockInfo, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

// router.put('/update', async (req, res) => {
//     try {
//         // console.log(req.body)
//         const products = await controller.updateProduct(req.body);
//         response.success(req, res, products, 200);
//     } catch (error) {
//         response.error(req, res, error, 404, error)
//     }
// });


module.exports = router;