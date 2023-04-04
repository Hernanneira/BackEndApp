const { Router } = require("express");
const router = Router();
const sessionDBConnection = require("../db/sessionMongoAtlasDBConnection");
const {getLogin, loginUser} = require('../controllers/controllerLogin')

router.use(sessionDBConnection);

router.get("/", getLogin);

router.post( "/", loginUser);

module.exports = router;
