const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const pages = await controller.returnAllPages();
        response.success(req, res, pages, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pages = await controller.allPages(id);
        response.success(req, res, pages, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.get('/pageInformation/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const pages = await controller.returnPageInformation(id);
        response.success(req, res, pages, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.post('/', async (req, res) => {
    try {
        const pages = await controller.createPage(req.body);
        response.success(req, res, pages, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.put('/', async (req, res) => {
    try {
        // console.log(req.body);
        const pages = await controller.updatePage(req.body);
        response.success(req, res, pages, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});

router.delete('/', async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.pageId;
        const pages = await controller.deletePage(id);
        response.success(req, res, pages, 200);
    } catch (error) {
        response.error(req, res, error, 404, error)
    }
});


module.exports = router;