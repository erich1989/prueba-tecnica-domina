const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const expiryTimes = await controller.allExpiryTime(id);

        response.success(req, res, expiryTimes, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});


router.post('/save', async (req, res) => {
    try {
        console.log(req.body);
        const expiryTimes = await controller.createExpiryTime(req.body);
        response.success(req, res, expiryTimes, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/update', async (req, res) => {
    try {
        const expiryTimes = await controller.updateExpiryTime(req.body);
        response.success(req, res, expiryTimes, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});


module.exports = router;