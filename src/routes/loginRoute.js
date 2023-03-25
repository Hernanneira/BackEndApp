const { Router } = require("express");
const router = Router();
const sessionDBConnection = require("../db/sessionMongoAtlasDBConnection");
const passport = require("passport");
const {getLogin, loginUser} = require('../controllers/controllerLogin')

router.use(sessionDBConnection);

router.use(passport.initialize());
router.use(passport.session());

router.get("/", getLogin);

router.post( "/", loginUser);

router.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);




module.exports = router;
