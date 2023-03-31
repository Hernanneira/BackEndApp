const logger = require('../utils/log4js')
const {filtrarCategoria, obtenerDatos, crearDato,  updateDato, deleteDato, filtrarId} = require('../services/servicesProduct')

const getIndexProducts = async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const listProd = await obtenerDatos()
    res.render('index.ejs',{ nombre: req.session.token.userName.username, listProd: listProd}) 
}

const getCategory = async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const { categoria } = req.params;
    console.log('categoria',categoria)
    const listProd = await filtrarCategoria(categoria)
    console.log(listProd)
    res.render('index.ejs',{ nombre: req.session.token.userName.username, listProd})
}

const getById = async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const { id } = req.params;
    console.log(req.params.id)
    const listProd = await filtrarId(id)
    res.render('index.ejs',{ nombre: req.session.token.userName.username, listProd})
}

const postNewProduct = async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const newProd = await crearDato(req.body)
    res.json(newProd)
}

const putEditProduct = async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const newProd = await updateDato(req.body)
    res.json(newProd)
}

const delProduct = async (req, res, next) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const newProd = await deleteDato(parseInt(req.body.id))
    res.json(newProd)
}

const getNewProduct = async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    res.render('newProduct.ejs',{ nombre: req.session.token.userName.username}) 
}

const getAllProducts = async (req, res, next) => {
    const listProd = await obtenerDatos()
    res.json(listProd)
}




module.exports = {getIndexProducts, getCategory, postNewProduct, putEditProduct, delProduct, getNewProduct, getById, getAllProducts}
