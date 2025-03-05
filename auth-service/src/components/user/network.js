const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const user = await controller.loginUser(req.body);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const user = await controller.createUser(req.body);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
});

module.exports = router;