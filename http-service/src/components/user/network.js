const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const { createUser, loginUser } = require('./controller');

const { authenticateToken } = require('../../middleware/authMiddleware');
const { checkAdminUser } = require('../../middleware/checkAdminUserMiddleware');
const { checkExistingEmail } = require('../../middleware/checkExistingEmailMiddleware');

const router = express.Router();

router.get('/:data', authenticateToken, async (req, res) => {
    try {
        const data = req.params.data;
        const infoUser = await controller.getAllUser(data);
        response.success(req, res, infoUser, 200);
    } catch (error) {
        response.error(req, res, 'Unexpected Error', 500, error)
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const infoUser = await controller.getInfoUser();
        response.success(req, res, infoUser, 200);
    } catch (error) {
        response.error(req, res, 'Unexpected Error', 500, error)
    }
});

router.post('/',
    // authenticateToken,
    // checkAdminUser,
    // checkExistingEmail,
    async (req, res) => {
        try {
            const users = await controller.createUser(req.body);
            response.success(req, res, users, 200);
        } catch (error) {
            response.error(req, res, 'Unexpected Error', 500, error)
        }
    });

router.put('/update', authenticateToken, checkAdminUser, async (req, res) => {
    try {
        const info = await controller.update(req.body);
        response.success(req, res, info, 200);
    } catch (error) {
        response.error(req, res, 'Unexpected Error', 500, error)
    }
});

router.delete('/delete', authenticateToken, async (req, res) => {
    try {
        const info = await controller.deleteElement(req.body);
        response.success(req, res, info, 200);
    } catch (error) {
        response.error(req, res, 'Unexpected Error', 500, error)
    }
});

router.post(
    '/login',
    // authenticateToken,
    // checkAdminUser,
    // checkExistingEmail,
    async (req, res) => {
        try {
            console.log(req.body);
            const user = await loginUser(req.body);
            response.success(req, res, user, 200);
        } catch (error) {
            response.error(req, res, error.message, 500, error)
        }
    });

router.post(
    '/register',
    // authenticateToken,
    // checkAdminUser,
    checkExistingEmail,
    async (req, res) => {
        try {
            const newUser = await createUser(req.body);
            response.success(req, res, newUser, 200);
        } catch (error) {
            response.error(req, res, 'Unexpected Error', 500, error)
        }
    });


module.exports = router;