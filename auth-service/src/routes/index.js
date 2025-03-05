const express = require('express');
const userRouter = require('../components/user/network');
const companyRouter = require('../components/company/network');

function routerApi(app) {
    const router = express.Router()
    app.use('/auth-service/', router)
    router.use('/user', userRouter);
    router.use('/company', companyRouter);
}

module.exports = routerApi;