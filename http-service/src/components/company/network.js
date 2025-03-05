const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const authenticateToken = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/',
    authenticateToken.authenticateToken,
    async (req, res) => {
        try {
            const companies = await controller.returnAllCompanies();
            response.success(req, res, companies, 200);
        } catch (error) {
            response.error(req, res, 'Unexpected Error', 500, error)
        }
    });

router.post(
    '/',
    // authenticateToken.authenticateToken,
    async (req, res) => {
        try {
            const info = await controller.createCompany(req.body);
            response.success(req, res, info, 200);
        } catch (error) {
            response.error(req, res, 'Unexpected Error', 500, error)
        }
    });

router.put('/update', authenticateToken.authenticateToken, async (req, res) => {
    try {
        const info = await controller.update(req.body);
        response.success(req, res, info, 200);
    } catch (error) {
        response.error(req, res, 'Unexpected Error', 500, error)
    }
});

router.delete('/delete', authenticateToken.authenticateToken, async (req, res) => {
    try {
        const info = await controller.deleteElement(req.body.idCompany);
        response.success(req, res, info, 200);
    } catch (error) {
        response.error(req, res, 'Unexpected Error', 500, error)
    }
});


module.exports = router;