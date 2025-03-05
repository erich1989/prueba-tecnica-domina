const express = require('express');
const userRouter = require('../components/user/network');

function routerApi(app) {
  const router = express.Router()
  app.use('/api-gateway/', router)
  router.use('/user', userRouter);
  router.use('/company', userRouter);
}

module.exports = routerApi;