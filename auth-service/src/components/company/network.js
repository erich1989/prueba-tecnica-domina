const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:companyHost', async (req, res) => {
    try {
        const host = req.params.companyHost;
        console.log(host);
        const company = await controller.returnCompanyIndentity(host);
        response.success(req, res, company, 200);
    } catch (error) {
        response.error(req, res, error.message, 500, error)
    }
});

module.exports = router;