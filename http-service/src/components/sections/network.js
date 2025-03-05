const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pages = await controller.returnAllSectionsByPageId(id);
        response.success(req, res, pages, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.post('/', async (req, res) => {
    try {
        const sections = await controller.createSection(req.body);
        response.success(req, res, sections, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/', async (req, res) => {
    try {
        const sections = await controller.updateSection(req.body);
        response.success(req, res, sections, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

module.exports = router;