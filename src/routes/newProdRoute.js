const {Router} = require('express');
const router = Router();
const isAuth = require('../utils/auth');
const {postNewProduct, getNewProduct, putEditProduct, delProduct, } = require('../controllers/controllerProducts')

router.get('/',isAuth, getNewProduct )
router.post('/', postNewProduct )
router.put('/', putEditProduct)
router.delete('/', delProduct)

module.exports = router