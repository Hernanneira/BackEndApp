const {Router} = require('express');
const isAuth = require('../utils/auth');
const logger = require('../utils/log4js')
const router = Router();
const routeProducts = require('./productRoute')
const routeNewProduct = require('./newProdRoute')
const routeLogin = require('./loginRoute')
const routeRegister = require('./registerRoute')
const routeLogout = require('./logoutRoute')
const routeCart =require('./cartRoute')
const passport = require('passport');
const routerAPI = require('./apiRouter')
const routerChat = require('./chatRouter')
const routerAPIOrdenes = require('./ordenesRoute')
const sessionDBConnection = require('../db/sessionMongoAtlasDBConnection');
const {loginError} = require('../controllers/controllerLogin')

router.use(sessionDBConnection)

router.use(passport.initialize())

router.use(passport.session())

router.use('/login', routeLogin)
router.use('/register', routeRegister)
router.use('/productos',isAuth, routeProducts)
router.use('/nuevo',isAuth, routeNewProduct)
router.use('/chat',isAuth, routerChat)
router.use('/carrito',isAuth, routeCart)
router.use('/api/v1/cart', routerAPI )
router.use('/ordenes',isAuth, routerAPIOrdenes )
router.use('/logout', routeLogout)
router.get("/login-error", loginError);

router.get('/', (req, res) => {
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente, REDIRIGIENDO A LOGIN`);
    res.redirect('/login')
})

// router.get('*', (req, res) => {
//     logger.warn(`Route: ${req.path} 404 Not Found Method: ${req.method} `);
//     res.send("Sorry 🤷‍♂️ 404 Not Found");
// });


module.exports = router;