const {Router} = require('express');
const router = Router();
const {getRegisterIndex , register, getRegisterError} = require('../controllers/controllerRegister')

router.get('/', getRegisterIndex )
router.post('/', register);
router.get('/register-error', getRegisterError)

module.exports = router;