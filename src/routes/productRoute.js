const {Router} = require('express');
const routeProducts = Router();
const {getIndexProducts, getCategory, getById } = require('../controllers/controllerProducts')

routeProducts.get('/', getIndexProducts )

//nico como hago esto, se choca logica
routeProducts.get('/:categoria', getCategory)
// routeProducts.get('/:id', getById)


module.exports = routeProducts
