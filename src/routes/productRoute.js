const {Router} = require('express');
const routeProducts = Router();
const isAuth = require('../utils/auth');
const {getIndexProducts, getCategory, getById, getAllProducts } = require('../controllers/controllerProducts')

routeProducts.get('/',isAuth, getIndexProducts )
routeProducts.get('/:categoria',isAuth, getCategory)
routeProducts.get('/id/:id',isAuth, getById)
routeProducts.get('/api/v1', getAllProducts)

module.exports = routeProducts
