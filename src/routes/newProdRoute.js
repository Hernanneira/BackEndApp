const {Router} = require('express');
const router = Router();
const {postNewProduct, getNewProduct, putEditProduct, delProduct, } = require('../controllers/controllerProducts')

router.get('/', getNewProduct )
router.post('/', postNewProduct )
router.put('/', putEditProduct)
router.delete('/', delProduct)

module.exports = router