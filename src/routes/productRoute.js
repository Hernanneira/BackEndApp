const {Router} = require('express');
const routeProducts = Router();
const {getIndexProducts, getCategory, getById, getAllProducts } = require('../controllers/controllerProducts')

routeProducts.get('/', getIndexProducts )

//nico como hago esto, se choca logica
routeProducts.get('/:categoria', getCategory)
routeProducts.get('/id/:id', getById)
routeProducts.get('/api/v1', getAllProducts)

module.exports = routeProducts
