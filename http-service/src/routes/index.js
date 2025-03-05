const express = require('express');
const companyRouter = require('../components/company/network');
const userRouter = require('../components/user/network');
const roleRouter = require('../components/roles/network');
const employeesRouter = require('../components/employees/network');
const productsRouter = require('../components/products/network');
const stockRouter = require('../components/stock/network');
const expiryTimeRouter = require('../components/expiryTime/network');
const salesRouter = require('../components/sales/network');
const tablesRouter = require('../components/tables/network');

const pagesRouter = require('../components/pages/network');
const sectionsRouter = require('../components/sections/network');
const categoriesRouter = require('../components/categories/network');
const brandsRouter = require('../components/brands/network');

function routerApi(app) {
  const router = express.Router()
  app.use('/http-service/', router)
  router.use('/company', companyRouter);
  router.use('/user', userRouter);
  router.use('/role', roleRouter);

  router.use('/employees', employeesRouter);
  router.use('/products', productsRouter);
  router.use('/stock', stockRouter);
  router.use('/expiryTime', expiryTimeRouter);
  router.use('/sales', salesRouter);
  router.use('/tables', tablesRouter);

  router.use('/pages', pagesRouter);
  router.use('/sections', sectionsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/brands', brandsRouter);
}

module.exports = routerApi;